<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class CoursePerformanceController extends Controller
{
    public function index()
    {
        // Fetch courses for the selection dropdown
        $courses = \App\Models\Course::query()
            ->select('id', 'title as name')
            ->orderBy('title')
            ->get();

        $selectedCourse = null;
        $students = null;

        if ($courseId = request('course_id')) {
            $selectedCourse = \App\Models\Course::with('category')->find($courseId);

            if ($selectedCourse) {
                $sortColumn = request('sort', 'joined_at');
                $direction = request('direction', 'desc');

                $query = $selectedCourse->students()
                    ->select('users.*')
                    ->with(['enrollments' => function ($q) use ($selectedCourse) {
                        $q->where('course_id', $selectedCourse->id);
                    }]);

                // Subqueries for calculated fields
                $query->withCount([
                    'lessonCompletions as quiz_count' => function ($q) use ($selectedCourse) {
                        $q->whereHas('lesson', function ($l) use ($selectedCourse) {
                            $l->where('type', \App\Enums\LessonType::QUIZ)
                                ->whereHas('section', fn ($s) => $s->where('course_id', $selectedCourse->id));
                        });
                    },
                    'lessonCompletions as assignment_count' => function ($q) use ($selectedCourse) {
                        $q->whereHas('lesson', function ($l) use ($selectedCourse) {
                            $l->where('type', \App\Enums\LessonType::ASSIGNMENT)
                                ->whereHas('section', fn ($s) => $s->where('course_id', $selectedCourse->id));
                        });
                    },
                ]);

                // Calculate Quiz Score (Sum of meta->score)
                $query->addSelect([
                    'quiz_score' => \App\Models\LessonCompletion::selectRaw("COALESCE(SUM(JSON_UNQUOTE(JSON_EXTRACT(meta, '$.score'))), 0)")
                        ->whereColumn('user_id', 'users.id')
                        ->whereHas('lesson', function ($l) use ($selectedCourse) {
                            $l->where('type', \App\Enums\LessonType::QUIZ)
                                ->whereHas('section', fn ($s) => $s->where('course_id', $selectedCourse->id));
                        }),
                ]);

                // Calculate Assignment Obtained Mark
                $query->addSelect([
                    'assignment_obtained' => \App\Models\LessonCompletion::selectRaw('COALESCE(SUM(obtained_mark), 0)')
                        ->whereColumn('user_id', 'users.id')
                        ->whereHas('lesson', function ($l) use ($selectedCourse) {
                            $l->where('type', \App\Enums\LessonType::ASSIGNMENT)
                                ->whereHas('section', fn ($s) => $s->where('course_id', $selectedCourse->id));
                        }),
                ]);

                // Calculate Assignment Total Mark
                $query->addSelect([
                    'assignment_total' => \App\Models\LessonCompletion::selectRaw('COALESCE(SUM(lessons.total_marks), 0)')
                        ->join('lessons', 'lessons.id', '=', 'lesson_completions.lesson_id')
                        ->whereColumn('lesson_completions.user_id', 'users.id')
                        ->where('lessons.type', \App\Enums\LessonType::ASSIGNMENT)
                        ->whereHas('lesson.section', fn ($s) => $s->where('course_id', $selectedCourse->id)),
                ]);

                // Apply Sorting
                if ($sortColumn === 'name') {
                    $query->orderBy('users.name', $direction);
                } elseif ($sortColumn === 'joined_at') {
                    $query->orderByPivot('created_at', $direction);
                } elseif (in_array($sortColumn, ['quiz_score', 'quiz_count', 'assignment_obtained', 'assignment_total', 'assignment_count'])) {
                    $query->orderBy($sortColumn, $direction);
                } else {
                    $query->orderByPivot('created_at', 'desc'); // Default
                }

                $students = $query->paginate(20)
                    ->withQueryString()
                    ->through(function ($student) {
                        return [
                            'id' => $student->id,
                            'name' => $student->name,
                            'email' => $student->email,
                            'avatar' => $student->avatar,
                            'joined_at' => $student->enrollments->first()?->created_at,
                            'quiz_score' => $student->quiz_score ?? 0,
                            'quiz_count' => $student->quiz_count ?? 0,
                            'assignment_obtained' => $student->assignment_obtained ?? 0,
                            'assignment_total' => $student->assignment_total ?? 0,
                            // Use raw query result or relation count? Raw query result is safer for sorting
                            'assignment_count' => $student->assignment_count ?? 0,
                        ];
                    });
            }
        }

        return inertia('Admin/LMS/Performance/Index', [
            'courses' => $courses,
            'course' => $selectedCourse,
            'students' => $students,
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort', 'joined_at'),
                'direction' => request('direction', 'desc'),
            ],
        ]);
    }
}
