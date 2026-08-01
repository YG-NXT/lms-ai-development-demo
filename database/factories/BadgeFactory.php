<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Badge>
 */
class BadgeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'slug' => fake()->slug(3),
            'description' => fake()->sentence(),
            'icon' => '🏅',
            'color' => '#6366f1',
            'xp_required' => fake()->numberBetween(50, 500),
            'is_hidden' => false,
        ];
    }
}
