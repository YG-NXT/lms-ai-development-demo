<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Tutorial extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'instructor_name',
        'title',
        'slug',
        'thumbnail',
        'duration',
        'description',
        'level',
        'language',
        'price',
        'discount_price',
        'is_free',
        'status',
        'meta_title',
        'meta_description',
        'start_date',
        'end_date',
        'has_timeline',
        'is_tutorial',
        'source',
        'source_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'is_free' => 'boolean',
        'has_timeline' => 'boolean',
        'is_tutorial' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (! $model->slug) {
                $model->slug = \Illuminate\Support\Str::slug($model->title);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title') && ! $model->isDirty('slug')) {
                $model->slug = \Illuminate\Support\Str::slug($model->title);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'published');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sections(): HasMany
    {
        return $this->hasMany(TutorialSection::class)->orderBy('order');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(TutorialEnrollment::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'tutorial_enrollments');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function liveClasses(): HasMany
    {
        return $this->hasMany(LiveClass::class);
    }

    public function allLessons(): HasManyThrough
    {
        return $this->hasManyThrough(TutorialLesson::class, TutorialSection::class);
    }

    public function getEffectivePriceAttribute(): float
    {
        if ($this->is_free) {
            return 0.00;
        }

        if ($this->discount_price && $this->discount_price < $this->price) {
            return (float) $this->discount_price;
        }

        return (float) $this->price;
    }

    public function getDiscountAmountAttribute(): float
    {
        if ($this->is_free || ! $this->discount_price || $this->discount_price >= $this->price) {
            return 0.00;
        }

        return (float) ($this->price - $this->discount_price);
    }
}
