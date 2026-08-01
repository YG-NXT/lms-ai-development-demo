<?php

namespace App\Models;

use App\Enums\EnrollmentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends BaseModel
{
    /** @use HasFactory<\Database\Factories\EnrollmentFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'course_id', 'order_id', 'status', 'enrolled_at', 'completed_at'];

    protected $appends = ['progress_percentage'];

    protected function casts(): array
    {
        return [
            'status' => EnrollmentStatus::class,
            'enrolled_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function getProgressPercentageAttribute(): int
    {
        $totalLessons = $this->course->allLessons()->count();

        if ($totalLessons === 0) {
            return 0;
        }

        $completedLessons = LessonCompletion::where('user_id', $this->user_id)
            ->whereIn('lesson_id', $this->course->allLessons()->pluck('lessons.id'))
            ->count();

        return round(($completedLessons / $totalLessons) * 100);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
