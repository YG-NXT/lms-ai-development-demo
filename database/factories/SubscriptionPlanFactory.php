<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionPlanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'slug' => fake()->slug(2),
            'description' => fake()->sentence(),
            'monthly_price' => fake()->randomElement([9.99, 19.99, 29.99, 49.99]),
            'yearly_price' => fake()->randomElement([99.99, 199.99, 299.99]),
            'max_courses' => null,
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}
