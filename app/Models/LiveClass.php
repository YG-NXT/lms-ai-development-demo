<?php

namespace App\Models;

class LiveClass extends BaseModel
{
    protected $fillable = [
        'course_id',
        'title',
        'description',
        'type',
        'class_date',
        'start_time',
        'end_time',
        'provider',
        'meeting_url',
        'timezone',
        'reminder_minutes_before',
        'reminder_sent_at',
        'recording_url',
        'status', // Stored status (mainly for 'cancelled')
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'class_date' => 'date',
            'reminder_sent_at' => 'datetime',
        ];
    }

    protected $appends = ['start_at', 'end_at', 'status_label', 'is_live'];

    public function getStartAtAttribute()
    {
        $timezone = $this->timezone ?? config('app.timezone');
        // Determine date based on timezone (important for daily classes near midnight)
        $date = $this->type === 'daily'
            ? now($timezone)->format('Y-m-d')
            : ($this->class_date?->format('Y-m-d') ?? now($timezone)->format('Y-m-d'));

        return \Carbon\Carbon::parse($date.' '.$this->start_time, $timezone)->setTimezone(config('app.timezone'));
    }

    public function getEndAtAttribute()
    {
        $timezone = $this->timezone ?? config('app.timezone');
        $date = $this->type === 'daily'
            ? now($timezone)->format('Y-m-d')
            : ($this->class_date?->format('Y-m-d') ?? now($timezone)->format('Y-m-d'));

        return \Carbon\Carbon::parse($date.' '.$this->end_time, $timezone)->setTimezone(config('app.timezone'));
    }

    public function getStatusLabelAttribute()
    {
        // If manually cancelled, return cancelled
        if (($this->attributes['status'] ?? '') === 'cancelled') {
            return 'cancelled';
        }

        $now = now();
        $start = $this->start_at;
        $end = $this->end_at;

        if ($now->lt($start)) {
            return 'upcoming';
        }

        if ($now->between($start, $end)) {
            return 'live';
        }

        return 'finished';
    }

    public function getIsLiveAttribute(): bool
    {
        return $this->status_label === 'live';
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function attendances()
    {
        return $this->hasMany(LiveClassAttendance::class);
    }
}
