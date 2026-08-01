<?php

use App\Models\Tutorial;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('public tutorial index is accessible without authentication', function () {
    Tutorial::factory()->create([
        'title' => 'Free Tutorial',
        'status' => 'published',
        'is_free' => true,
    ]);

    $response = $this->get('/tutorials');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Guest/Pages/Tutorials')
        ->has('tutorials.data', 1)
        ->has('tutorials.data.0', fn ($tutorial) => $tutorial
            ->where('title', 'Free Tutorial')
            ->etc()
        )
    );
});

test('free tutorial is accessible without authentication', function () {
    $tutorial = Tutorial::factory()->create([
        'title' => 'Free Tutorial',
        'status' => 'published',
        'is_free' => true,
    ]);

    $response = $this->get('/tutorials/' . $tutorial->slug);

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Guest/Pages/TutorialShow')
        ->has('tutorial', fn ($t) => $t
            ->where('title', 'Free Tutorial')
            ->etc()
        )
        ->where('canAccess', true)
    );
});

test('paid tutorial shows paywall for guests', function () {
    $tutorial = Tutorial::factory()->create([
        'title' => 'Paid Tutorial',
        'status' => 'published',
        'is_free' => false,
        'price' => 49.99,
    ]);

    $response = $this->get('/tutorials/' . $tutorial->slug);

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Guest/Pages/TutorialShow')
        ->has('tutorial', fn ($t) => $t
            ->where('title', 'Paid Tutorial')
            ->etc()
        )
        ->where('canAccess', false)
    );
});
