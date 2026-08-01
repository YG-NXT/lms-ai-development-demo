<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonCompletion extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lesson_id',
        'completed_at',
        'meta',
        'obtained_mark',
        'feedback',
        'graded_by',
        'graded_at',
        'grading_status',
        'is_edited',
        'edited_at',
    ];

    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
            'meta' => 'array',
            'obtained_mark' => 'decimal:2',
            'graded_at' => 'datetime',
            'is_edited' => 'boolean',
            'edited_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function grader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
