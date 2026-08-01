<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseSection extends BaseModel
{
    /** @use HasFactory<\Database\Factories\CourseSectionFactory> */
    use HasFactory;

    protected $fillable = ['course_id', 'title', 'order', 'has_unlock_date', 'unlock_date'];

    protected function casts(): array
    {
        return [
            'has_unlock_date' => 'boolean',
            'unlock_date' => 'datetime',
        ];
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function isCompleted(\App\Models\User $user): bool
    {
        $lessonIds = $this->lessons()->pluck('id');
        $completedCount = $user->lessonCompletions()
            ->whereIn('lesson_id', $lessonIds)
            ->count();

        return $completedCount === $lessonIds->count();
    }
}
