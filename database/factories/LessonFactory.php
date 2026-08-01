<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(\App\Enums\LessonType::cases());

        $content = fake()->paragraphs(3, true);

        if ($type === \App\Enums\LessonType::QUIZ) {
            $content = json_encode([
                'questions' => [
                    [
                        'id' => 1,
                        'text' => fake()->sentence().'?',
                        'options' => [fake()->word(), fake()->word(), fake()->word(), fake()->word()],
                        'correct' => 0,
                    ],
                    [
                        'id' => 2,
                        'text' => fake()->sentence().'?',
                        'options' => [fake()->word(), fake()->word(), fake()->word(), fake()->word()],
                        'correct' => 1,
                    ],
                ],
                'duration' => 15,
            ]);
        } elseif ($type === \App\Enums\LessonType::ASSIGNMENT) {
            $content = json_encode([
                'fields' => [
                    'text_label' => 'Explain your answer',
                    'file_label' => 'Upload your work',
                    'file_count' => 1,
                    'allow_text' => true,
                    'allow_description' => true,
                ],
            ]);
        }

        return [
            'course_section_id' => \App\Models\CourseSection::factory(),
            'title' => fake()->sentence(4),
            'type' => $type,
            'content' => $content,
            'is_preview' => fake()->boolean(20),
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
