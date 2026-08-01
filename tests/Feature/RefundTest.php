<?php

namespace Tests\Feature;

use App\Enums\EnrollmentStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\UserType;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RefundTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_admin_can_refund_a_completed_order()
    {
        $admin = User::factory()->create(['type' => UserType::ADMIN]);
        $student = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create(['price' => 100]);

        $order = Order::create([
            'order_number' => 'ORD-'.time(),
            'user_id' => $student->id,
            'course_id' => $course->id,
            'amount' => 100,
            'total_amount' => 100,
            'status' => OrderStatus::COMPLETED,
            'payment_method' => 'local',
        ]);

        Payment::create([
            'order_id' => $order->id,
            'amount' => 100,
            'payment_method' => 'local',
            'status' => PaymentStatus::COMPLETED,
            'transaction_id' => 'test_txn_123',
        ]);

        Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'order_id' => $order->id,
            'status' => EnrollmentStatus::ACTIVE,
        ]);

        $response = $this->actingAs($admin)
            ->post(route('admin.orders.refund', $order->id), [
                'reason' => 'Student requested',
            ]);

        $response->assertStatus(302);

        $order->refresh();
        $this->assertEquals(OrderStatus::REFUNDED, $order->status);

        $this->assertDatabaseHas('refunds', [
            'order_id' => $order->id,
            'reason' => 'Student requested',
        ]);

        $this->assertDatabaseHas('enrollments', [
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => EnrollmentStatus::REFUNDED,
        ]);
    }

    public function test_refunded_student_cannot_access_course_content()
    {
        $student = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create(['status' => 'published']);

        Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => EnrollmentStatus::REFUNDED,
        ]);

        $response = $this->actingAs($student)
            ->get(route('student.courses.show', $course->slug));

        $response->assertRedirect();
        $response->assertSessionHas('error');
    }
}
