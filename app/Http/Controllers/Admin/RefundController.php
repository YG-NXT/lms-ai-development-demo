<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EnrollmentStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Refund;
use App\Services\Payments\PaymentManager;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RefundController extends Controller
{
    public function __construct(protected PaymentManager $paymentManager) {}

    /**
     * Process a full refund for an order.
     */
    public function store(Request $request, Order $order): RedirectResponse
    {
        $request->validate([
            'reason' => 'nullable|string|max:255',
        ]);

        if ($order->status !== OrderStatus::COMPLETED) {
            return back()->with('error', 'Only completed orders can be refunded.');
        }

        if ($order->refund()->exists()) {
            return back()->with('error', 'Order has already been refunded.');
        }

        try {
            DB::transaction(function () use ($order, $request) {
                // 1. Process with Payment Provider
                $payment = $order->payments()->where('status', PaymentStatus::COMPLETED)->first();

                if ($payment) {
                    $success = $this->paymentManager->driver($order->payment_method->value)->refund($order, (float) $order->total_amount, $request->reason);

                    if (! $success) {
                        throw new \Exception('Payment gateway refused the refund request.');
                    }

                    $payment->update(['status' => PaymentStatus::REFUNDED]);
                }

                // 2. Create Refund Record
                Refund::create([
                    'order_id' => $order->id,
                    'user_id' => Auth::id(),
                    'amount' => $order->total_amount,
                    'reason' => $request->reason,
                ]);

                // 3. Update Order Status
                $order->update(['status' => OrderStatus::REFUNDED]);

                // 4. Revoke Enrollment
                $order->enrollment()->update([
                    'status' => EnrollmentStatus::REFUNDED,
                ]);
            });

            return back()->with('success', 'Order has been successfully refunded and access revoked.');
        } catch (\Exception $e) {
            return back()->with('error', 'Refund failed: '.$e->getMessage());
        }
    }
}
