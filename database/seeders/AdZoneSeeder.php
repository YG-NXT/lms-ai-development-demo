<?php

namespace Database\Seeders;

use App\Models\AdSetting;
use App\Models\AdZone;
use Illuminate\Database\Seeder;

class AdZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default ad settings
        AdSetting::updateOrCreate(
            ['key' => 'publisher_id'],
            ['value' => ''] // Empty by default, admin needs to fill this
        );
        
        AdSetting::updateOrCreate(
            ['key' => 'enable_ads'],
            ['value' => true]
        );
        
        AdSetting::updateOrCreate(
            ['key' => 'gdpr_compliance'],
            ['value' => false]
        );

        // Create default ad zones
        $adZones = [
            [
                'name' => 'Homepage Header Banner',
                'zone_id' => 'home_header_001',
                'position' => 'header',
                'page_type' => 'home',
                'ad_type' => 'banner',
                'width' => 728,
                'height' => 90,
                'is_active' => true,
                'priority' => 10,
            ],
            [
                'name' => 'Courses Page Header',
                'zone_id' => 'courses_header_001',
                'position' => 'header',
                'page_type' => 'courses',
                'ad_type' => 'banner',
                'width' => 728,
                'height' => 90,
                'is_active' => true,
                'priority' => 10,
            ],
            [
                'name' => 'Between Courses Ad',
                'zone_id' => 'between_courses_001',
                'position' => 'between_courses',
                'page_type' => 'courses',
                'ad_type' => 'native',
                'width' => null,
                'height' => null,
                'is_active' => true,
                'priority' => 5,
            ],
            [
                'name' => 'Tutorials Page Header',
                'zone_id' => 'tutorials_header_001',
                'position' => 'header',
                'page_type' => 'tutorials',
                'ad_type' => 'banner',
                'width' => 728,
                'height' => 90,
                'is_active' => true,
                'priority' => 10,
            ],
            [
                'name' => 'Course Detail Sidebar',
                'zone_id' => 'course_detail_sidebar_001',
                'position' => 'sidebar',
                'page_type' => 'course_detail',
                'ad_type' => 'banner',
                'width' => 300,
                'height' => 250,
                'is_active' => true,
                'priority' => 8,
            ],
            [
                'name' => 'Footer Banner (All Pages)',
                'zone_id' => 'footer_all_001',
                'position' => 'footer',
                'page_type' => 'all',
                'ad_type' => 'banner',
                'width' => 970,
                'height' => 90,
                'is_active' => true,
                'priority' => 3,
            ],
        ];

        foreach ($adZones as $zone) {
            AdZone::updateOrCreate(
                ['zone_id' => $zone['zone_id']],
                $zone
            );
        }

        $this->command->info('Ad zones and settings seeded successfully!');
    }
}
