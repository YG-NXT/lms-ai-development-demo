<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdImpression extends Model
{
    use HasFactory;

    protected $fillable = [
        'ad_zone_id',
        'user_id',
        'session_id',
        'page_url',
        'ip_address',
        'type',
        'revenue',
    ];

    protected $casts = [
        'revenue' => 'decimal:4',
    ];

    /**
     * Get the ad zone for this impression
     */
    public function adZone()
    {
        return $this->belongsTo(AdZone::class);
    }

    /**
     * Get the user who saw the ad
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to filter by type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter by date range
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }
}
