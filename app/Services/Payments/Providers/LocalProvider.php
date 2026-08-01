<?php

namespace App\Services\Payments\Providers;

use App\Models\Order;
use App\Services\Payments\PaymentProviderInterface;
use Illuminate\Http\Request;

class LocalProvider implements PaymentProviderInterface
{
    public function pay(Order $order): mixed
    {
        // For local/mock, we just redirect back with a success flag or to a mock success page
        return route('student.checkout.callback', [
            'order_id' => $order->id,
            'status' => 'success',
            'transaction_id' => 'mock_'.uniqid(),
        ]);
    }

    public function verify(Request $request): bool
    {
        return $request->status === 'success';
    }

    public function handleCallback(Request $request): mixed
    {
        return [
            'status' => 'success',
            'transaction_id' => $request->transaction_id,
        ];
    }

    public function refund(Order $order, float $amount, ?string $reason = null): bool
    {
        return true;
    }
}
