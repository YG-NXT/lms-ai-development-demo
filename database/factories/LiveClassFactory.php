<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LiveClass>
 */
class LiveClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'provider' => 'zoom',
            'meeting_url' => $this->faker->url,
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'class_date' => now()->format('Y-m-d'),
            'type' => 'specific',
            'timezone' => 'UTC',
            'reminder_minutes_before' => 30,
        ];
    }
}
