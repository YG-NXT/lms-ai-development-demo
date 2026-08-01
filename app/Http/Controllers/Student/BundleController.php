<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\CourseBundle;
use App\Models\Enrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class BundleController extends Controller
{
    public function index(): Response
    {
        $bundles = CourseBundle::where('is_active', true)
            ->withCount('courses')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Student/Pages/Bundles', [
            'bundles' => $bundles,
        ]);
    }

    public function show(CourseBundle $bundle): Response
    {
        $bundle->load(['courses' => fn ($q) => $q->withCount('sections')->with('category')->with('instructor')]);

        $user = Auth::user();
        $enrolledCount = $user->enrollments()
            ->whereIn('course_id', $bundle->courses->pluck('id'))
            ->where('status', Enrollment::STATUS_COMPLETED)
            ->count();

        return Inertia::render('Student/Pages/BundleShow', [
            'bundle' => $bundle,
            'enrolledCount' => $enrolledCount,
        ]);
    }

    public function enroll(CourseBundle $bundle): RedirectResponse
    {
        $user = Auth::user();
        $enrolled = 0;

        foreach ($bundle->courses as $course) {
            if (! $user->enrollments()->where('course_id', $course->id)->exists()) {
                $isFree = $course->price == 0 || $course->is_free;

                Enrollment::create([
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                    'status' => $isFree ? Enrollment::STATUS_ACTIVE : Enrollment::STATUS_PENDING,
                    'enrolled_at' => now(),
                ]);
                $enrolled++;
            }
        }

        return redirect()->route('student.bundles.show', $bundle->slug)
            ->with('success', "Enrolled in {$enrolled} course(s) in this bundle.");
    }
}
