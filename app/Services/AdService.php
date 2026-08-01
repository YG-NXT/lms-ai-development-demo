<?php

namespace App\Services;

use App\Models\AdZone;
use App\Models\AdSetting;
use Illuminate\Support\Facades\Cache;

class AdService
{
    /**
     * Get active ad zones for a specific position and page type
     */
    public static function getAdsForPosition(string $position, string $pageType = 'all')
    {
        $cacheKey = "ads.{$position}.{$pageType}";
        
        return Cache::remember($cacheKey, 300, function () use ($position, $pageType) {
            // Check if ads are enabled globally
            $enableAds = AdSetting::getValue('enable_ads', true);
            
            if (!$enableAds) {
                return collect();
            }
            
            return AdZone::active()
                ->byPosition($position)
                ->byPageType($pageType)
                ->ordered()
                ->get();
        });
    }

    /**
     * Get header ads
     */
    public static function getHeaderAds(string $pageType = 'all')
    {
        return self::getAdsForPosition('header', $pageType);
    }

    /**
     * Get sidebar ads
     */
    public static function getSidebarAds(string $pageType = 'all')
    {
        return self::getAdsForPosition('sidebar', $pageType);
    }

    /**
     * Get footer ads
     */
    public static function getFooterAds(string $pageType = 'all')
    {
        return self::getAdsForPosition('footer', $pageType);
    }

    /**
     * Get content ads (inline with content)
     */
    public static function getContentAds(string $pageType = 'all')
    {
        return self::getAdsForPosition('content', $pageType);
    }

    /**
     * Get ads to display between courses
     */
    public static function getBetweenCoursesAds()
    {
        return self::getAdsForPosition('between_courses', 'courses');
    }

    /**
     * Get ads to display between tutorials
     */
    public static function getBetweenTutorialsAds()
    {
        return self::getAdsForPosition('between_tutorials', 'tutorials');
    }

    /**
     * Clear ad cache when settings change
     */
    public static function clearCache()
    {
        Cache::forget('ads.header.all');
        Cache::forget('ads.sidebar.all');
        Cache::forget('ads.footer.all');
        Cache::forget('ads.content.all');
        Cache::forget('ads.between_courses.courses');
        Cache::forget('ads.between_tutorials.tutorials');
    }

    /**
     * Check if GDPR consent is required
     */
    public static function requiresGdprConsent(): bool
    {
        return AdSetting::getValue('gdpr_compliance', false);
    }

    /**
     * Get publisher ID
     */
    public static function getPublisherId(): ?string
    {
        return AdSetting::getValue('publisher_id');
    }
}
