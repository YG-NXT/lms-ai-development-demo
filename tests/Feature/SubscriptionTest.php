<?php

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('subscription_plans table exists', function () {
    $plan = SubscriptionPlan::factory()->create();

    expect($plan)->toBeInstanceOf(SubscriptionPlan::class);
    expect($plan->name)->toBeString();
    expect($plan->monthly_price)->toBeNumeric();
});

test('user can subscribe to a plan', function () {
    $user = User::factory()->create();
    $plan = SubscriptionPlan::factory()->create(['name' => 'Premium']);

    $response = $this->actingAs($user)->post(
        route('student.subscriptions.subscribe', ['plan' => $plan->slug])
    );

    expect($response->status())->toBe(302);
    expect($user->fresh()->subscription_plan_id)->toBe($plan->id);
});

test('subscription plans listing page loads', function () {
    SubscriptionPlan::factory()->create();

    $response = $this->get('/student/subscriptions');

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->component)->toBe('Student/Pages/Subscriptions');
    });
});

test('subscription plan has correct price formatting', function () {
    $plan = SubscriptionPlan::factory()->create([
        'monthly_price' => 19.99,
        'yearly_price' => 199.99,
    ]);

    expect($plan->monthly_price)->toBe(19.99);
    expect($plan->yearly_price)->toBe(199.99);
});
