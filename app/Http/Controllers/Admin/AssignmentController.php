<?php

namespace App\Http\Controllers\Admin;

use App\Enums\LessonType;
use App\Http\Controllers\Controller;
use App\Http\Requests\GradeAssignmentRequest;
use App\Models\Course;
use App\Models\LessonCompletion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    /**
     * Display a listing of courses with assignment statistics.
     */
    public function index(Request $request)
    {
        $query = Course::query()
            ->with(['category'])
            ->withCount('sections');

        // Add assignment-related counts
        $query->withCount([
            'allLessons as assignment_count' => function ($q) {
                $q->where('type', LessonType::ASSIGNMENT);
            },
        ]);

        // Add submission counts via subquery
        $query->addSelect([
            'total_submissions' => LessonCompletion::selectRaw('COUNT(*)')
                ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                ->join('course_sections', 'lessons.course_section_id', '=', 'course_sections.id')
                ->whereColumn('course_sections.course_id', 'courses.id')
                ->where('lessons.type', LessonType::ASSIGNMENT),
            'pending_submissions' => LessonCompletion::selectRaw('COUNT(*)')
                ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                ->join('course_sections', 'lessons.course_section_id', '=', 'course_sections.id')
                ->whereColumn('course_sections.course_id', 'courses.id')
                ->where('lessons.type', LessonType::ASSIGNMENT)
                ->where('lesson_completions.grading_status', 'pending'),
            'graded_submissions' => LessonCompletion::selectRaw('COUNT(*)')
                ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                ->join('course_sections', 'lessons.course_section_id', '=', 'course_sections.id')
                ->whereColumn('course_sections.course_id', 'courses.id')
                ->where('lessons.type', LessonType::ASSIGNMENT)
                ->where('lesson_completions.grading_status', 'graded'),
        ]);

        // Search filter
        if ($request->filled('search')) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }

        $courses = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Assignments/Index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Display course details with sections and assignment submissions.
     */
    public function show(Course $course)
    {
        $course->load([
            'sections' => function ($query) {
                $query->orderBy('order');
            },
            'sections.lessons' => function ($query) {
                $query->where('type', LessonType::ASSIGNMENT)
                    ->orderBy('order');
            },
            'sections.lessons.completions' => function ($query) {
                $query->with(['user'])
                    ->latest('updated_at');
            },
            'sections.lessons.completions.grader',
        ]);

        return Inertia::render('Admin/Assignments/Show', [
            'course' => $course,
        ]);
    }

    /**
     * Display the specified assignment submission for review.
     */
    public function review(LessonCompletion $assignment)
    {
        $assignment->load(['user', 'lesson.section.course', 'grader']);

        if ($assignment->lesson->type !== LessonType::ASSIGNMENT) {
            abort(404);
        }

        return Inertia::render('Admin/Assignments/Review', [
            'assignment' => $assignment,
            'courseId' => $assignment->lesson->section->course->id,
        ]);
    }

    /**
     * Update the grading for the assignment.
     */
    public function update(GradeAssignmentRequest $request, LessonCompletion $assignment)
    {
        // Ensure lesson is loaded for validation
        $assignment->load('lesson');

        $data = $request->validated();

        $assignment->update([
            'obtained_mark' => $data['obtained_mark'],
            'feedback' => $data['feedback'],
            'grading_status' => $data['status'],
            'graded_by' => Auth::id(),
            'graded_at' => now(),
        ]);

        return back()->with('success', 'Assignment graded successfully.');
    }
}
