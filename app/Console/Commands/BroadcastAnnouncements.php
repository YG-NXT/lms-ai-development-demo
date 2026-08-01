<?php

namespace App\Console\Commands;

use App\Http\Controllers\Admin\AnnouncementController;
use App\Services\NotificationService;
use Illuminate\Console\Command;

class BroadcastAnnouncements extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'announcements:broadcast';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Broadcast scheduled announcements';

    public function __construct(protected NotificationService $notificationService)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $announcements = \App\Models\Announcement::where('status', \App\Enums\AnnouncementStatus::SCHEDULED)
            ->where('scheduled_at', '<=', now())
            ->get();

        foreach ($announcements as $announcement) {
            $announcement->update([
                'status' => \App\Enums\AnnouncementStatus::BROADCAST,
                'published_at' => now(),
            ]);

            // Refresh to ensure relationships are loaded
            $announcement->refresh();

            // Send notifications using the same logic as the controller
            $this->sendAnnouncementNotifications($announcement);

            $this->info("Broadcasted: {$announcement->title}");
        }

        $this->info('Broadcast check completed.');
    }

    /**
     * Send notifications to targeted users for an announcement.
     * (Duplicated from AnnouncementController for console command use)
     */
    protected function sendAnnouncementNotifications(\App\Models\Announcement $announcement): void
    {
        $targetUserIds = [];

        // Determine target users based on scope
        if ($announcement->scope === \App\Enums\AnnouncementScope::GLOBAL) {
            // If specific users are targeted, use them; otherwise all students
            if ($announcement->users()->count() > 0) {
                $targetUserIds = $announcement->users()->pluck('users.id')->toArray();
            } else {
                $targetUserIds = \App\Models\User::where('type', \App\Enums\UserType::CUSTOMER)->pluck('id')->toArray();
            }
        } elseif ($announcement->scope === \App\Enums\AnnouncementScope::COURSE && $announcement->course_id) {
            // Get enrolled students for the course
            $targetUserIds = \App\Models\User::whereHas('enrollments', function ($query) use ($announcement) {
                $query->where('course_id', $announcement->course_id);
            })->pluck('id')->toArray();

            // If specific users are also targeted, intersect with enrolled students
            if ($announcement->users()->count() > 0) {
                $specificUserIds = $announcement->users()->pluck('users.id')->toArray();
                $targetUserIds = array_intersect($targetUserIds, $specificUserIds);
            }
        }

        // Create notifications for each target user
        foreach ($targetUserIds as $userId) {
            $this->notificationService->info(
                $userId,
                $announcement->title,
                substr($announcement->content, 0, 100).(strlen($announcement->content) > 100 ? '...' : ''),
                null,
                route('student.announcements.show', $announcement->id)
            );
        }
    }
}
