<?php

namespace Database\Seeders;

use App\Models\Tutorial;
use App\Models\TutorialSection;
use App\Models\TutorialLesson;
use Illuminate\Database\Console\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TutorialContentSeeder extends Seeder
{
    public function run(): void
    {
        $tutorial = Tutorial::where('slug', 'laravel-fundamentals')->first();
        if (! $tutorial) return;

        $section = TutorialSection::create([
            'tutorial_id' => $tutorial->id,
            'title' => 'Getting Started',
            'description' => 'Introduction to Laravel',
            'order' => 1,
        ]);

        TutorialLesson::create([
            'tutorial_section_id' => $section->id,
            'title' => 'What is Laravel?',
            'slug' => 'what-is-laravel',
            'description' => 'Learn what Laravel is and why it is used.',
            'content' => '<h2>What is Laravel?</h2><p>Laravel is a web application framework with expressive, elegant syntax.</p>',
            'content_type' => 'video',
            'duration' => 10,
            'order' => 1,
        ]);

        $tutorial2 = Tutorial::where('slug', 'vue3-composition-api')->first();
        if ($tutorial2) {
            $section2 = TutorialSection::create([
                'tutorial_id' => $tutorial2->id,
                'title' => 'Composition API Basics',
                'description' => 'Learn Vue 3 Composition API',
                'order' => 1,
            ]);

            TutorialLesson::create([
                'tutorial_section_id' => $section2->id,
                'title' => 'Setup and First Component',
                'slug' => 'setup-and-first-component',
                'description' => 'Setting up Vue 3 and creating your first component',
                'content' => '<h2>Setup</h2><p>Vue 3 Composition API allows you to use reactive state and lifecycle hooks.</p>',
                'content_type' => 'video',
                'duration' => 15,
                'order' => 1,
            ]);
        }
    }
}
