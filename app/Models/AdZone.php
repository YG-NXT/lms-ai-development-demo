<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdZone extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'zone_id',
        'position',
        'page_type',
        'ad_type',
        'width',
        'height',
        'is_active',
        'priority',
        'custom_code',
        'targeting_rules',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'targeting_rules' => 'array',
        'width' => 'integer',
        'height' => 'integer',
        'priority' => 'integer',
    ];

    /**
     * Get impressions for this ad zone
     */
    public function impressions()
    {
        return $this->hasMany(AdImpression::class);
    }

    /**
     * Get total impressions count
     */
    public function getTotalImpressionsAttribute()
    {
        return $this->impressions()->where('type', 'impression')->count();
    }

    /**
     * Get total clicks count
     */
    public function getTotalClicksAttribute()
    {
        return $this->impressions()->where('type', 'click')->count();
    }

    /**
     * Get click-through rate
     */
    public function getCtrAttribute()
    {
        $impressions = $this->total_impressions;
        if ($impressions === 0) {
            return 0;
        }
        return round(($this->total_clicks / $impressions) * 100, 2);
    }

    /**
     * Get total revenue
     */
    public function getTotalRevenueAttribute()
    {
        return $this->impressions()->sum('revenue');
    }

    /**
     * Scope to get active zones
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to filter by position
     */
    public function scopeByPosition($query, $position)
    {
        return $query->where('position', $position);
    }

    /**
     * Scope to filter by page type
     */
    public function scopeByPageType($query, $pageType)
    {
        return $query->where(function ($q) use ($pageType) {
            $q->where('page_type', 'all')
              ->orWhere('page_type', $pageType);
        });
    }

    /**
     * Scope to order by priority
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('priority', 'desc')->orderBy('created_at', 'asc');
    }

    /**
     * Get TheMoneytizer ad code
     */
    public function getAdCodeAttribute()
    {
        if ($this->custom_code) {
            return $this->custom_code;
        }

        // Default TheMoneytizer code structure
        $publisherId = AdSetting::getValue('publisher_id');
        
        if (!$publisherId || !$this->zone_id) {
            return '<!-- TheMoneytizer: Configuration missing -->';
        }

        return sprintf(
            '<div id="tmzone_%s"></div><script type="text/javascript">var tm_zone_id="%s";var tm_publisher_id="%s";(function(){var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://s.themoneytizer.com/tm.js";var x=document.getElementsByTagName("script")[0];x.parentNode.insertBefore(s,x);})();</script>',
            $this->zone_id,
            $this->zone_id,
            $publisherId
        );
    }
}
