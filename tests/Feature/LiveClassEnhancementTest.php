<?php

use App\Enums\UserType;
use App\Models\Course;
use App\Models\LiveClass;
use App\Models\User;
use Illuminate\Support\Carbon;

test('admin can create daily live class', function () {
    $admin = User::factory()->create(['type' => UserType::SUPER_ADMIN]);
    $course = Course::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.live-classes.store'), [
        'course_id' => $course->id,
        'title' => 'Daily Standup',
        'provider' => 'zoom',
        'meeting_url' => 'https://zoom.us/j/123456789',
        'type' => 'daily',
        'start_time' => '10:00',
        'end_time' => '11:00',
        'timezone' => 'UTC',
        'reminder_minutes_before' => 30,
        'status' => 'upcoming',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('live_classes', [
        'title' => 'Daily Standup',
        'type' => 'daily',
        'start_time' => '10:00',
    ]);
});

test('admin can create specific live class', function () {
    $admin = User::factory()->create(['type' => UserType::SUPER_ADMIN]);
    $course = Course::factory()->create();
    $tomorrow = now()->addDay()->format('Y-m-d');

    $response = $this->actingAs($admin)->post(route('admin.live-classes.store'), [
        'course_id' => $course->id,
        'title' => 'Special Workshop',
        'provider' => 'google_meet',
        'meeting_url' => 'https://meet.google.com/abc-defg-hij',
        'type' => 'specific',
        'class_date' => $tomorrow,
        'start_time' => '14:00',
        'end_time' => '16:00',
        'timezone' => 'UTC',
        'reminder_minutes_before' => 60,
        'status' => 'upcoming',
    ]);

    $response->assertRedirect();
    // SQLite might store date as Y-m-d 00:00:00 if passed as carbon or sometimes even if string depending on how it's saved.
    // Based on previous error: "Found ... class_date: 2026-02-20 00:00:00"
    $this->assertDatabaseHas('live_classes', [
        'title' => 'Special Workshop',
        'type' => 'specific',
        'class_date' => $tomorrow.' 00:00:00',
    ]);
});

test('specific class date validation', function () {
    $admin = User::factory()->create(['type' => UserType::SUPER_ADMIN]);
    $course = Course::factory()->create();

    // Test date too far in future (limit is +1 day)
    $futureDate = now()->addDays(5)->format('Y-m-d');

    $response = $this->actingAs($admin)->post(route('admin.live-classes.store'), [
        'course_id' => $course->id,
        'title' => 'Future Workshop',
        'provider' => 'zoom',
        'meeting_url' => 'https://zoom.us/j/123',
        'type' => 'specific',
        'class_date' => $futureDate,
        'start_time' => '10:00',
        'end_time' => '11:00',
        'timezone' => 'UTC',
        'reminder_minutes_before' => 30,
        'status' => 'upcoming',
    ]);

    $response->assertSessionHasErrors('class_date');
});

test('end time must be after start time', function () {
    $admin = User::factory()->create(['type' => UserType::SUPER_ADMIN]);
    $course = Course::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.live-classes.store'), [
        'course_id' => $course->id,
        'title' => 'Bad Timing',
        'provider' => 'zoom',
        'meeting_url' => 'https://zoom.us/j/123',
        'type' => 'daily',
        'start_time' => '11:00',
        'end_time' => '10:00',
        'timezone' => 'UTC',
        'reminder_minutes_before' => 30,
        'status' => 'upcoming',
    ]);

    $response->assertSessionHasErrors('end_time');
});

test('status label logic for specific class', function () {
    // Upcoming
    $upcoming = LiveClass::factory()->create([
        'type' => 'specific',
        'class_date' => now()->addDay(),
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'upcoming',
    ]);
    expect($upcoming->status_label)->toBe('upcoming');

    // Live (Running)
    Carbon::setTestNow(now()->setTime(10, 30));
    $live = LiveClass::factory()->create([
        'type' => 'specific',
        'class_date' => now()->format('Y-m-d'),
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'upcoming',
    ]);
    expect($live->status_label)->toBe('live');

    // Finished
    Carbon::setTestNow(now()->setTime(12, 00));
    expect($live->refresh()->status_label)->toBe('finished');

    Carbon::setTestNow(); // Reset time
});

