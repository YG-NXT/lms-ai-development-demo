<?php

use App\Models\BusinessSetting;
use Illuminate\Support\Facades\Cache;

if (! function_exists('business_config')) {
    /**
     * Get the business setting value for the given key.
     *
     * @param  string  $key
     * @param  mixed  $default
     * @return mixed
     */
    function business_config($key, $default = null)
    {
        static $settings = null;

        if ($settings === null) {
            try {
                $settings = Cache::remember('business_settings_all', 60 * 24, function () {
                    return BusinessSetting::all()->pluck('value', 'key')->toArray();
                });
            } catch (\Exception $e) {
                $settings = [];
            }
        }

        return $settings[$key] ?? $default;
    }
}
