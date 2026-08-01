<?php

namespace App\Services\Payments;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;

/**
 * @method static mixed pay(Order $order)
 * @method static bool verify(Request $request, Order $order)
 * @method static mixed handleCallback(Request $request)
 * @method static bool refund(Order $order, float $amount, ?string $reason = null)
 * @method static array getActiveMethods()
 */
class PaymentService extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'payment';
    }
}
