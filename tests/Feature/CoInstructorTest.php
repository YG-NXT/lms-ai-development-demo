<?php

use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('course has instructors relationship', function () {
    $course = Course::factory()->create();
    $instructor1 = User::factory()->create();
    $instructor2 = User::factory()->create();

    $course->instructors()->attach([
        $instructor1->id => ['role' => 'assistant', 'is_primary' => false],
        $instructor2->id => ['role' => 'guest', 'is_primary' => false],
    ]);

    expect($course->instructors)->toHaveCount(2);
    expect($course->instructors->first()->pivot->role)->toBe('assistant');
});

test('user has coTaughtCourses relationship', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    $user->coTaughtCourses()->attach([
        $course->id => ['role' => 'assistant', 'is_primary' => false],
    ]);

    expect($user->coTaughtCourses)->toHaveCount(1);
    expect($user->coTaughtCourses->first()->title)->toBe($course->title);
});

test('course instructors pivot has correct columns', function () {
    $course = Course::factory()->create();
    $instructor = User::factory()->create();

    $course->instructors()->attach([
        $instructor->id => ['role' => 'lead', 'is_primary' => true],
    ]);

    $pivotRecord = \DB::table('course_instructors')
        ->where('course_id', $course->id)
        ->where('user_id', $instructor->id)
        ->first();

    expect($pivotRecord->role)->toBe('lead');
    expect($pivotRecord->is_primary)->toBe(1);
});
