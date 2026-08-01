<?php

use App\Enums\EnrollmentStatus;
use App\Models\Course;
use App\Models\CoursePrerequisite;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('course prerequisites table exists and can be queried', function () {
    $prerequisite = CoursePrerequisite::factory()->create();

    expect($prerequisite)->toBeInstanceOf(CoursePrerequisite::class);
    expect($prerequisite->course_id)->toBeInstanceOf(Course::class);
    expect($prerequisite->prerequisite_course_id)->toBeInstanceOf(Course::class);
});

test('course can have prerequisites', function () {
    $course = Course::factory()->create(['title' => 'Advanced PHP']);
    $prereq = Course::factory()->create(['title' => 'Intro to PHP']);

    CoursePrerequisite::create([
        'course_id' => $course->id,
        'prerequisite_course_id' => $prereq->id,
        'required' => true,
    ]);

    expect($course->prerequisites)->toHaveCount(1);
    expect($course->prerequisites->first()->title)->toBe('Intro to PHP');
});

test('Course model checkPrerequisites returns met for no prerequisites', function () {
    $course = Course::factory()->create();
    $user = User::factory()->create();

    $result = $course->checkPrerequisites($user);

    expect($result['met'])->toBeTrue();
    expect($result['unmet'])->toBeEmpty();
});

test('Course model checkPrerequisites returns unmet when prerequisite not completed', function () {
    $prereq = Course::factory()->create(['title' => 'Intro PHP']);
    $course = Course::factory()->create(['title' => 'Advanced PHP']);

    CoursePrerequisite::create([
        'course_id' => $course->id,
        'prerequisite_course_id' => $prereq->id,
        'required' => true,
    ]);

    $user = User::factory()->create();
    // User has enrollment but not completed
    \App\Models\Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $prereq->id,
        'status' => EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    $result = $course->checkPrerequisites($user);

    expect($result['met'])->toBeFalse();
    expect($result['unmet'])->toContain('Intro PHP');
});

test('Course model checkPrerequisites returns met when prerequisite is completed', function () {
    $prereq = Course::factory()->create(['title' => 'Intro PHP']);
    $course = Course::factory()->create(['title' => 'Advanced PHP']);

    CoursePrerequisite::create([
        'course_id' => $course->id,
        'prerequisite_course_id' => $prereq->id,
        'required' => true,
    ]);

    $user = User::factory()->create();
    // User has completed enrollment
    \App\Models\Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $prereq->id,
        'status' => EnrollmentStatus::COMPLETED,
        'enrolled_at' => now(),
        'completed_at' => now(),
    ]);

    $result = $course->checkPrerequisites($user);

    expect($result['met'])->toBeTrue();
    expect($result['unmet'])->toBeEmpty();
});

test('Course model checkPrerequisites handles multiple prerequisites', function () {
    $prereq1 = Course::factory()->create(['title' => 'Intro PHP']);
    $prereq2 = Course::factory()->create(['title' => 'Intro JavaScript']);
    $course = Course::factory()->create(['title' => 'Full Stack']);

    CoursePrerequisite::create([
        'course_id' => $course->id,
        'prerequisite_course_id' => $prereq1->id,
        'required' => true,
    ]);
    CoursePrerequisite::create([
        'course_id' => $course->id,
        'prerequisite_course_id' => $prereq2->id,
        'required' => true,
    ]);

    $user = User::factory()->create();
    // User completed only one prerequisite
    \App\Models\Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $prereq1->id,
        'status' => EnrollmentStatus::COMPLETED,
        'enrolled_at' => now(),
        'completed_at' => now(),
    ]);

    $result = $course->checkPrerequisites($user);

    expect($result['met'])->toBeFalse();
    expect($result['unmet'])->toContain('Intro JavaScript');
    expect($result['unmet'])->not->toContain('Intro PHP');
});

test('Course model isCompletedBy works correctly', function () {
    $course = Course::factory()->create();
    $completedUser = User::factory()->create();
    $activeUser = User::factory()->create();

    \App\Models\Enrollment::create([
        'user_id' => $completedUser->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::COMPLETED,
        'enrolled_at' => now(),
        'completed_at' => now(),
    ]);

    \App\Models\Enrollment::create([
        'user_id' => $activeUser->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    expect($course->isCompletedBy($completedUser))->toBeTrue();
    expect($course->isCompletedBy($activeUser))->toBeFalse();
});

test('course prerequisites page displays prerequisites', function () {
    $prereq = Course::factory()->create(['title' => 'Intro PHP']);
    $course = Course::factory()->create(['title' => 'Advanced PHP']);

    CoursePrerequisite::create([
        'course_id' => $course->id,
        'prerequisite_course_id' => $prereq->id,
        'required' => true,
    ]);

    $response = $this->get("/courses/{$course->slug}");

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->props('course.prerequisites'))->toHaveCount(1);
    });
});
