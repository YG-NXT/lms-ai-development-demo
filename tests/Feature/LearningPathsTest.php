<?php

use App\Enums\EnrollmentStatus;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LearningPath;
use App\Models\LearningPathCourse;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('learning_paths table exists and can be queried', function () {
    $path = LearningPath::factory()->create();

    expect($path)->toBeInstanceOf(LearningPath::class);
    expect($path->name)->toBeString();
    expect($path->slug)->toBeString();
});

test('learning path can have courses', function () {
    $path = LearningPath::factory()->create();
    $course1 = Course::factory()->create(['title' => 'PHP Basics']);
    $course2 = Course::factory()->create(['title' => 'Laravel Fundamentals']);

    LearningPathCourse::create([
        'learning_path_id' => $path->id,
        'course_id' => $course1->id,
        'sort_order' => 1,
    ]);
    LearningPathCourse::create([
        'learning_path_id' => $path->id,
        'course_id' => $course2->id,
        'sort_order' => 2,
    ]);

    expect($path->courses)->toHaveCount(2);
    expect($path->courses->first()->title)->toBe('PHP Basics');
});

test('learning path courses are ordered by sort_order', function () {
    $path = LearningPath::factory()->create();
    $course1 = Course::factory()->create(['title' => 'First Course']);
    $course2 = Course::factory()->create(['title' => 'Second Course']);
    $course3 = Course::factory()->create(['title' => 'Third Course']);

    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course1->id, 'sort_order' => 3]);
    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course2->id, 'sort_order' => 1]);
    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course3->id, 'sort_order' => 2]);

    $courseTitles = $path->courses->pluck('title')->toArray();
    expect($courseTitles)->toBe(['Second Course', 'Third Course', 'First Course']);
});

test('learning path index page loads correctly', function () {
    LearningPath::factory()->create(['name' => 'Web Development Track', 'is_active' => true]);
    LearningPath::factory()->create(['name' => 'Hidden Path', 'is_active' => false]);

    $response = $this->get('/student/learning-paths');

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->component)->toBe('Student/Pages/LearningPaths');
        expect($page->props('paths'))->toHaveCount(1);
    });
});

test('learning path show page loads correctly', function () {
    $path = LearningPath::factory()->create(['name' => 'Full Stack Track']);
    $course = Course::factory()->create(['title' => 'Vue.js Basics']);

    LearningPathCourse::create([
        'learning_path_id' => $path->id,
        'course_id' => $course->id,
        'sort_order' => 1,
    ]);

    $response = $this->get("/student/learning-paths/{$path->slug}");

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->component)->toBe('Student/Pages/LearningPathShow');
    });
});

test('learning path enroll creates enrollments for all courses', function () {
    $user = User::factory()->create(['type' => 'student']);
    $path = LearningPath::factory()->create();
    $course1 = Course::factory()->create(['title' => 'Course A', 'is_free' => true]);
    $course2 = Course::factory()->create(['title' => 'Course B', 'is_free' => true]);

    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course1->id, 'sort_order' => 1]);
    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course2->id, 'sort_order' => 2]);

    $response = $this->actingAs($user)->post(
        route('student.learning-paths.enroll', ['learningPath' => $path->slug])
    );

    expect($response->status())->toBe(302);
    expect($user->enrollments()->where('course_id', $course1->id)->count())->toBe(1);
    expect($user->enrollments()->where('course_id', $course2->id)->count())->toBe(1);
});

test('learning path enroll skips already enrolled courses', function () {
    $user = User::factory()->create(['type' => 'student']);
    $path = LearningPath::factory()->create();
    $course = Course::factory()->create(['title' => 'Course A', 'is_free' => true]);

    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course->id, 'sort_order' => 1]);

    // Pre-enroll the user
    Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    $response = $this->actingAs($user)->post(
        route('student.learning-paths.enroll', ['learningPath' => $path->slug])
    );

    expect($response->status())->toBe(302);
    // Should still have only 1 enrollment (not duplicated)
    expect($user->enrollments()->where('course_id', $course->id)->count())->toBe(1);
});

test('learning path show displays progress correctly', function () {
    $user = User::factory()->create(['type' => 'student']);
    $path = LearningPath::factory()->create(['name' => 'Test Path']);
    $course1 = Course::factory()->create(['title' => 'Course 1', 'is_free' => true]);
    $course2 = Course::factory()->create(['title' => 'Course 2', 'is_free' => true]);

    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course1->id, 'sort_order' => 1]);
    LearningPathCourse::create(['learning_path_id' => $path->id, 'course_id' => $course2->id, 'sort_order' => 2]);

    // User enrolled in both courses (completed one)
    Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $course1->id,
        'status' => EnrollmentStatus::COMPLETED,
        'enrolled_at' => now(),
        'completed_at' => now(),
    ]);
    Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $course2->id,
        'status' => EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    $response = $this->actingAs($user)->get("/student/learning-paths/{$path->slug}");

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->props('completedCourses'))->toBe(1);
        expect($page->props('totalCourses'))->toBe(2);
    });
});
