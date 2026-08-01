<?php

namespace Tests\Feature;

use App\Enums\EnrollmentStatus;
use App\Enums\OrderStatus;
use App\Models\BusinessSetting;
use App\Models\Course;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class BkashPaymentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        \Illuminate\Support\Facades\Cache::flush();

        // Seed basic settings
        BusinessSetting::create(['key' => 'bkash_enabled', 'value' => '1']);
        BusinessSetting::create(['key' => 'bkash_app_key', 'value' => 'mock_key']);
        BusinessSetting::create(['key' => 'bkash_app_secret', 'value' => 'mock_secret']);
        BusinessSetting::create(['key' => 'bkash_username', 'value' => 'mock_user']);
        BusinessSetting::create(['key' => 'bkash_password', 'value' => 'mock_pass']);
        BusinessSetting::create(['key' => 'bkash_mode', 'value' => 'sandbox']);

        // Mock Roles
        Role::create(['name' => 'Student', 'slug' => 'student']);
    }

    public function test_bkash_payment_lifecycle()
    {
        // 1. Setup User and Course
        $this->withoutExceptionHandling();
        $user = User::factory()->create(['type' => \App\Enums\UserType::CUSTOMER]);
        $user->roles()->attach(Role::where('slug', 'student')->first());
        $course = Course::factory()->create(['price' => 1000]);

        $this->actingAs($user);

        // Mock bKash APIs
        Http::fake([
            // Grant Token
            '*/tokenized/checkout/token/grant' => Http::response([
                'id_token' => 'mock_id_token',
                'expires_in' => 3600,
            ], 200),

            // Create Payment
            '*/tokenized/checkout/create' => Http::response([
                'paymentID' => 'mock_payment_id',
                'bkashURL' => 'https://sandbox.bkash.com/checkout/pay',
                'callbackURL' => 'http://localhost/student/checkout/callback',
                'amount' => '1000.00',
                'currency' => 'BDT',
                'intent' => 'sale',
                'merchantInvoiceNumber' => 'Inv123',
            ], 200),

            // Execute Payment
            '*/tokenized/checkout/execute' => Http::response([
                'paymentID' => 'mock_payment_id',
                'trxID' => 'TRX123456',
                'transactionStatus' => 'Completed',
                'amount' => '1000.00',
                'currency' => 'BDT',
                'intent' => 'sale',
                'merchantInvoiceNumber' => 'Inv123',
            ], 200),
        ]);

        // 2. Initiate Payment
        $response = $this->post(route('student.checkout.store', $course->id), [
            'payment_method' => 'bkash',
        ]);

        // Assert Redirect to bKash URL (can be 302 for standard redirect or 409 for Inertia)
        $this->assertContains($response->status(), [302, 409]);

        if ($response->status() === 409) {
            // Inertia location response
            $this->assertEquals('https://sandbox.bkash.com/checkout/pay', $response->headers->get('X-Inertia-Location'));
        } else {
            // Standard redirect
            $this->assertEquals('https://sandbox.bkash.com/checkout/pay', $response->headers->get('Location'));
        }

        // Verify Order Created
        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => OrderStatus::PENDING,
            'payment_method' => 'bkash',
        ]);

        $order = \App\Models\Order::where('user_id', $user->id)->first();

        // 3. Simulate Callback (Verify)
        $callbackResponse = $this->get(route('student.checkout.callback', [
            'paymentID' => 'mock_payment_id',
            'status' => 'success',
            'order_id' => $order->id,
        ]));

        // Assert Redirection to Course Page with Success
        $callbackResponse->assertRedirect(route('student.courses.show', $course->slug));
        $callbackResponse->assertSessionHas('success');

        // Verify Order Updated
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => OrderStatus::COMPLETED,
        ]);

        // Verify Payment Recorded
        $this->assertDatabaseHas('payments', [
            'order_id' => $order->id,
            'transaction_id' => 'TRX123456',
            'status' => 'completed',
            'payment_method' => 'bkash',
        ]);

        // Verify Enrollment
        $this->assertDatabaseHas('enrollments', [
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => EnrollmentStatus::ACTIVE,
        ]);
    }

    public function test_bkash_payment_failure()
    {
        // 1. Setup User and Course
        $user = User::factory()->create(['type' => \App\Enums\UserType::CUSTOMER]);
        $user->roles()->attach(Role::where('slug', 'student')->first());
        $course = Course::factory()->create(['price' => 1000]);

        $this->actingAs($user);

        // Mock bKash APIs
        Http::fake([
            '*/tokenized/checkout/token/grant' => Http::response(['id_token' => 'mock_id_token'], 200),
            '*/tokenized/checkout/create' => Http::response(['bkashURL' => 'https://sandbox.bkash.com', 'paymentID' => 'fail_payment'], 200),
        ]);

        // 2. Initiate Payment (to create pending order)
        $this->post(route('student.checkout.store', $course->id), ['payment_method' => 'bkash']);
        $order = \App\Models\Order::where('user_id', $user->id)->first();

        // 3. Simulate Failure Callback
        $callbackResponse = $this->get(route('student.checkout.callback', [
            'paymentID' => 'fail_payment',
            'status' => 'failure',
            'order_id' => $order->id,
        ]));

        // Assert Redirect with Error
        $callbackResponse->assertRedirect(route('courses.show', $course->slug));
        $callbackResponse->assertSessionHas('error');

        // Verify Order Cancelled
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => OrderStatus::CANCELLED,
        ]);

        // Verify NO Enrollment
        $this->assertDatabaseMissing('enrollments', [
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);
    }
}
