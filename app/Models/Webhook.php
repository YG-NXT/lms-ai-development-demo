<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Webhook extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name', 'url', 'secret', 'events', 'is_active', 'timeout',
    ];

    protected $casts = [
        'events' => 'array',
        'is_active' => 'boolean',
        'timeout' => 'integer',
    ];

    public function deliveries(): HasMany
    {
        return $this->hasMany(WebhookDelivery::class);
    }
}
