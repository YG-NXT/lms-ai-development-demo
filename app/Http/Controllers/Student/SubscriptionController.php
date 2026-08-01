<?php

namespace App\Http\Controllers\Student;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\SubscriptionPlan;
use App\Services\Payments\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    /**
     * Display subscription plans
     */
    public function index(): Response
    {
        $plans = SubscriptionPlan::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Student/Pages/Subscriptions', [
            'plans' => $plans,
            'currentPlan' => Auth::user()->subscriptionPlan,
        ]);
    }

    /**
     * Show subscription checkout page
     */
    public function checkout(SubscriptionPlan $plan): Response
    {
        // Get active payment methods
        $paymentMethods = PaymentService::getActiveMethods();

        return Inertia::render('Student/Subscription/Checkout', [
            'plan' => $plan,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Process subscription purchase
     */
    public function purchase(Request $request, SubscriptionPlan $plan)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'billing_cycle' => 'required|in:monthly,yearly',
            'payment_method' => 'required|string',
        ]);

        // Calculate price based on billing cycle
        $price = $validated['billing_cycle'] === 'yearly' 
            ? floatval($plan->yearly_price) 
            : floatval($plan->monthly_price);

        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'course_id' => null, // Subscriptions don't need course_id
            'amount' => $price,
            'discount_amount' => 0,
            'total_amount' => $price,
            'status' => OrderStatus::PENDING,
            'payment_method' => $validated['payment_method'],
            'metadata' => [
                'type' => 'subscription',
                'plan_id' => $plan->id,
                'plan_name' => $plan->name,
                'billing_cycle' => $validated['billing_cycle'],
                'subscription_duration' => $validated['billing_cycle'] === 'yearly' ? 365 : 30,
            ],
        ]);

        // Process payment
        try {
            $paymentService = new PaymentService();
            $redirectUrl = $paymentService->pay($order);

            return response()->json([
                'success' => true,
                'redirect_url' => $redirectUrl,
                'order_id' => $order->id,
            ]);
        } catch (\Exception $e) {
            $order->update(['status' => OrderStatus::FAILED]);
            
            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle subscription payment callback
     */
    public function callback(Request $request)
    {
        $orderId = $request->input('order_id');
        $order = Order::find($orderId);

        if (!$order) {
            return redirect()->route('student.subscriptions.index')
                ->with('error', 'Order not found.');
        }

        // Verify payment
        $paymentService = new PaymentService();
        $isValid = $paymentService->verify($request, $order);

        if ($isValid) {
            // Update order status
            $order->update(['status' => OrderStatus::COMPLETED]);

            // Activate subscription
            $user = $order->user;
            $metadata = $order->metadata;
            
            $user->update([
                'subscription_plan_id' => $metadata['plan_id'],
                'subscription_starts_at' => now(),
                'subscription_ends_at' => now()->addDays($metadata['subscription_duration']),
            ]);

            return redirect()->route('student.subscriptions.index')
                ->with('success', "Successfully subscribed to {$metadata['plan_name']}!");
        }

        return redirect()->route('student.subscriptions.checkout', $order->metadata['plan_id'])
            ->with('error', 'Payment verification failed. Please try again.');
    }

    /**
     * Cancel subscription
     */
    public function cancel()
    {
        $user = Auth::user();

        if (!$user->subscription_plan_id) {
            return back()->with('error', 'No active subscription found.');
        }

        $user->update([
            'subscription_plan_id' => null,
            'subscription_starts_at' => null,
            'subscription_ends_at' => null,
        ]);

        return back()->with('success', 'Subscription cancelled successfully.');
    }

    /**
     * Upgrade/Downgrade subscription
     */
    public function update(Request $request, SubscriptionPlan $plan)
    {
        $user = Auth::user();

        if (!$user->subscription_plan_id) {
            return back()->with('error', 'No active subscription found.');
        }

        // Redirect to checkout for new plan
        return redirect()->route('student.subscriptions.checkout', $plan->slug);
    }
}
