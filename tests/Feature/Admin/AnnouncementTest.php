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
    $this->admin = User::factory()->create(['type' => UserType::ADMIN]);
    $this->student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $this->course = Course::factory()->create();
});

test('admin can view announcement listing', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.announcements.index'))
        ->assertStatus(200);
});

test('admin can create a global announcement', function () {
    $data = [
        'title' => 'Test Announcement',
        'content' => 'This is a test announcement content.',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::BROADCAST->value,
    ];

    $this->actingAs($this->admin)
        ->post(route('admin.announcements.store'), $data)
        ->assertRedirect(route('admin.announcements.index'));

    $this->assertDatabaseHas('announcements', [
        'title' => 'Test Announcement',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::BROADCAST->value,
    ]);
});

test('admin can create a scheduled course announcement', function () {
    $scheduledAt = now()->addDay()->format('Y-m-d H:i:s');
    $data = [
        'title' => 'Scheduled Course Announcement',
        'content' => 'Content here',
        'scope' => AnnouncementScope::COURSE->value,
        'course_id' => $this->course->id,
        'status' => AnnouncementStatus::SCHEDULED->value,
        'scheduled_at' => $scheduledAt,
    ];

    $this->actingAs($this->admin)
        ->post(route('admin.announcements.store'), $data)
        ->assertRedirect(route('admin.announcements.index'));

    $this->assertDatabaseHas('announcements', [
        'title' => 'Scheduled Course Announcement',
        'course_id' => $this->course->id,
        'status' => AnnouncementStatus::SCHEDULED->value,
    ]);
});

test('admin can target specific students', function () {
    $data = [
        'title' => 'Targeted Announcement',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::BROADCAST->value,
        'student_ids' => [$this->student->id],
    ];

    $this->actingAs($this->admin)
        ->post(route('admin.announcements.store'), $data);

    $announcement = Announcement::where('title', 'Targeted Announcement')->first();
    expect($announcement->users)->toHaveCount(1);
    expect($announcement->users->first()->id)->toBe($this->student->id);
});

test('admin can delete an announcement', function () {
    $announcement = Announcement::create([
        'title' => 'To be deleted',
        'content' => 'Content',
        'scope' => AnnouncementScope::GLOBAL->value,
        'status' => AnnouncementStatus::DRAFT->value,
    ]);

    $this->actingAs($this->admin)
        ->delete(route('admin.announcements.destroy', $announcement))
        ->assertRedirect();

    $this->assertDatabaseMissing('announcements', ['id' => $announcement->id]);
});
