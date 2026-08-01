<?php

namespace App\Http\Controllers\Student;

use App\Enums\AnnouncementScope;
use App\Enums\AnnouncementStatus;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $announcements = Announcement::where('status', AnnouncementStatus::BROADCAST)
            ->where(function ($query) use ($user) {
                // Specifically targeted announcements for this user
                $query->whereHas('users', function ($q) use ($user) {
                    $q->where('users.id', $user->id);
                })
                // OR announcements with NO specific targets that match the user's scope
                    ->orWhere(function ($q) use ($user) {
                        $q->doesntHave('users')
                            ->where(function ($sq) use ($user) {
                                $sq->where('scope', AnnouncementScope::GLOBAL)
                                    ->orWhere(function ($csq) use ($user) {
                                        $csq->where('scope', AnnouncementScope::COURSE)
                                            ->whereIn('course_id', $user->enrollments()->pluck('course_id'));
                                    });
                            });
                    });
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    public function show(Announcement $announcement)
    {
        $user = Auth::user();

        // Verify the user has access to this announcement
        $hasAccess = $announcement->status === AnnouncementStatus::BROADCAST && (
            $announcement->scope === AnnouncementScope::GLOBAL ||
            ($announcement->scope === AnnouncementScope::COURSE && $user->enrollments()->where('course_id', $announcement->course_id)->exists()) ||
            $announcement->users()->where('users.id', $user->id)->exists()
        );

        if (! $hasAccess) {
            abort(403, 'You do not have access to this announcement.');
        }

        return Inertia::render('Student/Announcements/Show', [
            'announcement' => $announcement,
        ]);
    }

    public function markAsRead(Announcement $announcement)
    {
        $user = Auth::user();

        // Pivot check/update
        $user->announcements()->updateExistingPivot($announcement->id, [
            'viewed_at' => now(),
        ]);

        return back();
    }
}
