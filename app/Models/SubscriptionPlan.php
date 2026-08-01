<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubscriptionPlan extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'monthly_price', 'yearly_price',
        'max_courses', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'monthly_price' => 'decimal:2',
        'yearly_price' => 'decimal:2',
        'max_courses' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
