<?php

namespace App\Services\Payments\Providers;

use App\Models\Order;
use App\Services\Payments\PaymentProviderInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PayPalProvider implements PaymentProviderInterface
{
    protected string $clientId;

    protected string $secret;

    protected string $baseUrl;

    public function __construct()
    {
        $this->clientId = config('services.paypal.client_id');
        $this->secret = config('services.paypal.secret');
        $this->baseUrl = config('services.paypal.mode') === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';
    }

    protected function getAccessToken(): string
    {
        $response = Http::asForm()
            ->withBasicAuth($this->clientId, $this->secret)
            ->post("{$this->baseUrl}/v1/oauth2/token", [
                'grant_type' => 'client_credentials',
            ]);

        return $response->json()['access_token'];
    }

    public function pay(Order $order): string
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->post("{$this->baseUrl}/v2/checkout/orders", [
                'intent' => 'CAPTURE',
                'purchase_units' => [[
                    'reference_id' => (string) $order->id,
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => number_format($order->total_amount, 2, '.', ''),
                    ],
                    'description' => $order->course->title,
                ]],
                'application_context' => [
                    'return_url' => route('student.checkout.callback', [
                        'order_id' => $order->id,
                        'status' => 'success',
                    ]),
                    'cancel_url' => route('student.checkout.callback', [
                        'order_id' => $order->id,
                        'status' => 'cancel',
                    ]),
                ],
            ]);

        $links = $response->json()['links'];
        $approveLink = collect($links)->firstWhere('rel', 'approve');

        return $approveLink['href'];
    }

    public function verify(Request $request): bool
    {
        if ($request->status !== 'success' || ! $request->token) {
            return false;
        }

        return true; // We verify further in handleCallback by capturing
    }

    public function handleCallback(Request $request): array
    {
        $token = $this->getAccessToken();
        $paypalOrderId = $request->token;

        $response = Http::withToken($token)
            ->withHeaders(['Content-Type' => 'application/json'])
            ->send('POST', "{$this->baseUrl}/v2/checkout/orders/{$paypalOrderId}/capture");

        $data = $response->json();
        $status = strtoupper($data['status'] ?? '');

        if (! $response->successful() || ! in_array($status, ['COMPLETED', 'PENDING'])) {
            Log::error('PayPal Capture Failed', [
                'order_id' => $paypalOrderId,
                'status_code' => $response->status(),
                'response' => $data,
            ]);

            $message = $data['message'] ?? ($data['error_description'] ?? 'PayPal payment failed to capture.');
            throw new \Exception("PayPal payment failed: {$message}");
        }

        return [
            'status' => 'success',
            'paypal_status' => $status,
            'transaction_id' => $data['purchase_units'][0]['payments']['captures'][0]['id'] ?? $paypalOrderId,
            'gateway_response' => $data,
        ];
    }

    public function refund(Order $order, float $amount, ?string $reason = null): bool
    {
        $payment = $order->payments()->where('status', 'completed')->first();

        if (! $payment || ! $payment->transaction_id) {
            return false;
        }

        try {
            $token = $this->getAccessToken();
            $captureId = $payment->transaction_id;

            Http::withToken($token)
                ->post("{$this->baseUrl}/v2/payments/captures/{$captureId}/refund", [
                    'amount' => [
                        'value' => number_format($amount, 2, '.', ''),
                        'currency_code' => 'USD',
                    ],
                    'note_to_payer' => $reason ?? 'Refund processed by Admin',
                ]);

            return true;
        } catch (\Exception $e) {
            Log::error('PayPal Refund Failed: '.$e->getMessage());

            return false;
        }
    }
}
