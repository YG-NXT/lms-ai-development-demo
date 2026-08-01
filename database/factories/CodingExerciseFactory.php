<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CodingExercise>
 */
class CodingExerciseFactory extends Factory
{
    public function definition(): array
    {
        $language = fake()->randomElement(['php', 'javascript', 'html', 'css']);

        $starterCode = match ($language) {
            'php' => '<?php'."\n\n// Write your PHP code here\necho 'Hello, World!';",
            'javascript' => '// Write your JavaScript code here\nconsole.log("Hello, World!");',
            'html' => '<!DOCTYPE html>\n<html>\n<head>\n    <title>Exercise</title>\n</head>\n<body>\n    <!-- Your HTML here -->\n</body>\n</html>',
            'css' => '/* Write your CSS here */\nbody {\n    /* styles */\n}',
            default => '',
        };

        return [
            'lesson_id' => \App\Models\Lesson::factory(),
            'language' => $language,
            'starter_code' => $starterCode,
            'test_cases' => [
                [
                    'name' => 'Sample Test 1',
                    'input' => null,
                    'expected' => 'Hello, World!',
                ],
            ],
            'constraints' => [
                'Time limit: 10 seconds',
                'Memory limit: 128 MB',
            ],
            'time_limit_seconds' => 10,
            'memory_limit_mb' => 128,
            'enable_sandbox' => true,
        ];
    }
}
