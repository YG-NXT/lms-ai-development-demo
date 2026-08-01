<?php

namespace Database\Seeders;

use App\Enums\LessonType;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use Illuminate\Database\Seeder;

class CurriculumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            // Section 1: Introduction
            $introSection = CourseSection::updateOrCreate(
                ['course_id' => $course->id, 'title' => 'Getting Started'],
                ['order' => 1]
            );

            // Lesson 1.1: Welcome (Video)
            Lesson::updateOrCreate(
                ['course_section_id' => $introSection->id, 'title' => 'Welcome to the Course'],
                [
                    'type' => LessonType::VIDEO,
                    'video_provider' => 'youtube',
                    'video_id' => 'dQw4w9WgXcQ',
                    'duration' => 5,
                    'is_preview' => true,
                    'order' => 1,
                    'content' => 'Introduction to the course goals and roadmap.',
                ]
            );

            // Lesson 1.2: Course Materials (File)
            Lesson::updateOrCreate(
                ['course_section_id' => $introSection->id, 'title' => 'Downloadable Resources'],
                [
                    'type' => LessonType::FILE,
                    'file_path' => 'dummy_image/course_resources.pdf',
                    'is_preview' => false,
                    'order' => 2,
                    'content' => 'All necessary files for the course.',
                ]
            );

            // Section 2: Core Concepts
            $coreSection = CourseSection::updateOrCreate(
                ['course_id' => $course->id, 'title' => 'Core Concepts & Fundamentals'],
                ['order' => 2]
            );

            // Lesson 2.1: Foundations (Text)
            Lesson::updateOrCreate(
                ['course_section_id' => $coreSection->id, 'title' => 'Theoretical Background'],
                [
                    'type' => LessonType::TEXT,
                    'content' => '<p>This lesson covers the primary architecture and logic flow of the subject matter.</p>',
                    'order' => 1,
                ]
            );

            // Lesson 2.2: Knowledge Check (Quiz)
            Lesson::updateOrCreate(
                ['course_section_id' => $coreSection->id, 'title' => 'Quick Knowledge Check'],
                [
                    'type' => LessonType::QUIZ,
                    'order' => 2,
                    'content' => json_encode([
                        'questions' => [
                            [
                                'id' => 1,
                                'text' => 'What is the primary benefit of this framework?',
                                'options' => ['Speed', 'Security', 'Scalability', 'All of the above'],
                                'correct' => 3,
                            ],
                            [
                                'id' => 2,
                                'text' => 'It is important to follow standard conventions.',
                                'options' => ['True', 'False'],
                                'correct' => 0,
                            ],
                        ],
                        'duration' => 10,
                    ]),
                    'total_marks' => 20,
                ]
            );

            // Section 3: Hands-on Project
            $projectSection = CourseSection::updateOrCreate(
                ['course_id' => $course->id, 'title' => 'Practical Application'],
                ['order' => 3]
            );

            // Lesson 3.1: Building the Prototype (Video)
            Lesson::updateOrCreate(
                ['course_section_id' => $projectSection->id, 'title' => 'Live Build Session'],
                [
                    'type' => LessonType::VIDEO,
                    'video_provider' => 'vimeo',
                    'video_id' => '76979871',
                    'duration' => 20,
                    'order' => 1,
                ]
            );

            // Lesson 3.2: Final Assignment (Assignment)
            Lesson::updateOrCreate(
                ['course_section_id' => $projectSection->id, 'title' => 'Final Project Submission'],
                [
                    'type' => LessonType::ASSIGNMENT,
                    'order' => 2,
                    'content' => json_encode([
                        'fields' => [
                            'text_label' => 'Describe your implementation steps',
                            'file_label' => 'Upload your project URL or ZIP',
                            'file_count' => 1,
                            'allow_text' => true,
                            'allow_description' => true,
                        ],
                    ]),
                    'total_marks' => 100,
                    'deadline' => now()->addMonths(2),
                ]
            );
        }
    }
}
