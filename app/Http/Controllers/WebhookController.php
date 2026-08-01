<?php

namespace App\Http\Controllers;

use App\Enums\EnrollmentStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Enrollment;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Webhook;

class WebhookController extends Controller
{
    /**
     * Handle Stripe Webhook.
     */
    public function stripe(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent(
                $payload, $sigHeader, $endpointSecret
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        Log::info('Stripe Webhook received', ['type' => $event->type]);

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $orderId = $session->metadata->order_id ?? null;

            if ($orderId) {
                $this->processOrder($orderId, $session);
            }
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Process order fulfillment.
     */
    protected function processOrder($orderId, $session)
    {
        $order = Order::find($orderId);

        if (! $order || $order->status === OrderStatus::COMPLETED) {
            return;
        }

        // Record payment
        $transactionId = $session->payment_intent;

        $exists = $order->payments()
            ->where('transaction_id', $transactionId)
            ->exists();

        if (! $exists) {
            Payment::create([
                'order_id' => $order->id,
                'transaction_id' => $transactionId,
                'amount' => $order->total_amount,
                'status' => PaymentStatus::COMPLETED,
                'payment_method' => $order->payment_method,
                'gateway_response' => (array) $session,
            ]);
        }

        // Update Order
        $order->update(['status' => OrderStatus::COMPLETED]);

        // Check if this is a subscription order
        $metadata = $order->metadata;
        if (isset($metadata['type']) && $metadata['type'] === 'subscription') {
            // Activate subscription
            $user = $order->user;
            $user->update([
                'subscription_plan_id' => $metadata['plan_id'],
                'subscription_starts_at' => now(),
                'subscription_ends_at' => now()->addDays($metadata['subscription_duration']),
            ]);

            Log::info('Subscription activated via Webhook', [
                'order_id' => $order->id,
                'user_id' => $user->id,
                'plan_id' => $metadata['plan_id'],
            ]);
        } else {
            // Auto-enroll user in course (for course purchases)
            if ($order->course_id) {
                Enrollment::updateOrCreate(
                    ['user_id' => $order->user_id, 'course_id' => $order->course_id],
                    [
                        'order_id' => $order->id,
                        'status' => EnrollmentStatus::ACTIVE,
                        'enrolled_at' => now(),
                    ]
                );
            }
        }

        Log::info('Order processed via Webhook', ['order_id' => $order->id]);
    }
}
