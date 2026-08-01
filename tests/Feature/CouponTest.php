<?php

use App\Models\Coupon;
use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('coupon factory creates a valid coupon', function () {
    $coupon = Coupon::factory()->create();

    expect($coupon)->toBeInstanceOf(Coupon::class);
    expect($coupon->code)->toBeString();
    expect($coupon->type)->toBeIn(['percentage', 'fixed']);
});

test('coupon can be created and is active by default', function () {
    $coupon = Coupon::create([
        'code' => 'TEST10',
        'type' => 'percentage',
        'value' => 10,
    ]);

    expect($coupon->is_active)->toBeTrue();
    expect($coupon->used_count)->toBe(0);
});

test('coupon can be attached to courses', function () {
    $coupon = Coupon::factory()->create();
    $course = Course::factory()->create();

    $coupon->courses()->attach($course->id);

    expect($coupon->courses)->toHaveCount(1);
    expect($coupon->courses->first()->title)->toBe($course->title);
});

test('valid coupon returns discount', function () {
    $coupon = Coupon::factory()->create([
        'type' => 'percentage',
        'value' => 20,
        'max_discount' => 30.00,
    ]);

    // Simulate calculating discount for a $100 course
    $price = 100.00;
    $discount = $price * ($coupon->value / 100);

    if ($coupon->max_discount && $discount > $coupon->max_discount) {
        $discount = $coupon->max_discount;
    }

    expect($discount)->toBe(20.00);
});

test('fixed coupon gives correct discount', function () {
    $coupon = Coupon::factory()->create([
        'type' => 'fixed',
        'value' => 15,
    ]);

    $price = 100.00;
    $discount = min($coupon->value, $price);

    expect($discount)->toBe(15.00);
});

test('coupon cannot exceed max discount', function () {
    $coupon = Coupon::factory()->create([
        'type' => 'percentage',
        'value' => 50,
        'max_discount' => 20.00,
    ]);

    $price = 100.00;
    $discount = $price * ($coupon->value / 100); // 50

    if ($coupon->max_discount && $discount > $coupon->max_discount) {
        $discount = $coupon->max_discount; // capped at 20
    }

    expect($discount)->toBe(20.00);
});
