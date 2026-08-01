<?php

namespace Tests\Feature;

use App\Enums\EnrollmentStatus;
use App\Enums\OrderStatus;
use App\Enums\UserType;
use App\Models\Course;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_student_can_access_checkout_page_for_paid_course()
    {
        $user = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create(['price' => 100, 'status' => 'published']);

        $response = $this->actingAs($user)
            ->get(route('student.checkout.show', $course->slug));

        $response->assertStatus(200);
    }

    public function test_student_can_initiate_checkout()
    {
        $user = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create(['price' => 100, 'status' => 'published']);

        $response = $this->actingAs($user)
            ->post(route('student.checkout.store', $course->id), [
                'payment_method' => 'local',
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'course_id' => $course->id,
            'total_amount' => 100,
            'status' => OrderStatus::PENDING,
        ]);
    }

    public function test_callback_completes_order_and_enrolls_student()
    {
        $user = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create(['price' => 100, 'status' => 'published']);
        $order = Order::create([
            'order_number' => 'ORD-'.time(),
            'user_id' => $user->id,
            'course_id' => $course->id,
            'amount' => 100,
            'total_amount' => 100,
            'status' => OrderStatus::PENDING,
            'payment_method' => 'local',
        ]);

        $response = $this->actingAs($user)
            ->get(route('student.checkout.callback', [
                'order_id' => $order->id,
                'status' => 'success',
                'transaction_id' => 'test_txn_123',
            ]));

        $response->assertRedirect();

        $order->refresh();
        $this->assertEquals(OrderStatus::COMPLETED, $order->status);

        $this->assertDatabaseHas('payments', [
            'order_id' => $order->id,
            'status' => 'completed',
            'transaction_id' => 'test_txn_123',
        ]);

        $this->assertDatabaseHas('enrollments', [
            'user_id' => $user->id,
            'course_id' => $course->id,
            'order_id' => $order->id,
            'status' => EnrollmentStatus::ACTIVE,
        ]);
    }

    public function test_checkout_uses_server_authoritative_pricing()
    {
        $user = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create([
            'price' => 1000,
            'discount_price' => 800,
            'status' => 'published',
        ]);

        $response = $this->actingAs($user)
            ->post(route('student.checkout.store', $course->id), [
                'payment_method' => 'local',
            ]);

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'course_id' => $course->id,
            'amount' => 1000,
            'discount_amount' => 200,
            'total_amount' => 800,
        ]);
    }

    public function test_callback_is_idempotent()
    {
        $user = User::factory()->create(['type' => UserType::CUSTOMER]);
        $course = Course::factory()->create(['price' => 100, 'status' => 'published']);
        $order = Order::create([
            'order_number' => 'ORD-TEST',
            'user_id' => $user->id,
            'course_id' => $course->id,
            'amount' => 100,
            'total_amount' => 100,
            'status' => OrderStatus::COMPLETED,
            'payment_method' => 'local', // Casts will handle this if Enum is used
        ]);

        $response = $this->actingAs($user)
            ->get(route('student.checkout.callback', [
                'order_id' => $order->id,
                'status' => 'success',
            ]));

        $response->assertSessionHas('info', 'You already have access to this course.');
    }
}
