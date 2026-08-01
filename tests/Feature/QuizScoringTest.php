<?php

use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use App\Models\User;

test('student can submit fake quiz score', function () {
    $student = User::factory()->create(['type' => \App\Enums\UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create([
        'course_section_id' => $section->id,
        'type' => 'QUIZ',
        'content' => json_encode([
            'questions' => [
                [
                    'id' => 1,
                    'question' => 'What is 2+2?',
                    'options' => [
                        ['id' => 1, 'text' => '3', 'is_correct' => false],
                        ['id' => 2, 'text' => '4', 'is_correct' => true],
                    ],
                ],
            ],
        ]),
    ]);

    // Enroll student
    $student->enrolledCourses()->attach($course->id, ['status' => \App\Enums\EnrollmentStatus::ACTIVE]);

    $this->withoutExceptionHandling();

    $this->actingAs($student);

    // Submit wrong answer but claim full score
    $response = $this->post(route('student.courses.lessons.complete', [$course, $lesson]), [
        'score' => 100, // FAKE SCORE
        'total_questions' => 1,
        'answers' => [
            1 => 1, // ID 1 is the wrong answer (3)
        ],
    ]);

    $response->assertRedirect();

    // Check database for completion
    $this->assertDatabaseHas('lesson_completions', [
        'user_id' => $student->id,
        'lesson_id' => $lesson->id,
    ]);

    $completion = \App\Models\LessonCompletion::where('user_id', $student->id)
        ->where('lesson_id', $lesson->id)
        ->first();

    // The fix: Server should calculate score as 0 because the answer was wrong
    expect($completion->meta['score'])->toBe(0);
});

test('student gets full score for correct answer', function () {
    $student = User::factory()->create(['type' => \App\Enums\UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create([
        'course_section_id' => $section->id,
        'type' => 'QUIZ',
        'content' => json_encode([
            'questions' => [
                [
                    'id' => 1,
                    'question' => 'What is 2+2?',
                    'options' => [
                        ['id' => 1, 'text' => '3', 'is_correct' => false],
                        ['id' => 2, 'text' => '4', 'is_correct' => true],
                    ],
                ],
            ],
        ]),
    ]);

    // Enroll student
    $student->enrolledCourses()->attach($course->id, ['status' => \App\Enums\EnrollmentStatus::ACTIVE]);

    $this->withoutExceptionHandling();

    $this->actingAs($student);

    // Submit correct answer
    $response = $this->post(route('student.courses.lessons.complete', [$course, $lesson]), [
        'score' => 100, // Client calculation (should be ignored or matched)
        'total_questions' => 1,
        'answers' => [
            1 => 2, // ID 2 is the correct answer (4)
        ],
    ]);

    $response->assertRedirect();

    $completion = \App\Models\LessonCompletion::where('user_id', $student->id)
        ->where('lesson_id', $lesson->id)
        ->first();

    // Expect full score
    expect($completion->meta['score'])->toBe(100);
});

test('student is scored correctly with index-based quiz structure', function () {
    $student = User::factory()->create(['type' => \App\Enums\UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create([
        'course_section_id' => $section->id,
        'type' => 'QUIZ',
        'content' => json_encode([
            'questions' => [
                [
                    'id' => 10,
                    'text' => 'Index Question?',
                    'options' => ['Wrong', 'Correct'],
                    'correct' => 1, // Index 1 is correct
                ],
            ],
        ]),
    ]);

    // Enroll student
    $student->enrolledCourses()->attach($course->id, ['status' => \App\Enums\EnrollmentStatus::ACTIVE]);

    $this->withoutExceptionHandling();
    $this->actingAs($student);

    // 1. Submit Wrong Answer
    $this->post(route('student.courses.lessons.complete', [$course, $lesson]), [
        'score' => 100,
        'total_questions' => 1,
        'answers' => [
            10 => 0, // Index 0 (Wrong)
        ],
    ]);

    $completion = \App\Models\LessonCompletion::where('user_id', $student->id)
        ->where('lesson_id', $lesson->id)
        ->first();

    expect($completion->meta['score'])->toBe(0);

    // 2. Submit Correct Answer (Re-submit)
    $this->post(route('student.courses.lessons.complete', [$course, $lesson]), [
        'score' => 100,
        'total_questions' => 1,
        'answers' => [
            10 => 1, // Index 1 (Correct)
        ],
    ]);

    $completion->refresh();
    expect($completion->meta['score'])->toBe(100);
});
