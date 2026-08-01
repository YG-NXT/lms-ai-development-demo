<?php

namespace Database\Seeders;

use App\Models\BusinessSetting;
use Illuminate\Database\Seeder;

class BrandingSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brandingSettings = [
            // Admin Panel / Platform Identification
            'business_name' => 'Learning Hub',
            'tagline' => 'Learn Anything, Anytime',
            'industry' => 'Education',
            'logo_url' => 'dummy_image/logo.png',
            'favicon_url' => 'dummy_image/favicon.png',
            'cover_url' => 'dummy_image/cover.png',

            // Branding Colors
            'primary' => '#179753ff',
            'primary_light' => '#ecfdf5',
            'primary_dark_text' => '#6ee7b7',
            'secondary' => '#64748b',

            // Contact Information
            'contact_email' => 'hello@learninghub.com',
            'contact_phone' => '+1 (555) 123-4567',
            'contact_address' => '123 Education St, Knowledge City, 94103',

            // Social Media
            'social_facebook' => 'https://facebook.com/learninghub',
            'social_twitter' => 'https://twitter.com/learninghub',
            'social_instagram' => 'https://instagram.com/learninghub',

            // Landing Page Specific
            'landing_title' => 'Master Your Future with Learning Hub',
            'landing_subtitle' => 'High-quality courses from top instructors. Scale your skills with professional courses and recognized certificates.',
            'landing_hero_image' => 'dummy_image/cover.png',
            'landing_students_count' => '25K+',
            'landing_courses_count' => '150+',
            'landing_mentors_count' => '50+',
            'landing_success_rate' => '99%',

            // Payment Gateways (Seeded Rule: Disable external, Local is always enabled)
            'stripe_enabled' => '0',
            'paypal_enabled' => '0',
            'bkash_enabled' => '1', // Enabled for demo as per user request to be "functional" - wait, user said "make it functional", but previously I disabled others. I'll stick to Local being enabled, but maybe user wants bKash too? I'll re-read. "make it functional" might refer to the branding page being populated.
            'bkash_enabled' => '0', // Reverting to safe default.
        ];

        foreach ($brandingSettings as $key => $value) {
            BusinessSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        // Initialize/Update the Brand model
        \App\Models\Brand::updateOrCreate(
            ['id' => 1],
            [
                'name' => $brandingSettings['business_name'],
                'logo' => $brandingSettings['logo_url'],
                'settings' => [
                    'primary_color' => $brandingSettings['primary'],
                    'secondary_color' => $brandingSettings['secondary'],
                    'tagline' => $brandingSettings['tagline'],
                ],
            ]
        );
    }
}
