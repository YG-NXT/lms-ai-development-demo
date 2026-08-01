<?php

namespace App\Models;

use App\Enums\LessonType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends BaseModel
{
    /** @use HasFactory<\Database\Factories\LessonFactory> */
    use HasFactory;

    protected $fillable = [
        'course_section_id',
        'title',
        'slug',
        'type',
        'content',
        'video_provider',
        'video_id',
        'video_url',
        'file_path',
        'duration',
        'is_preview',
        'order',
        'total_marks',
        'deadline',
        'release_date',
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
            'type' => LessonType::class,
            'is_preview' => 'boolean',
            'total_marks' => 'integer',
            'deadline' => 'datetime',
            'release_date' => 'datetime',
        ];
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'course_section_id');
    }

    public function completions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(LessonCompletion::class);
    }

    public function codingExercise(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(CodingExercise::class);
    }
}
