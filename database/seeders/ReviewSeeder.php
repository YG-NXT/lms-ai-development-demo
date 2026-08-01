<?php

namespace Database\Seeders;

use App\Enums\ReviewStatus;
use App\Models\Course;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::where('email', 'like', 'student%@gmail.com')->get();
        $courses = Course::all();

        $comments = [
            5 => [
                'Absolutely amazing course! The instructor is very clear.',
                'Exceeded my expectations. Highly recommended for everyone.',
                'The best investment I have made this year. So much value!',
                'I loved the hands-on projects. Really helped solidify my learning.',
            ],
            4 => [
                'Great content, but some parts were a bit fast.',
                'Very good explanations. I wish there were more assignments.',
                'Solid curriculum. I learned a lot of new things.',
            ],
            3 => [
                'Decent course, but felt a bit outdated in some sections.',
                'Okay for beginners, but lacks depth for advanced learners.',
            ],
        ];

        foreach ($courses as $course) {
            // Add 2-3 reviews per course
            $reviewers = $students->random(min(3, $students->count()));

            foreach ($reviewers as $student) {
                $rating = rand(4, 5); // Usually high for demo
                $comment = $comments[$rating][array_rand($comments[$rating])];

                Review::updateOrCreate(
                    ['user_id' => $student->id, 'course_id' => $course->id],
                    [
                        'rating' => $rating,
                        'comment' => $comment,
                        'status' => ReviewStatus::APPROVED,
                    ]
                );
            }
        }
    }
}
