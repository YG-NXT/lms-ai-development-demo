<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LearningReminder extends BaseModel
{
    protected $fillable = [
        'user_id',
        'course_id',
        'reminder_at',
        'type',
        'is_sent',
    ];

    protected $casts = [
        'reminder_at' => 'datetime',
        'is_sent' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
