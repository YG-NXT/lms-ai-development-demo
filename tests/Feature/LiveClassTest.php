<?php

use App\Enums\EnrollmentStatus;
use App\Enums\UserType;
use App\Jobs\SendLiveClassReminders;
use App\Mail\LiveClassReminder;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LiveClass;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    $this->seed(\Database\Seeders\RoleSeeder::class);
});

test('admin can create a live class', function () {
    $admin = User::factory()->create(['type' => UserType::ADMIN]);
    $managerRole = \App\Models\Role::where('slug', 'manager')->first();
    $admin->roles()->attach($managerRole);

    $course = Course::factory()->create(['user_id' => $admin->id]);

    $data = [
        'course_id' => $course->id,
        'title' => 'New Live Session',
        'description' => 'Test description',
        'provider' => 'zoom',
        'meeting_url' => 'https://zoom.us/j/123456',
        'start_at' => now()->addDay()->toDateTimeString(),
        'end_at' => now()->addDay()->addHour()->toDateTimeString(),
        'timezone' => 'UTC',
        'reminder_minutes_before' => 30,
        'status' => 'upcoming',
    ];

    $response = $this->actingAs($admin)
        ->post(route('admin.live-classes.store'), $data);

    $response->assertSessionHasNoErrors();
    $this->assertDatabaseHas('live_classes', ['title' => 'New Live Session']);
});

test('student can join a live class and record attendance', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create(['status' => 'published']);

    // Enroll student
    Enrollment::create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    $liveClass = LiveClass::create([
        'course_id' => $course->id,
        'title' => 'Student Join Test',
        'provider' => 'google_meet',
        'meeting_url' => 'https://meet.google.com/abc-defg-hij',
        'start_at' => now()->addMinutes(5),
        'end_at' => now()->addHour(),
        'timezone' => 'UTC',
        'status' => 'live',
    ]);

    $response = $this->actingAs($student)
        ->get(route('student.live-classes.join', $liveClass->id));

    $response->assertRedirect($liveClass->meeting_url);
    $this->assertDatabaseHas('live_class_attendances', [
        'user_id' => $student->id,
        'live_class_id' => $liveClass->id,
        'status' => 'joined',
    ]);
});

test('unenrolled student cannot join a live class', function () {
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);
    $course = Course::factory()->create(['status' => 'published']);

    $liveClass = LiveClass::create([
        'course_id' => $course->id,
        'title' => 'Unauthorized Join Test',
        'provider' => 'zoom',
        'meeting_url' => 'https://zoom.us/j/123',
        'start_at' => now()->addMinutes(5),
        'end_at' => now()->addHour(),
        'timezone' => 'UTC',
        'status' => 'live',
    ]);

    $response = $this->actingAs($student)
        ->get(route('student.live-classes.join', $liveClass->id));

    $response->assertStatus(403);
});

test('reminder job sends emails to enrolled students', function () {
    Mail::fake();

    $course = Course::factory()->create();
    $student = User::factory()->create(['type' => UserType::CUSTOMER]);

    Enrollment::create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    $liveClass = LiveClass::create([
        'course_id' => $course->id,
        'title' => 'Reminder Test Class',
        'provider' => 'zoom',
        'meeting_url' => 'https://zoom.us/j/123',
        'start_at' => now()->addMinutes(20), // 20 mins from now
        'end_at' => now()->addHour(),
        'timezone' => 'UTC',
        'reminder_minutes_before' => 30, // Window should have opened (current time is after start_at - 30)
        'status' => 'upcoming',
    ]);

    (new SendLiveClassReminders)->handle();

    Mail::assertSent(LiveClassReminder::class, function ($mail) use ($student, $liveClass) {
        return $mail->hasTo($student->email) && $mail->liveClass->id === $liveClass->id;
    });

    $this->assertNotNull($liveClass->fresh()->reminder_sent_at);
});
