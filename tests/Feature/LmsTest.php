<?php

namespace Tests\Feature;

use App\Enums\EnrollmentStatus;
use App\Enums\UserType;
use App\Models\Category;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LmsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_student_can_enroll_in_course()
    {
        $student = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create([
            'title' => 'Test Course',
            'slug' => 'test-course',
            'status' => 'published',
        ]);

        $response = $this->actingAs($student)
            ->post(route('enroll.store', $course->slug));

        $response->assertRedirect(route('customer.courses.index'));
        $this->assertDatabaseHas('enrollments', [
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => EnrollmentStatus::ACTIVE,
        ]);
    }

    public function test_student_can_access_enrolled_course_player()
    {
        $student = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create([
            'title' => 'Test Course',
            'slug' => 'test-course',
            'status' => 'published',
        ]);

        // Manually enroll
        Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => EnrollmentStatus::ACTIVE,
            'enrolled_at' => now(),
        ]);

        $response = $this->actingAs($student)
            ->get(route('student.courses.show', $course->slug));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Student/CoursePlayer')
            ->has('course')
        );
    }

    public function test_student_cannot_access_unenrolled_course_player()
    {
        $student = User::factory()->create(['type' => UserType::CUSTOMER]);
        $category = Category::factory()->create();
        $course = Course::factory()->create([
            'category_id' => $category->id,
            'slug' => 'secret-course',
        ]);

        $response = $this->actingAs($student)
            ->get(route('student.courses.show', $course->slug));

        $response->assertStatus(403);
    }

    public function test_admin_can_update_course_dates()
    {
        $admin = User::factory()->create(['type' => UserType::ADMIN]);
        $category = Category::factory()->create(['name' => 'Tech']);
        $course = Course::factory()->create([
            'category_id' => $category->id,
            'user_id' => $admin->id,
        ]);

        $startDate = now()->addDay()->format('Y-m-d');
        $endDate = now()->addMonths(3)->format('Y-m-d');

        $response = $this->actingAs($admin)
            ->put(route('admin.courses.update', $course->id), [
                'category_id' => $category->id,
                'title' => 'Updated Title',
                'level' => 'beginner',
                'language' => 'English',
                'price' => 0,
                'is_free' => true,
                'status' => 'published',
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $this->assertDatabaseHas('courses', [
            'id' => $course->id,
            'start_date' => $startDate.' 00:00:00',
            'end_date' => $endDate.' 00:00:00',
        ]);
    }
}
