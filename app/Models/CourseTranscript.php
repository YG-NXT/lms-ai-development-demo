<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseTranscript extends BaseModel
{
    protected $fillable = [
        'lesson_id',
        'locale',
        'language_name',
        'content',
        'format',
        'file_path',
        'word_count',
        'is_auto_generated',
    ];

    protected $casts = [
        'is_auto_generated' => 'boolean',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
