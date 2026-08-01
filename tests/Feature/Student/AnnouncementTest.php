<?php

use App\Enums\AnnouncementScope;
use App\Enums\AnnouncementStatus;
use App\Enums\UserType;
use App\Models\Announcement;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $this->otherStudent = User::factory()->create(['type' => UserType::CUSTOMER]);
    $this->course = Course::factory()->create();

    // Enroll the student in the course
    $this->student->enrollments()->create([
        'course_id' => $this->course->id,
        'status' => 'active',
        'enrolled_at' => now(),
    ]);
});

test('student can see global broadcasted announcements', function () {
    Announcement::create([
        'title' => 'Global News',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::BROADCAST->value,
        'published_at' => now(),
    ]);

    $this->actingAs($this->student)
        ->get(route('student.announcements.index'))
        ->assertStatus(200)
        ->assertSee('Global News');
});

test('student can see announcements for their enrolled courses', function () {
    Announcement::create([
        'title' => 'Course Update',
        'content' => 'Content',
        'scope' => AnnouncementScope::COURSE->value,
        'course_id' => $this->course->id,
        'status' => AnnouncementStatus::BROADCAST->value,
        'published_at' => now(),
    ]);

    $this->actingAs($this->student)
        ->get(route('student.announcements.index'))
        ->assertStatus(200)
        ->assertSee('Course Update');
});

test('student cannot see announcements for courses they are not enrolled in', function () {
    $otherCourse = Course::factory()->create();
    Announcement::create([
        'title' => 'Other Course Update',
        'content' => 'Content',
        'scope' => AnnouncementScope::COURSE->value,
        'course_id' => $otherCourse->id,
        'status' => AnnouncementStatus::BROADCAST->value,
        'published_at' => now(),
    ]);

    $this->actingAs($this->student)
        ->get(route('student.announcements.index'))
        ->assertStatus(200)
        ->assertDontSee('Other Course Update');
});

test('student can see announcements targeted specifically to them', function () {
    $announcement = Announcement::create([
        'title' => 'Personal Message',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::BROADCAST->value,
        'published_at' => now(),
    ]);
    $announcement->users()->attach($this->student->id);

    $this->actingAs($this->student)
        ->get(route('student.announcements.index'))
        ->assertStatus(200)
        ->assertSee('Personal Message');
});

test('student cannot see announcements targeted to others', function () {
    $announcement = Announcement::create([
        'title' => 'For Someone Else',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::BROADCAST->value,
        'published_at' => now(),
    ]);
    $announcement->users()->attach($this->otherStudent->id);

    $this->actingAs($this->student)
        ->get(route('student.announcements.index'))
        ->assertStatus(200)
        ->assertDontSee('For Someone Else');
});

test('student cannot see draft or scheduled announcements', function () {
    Announcement::create([
        'title' => 'Draft News',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::DRAFT->value,
    ]);

    Announcement::create([
        'title' => 'Future News',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::SCHEDULED->value,
        'scheduled_at' => now()->addDay(),
    ]);

    $this->actingAs($this->student)
        ->get(route('student.announcements.index'))
        ->assertStatus(200)
        ->assertDontSee('Draft News')
        ->assertDontSee('Future News');
});
