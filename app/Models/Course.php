<?php

namespace App\Models;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use App\Enums\EnrollmentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends BaseModel
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
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
        'last_enrollment_date',
        'source',
        'source_id',
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

    protected function casts(): array
    {
        return [
            'level' => CourseLevel::class,
            'status' => CourseStatus::class,
            'price' => 'decimal:2',
            'discount_price' => 'decimal:2',
            'is_free' => 'boolean',
            'start_date' => 'date',
            'end_date' => 'date',
            'has_timeline' => 'boolean',
            'last_enrollment_date' => 'date',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('status', CourseStatus::PUBLISHED);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function instructors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_instructors')
            ->withPivot(['role', 'is_primary'])
            ->withTimestamps();
    }

    public function sections(): HasMany
    {
        return $this->hasMany(CourseSection::class)->orderBy('order');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function students(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'enrollments');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function liveClasses(): HasMany
    {
        return $this->hasMany(LiveClass::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    public function allLessons(): \Illuminate\Database\Eloquent\Relations\HasManyThrough
    {
        return $this->hasManyThrough(Lesson::class, CourseSection::class);
    }

    /**
     * Get the final payable price for the course.
     */
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

    /**
     * Get the discount amount for the course.
     */
    public function getDiscountAmountAttribute(): float
    {
        if ($this->is_free || ! $this->discount_price || $this->discount_price >= $this->price) {
            return 0.00;
        }

        return (float) ($this->price - $this->discount_price);
    }

    /**
     * Check if a user has met all prerequisites for this course.
     */
    public function checkPrerequisites(User $user): array
    {
        $prerequisites = $this->prerequisites;

        if ($prerequisites->isEmpty()) {
            return ['met' => true, 'unmet' => []];
        }

        $unmet = [];
        foreach ($prerequisites as $prerequisite) {
            $isCompleted = $user->enrollments()
                ->where('course_id', $prerequisite->id)
                ->where('status', EnrollmentStatus::COMPLETED)
                ->exists();

            if (! $isCompleted) {
                $unmet[] = $prerequisite->title;
            }
        }

        return ['met' => empty($unmet), 'unmet' => $unmet];
    }

    public function announcements(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Announcement::class);
    }

    public function prerequisites(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_prerequisites', 'course_id', 'prerequisite_course_id')
            ->withPivot('required')
            ->withTimestamps();
    }

    public function prerequisiteFor(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_prerequisites', 'prerequisite_course_id', 'course_id')
            ->withPivot('required')
            ->withTimestamps();
    }
}
