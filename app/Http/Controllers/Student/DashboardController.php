<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Services\GamificationService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(GamificationService $gamification)
    {
        $user = Auth::user();
        $enrollments = $user->enrollments()
            ->with([
                'course' => fn ($q) => $q->withCount('sections'),
                'course.category',
                'course.instructor',
            ])
            ->latest()
            ->get();

        $bookmarks = $user->bookmarks()
            ->with([
                'course' => fn ($q) => $q->withCount('sections'),
                'course.category',
                'course.instructor',
            ])
            ->latest()
            ->get();

        return Inertia::render('Student/Pages/Dashboard', [
            'enrollments' => $enrollments,
            'bookmarks' => $bookmarks,
            'totalXp' => $user->total_xp,
            'streakCount' => $user->streak_count,
            'userRank' => $gamification->getUserRank($user),
            'achievements' => $user->achievements()->with('badge')->latest()->get(),
        ]);
    }

    public function learningDashboard()
    {
        $user = Auth::user();
        $enrollments = $user->enrollments()
            ->with('course')
            ->get();

        $totalTimeSpent = 0;
        $lessonsCompleted = 0;
        $coursesEnrolled = $enrollments->count();

        foreach ($enrollments as $enrollment) {
            $timeSpent = $enrollment->lessonCompletions()
                ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                ->sum('lessons.duration_minutes');
            $totalTimeSpent += $timeSpent;
            $lessonsCompleted += $enrollment->lessonCompletions()->count();
        }

        $avgProgress = $coursesEnrolled > 0
            ? round($enrollments->sum('progress') / $coursesEnrolled, 1)
            : 0;

        return Inertia::render('Student/Pages/LearningDashboard', [
            'timeSpentHours' => round($totalTimeSpent / 60, 1),
            'lessonsCompleted' => $lessonsCompleted,
            'coursesEnrolled' => $coursesEnrolled,
            'avgProgress' => $avgProgress,
        ]);
    }
}
