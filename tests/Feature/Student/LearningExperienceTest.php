<?php

use App\Enums\EnrollmentStatus;
use App\Enums\UserType;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\User;

beforeEach(function () {
    $this->seed(\Database\Seeders\RoleSeeder::class);
});

test('student can access course player for enrolled course', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Student/CoursePlayer')
            ->has('course')
            ->has('enrollment')
        );
});

test('student cannot access course player for non-enrolled course', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();

    $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug))
        ->assertRedirect(); // Should redirect with error
});

test('student can mark lesson as complete', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    $this->actingAs($student)
        ->post(route('student.courses.lessons.complete', [$course->id, $lesson->id]))
        ->assertRedirect();

    $this->assertDatabaseHas('lesson_completions', [
        'user_id' => $student->id,
        'lesson_id' => $lesson->id,
    ]);
});

test('progress percentage is calculated correctly', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lessons = Lesson::factory()->count(4)->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    // Complete 1 lesson (25%)
    \App\Models\LessonCompletion::create([
        'user_id' => $student->id,
        'lesson_id' => $lessons[0]->id,
    ]);

    $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('progress_percentage', 25)
        );

    // Complete another lesson (50%)
    \App\Models\LessonCompletion::create([
        'user_id' => $student->id,
        'lesson_id' => $lessons[1]->id,
    ]);

    $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('progress_percentage', 50)
        );
});

test('resume lesson id points to first incomplete lesson', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson1 = Lesson::factory()->create(['course_section_id' => $section->id]);
    $lesson2 = Lesson::factory()->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    // Complete lesson 1
    \App\Models\LessonCompletion::create([
        'user_id' => $student->id,
        'lesson_id' => $lesson1->id,
    ]);

    $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('resume_lesson_id', $lesson2->id)
        );
});

test('student can mark course as completed when all lessons are done', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create(['course_section_id' => $section->id]);

    $enrollment = Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    // Complete the only lesson
    \App\Models\LessonCompletion::create([
        'user_id' => $student->id,
        'lesson_id' => $lesson->id,
    ]);

    $this->actingAs($student)
        ->post(route('student.courses.complete', $course->id))
        ->assertRedirect()
        ->assertSessionHas('success');

    $this->assertEquals(EnrollmentStatus::COMPLETED, $enrollment->fresh()->status);
    $this->assertNotNull($enrollment->fresh()->completed_at);
});

test('student cannot mark course as completed if lessons are pending', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    // Lesson is NOT completed

    $this->actingAs($student)
        ->post(route('student.courses.complete', $course->id))
        ->assertRedirect()
        ->assertSessionHas('error');

    $this->assertEquals(EnrollmentStatus::ACTIVE, Enrollment::where('user_id', $student->id)->where('course_id', $course->id)->first()->status);
});

test('student cannot mark lesson as complete for non-enrolled course', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create(['course_section_id' => $section->id]);

    $this->actingAs($student)
        ->post(route('student.courses.lessons.complete', [$course->id, $lesson->id]))
        ->assertStatus(403);
});

test('subsequent sections are locked until previous section is completed', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $section1 = CourseSection::factory()->create(['course_id' => $course->id, 'order' => 1]);
    $lesson1 = Lesson::factory()->create(['course_section_id' => $section1->id]);

    $section2 = CourseSection::factory()->create(['course_id' => $course->id, 'order' => 2]);
    $lesson2 = Lesson::factory()->create(['course_section_id' => $section2->id]);

    Enrollment::factory()->create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    // Check initially: Section 2 should be locked
    $response = $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug));

    $response->assertOk()
        ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('Student/CoursePlayer')
            ->has('course.sections.1.lessons.0', fn (\Inertia\Testing\AssertableInertia $lesson) => $lesson
                ->where('is_locked', true)
                ->where('content', null)
                ->etc()
            )
        );

    // Complete Section 1
    \App\Models\LessonCompletion::create([
        'user_id' => $student->id,
        'lesson_id' => $lesson1->id,
    ]);

    // Check again: Section 2 should be unlocked
    $this->actingAs($student)
        ->get(route('student.courses.show', $course->slug))
        ->assertOk()
        ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('Student/CoursePlayer')
            ->has('course.sections.1.lessons.0', fn (\Inertia\Testing\AssertableInertia $lesson) => $lesson
                ->where('is_locked', false)
                ->whereNot('content', null)
                ->etc()
            )
        );
});
