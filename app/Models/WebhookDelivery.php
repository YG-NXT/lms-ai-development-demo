<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WebhookDelivery extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'webhook_id', 'event', 'payload', 'response_code',
        'response_body', 'success', 'delivered_at', 'attempts',
    ];

    protected $casts = [
        'payload' => 'array',
        'response_body' => 'array',
        'success' => 'boolean',
        'attempts' => 'integer',
    ];

    public function webhook(): BelongsTo
    {
        return $this->belongsTo(Webhook::class);
    }
}
