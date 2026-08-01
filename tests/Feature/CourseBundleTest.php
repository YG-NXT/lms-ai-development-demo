<?php

use App\Models\Course;
use App\Models\CourseBundle;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('course_bundles table exists', function () {
    $bundle = CourseBundle::factory()->create();

    expect($bundle)->toBeInstanceOf(CourseBundle::class);
    expect($bundle->name)->toBeString();
});

test('bundle can have courses', function () {
    $bundle = CourseBundle::factory()->create();
    $course = Course::factory()->create();

    $bundle->courses()->attach($course->id);

    expect($bundle->courses)->toHaveCount(1);
});

test('bundles listing page loads', function () {
    CourseBundle::factory()->create();

    $response = $this->get('/student/bundles');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => expect($page->component)->toBe('Student/Pages/Bundles'));
});

test('bundle show page loads', function () {
    $bundle = CourseBundle::factory()->create();
    Course::factory()->create();

    $response = $this->get("/student/bundles/{$bundle->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => expect($page->component)->toBe('Student/Pages/BundleShow'));
});

test('bundle enrollment creates enrollments for all courses', function () {
    $user = User::factory()->create(['type' => 'student']);
    $bundle = CourseBundle::factory()->create();
    $course1 = Course::factory()->create(['is_free' => true]);
    $course2 = Course::factory()->create(['is_free' => true]);

    $bundle->courses()->attach($course1->id);
    $bundle->courses()->attach($course2->id);

    $response = $this->actingAs($user)->post(
        route('student.bundles.enroll', $bundle->slug)
    );

    expect($response->status())->toBe(302);
    expect($user->enrollments()->count())->toBe(2);
});
