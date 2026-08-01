<?php

namespace App\Services\Payments\Providers;

use App\Models\Order;
use App\Services\Payments\PaymentProviderInterface;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class StripeProvider implements PaymentProviderInterface
{
    protected StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('services.stripe.secret'));
    }

    public function pay(Order $order): string
    {
        $session = $this->stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $order->course->title,
                    ],
                    'unit_amount' => (int) ($order->total_amount * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => str_replace('%7BCHECKOUT_SESSION_ID%7D', '{CHECKOUT_SESSION_ID}', route('student.checkout.callback', [
                'order_id' => $order->id,
                'status' => 'success',
                'session_id' => '{CHECKOUT_SESSION_ID}',
            ])),
            'cancel_url' => route('student.checkout.callback', [
                'order_id' => $order->id,
                'status' => 'cancel',
            ]),
            'client_reference_id' => (string) $order->id,
            'metadata' => [
                'order_id' => (string) $order->id,
            ],
            'payment_intent_data' => [
                'metadata' => [
                    'order_id' => (string) $order->id,
                ],
            ],
        ]);

        return $session->url;
    }

    public function verify(Request $request): bool
    {
        if ($request->status !== 'success' || ! $request->session_id) {
            return false;
        }

        try {
            $session = $this->stripe->checkout->sessions->retrieve($request->session_id);

            // Re-verify the order ID matches the session metadata
            if (! isset($session->metadata->order_id) || $session->metadata->order_id != $request->order_id) {
                return false;
            }

            return $session->payment_status === 'paid';
        } catch (\Exception $e) {
            return false;
        }
    }

    public function handleCallback(Request $request): array
    {
        $session = $this->stripe->checkout->sessions->retrieve($request->session_id);

        return [
            'status' => 'success',
            'transaction_id' => $session->payment_intent,
            'gateway_response' => $session->toArray(),
        ];
    }

    public function refund(Order $order, float $amount, ?string $reason = null): bool
    {
        $payment = $order->payments()->where('status', 'completed')->first();

        if (! $payment || ! $payment->transaction_id) {
            return false;
        }

        try {
            $this->stripe->refunds->create([
                'payment_intent' => $payment->transaction_id,
                'amount' => (int) ($amount * 100),
                'reason' => $this->mapRefundReason($reason),
            ]);

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    protected function mapRefundReason(?string $reason): string
    {
        $reason = strtolower($reason ?? '');
        if (str_contains($reason, 'duplicate')) {
            return 'duplicate';
        }
        if (str_contains($reason, 'fraud')) {
            return 'fraudalent';
        }
        if (str_contains($reason, 'request')) {
            return 'requested_by_customer';
        }

        return 'requested_by_customer';
    }
}
