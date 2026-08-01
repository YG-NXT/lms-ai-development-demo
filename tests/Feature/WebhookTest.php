<?php

use App\Models\Webhook;
use App\Models\WebhookDelivery;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('webhook factory creates a valid webhook', function () {
    $webhook = Webhook::factory()->create();

    expect($webhook)->toBeInstanceOf(Webhook::class);
    expect($webhook->name)->toBeString();
    expect($webhook->url)->toBeString();
});

test('webhook has deliveries relationship', function () {
    $webhook = Webhook::factory()->create();
    WebhookDelivery::factory()->create(['webhook_id' => $webhook->id]);

    expect($webhook->deliveries)->toHaveCount(1);
});

test('webhook events are stored as array', function () {
    $webhook = Webhook::factory()->create([
        'events' => ['course.completed', 'enrollment.created'],
    ]);

    expect($webhook->events)->toBeArray();
    expect($webhook->events)->toHaveCount(2);
});

test('webhook index page loads', function () {
    Webhook::factory()->create();

    $response = $this->actingAs(\App\Models\User::factory()->create(['type' => 'admin']))->get('/admin/webhooks');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => expect($page->component)->toBe('Admin/LMS/Webhooks'));
});

test('webhook can be created', function () {
    $admin = \App\Models\User::factory()->create(['type' => 'admin']);

    $response = $this->actingAs($admin)->post('/admin/webhooks', [
        'name' => 'Test Webhook',
        'url' => 'https://example.com/webhook',
        'is_active' => true,
    ]);

    expect($response->status())->toBe(302);
    expect(Webhook::where('name', 'Test Webhook')->exists())->toBeTrue();
});

test('webhook can be updated', function () {
    $webhook = Webhook::factory()->create();
    $admin = \App\Models\User::factory()->create(['type' => 'admin']);

    $response = $this->actingAs($admin)->put("/admin/webhooks/{$webhook->id}", [
        'name' => 'Updated Webhook',
        'url' => 'https://example.com/updated',
        'is_active' => false,
    ]);

    expect($response->status())->toBe(302);
    expect($webhook->fresh()->name)->toBe('Updated Webhook');
});
