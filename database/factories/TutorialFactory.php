<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tutorial>
 */
class TutorialFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence();

        return [
            'category_id' => \App\Models\Category::factory(),
            'user_id' => \App\Models\User::factory(),
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'description' => $this->faker->paragraph(),
            'level' => 'beginner',
            'language' => 'English',
            'price' => $this->faker->randomFloat(2, 10, 100),
            'status' => 'draft',
        ];
    }
}
