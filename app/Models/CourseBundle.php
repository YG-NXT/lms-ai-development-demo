<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CourseBundle extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'thumbnail',
        'original_price', 'bundle_price', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'original_price' => 'decimal:2',
        'bundle_price' => 'decimal:2',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_bundle_courses')
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }
}
