<?php

use App\Models\AiTutorMessage;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('ai_tutor_messages table exists', function () {
    $msg = AiTutorMessage::factory()->create();

    expect($msg)->toBeInstanceOf(AiTutorMessage::class);
    expect($msg->message)->toBeString();
});

test('ai tutor messages are associated with user and course', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    AiTutorMessage::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'message' => 'What is a variable?',
        'response' => 'A variable is a named storage location...',
        'responded_at' => now(),
    ]);

    expect($user->aiTutorMessages)->toHaveCount(1);
    expect($course->aiTutorMessages)->toHaveCount(1);
});

test('ai tutor page loads for a course', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    AiTutorMessage::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'message' => 'Hello',
        'response' => 'Hi there!',
        'responded_at' => now(),
    ]);

    $response = $this->actingAs($user)->get("/courses/{$course->slug}/ai-tutor");

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->component)->toBe('Student/Pages/AiTutor');
    });
});

test('ai tutor can ask a question', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    $response = $this->actingAs($user)->post(
        route('student.courses.ai-tutor.ask', $course->id),
        ['message' => 'What is a function?']
    );

    expect($response->status())->toBe(200);
    expect($response->json('message.message'))->toBe('What is a function?');
    expect($response->json('message.response'))->toBeString();
});
