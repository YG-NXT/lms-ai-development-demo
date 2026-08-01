<?php

namespace App\Http\Controllers\Student;

use App\Enums\LessonType;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Services\GamificationService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(protected GamificationService $gamification) {}

    /**
     * Display the specified course (Course Player).
     */
    public function show(Course $course): Response|\Illuminate\Http\RedirectResponse
    {
        $user = Auth::user();
        $enrollment = $user->enrollments()
            ->where('course_id', $course->id)
            ->whereIn('status', [
                \App\Enums\EnrollmentStatus::ACTIVE,
                \App\Enums\EnrollmentStatus::COMPLETED,
            ])
            ->first();

        if (! $enrollment) {
            return to_route('courses.show', $course->slug)->with('error', 'You must have an enrollment to access this course.');
        }

        // Manually load certificate
        $certificate = $user->certificates()->where('course_id', $course->id)->first();
        if ($certificate) {
            $enrollment->setRelation('certificate', $certificate);
        }

        $course->load(['category', 'instructor', 'sections.lessons', 'liveClasses']);

        // Filter live classes to show only upcoming and live for students
        $course->setRelation('liveClasses', $course->liveClasses->filter(function ($liveClass) {
            return in_array($liveClass->status_label, ['upcoming', 'live']);
        })->values());

        // Progress Tracking
        $completions = $user->lessonCompletions()
            ->whereIn('lesson_id', $course->allLessons()->pluck('lessons.id'))
            ->get();

        $completedLessonIds = $completions->pluck('lesson_id')->toArray();

        $totalLessons = $course->allLessons()->count();
        $progress = $totalLessons > 0 ? round((count($completedLessonIds) / $totalLessons) * 100) : 0;

        // Check if entire course is timeline-locked
        $isCourseTimelineLocked = $course->has_timeline && $course->start_date && now()->lt($course->start_date);
        $courseUnlockDate = $isCourseTimelineLocked ? $course->start_date->format('M d, Y') : null;

        // Process sections for locking
        $previousSectionCompleted = true;
        $isSubsequentSectionLocked = false;

        foreach ($course->sections as $section) {
            $sectionDateLocked = $section->has_unlock_date && $section->unlock_date && now()->lt($section->unlock_date);

            // Section is locked if:
            // 1. Entire course is timeline-locked
            // 2. Previous section wasn't completed
            // 3. Section has a future unlock date
            // 4. A previous section was already locked (cascade)
            $section->is_locked = $isCourseTimelineLocked || ! $previousSectionCompleted || $sectionDateLocked || $isSubsequentSectionLocked;
            $section->is_completed = $section->isCompleted($user);

            // Determine lock reason
            $section->lock_reason = null;
            if ($section->is_locked) {
                if ($isCourseTimelineLocked) {
                    $section->lock_reason = "Course will unlock on {$courseUnlockDate}";
                } elseif ($sectionDateLocked) {
                    $section->lock_reason = 'Section unlocks on '.$section->unlock_date->format('M d, Y');
                } elseif (! $previousSectionCompleted || $isSubsequentSectionLocked) {
                    $section->lock_reason = 'Please complete the previous section to unlock this content';
                }
            }

            foreach ($section->lessons as $lesson) {
                // Attach completion data to lesson directly for easier access
                $lesson->completion = $completions->where('lesson_id', $lesson->id)->first();

                // If section is locked, hide content
                if ($section->is_locked) {
                    $lesson->content = null;
                    $lesson->video_url = null;
                    $lesson->is_locked = true;
                } else {
                    $lesson->is_locked = false;
                }

                // Check if lesson has a future release date (drip scheduling)
                if (! $lesson->is_locked && $lesson->release_date && now()->lt($lesson->release_date)) {
                    $lesson->is_locked = true;
                }
                $lesson->is_completed = in_array($lesson->id, $completedLessonIds);
            }

            // Update for next iteration: if THIS section is locked, all FOLLOWING are also locked
            if ($section->is_locked) {
                $isSubsequentSectionLocked = true;
            }
            $previousSectionCompleted = $section->is_completed;
        }

        // Resume Logic: Find first incomplete lesson in an UNLOCKED section
        $resumeLessonId = null;
        foreach ($course->sections as $section) {
            if ($section->is_locked) {
                continue;
            }

            foreach ($section->lessons as $lesson) {
                if (! in_array($lesson->id, $completedLessonIds)) {
                    $resumeLessonId = $lesson->id;
                    break 2;
                }
            }
        }

        // If all completed, default to first lesson (if not course-locked)
        if (! $resumeLessonId && $totalLessons > 0 && ! $isCourseTimelineLocked) {
            $resumeLessonId = $course->sections->first()?->lessons->first()?->id;
        }

        // Check if course has ended
        $isCourseEnded = $course->end_date && now()->gt($course->end_date);

        return Inertia::render('Student/CoursePlayer', [
            'course' => $course,
            'enrollment' => $enrollment,
            'completed_lesson_ids' => $completedLessonIds,
            'progress_percentage' => $progress,
            'resume_lesson_id' => $resumeLessonId,
            'is_course_ended' => $isCourseEnded,
            'is_course_locked' => $isCourseTimelineLocked,
            'course_unlock_date' => $courseUnlockDate,
        ]);
    }

    /**
     * Mark a lesson as complete for the authenticated user.
     */
    public function markLessonAsComplete(\Illuminate\Http\Request $request, Course $course, \App\Models\Lesson $lesson): \Illuminate\Http\RedirectResponse
    {
        $user = Auth::user();

        // Ensure student is enrolled
        if (! $user->enrolledCourses()->where('courses.id', $course->id)->exists()) {
            abort(403);
        }

        // Verify lesson belongs to the course
        if ($lesson->section->course_id !== $course->id) {
            abort(404);
        }

        // Check if course has ended
        if ($course->end_date && now()->gt($course->end_date)) {
            return back()->with('error', 'Course has ended. You cannot submit assignments or take quizzes anymore.');
        }

        // Check if lesson has been released yet (drip scheduling)
        if ($lesson->release_date && now()->lt($lesson->release_date)) {
            return back()->with('error', 'This lesson is not yet available. It will be released on '.$lesson->release_date->format('F j, Y').'.');
        }

        // Check if lesson deadline has passed
        if ($lesson->deadline && now()->gt($lesson->deadline)) {
            return back()->with('error', 'The deadline for this assignment has passed. New submissions are no longer accepted.');
        }

        $data = $request->validate([
            'submission_text' => 'nullable|string',
            'file' => 'nullable|file|max:10240', // 10MB max
            'score' => 'nullable|numeric',
            'total_questions' => 'nullable|numeric',
            'answers' => 'nullable|array',
        ]);

        $meta = [];

        if ($lesson->type === LessonType::QUIZ || $lesson->type === 'QUIZ' || (is_object($lesson->type) && $lesson->type->value === 'QUIZ')) {
            \Illuminate\Support\Facades\Log::info('Entering Server-Side Scoring', ['lesson_id' => $lesson->id]);

            $quizContent = json_decode($lesson->content, true);
            $questions = $quizContent['questions'] ?? [];
            $submittedAnswers = $data['answers'] ?? [];

            \Illuminate\Support\Facades\Log::info('Quiz Data', [
                'questions_count' => count($questions),
                'first_question' => $questions[0] ?? null,
                'submitted_answers' => $submittedAnswers,
            ]);

            $totalQuestions = count($questions);
            $correctCount = 0;
            $detailedResults = [];

            foreach ($questions as $index => $question) {
                // Use question ID if available, otherwise fallback to index (for Admin created quizzes)
                $qId = $question['id'] ?? $index;
                // Submitted answer might be keyed by question ID
                $submittedOptionId = $submittedAnswers[$qId] ?? null;

                $isCorrect = false;
                $logData = ['q_index' => $index, 'q_id' => $qId, 'submitted' => $submittedOptionId];

                // Check for 'correct_answer' index (Admin structure)
                if (isset($question['correct_answer'])) {
                    $logData['type'] = 'admin_structure';
                    $logData['correct_val'] = $question['correct_answer'];
                    if ($submittedOptionId !== null && (int) $submittedOptionId === (int) $question['correct_answer']) {
                        $isCorrect = true;
                    }
                }
                // Check for 'correct' index (new structure from frontend)
                elseif (isset($question['correct'])) {
                    $logData['type'] = 'student_structure';
                    $logData['correct_val'] = $question['correct'];
                    // The answer is an index
                    // Ensure submittedOptionId is numeric and matches
                    if ($submittedOptionId !== null && (int) $submittedOptionId === (int) $question['correct']) {
                        $isCorrect = true;
                    }
                }
                // Fallback to 'is_correct' flag on options (old/alternative structure)
                elseif ($correctOption) {
                    $logData['type'] = 'legacy_structure';
                    if ($submittedOptionId && (string) $submittedOptionId === (string) $correctOption['id']) {
                        $isCorrect = true;
                    }
                }

                $logData['is_correct'] = $isCorrect;
                \Illuminate\Support\Facades\Log::info('Question Result', $logData);

                if ($isCorrect) {
                    $correctCount++;
                }

                $detailedResults[$qId] = [
                    'submitted_option_id' => $submittedOptionId,
                    'is_correct' => $isCorrect,
                    'correct_option_id' => $correctOption['id'] ?? null,
                ];
            }

            // Calculate score (percentage)
            // Use provided total_marks if available implicitly, otherwise 0-100%
            // Or if lesson has 'total_marks', we might want to scale it.
            // For now, let's stick to percentage or raw score as per existing simple logic 0-100 implicitly?
            // The prompt says "Return: obtained marks, total marks, correct count / total questions, percentage".

            // Let's calculate percentage
            $percentage = $totalQuestions > 0 ? ($correctCount / $totalQuestions) * 100 : 0;

            // If lesson has total_marks defined
            $totalMarks = $lesson->total_marks ?? 100; // Default to 100 if not set? Or just count?
            // Actually, usually total marks is sum of question marks, but here questions don't seem to have individual marks in the example JSON.
            // Let's check Lesson model content structure. The factory showed simple structure.
            // Let's use percentage scaled to total_marks if exists, else just percentage.

            $obtainedMarks = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * ($lesson->total_marks ?: 100)) : 0;

            $meta['score'] = $obtainedMarks; // Store obtained marks as score
            $meta['total_questions'] = $totalQuestions;
            $meta['correct_count'] = $correctCount;
            $meta['percentage'] = round($percentage, 2);
            $meta['answers'] = $submittedAnswers; // Store raw submission
            $meta['results'] = $detailedResults;  // Store detailed correctness
        }
        // Handle other types generally if score is passed (e.g. manual grading?) - but for QUIZ we enforce calculation.
        elseif (isset($data['score'])) {
            $meta['score'] = $data['score'];
            $meta['total_questions'] = $data['total_questions'] ?? null;
            $meta['answers'] = $data['answers'] ?? null;
        }

        // Handle Task Submission
        if (isset($data['submission_text'])) {
            $meta['submission_text'] = $data['submission_text'];
        }

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('submissions', 'public');
            $meta['file_path'] = $path;
            $meta['file_name'] = $request->file('file')->getClientOriginalName();
        }

        // Check for existing completion
        $completion = \App\Models\LessonCompletion::where('user_id', $user->id)
            ->where('lesson_id', $lesson->id)
            ->first();

        if ($completion) {
            // Update existing completion (Resubmission)
            $completion->update([
                'completed_at' => now(),
                'meta' => ! empty($meta) ? $meta : null,
                'is_edited' => true,
                'edited_at' => now(),
                'grading_status' => 'pending', // Reset status for re-grading
            ]);
        } else {
            // Create new completion
            \App\Models\LessonCompletion::create([
                'user_id' => $user->id,
                'lesson_id' => $lesson->id,
                'completed_at' => now(),
                'meta' => ! empty($meta) ? $meta : null,
                'grading_status' => 'pending',
            ]);
        }

        // If updating an existing completion, we might want to merge meta, but for now overwrite is fine for re-submission.

        return back()->with('success', 'Lesson marked as complete.');

        // Award XP for lesson completion
        $enrollment = $user->enrollments()->where('course_id', $course->id)->first();
        if ($enrollment) {
            $this->gamification->completeLesson($user, $enrollment, 10);
        }
    }

    /**
     * Mark the course as completed.
     */
    public function markCourseAsCompleted(Course $course): \Illuminate\Http\RedirectResponse
    {
        $user = Auth::user();
        $enrollment = $user->enrollments()->where('course_id', $course->id)->firstOrFail();

        // Check if all lessons are completed
        $totalLessons = $course->allLessons()->count();
        $completedLessonsCount = $user->lessonCompletions()
            ->whereIn('lesson_id', $course->allLessons()->pluck('lessons.id'))
            ->count();

        if ($completedLessonsCount < $totalLessons) {
            return back()->with('error', 'You must complete all lessons before finishing the course.');
        }

        $enrollment->update([
            'status' => \App\Enums\EnrollmentStatus::COMPLETED,
            'completed_at' => now(),
        ]);

        // Award XP for course completion
        $this->gamification->completeCourse($user, $enrollment, 100);

        return back()->with('success', 'Congratulations! You have completed the course.');
    }

    /**
     * Request a recheck of a graded lesson.
     */
    public function requestRecheck(\Illuminate\Http\Request $request, Course $course, \App\Models\Lesson $lesson): \Illuminate\Http\RedirectResponse
    {
        $user = Auth::user();

        $completion = \App\Models\LessonCompletion::where('user_id', $user->id)
            ->where('lesson_id', $lesson->id)
            ->firstOrFail();

        if ($completion->grading_status !== 'graded') {
            return back()->with('error', 'You can only request a recheck for graded assignments.');
        }

        // Check if lesson deadline has passed
        if ($lesson->deadline && now()->gt($lesson->deadline)) {
            return back()->with('error', 'The deadline for this assignment has passed. Recheck requests are no longer accepted.');
        }

        $completion->update([
            'grading_status' => 'recheck_requested',
        ]);

        return back()->with('success', 'Recheck requested successfully.');
    }

    public function executeCode(\Illuminate\Http\Request $request, Course $course, Lesson $lesson): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();

        if (! $user->enrolledCourses()->where('courses.id', $course->id)->exists()) {
            abort(403);
        }

        if ($lesson->section->course_id !== $course->id) {
            abort(404);
        }

        $validated = $request->validate([
            'code' => 'required|string',
            'language' => 'required|string',
        ]);

        $exercise = $lesson->codingExercise;
        $testCases = $exercise?->test_cases ?? [];
        $constraints = $exercise?->constraints ?? [];

        $executionService = new \App\Services\CodeExecutionService;
        $result = $executionService->execute(
            $validated['language'],
            $validated['code'],
            $testCases,
            $constraints
        );

        if ($result['success'] && $lesson->deadline && now()->gt($lesson->deadline)) {
            $result['error'] = 'The deadline for this exercise has passed.';
            $result['success'] = false;
        }

        if ($result['success'] && isset($result['passed']) && $result['passed']) {
            $existingCompletion = \App\Models\LessonCompletion::where('user_id', $user->id)
                ->where('lesson_id', $lesson->id)
                ->first();

            $meta = [
                'language' => $validated['language'],
                'code' => $validated['code'],
                'output' => $result['output'] ?? '',
                'test_results' => $result['test_results'] ?? [],
                'score' => $exercise?->test_cases
                    ? (count(array_filter($result['test_results'] ?? [], fn ($r) => $r['passed'] ?? false)) / max(count($result['test_results'] ?? [[]]), 1)) * 100
                    : 100,
                'total_score' => $exercise?->total_marks ?? 100,
                'obtained_mark' => $exercise?->total_marks
                    ? ((count(array_filter($result['test_results'] ?? [], fn ($r) => $r['passed'] ?? false)) / max(count($result['test_results'] ?? [[]]), 1)) * ($exercise->total_marks ?? 100))
                    : null,
            ];

            if ($existingCompletion) {
                $existingCompletion->update([
                    'completed_at' => now(),
                    'meta' => $meta,
                    'is_edited' => true,
                    'edited_at' => now(),
                    'grading_status' => 'graded',
                    'graded_by' => $user->id,
                    'graded_at' => now(),
                    'feedback' => null,
                ]);
            } else {
                \App\Models\LessonCompletion::create([
                    'user_id' => $user->id,
                    'lesson_id' => $lesson->id,
                    'completed_at' => now(),
                    'meta' => $meta,
                    'grading_status' => 'graded',
                    'graded_by' => $user->id,
                    'graded_at' => now(),
                ]);
            }
        }

        return response()->json($result);
    }
}
