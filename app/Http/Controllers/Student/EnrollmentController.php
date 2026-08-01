<?php

namespace App\Http\Controllers\Student;

use App\Enums\EnrollmentStatus;
use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function __construct(protected NotificationService $notificationService) {}

    /**
     * Store a newly created enrollment in storage.
     */
    public function store(Course $course): RedirectResponse
    {
        $user = Auth::user();

        // Check if already enrolled
        if ($user->enrollments()->where('course_id', $course->id)->exists()) {
            return redirect()->route('student.courses.index')
                ->with('info', 'You are already enrolled in this course.');
        }

        // Check prerequisites
        $prerequisiteCheck = $course->checkPrerequisites($user);
        if (! $prerequisiteCheck['met']) {
            return redirect()->route('student.courses.show', $course->slug)
                ->with('error', 'You must complete the following prerequisite courses first: '.implode(', ', $prerequisiteCheck['unmet']));
        }

        $isFree = $course->price == 0 || $course->is_free;

        if ($isFree) {
            $enrollment = Enrollment::create([
                'user_id' => $user->id,
                'course_id' => $course->id,
                'status' => EnrollmentStatus::ACTIVE,
                'enrolled_at' => now(),
            ]);

            // Notify all admins about new enrollment
            $this->notifyAdminsAboutEnrollment($enrollment, $course, $user);

            return redirect()->route('student.courses.show', $course->slug)
                ->with('success', 'Successfully enrolled in '.$course->title);
        }

        // For paid courses, redirect to checkout
        return redirect()->route('student.checkout.show', $course->slug);
    }

    /**
     * Notify all admins about new enrollment.
     */
    protected function notifyAdminsAboutEnrollment(Enrollment $enrollment, Course $course, User $student): void
    {
        // Get all admin and super admin users
        $adminUsers = User::whereIn('type', [UserType::ADMIN, UserType::SUPER_ADMIN])->get();

        foreach ($adminUsers as $admin) {
            $this->notificationService->info(
                $admin->id,
                'New Enrollment',
                "<strong>{$student->name}</strong> has enrolled in <em>{$course->title}</em>",
                null,
                route('admin.enrollments.index')
            );
        }
    }
}
