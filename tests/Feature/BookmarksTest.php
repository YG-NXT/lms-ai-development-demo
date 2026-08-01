<?php

use App\Models\Course;
use App\Models\CourseBookmark;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('course bookmarks table exists and can be queried', function () {
    $bookmark = CourseBookmark::factory()->create();

    expect($bookmark)->toBeInstanceOf(CourseBookmark::class);
    expect($bookmark->user_id)->toBeInstanceOf(User::class);
    expect($bookmark->course_id)->toBeInstanceOf(Course::class);
});

test('user can bookmark a course', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    CourseBookmark::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
    ]);

    expect($user->bookmarks()->count())->toBe(1);
    expect($user->bookmarkedCourses()->count())->toBe(1);
    expect($user->bookmarkedCourses->first()->title)->toBe($course->title);
});

test('user can remove a bookmark', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    $bookmark = CourseBookmark::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
    ]);

    expect($user->bookmarks()->count())->toBe(1);

    $bookmark->delete();

    expect($user->bookmarks()->count())->toBe(0);
});

test('unique constraint prevents duplicate bookmarks', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    CourseBookmark::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
    ]);

    expect(fn () => CourseBookmark::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
    ]))->toThrow(\Illuminate\Database\QueryException::class);
});

test('bookmark toggle creates a bookmark', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    $response = $this->actingAs($user)->post(route('student.courses.bookmark.toggle', ['course' => $course->slug]));

    expect($response->status())->toBe(302);
    expect($user->bookmarks()->count())->toBe(1);
});

test('bookmark toggle removes an existing bookmark', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    CourseBookmark::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
    ]);

    $response = $this->actingAs($user)->post(route('student.courses.bookmark.toggle', ['course' => $course->slug]));

    expect($response->status())->toBe(302);
    expect($user->bookmarks()->count())->toBe(0);
});

test('bookmarks page loads correctly', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    CourseBookmark::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
    ]);

    $response = $this->actingAs($user)->get('/student/bookmarks');

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->component)->toBe('Student/Pages/Bookmarks');
    });
});
