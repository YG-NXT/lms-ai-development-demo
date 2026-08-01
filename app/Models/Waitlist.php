<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Waitlist extends BaseModel
{
    protected $fillable = [
        'course_id',
        'user_id',
        'position',
        'notification_method',
        'notified',
    ];

    protected $casts = [
        'notified' => 'boolean',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
