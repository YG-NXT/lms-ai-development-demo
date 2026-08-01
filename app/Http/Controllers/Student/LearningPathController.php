<?php

namespace App\Http\Controllers\Student;

use App\Enums\EnrollmentStatus;
use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\LearningPath;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class LearningPathController extends Controller
{
    public function index(): Response
    {
        $paths = LearningPath::where('is_active', true)
            ->withCount('courses')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Student/Pages/LearningPaths', [
            'paths' => $paths,
        ]);
    }

    public function show(LearningPath $path): Response
    {
        $path->load(['courses' => fn ($q) => $q->withCount('sections')->with('category')->with('instructor')]);

        $user = Auth::user();
        $isEnrolled = $user->enrollments()
            ->whereIn('course_id', $path->courses->pluck('id'))
            ->exists();

        $completedCourses = $user->enrollments()
            ->whereIn('course_id', $path->courses->pluck('id'))
            ->where('status', EnrollmentStatus::COMPLETED->value)
            ->count();

        $totalCourses = $path->courses->count();

        return Inertia::render('Student/Pages/LearningPathShow', [
            'path' => $path,
            'isEnrolled' => $isEnrolled,
            'completedCourses' => $completedCourses,
            'totalCourses' => $totalCourses,
        ]);
    }

    public function enroll(LearningPath $path): RedirectResponse
    {
        $user = Auth::user();

        foreach ($path->courses as $course) {
            if (! $user->enrollments()->where('course_id', $course->id)->exists()) {
                $isFree = $course->price == 0 || $course->is_free;

                Enrollment::create([
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                    'status' => $isFree ? EnrollmentStatus::ACTIVE->value : EnrollmentStatus::PENDING->value,
                    'enrolled_at' => now(),
                ]);
            }
        }

        return redirect()->route('student.learning-paths.show', $path->slug)
            ->with('success', __('You have been enrolled in all courses in this learning path.'));
    }
}
