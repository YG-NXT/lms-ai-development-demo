<?php

use App\Enums\UserType;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\User;
use Carbon\Carbon;

beforeEach(function () {
    $this->admin = User::factory()->create(['type' => UserType::SUPER_ADMIN]);
});

it('can create a section with an unlock date', function () {
    $course = Course::factory()->create();
    $unlockDate = Carbon::now()->addDays(5)->startOfMinute();

    $this->actingAs($this->admin)
        ->post(route('admin.courses.sections.store', $course->id), [
            'title' => 'New Section',
            'order' => 1,
            'has_unlock_date' => true,
            'unlock_date' => $unlockDate->format('Y-m-d H:i:s'),
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('course_sections', [
        'course_id' => $course->id,
        'title' => 'New Section',
        'has_unlock_date' => true,
        'unlock_date' => $unlockDate,
    ]);
});

it('can update a section unlock date', function () {
    $course = Course::factory()->create();
    $section = CourseSection::factory()->create([
        'course_id' => $course->id,
        'has_unlock_date' => false,
    ]);

    $unlockDate = Carbon::now()->addDays(10)->startOfMinute();

    $this->actingAs($this->admin)
        ->put(route('admin.sections.update', $section->id), [
            'title' => 'Updated Section Title',
            'order' => $section->order,
            'has_unlock_date' => true,
            'unlock_date' => $unlockDate->format('Y-m-d H:i:s'),
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('course_sections', [
        'id' => $section->id,
        'title' => 'Updated Section Title',
        'has_unlock_date' => true,
        'unlock_date' => $unlockDate,
    ]);
});

it('validates that unlock_date is required if has_unlock_date is true', function () {
    $course = Course::factory()->create();

    $this->actingAs($this->admin)
        ->post(route('admin.courses.sections.store', $course->id), [
            'title' => 'Invalid Section',
            'has_unlock_date' => true,
            'unlock_date' => '',
        ])
        ->assertSessionHasErrors(['unlock_date']);
});
