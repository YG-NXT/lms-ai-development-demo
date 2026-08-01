<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function __construct(protected UserService $userService) {}

    public function index(Request $request): \Inertia\Response
    {
        // Permission check
        // \Illuminate\Support\Facades\Gate::authorize('student_management');
        // Using string directly as constant might not be loaded in Gate definitions yet or handled via middleware/policy

        return Inertia::render('Admin/Students/Index', [
            'students' => $this->userService->getAll([
                'search' => $request->search,
                'type' => \App\Enums\UserType::CUSTOMER,
            ]),
            'courses' => Course::select('id', 'title')->get(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function updateStatus(Request $request, User $student): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:active,inactive,blocked',
        ]);

        $this->userService->updateStatus($student, $request->status);

        return back()->with('success', 'Student status updated successfully.');
    }

    public function destroy(User $student): \Illuminate\Http\RedirectResponse
    {
        // Ensure we are deleting a student
        if ($student->type !== \App\Enums\UserType::CUSTOMER) {
            return back()->with('error', 'Cannot delete non-student users from this section.');
        }

        $this->userService->delete($student);

        return back()->with('success', 'Student deleted successfully.');
    }

    public function assignCourse(Request $request, User $student): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $course = Course::findOrFail($request->course_id);

        if ($student->enrollments()->where('course_id', $course->id)->exists()) {
            return back()->with('info', 'Student is already enrolled in this course.');
        }

        \App\Models\Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => \App\Enums\EnrollmentStatus::ACTIVE, // Admin assigned = Active immediately
            'enrolled_at' => now(),
        ]);

        return back()->with('success', 'Course assigned successfully.');
    }

    public function enrollments(User $student): \Illuminate\Http\JsonResponse
    {
        // Simple manual progress calculation:
        // Since we don't have completed_lessons table yet, we'll return 0 or 100 based on status
        $enrollments = $student->enrollments()
            ->with('course:id,title')
            ->get()
            ->map(function ($enrollment) {
                return [
                    'id' => $enrollment->id,
                    'course_title' => $enrollment->course->title,
                    'enrolled_at' => $enrollment->enrolled_at?->format('Y-m-d') ?? $enrollment->created_at->format('Y-m-d'),
                    'status' => $enrollment->status,
                    'progress' => $enrollment->status === \App\Enums\EnrollmentStatus::COMPLETED ? 100 : 0,
                ];
            });

        return response()->json([
            'enrollments' => $enrollments,
        ]);
    }

    public function availableCourses(User $student): \Illuminate\Http\JsonResponse
    {
        $enrolledCourseIds = $student->enrollments()->pluck('course_id');

        $courses = Course::whereNotIn('id', $enrolledCourseIds)
            ->select('id', 'title')
            ->get();

        return response()->json([
            'courses' => $courses,
        ]);
    }
}
