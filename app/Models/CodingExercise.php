<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CodingExercise extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'lesson_id', 'language', 'starter_code', 'test_cases',
        'constraints', 'time_limit_seconds', 'memory_limit_mb', 'enable_sandbox',
    ];

    protected $casts = [
        'test_cases' => 'array',
        'constraints' => 'array',
        'time_limit_seconds' => 'integer',
        'memory_limit_mb' => 'integer',
        'enable_sandbox' => 'boolean',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
