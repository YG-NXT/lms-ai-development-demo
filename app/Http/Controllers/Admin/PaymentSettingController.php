<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\BusinessSettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentSettingController extends Controller
{
    public function __construct(protected BusinessSettingService $settingService) {}

    /**
     * Display the payment settings page.
     */
    public function index(): Response
    {
        $keys = [
            'stripe_enabled', 'stripe_key', 'stripe_secret', 'stripe_mode',
            'paypal_enabled', 'paypal_client_id', 'paypal_secret', 'paypal_mode',
            'bkash_enabled', 'bkash_app_key', 'bkash_app_secret', 'bkash_username', 'bkash_password', 'bkash_mode',
        ];

        return Inertia::render('Admin/LMS/Payment/Settings', [
            'settings' => $this->settingService->getSettings($keys),
        ]);
    }

    /**
     * Update the payment settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'stripe_enabled' => 'nullable|boolean',
            'stripe_key' => 'nullable|string',
            'stripe_secret' => 'nullable|string',
            'stripe_mode' => 'nullable|string|in:sandbox,live',
            'paypal_enabled' => 'nullable|boolean',
            'paypal_client_id' => 'nullable|string',
            'paypal_secret' => 'nullable|string',
            'paypal_mode' => 'nullable|string|in:sandbox,live',
            'bkash_enabled' => 'nullable|boolean',
            'bkash_app_key' => 'nullable|string',
            'bkash_app_secret' => 'nullable|string',
            'bkash_username' => 'nullable|string',
            'bkash_password' => 'nullable|string',
            'bkash_mode' => 'nullable|string|in:sandbox,live',
        ]);

        // Ensure booleans are handled correctly if sent as strings (though validation handles most)
        foreach (['stripe_enabled', 'paypal_enabled', 'bkash_enabled'] as $boolKey) {
            $data[$boolKey] = filter_var($data[$boolKey] ?? false, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
        }

        $this->settingService->updateSettings($data);

        return back()->with('success', 'Payment settings updated successfully.');
    }
}
