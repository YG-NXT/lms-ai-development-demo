<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AnnouncementScope;
use App\Enums\AnnouncementStatus;
use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AnnouncementRequest;
use App\Models\Announcement;
use App\Models\Course;
use App\Models\User;
use App\Services\NotificationService;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function __construct(protected NotificationService $notificationService) {}

    public function index()
    {
        $announcements = Announcement::with('course:id,title')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Announcement/Listing', [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Announcement/Form', [
            'courses' => Course::select('id', 'title')->get(),
            'students' => User::where('type', UserType::CUSTOMER)->select('id', 'name', 'email')->get(),
            'announcement' => null,
        ]);
    }

    public function store(AnnouncementRequest $request)
    {
        $data = $request->validated();

        if ($data['status'] === AnnouncementStatus::BROADCAST->value) {
            $data['published_at'] = now();
        }

        $announcement = Announcement::create($data);

        if ($request->has('student_ids')) {
            $announcement->users()->sync($request->student_ids);
        }

        // Send notifications if announcement is broadcast
        if ($announcement->status === AnnouncementStatus::BROADCAST) {
            // Refresh to ensure relationships are loaded
            $announcement->refresh();
            $this->sendAnnouncementNotifications($announcement);
        }

        return redirect()->route('admin.announcements.index')->with('success', 'Announcement created successfully.');
    }

    public function show(Announcement $announcement)
    {
        $announcement->load(['course:id,title', 'users:id,name,email']);

        return Inertia::render('Admin/Announcement/Details', [
            'announcement' => $announcement,
        ]);
    }

    public function edit(Announcement $announcement)
    {
        $announcement->load('users:id');

        return Inertia::render('Admin/Announcement/Form', [
            'courses' => Course::select('id', 'title')->get(),
            'students' => User::where('type', UserType::CUSTOMER)->select('id', 'name', 'email')->get(),
            'announcement' => $announcement,
            'selected_student_ids' => $announcement->users->pluck('id'),
        ]);
    }

    public function update(AnnouncementRequest $request, Announcement $announcement)
    {
        $data = $request->validated();

        if ($data['status'] === AnnouncementStatus::BROADCAST->value && ! $announcement->published_at) {
            $data['published_at'] = now();
        }

        $announcement->update($data);

        if ($request->has('student_ids')) {
            $announcement->users()->sync($request->student_ids);
        }

        // Send notifications if status changed to broadcast
        $wasNotBroadcast = $announcement->getOriginal('status') !== AnnouncementStatus::BROADCAST->value;
        if ($announcement->status === AnnouncementStatus::BROADCAST && $wasNotBroadcast) {
            // Refresh to ensure relationships are loaded
            $announcement->refresh();
            $this->sendAnnouncementNotifications($announcement);
        }

        return redirect()->route('admin.announcements.index')->with('success', 'Announcement updated successfully.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return back()->with('success', 'Announcement deleted successfully.');
    }

    public function getStudentsByCourse(Course $course)
    {
        $students = $course->enrollments()
            ->with('user:id,name,email')
            ->get()
            ->pluck('user');

        return response()->json($students);
    }

    /**
     * Send notifications to targeted users for an announcement.
     */
    protected function sendAnnouncementNotifications(Announcement $announcement): void
    {
        $targetUserIds = [];

        // Determine target users based on scope
        if ($announcement->scope === AnnouncementScope::GLOBAL) {
            // If specific users are targeted, use them; otherwise all students
            if ($announcement->users()->count() > 0) {
                $targetUserIds = $announcement->users()->pluck('users.id')->toArray();
            } else {
                $targetUserIds = User::where('type', UserType::CUSTOMER)->pluck('id')->toArray();
            }
        } elseif ($announcement->scope === AnnouncementScope::COURSE && $announcement->course_id) {
            // Get enrolled students for the course
            $targetUserIds = User::whereHas('enrollments', function ($query) use ($announcement) {
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
