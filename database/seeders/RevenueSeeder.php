<?php

namespace Database\Seeders;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Course;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RevenueSeeder extends Seeder
{
    public function run(): void
    {
        $students = User::where('type', \App\Enums\UserType::CUSTOMER)->get();
        $courses = Course::all();

        if ($students->isEmpty() || $courses->isEmpty()) {
            return;
        }

        // Generate orders for the last 6 months
        for ($i = 0; $i < 6; $i++) {
            $month = Carbon::now()->subMonths($i);
            $orderCount = rand(30, 50); // Increased density

            for ($j = 0; $j < $orderCount; $j++) {
                $student = $students->random();
                $course = $courses->random();

                // Random day and time in the month
                $date = $month->copy()->startOfMonth()
                    ->addDays(rand(0, $month->daysInMonth - 1))
                    ->addHours(rand(0, 23))
                    ->addMinutes(rand(0, 59));

                $order = Order::create([
                    'user_id' => $student->id,
                    'course_id' => $course->id,
                    'order_number' => 'ORD-'.strtoupper(Str::random(10)),
                    'amount' => $course->price,
                    'discount_amount' => $course->discount_amount,
                    'total_amount' => $course->effective_price,
                    'status' => OrderStatus::COMPLETED,
                    'payment_method' => PaymentMethod::LOCAL,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);

                Payment::create([
                    'order_id' => $order->id,
                    'transaction_id' => 'TXN-'.strtoupper(Str::random(12)),
                    'amount' => $order->total_amount,
                    'status' => PaymentStatus::COMPLETED,
                    'payment_method' => PaymentMethod::LOCAL,
                    'gateway_response' => ['mode' => 'demo', 'seeded' => true],
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
            }
        }
    }
}
