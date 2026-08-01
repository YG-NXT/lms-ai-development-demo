<?php

namespace App\Services\Payments;

use App\Services\BusinessSettingService;
use App\Services\Payments\Providers\BkashProvider;
use App\Services\Payments\Providers\LocalProvider;
use App\Services\Payments\Providers\PayPalProvider;
use App\Services\Payments\Providers\StripeProvider;
use Illuminate\Support\Manager;

class PaymentManager extends Manager
{
    public function getDefaultDriver(): string
    {
        return config('services.payments.default', 'local');
    }

    public function createLocalDriver(): PaymentProviderInterface
    {
        return new LocalProvider;
    }

    public function createStripeDriver(): PaymentProviderInterface
    {
        return new StripeProvider;
    }

    public function createPaypalDriver(): PaymentProviderInterface
    {
        return new PayPalProvider;
    }

    public function createBkashDriver(): PaymentProviderInterface
    {
        return new BkashProvider(app(BusinessSettingService::class));
    }
}
