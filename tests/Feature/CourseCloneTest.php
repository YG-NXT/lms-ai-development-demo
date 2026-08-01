<?php

use App\Enums\CourseStatus;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can clone a course with sections and lessons', function () {
    $admin = User::factory()->create(['type' => 'admin']);
    $originalCourse = Course::factory()->create([
        'title' => 'Original Course',
        'slug' => 'original-course',
        'status' => CourseStatus::PUBLISHED,
        'price' => 49.99,
    ]);
    $section = CourseSection::factory()->create([
        'course_id' => $originalCourse->id,
        'title' => 'Section 1',
    ]);
    Lesson::factory()->create([
        'course_section_id' => $section->id,
        'course_id' => $originalCourse->id,
        'title' => 'Lesson 1',
        'slug' => 'lesson-1',
    ]);
    Lesson::factory()->create([
        'course_section_id' => $section->id,
        'course_id' => $originalCourse->id,
        'title' => 'Lesson 2',
        'slug' => 'lesson-2',
    ]);

    $response = $this->actingAs($admin)->post(
        route('admin.courses.clone', $originalCourse->id)
    );

    $response->assertRedirect();

    $clonedCourse = Course::where('title', 'Copy of Original Course')->first();
    expect($clonedCourse)->not->toBeNull();
    expect($clonedCourse->status)->toBe(CourseStatus::DRAFT);
    expect($clonedCourse->price)->toBe(49.99);
    expect($clonedCourse->slug)->not->toBe('original-course');

    // Verify sections were cloned
    $clonedSections = CourseSection::where('course_id', $clonedCourse->id)->get();
    expect($clonedSections)->toHaveCount(1);

    // Verify lessons were cloned
    $clonedLessons = Lesson::where('course_id', $clonedCourse->id)->get();
    expect($clonedLessons)->toHaveCount(2);
});

test('cloned course does not inherit enrollments or reviews', function () {
    $admin = User::factory()->create(['type' => 'admin']);
    $originalCourse = Course::factory()->create(['title' => 'Course with Data']);
    $student = User::factory()->create(['type' => 'student']);

    // Create enrollment on original
    \App\Models\Enrollment::create([
        'user_id' => $student->id,
        'course_id' => $originalCourse->id,
        'status' => \App\Enums\EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    // Create review on original
    \App\Models\Review::create([
        'user_id' => $student->id,
        'course_id' => $originalCourse->id,
        'rating' => 5,
        'comment' => 'Great course!',
        'status' => \App\Enums\ReviewStatus::APPROVED,
    ]);

    $response = $this->actingAs($admin)->post(
        route('admin.courses.clone', $originalCourse->id)
    );

    $clonedCourse = Course::where('title', 'Copy of Course with Data')->first();
    expect($clonedCourse)->not->toBeNull();

    // Cloned should not have enrollments from original
    expect($clonedCourse->enrollments()->count())->toBe(0);

    // Cloned should not have reviews from original
    expect($clonedCourse->reviews()->count())->toBe(0);
});

test('clone route is accessible from admin panel', function () {
    $admin = User::factory()->create(['type' => 'admin']);
    $course = Course::factory()->create();

    $response = $this->actingAs($admin)->post(
        route('admin.courses.clone', $course->id)
    );

    $response->assertStatus(302);
});
