<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CoInstructorController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Course::query()->withCount('instructors')->latest();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhereHas('instructor', function ($q) use ($request) {
                        $q->where('name', 'like', "%{$request->search}%");
                    })
                    ->orWhereHas('instructors', function ($q) use ($request) {
                        $q->where('name', 'like', "%{$request->search}%");
                    });
            });
        }

        $courses = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/LMS/CoInstructor/Index', [
            'courses' => $courses,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(Course $course): Response
    {
        $course->load(['instructor', 'instructors', 'category']);

        $availableInstructors = User::where('type', '!=', UserType::SUPER_ADMIN)
            ->whereNotIn('id', $course->instructors->pluck('id')->push($course->user_id))
            ->get(['id', 'name', 'email']);

        return Inertia::render('Admin/LMS/CoInstructor/Show', [
            'course' => $course,
            'availableInstructors' => $availableInstructors,
        ]);
    }

    public function attach(Request $request, Course $course): RedirectResponse
    {
        $request->validate([
            'instructor_id' => 'required|exists:users,id',
            'role' => 'nullable|string|max:255',
        ]);

        $course->instructors()->syncWithoutDetaching([
            $request->instructor_id => [
                'role' => $request->role ?? 'instructor',
                'is_primary' => false,
            ],
        ]);

        return back()->with('success', 'Co-instructor added successfully.');
    }

    public function detach(Request $request, Course $course, User $instructor): RedirectResponse
    {
        $course->instructors()->detach($instructor->id);

        return back()->with('success', 'Co-instructor removed successfully.');
    }
}
