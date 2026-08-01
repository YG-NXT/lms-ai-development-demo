<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendLiveClassReminders implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $now = now();

        \App\Models\LiveClass::query()
            ->where('status', 'upcoming')
            ->whereNotNull('reminder_minutes_before')
            ->whereNull('reminder_sent_at')
            ->each(function (\App\Models\LiveClass $liveClass) use ($now) {
                // Determine if we are within the reminder window
                $reminderTime = $liveClass->start_at->subMinutes($liveClass->reminder_minutes_before);

                // If currently after the reminder time but before the class starts
                if ($now->isAfter($reminderTime) && $now->isBefore($liveClass->start_at)) {
                    // Send to all enrolled users
                    $liveClass->course->students->each(function (\App\Models\User $user) use ($liveClass) {
                        \Illuminate\Support\Facades\Mail::to($user)->send(new \App\Mail\LiveClassReminder($liveClass, $user));
                    });

                    // Mark as sent
                    $liveClass->update(['reminder_sent_at' => now()]);
                }
            });
    }
}
