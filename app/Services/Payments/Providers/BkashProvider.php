<?php

namespace App\Services\Payments\Providers;

use App\Models\Order;
use App\Services\BusinessSettingService;
use App\Services\Payments\PaymentProviderInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BkashProvider implements PaymentProviderInterface
{
    protected array $config;

    public function __construct(protected BusinessSettingService $settingService)
    {
        $this->config = $this->settingService->getSettings([
            'bkash_app_key', 'bkash_app_secret', 'bkash_username', 'bkash_password', 'bkash_mode',
        ])->toArray();
    }

    protected function getBaseUrl(): string
    {
        return ($this->config['bkash_mode'] ?? 'sandbox') === 'live'
            ? 'https://tokenized.pay.bka.sh/v1.2.0-beta'
            : 'https://tokenized.sandbox.bka.sh/v1.2.0-beta';
    }

    protected function getToken()
    {
        $cacheKey = 'bkash_token_'.$this->config['bkash_app_key'];
        if (cache()->has($cacheKey)) {
            return cache()->get($cacheKey);
        }

        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Content-Type' => 'application/json',
            'username' => $this->config['bkash_username'],
            'password' => $this->config['bkash_password'],
        ])->post($this->getBaseUrl().'/tokenized/checkout/token/grant', [
            'app_key' => $this->config['bkash_app_key'],
            'app_secret' => $this->config['bkash_app_secret'],
        ]);

        if ($response->successful() && isset($response['id_token'])) {
            cache()->put($cacheKey, $response['id_token'], $response['expires_in'] ?? 3600);

            return $response['id_token'];
        }

        Log::error('bKash Token Error: '.$response->body());
        throw new \Exception('Failed to get bKash token');
    }

    public function pay(Order $order): string
    {
        $token = $this->getToken();

        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => $token,
            'X-APP-Key' => $this->config['bkash_app_key'],
        ])->post($this->getBaseUrl().'/tokenized/checkout/create', [
            'mode' => '0011',
            'payerReference' => $order->order_number,
            'callbackURL' => route('student.checkout.callback', ['order_id' => $order->id]),
            'amount' => number_format($order->total_amount, 2, '.', ''),
            'currency' => 'BDT',
            'intent' => 'sale',
            'merchantInvoiceNumber' => $order->order_number,
        ]);

        if ($response->successful() && isset($response['bkashURL'])) {
            return $response['bkashURL'];
        }

        Log::error('bKash Create Payment Error: '.$response->body());
        throw new \Exception('Failed to create bKash payment');
    }

    protected $executionResponse;

    public function verify(Request $request): bool
    {
        if ($request->status !== 'success' && $request->status !== 'Completed') {
            return false;
        }

        if (! $request->paymentID) {
            return false;
        }

        $token = $this->getToken();

        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => $token,
            'X-APP-Key' => $this->config['bkash_app_key'],
        ])->post($this->getBaseUrl().'/tokenized/checkout/execute', [
            'paymentID' => $request->paymentID,
        ]);

        if ($response->successful() && ($response['transactionStatus'] ?? '') === 'Completed') {
            $this->executionResponse = $response->json();

            return true;
        }

        Log::error('bKash Execute Payment Error: '.$response->body());

        return false;
    }

    public function handleCallback(Request $request): array
    {
        return [
            'status' => 'success',
            'transaction_id' => $this->executionResponse['trxID'] ?? $request->paymentID,
            'gateway_response' => $this->executionResponse ?? $request->all(),
        ];
    }

    public function refund(Order $order, float $amount, ?string $reason = null): bool
    {
        $payment = $order->payments()->where('status', 'completed')->first();

        if (! $payment || ! $payment->transaction_id || ! isset($payment->gateway_response['paymentID'])) {
            return false;
        }

        $token = $this->getToken();

        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => $token,
            'X-APP-Key' => $this->config['bkash_app_key'],
        ])->post($this->getBaseUrl().'/tokenized/checkout/payment/refund', [
            'paymentID' => $payment->gateway_response['paymentID'],
            'amount' => number_format($amount, 2, '.', ''),
            'trxID' => $payment->transaction_id,
            'sku' => $reason ?? 'refund',
            'reason' => $reason ?? 'Customer Request',
        ]);

        if ($response->successful() && ($response['transactionStatus'] ?? '') === 'Completed') {
            Log::info("bKash refund successful for trxID: {$payment->transaction_id}");

            return true;
        }

        Log::error('bKash Refund Error: '.$response->body());

        return false;
    }
}
