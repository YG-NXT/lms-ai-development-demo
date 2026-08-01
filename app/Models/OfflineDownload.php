<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OfflineDownload extends BaseModel
{
    protected $fillable = [
        'enrollment_id',
        'lesson_id',
        'course_title',
        'lesson_title',
        'content_type',
        'file_path',
        'file_size',
        'download_token',
        'is_expired',
        'expires_at',
    ];

    protected $casts = [
        'is_expired' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
