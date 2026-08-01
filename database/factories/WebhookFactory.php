<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Webhook>
 */
class WebhookFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'url' => fake()->url(),
            'secret' => str()->random(32),
            'events' => ['course.completed', 'enrollment.created'],
            'is_active' => true,
            'timeout' => 30,
        ];
    }
}
