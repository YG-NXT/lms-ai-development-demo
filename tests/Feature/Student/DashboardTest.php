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
    $this->student = User::factory()->create(['type' => UserType::CUSTOMER]);
});

test('student dashboard shows correct enrollment counts and details', function () {
    $course1 = Course::factory()->create(['title' => 'Course 1']);
    CourseSection::factory()->count(2)->create(['course_id' => $course1->id]);

    $course2 = Course::factory()->create(['title' => 'Course 2']);
    CourseSection::factory()->count(3)->create(['course_id' => $course2->id]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course1->id,
        'status' => EnrollmentStatus::ACTIVE,
        'created_at' => now()->subDay(),
    ]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course2->id,
        'status' => EnrollmentStatus::PENDING,
        'created_at' => now(),
    ]);

    $this->actingAs($this->student)
        ->get(route('student.dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Student/Pages/Dashboard')
            ->has('enrollments', 2)
            ->has('enrollments.0.course', fn ($course) => $course
                ->where('title', 'Course 2')
                ->where('sections_count', 3)
                ->etc()
            )
            ->has('enrollments.1.course', fn ($course) => $course
                ->where('title', 'Course 1')
                ->where('sections_count', 2)
                ->etc()
            )
        );
});

test('student dashboard shows correct progress percentage', function () {
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lessons = Lesson::factory()->count(4)->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    // Initially 0%
    $this->actingAs($this->student)
        ->get(route('student.dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('enrollments.0.progress_percentage', 0)
        );

    // Complete 1 lesson (25%)
    \App\Models\LessonCompletion::create([
        'user_id' => $this->student->id,
        'lesson_id' => $lessons[0]->id,
    ]);

    $this->actingAs($this->student)
        ->get(route('student.dashboard'))
        ->assertInertia(fn ($page) => $page
            ->where('enrollments.0.progress_percentage', 25)
        );
});