test('status label logic for daily class', function () {
    Carbon::setTestNow(now()->setTime(9, 00));
    $daily = LiveClass::factory()->create([
        'type' => 'daily',
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'upcoming',
    ]);
    expect($daily->status_label)->toBe('upcoming');

    Carbon::setTestNow(now()->setTime(10, 30));
    expect($daily->refresh()->status_label)->toBe('live');

    Carbon::setTestNow(now()->setTime(11, 30));
    expect($daily->refresh()->status_label)->toBe('finished');

    Carbon::setTestNow();
});

test('student cannot join upcoming class', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $course->enrollments()->create(['user_id' => $student->id, 'status' => 'completed']);

    $class = LiveClass::factory()->create([
        'course_id' => $course->id,
        'type' => 'specific',
        'class_date' => now()->addDay(),
        'start_time' => '10:00',
        'end_time' => '11:00',
        'meeting_url' => 'https://zoom.us/test',
        'status' => 'upcoming',
    ]);

    $response = $this->actingAs($student)->get(route('student.live-classes.join', $class));

    $response->assertRedirect();
    $response->assertSessionHas('error', 'This class is not currently live.');
});

test('student can join live class', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $course->enrollments()->create(['user_id' => $student->id, 'status' => 'completed']);

    Carbon::setTestNow(now()->setTime(10, 30));

    $class = LiveClass::factory()->create([
        'course_id' => $course->id,
        'type' => 'specific',
        'class_date' => now()->format('Y-m-d'),
        'start_time' => '10:00',
        'end_time' => '11:00',
        'meeting_url' => 'https://zoom.us/test',
        'status' => 'upcoming',
    ]);

    $response = $this->actingAs($student)->get(route('student.live-classes.join', $class));

    $response->assertRedirect('https://zoom.us/test');

    Carbon::setTestNow();
});

test('status label handles timezone correctly', function () {
    // Current time: 14:48 Asia/Dhaka (+06:00) -> 08:48 UTC
    $nowDhaka = Carbon::parse('2026-02-19 14:48:00', 'Asia/Dhaka');
    Carbon::setTestNow($nowDhaka);

    // Class: 14:25 - 14:26 Asia/Dhaka
    // In UTC: 08:25 - 08:26
    // Since 08:48 > 08:26, it should be 'finished'.

    $class = LiveClass::factory()->create([
        'type' => 'specific',
        'class_date' => '2026-02-19',
        'start_time' => '14:25',
        'end_time' => '14:26',
        'timezone' => 'Asia/Dhaka',
    ]);

    expect($class->status_label)->toBe('finished');

    Carbon::setTestNow();
});

test('student only sees upcoming and live classes', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create();
    $course->enrollments()->create(['user_id' => $student->id, 'status' => 'completed']);

    // Finished Class
    LiveClass::factory()->create([
        'course_id' => $course->id,
        'title' => 'Finished Class',
        'type' => 'specific',
        'class_date' => now()->subDay(),
        'start_time' => '10:00',
        'end_time' => '11:00',
    ]);

    // Live Class
    LiveClass::factory()->create([
        'course_id' => $course->id,
        'title' => 'Live Class',
        // Make it live now
        'type' => 'daily',
        'start_time' => now()->subMinutes(30)->format('H:i'), // Started 30 mins ago
        'end_time' => now()->addMinutes(30)->format('H:i'),   // Ends in 30 mins
    ]);

    // Upcoming Class
    LiveClass::factory()->create([
        'course_id' => $course->id,
        'title' => 'Upcoming Class',
        'type' => 'specific',
        'class_date' => now()->addDay(),
        'start_time' => '10:00',
        'end_time' => '11:00',
    ]);

    $response = $this->actingAs($student)->get(route('student.courses.show', $course));

    $response->assertOk();

    $liveClasses = $response->inertiaProps('course.live_classes');

    expect($liveClasses)->toHaveCount(2);
    expect(collect($liveClasses)->pluck('title'))->toContain('Live Class');
    expect(collect($liveClasses)->pluck('title'))->toContain('Upcoming Class');
    expect(collect($liveClasses)->pluck('title'))->not->toContain('Finished Class');
});
