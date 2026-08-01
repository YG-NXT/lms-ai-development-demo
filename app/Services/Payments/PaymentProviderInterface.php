<?php

namespace App\Services\Payments;

use App\Models\Order;
use Illuminate\Http\Request;

interface PaymentProviderInterface
{
    /**
     * Initiate the payment process.
     * Returns a response that can be handled by the frontend (e.g., redirect URL, client secret).
     */
    public function pay(Order $order): mixed;

    /**
     * Verify the payment status (e.g., handling webhooks or callback parameters).
     */
    public function verify(Request $request): bool;

    /**
     * Handle the callback/webhook from the payment gateway.
     */
    public function handleCallback(Request $request): mixed;

    /**
     * Process a refund for an order.
     */
    public function refund(Order $order, float $amount, ?string $reason = null): bool;
}
