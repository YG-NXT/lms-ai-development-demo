<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CoursePrerequisite>
 */
class CoursePrerequisiteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id' => \App\Models\Course::factory(),
            'prerequisite_course_id' => \App\Models\Course::factory(),
            'required' => true,
        ];
    }
}
