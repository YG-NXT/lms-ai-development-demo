<?php

namespace App\Models;

class LiveClassAttendance extends BaseModel
{
    protected $fillable = [
        'user_id',
        'live_class_id',
        'joined_at',
        'left_at',
        'status',
    ];

    protected $casts = [
        'joined_at' => 'datetime',
        'left_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function liveClass()
    {
        return $this->belongsTo(LiveClass::class);
    }
}
