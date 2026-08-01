<?php

use App\Enums\EnrollmentStatus;
use App\Enums\UserType;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->student = User::factory()->create(['type' => UserType::CUSTOMER]);
});

it('locks course content if course start date is in the future', function () {
    $course = Course::factory()->create([
        'has_timeline' => true,
        'start_date' => Carbon::now()->addDay(),
    ]);

    $section = CourseSection::factory()->create(['course_id' => $course->id]);
    $lesson = Lesson::factory()->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    $this->actingAs($this->student)
        ->get(route('student.courses.show', $course->slug))
        ->assertInertia(fn (Assert $page) => $page
            ->component('Student/CoursePlayer')
            ->where('is_course_locked', true)
            ->where('course_unlock_date', $course->start_date->format('M d, Y'))
            ->has('course.sections.0', fn (Assert $section) => $section
                ->where('is_locked', true)
                ->where('lock_reason', 'Course will unlock on '.$course->start_date->format('M d, Y'))
                ->has('lessons.0', fn (Assert $lesson) => $lesson
                    ->where('is_locked', true)
                    ->where('content', null)
                    ->etc()
                )
                ->etc()
            )
            ->etc()
        );
});

it('locks section content if section unlock date is in the future', function () {
    $course = Course::factory()->create([
        'has_timeline' => false,
    ]);

    $section = CourseSection::factory()->create([
        'course_id' => $course->id,
        'has_unlock_date' => true,
        'unlock_date' => Carbon::now()->addDay(),
        'order' => 1,
    ]);

    $lesson = Lesson::factory()->create(['course_section_id' => $section->id]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    $this->actingAs($this->student)
        ->get(route('student.courses.show', $course->slug))
        ->assertInertia(fn (Assert $page) => $page
            ->component('Student/CoursePlayer')
            ->where('is_course_locked', false)
            ->has('course.sections.0', fn (Assert $pageSection) => $pageSection
                ->where('is_locked', true)
                ->where('lock_reason', 'Section unlocks on '.$section->unlock_date->format('M d, Y'))
                ->has('lessons.0', fn (Assert $pageLesson) => $pageLesson
                    ->where('is_locked', true)
                    ->where('content', null)
                    ->etc()
                )
                ->etc()
            )
            ->etc()
        );
});

it('maintains progression lock and cascades subsequent sections', function () {
    $course = Course::factory()->create(['has_timeline' => false]);

    // Section 1: unlocked but incomplete
    $section1 = CourseSection::factory()->create(['course_id' => $course->id, 'order' => 1]);
    $lesson1 = Lesson::factory()->create(['course_section_id' => $section1->id]);

    // Section 2: locked by progression
    $section2 = CourseSection::factory()->create(['course_id' => $course->id, 'order' => 2]);
    $lesson2 = Lesson::factory()->create(['course_section_id' => $section2->id]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    $this->actingAs($this->student)
        ->get(route('student.courses.show', $course->slug))
        ->assertInertia(fn (Assert $page) => $page
            ->has('course.sections', 2)
            ->where('course.sections.0.is_locked', false)
            ->where('course.sections.1.is_locked', true)
            ->where('course.sections.1.lock_reason', 'Please complete the previous section to unlock this content')
            ->etc()
        );
});

it('blocks next section even if previous is complete if next has future unlock date', function () {
    $course = Course::factory()->create(['has_timeline' => false]);

    // Section 1: complete
    $section1 = CourseSection::factory()->create(['course_id' => $course->id, 'order' => 1]);
    $lesson1 = Lesson::factory()->create(['course_section_id' => $section1->id]);

    // Complete lesson 1
    \App\Models\LessonCompletion::create([
        'user_id' => $this->student->id,
        'lesson_id' => $lesson1->id,
        'completed_at' => now(),
    ]);

    // Section 2: Locked by date
    $section2 = CourseSection::factory()->create([
        'course_id' => $course->id,
        'order' => 2,
        'has_unlock_date' => true,
        'unlock_date' => Carbon::now()->addDay(),
    ]);
    $lesson2 = Lesson::factory()->create(['course_section_id' => $section2->id]);

    // Section 3: Locked by Section 2 date cascade
    $section3 = CourseSection::factory()->create(['course_id' => $course->id, 'order' => 3]);

    Enrollment::factory()->create([
        'user_id' => $this->student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::ACTIVE,
    ]);

    $this->actingAs($this->student)
        ->get(route('student.courses.show', $course->slug))
        ->assertInertia(fn (Assert $page) => $page
            ->where('course.sections.0.is_locked', false)
            ->where('course.sections.1.is_locked', true)
            ->where('course.sections.1.lock_reason', 'Section unlocks on '.$section2->unlock_date->format('M d, Y'))
            ->where('course.sections.2.is_locked', true)
            ->where('course.sections.2.lock_reason', 'Please complete the previous section to unlock this content')
            ->etc()
        );
});
