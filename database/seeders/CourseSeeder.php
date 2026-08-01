<?php

namespace Database\Seeders;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@admin.com')->first();
        if (! $admin) {
            return;
        }

        $webCat = Category::where('name', 'Web Development')->first();
        $uiCat = Category::where('name', 'UI/UX Design')->first();
        $appCat = Category::where('name', 'App Development')->first();
        $mktCat = Category::where('name', 'Digital Marketing')->first();

        $courses = [
            [
                'category_id' => $webCat->id,
                'user_id' => $admin->id,
                'instructor_name' => 'Prof. Alex Rivers',
                'title' => 'Laravel Mastery: From Beginner to Pro',
                'thumbnail' => 'dummy_image/course_laravel.png',
                'duration' => '40 Hours',
                'description' => 'A comprehensive guide to building modern web applications with Laravel 11. Learn routing, controllers, Eloquent, and more.',
                'level' => CourseLevel::BEGINNER,
                'language' => 'English',
                'price' => 99.99,
                'discount_price' => 49.99,
                'status' => CourseStatus::PUBLISHED,
                'has_timeline' => false,
            ],
            [
                'category_id' => $webCat->id,
                'user_id' => $admin->id,
                'instructor_name' => 'Sarah Jenkins',
                'title' => 'Mastering Vue.js v3: Reactive Frontend',
                'thumbnail' => 'dummy_image/course_vue.png',
                'duration' => '30 Hours',
                'description' => 'Build high-performance, reactive user interfaces with Vue 3, Composition API, and Pinia.',
                'level' => CourseLevel::INTERMEDIATE,
                'language' => 'English',
                'price' => 79.99,
                'discount_price' => null,
                'status' => CourseStatus::PUBLISHED,
                'has_timeline' => false,
            ],
            [
                'category_id' => $uiCat->id,
                'user_id' => $admin->id,
                'instructor_name' => 'Emily Chen',
                'title' => 'Modern UI/UX Design Principles',
                'thumbnail' => 'dummy_image/cat_ui_ux.png',
                'duration' => '25 Hours',
                'description' => 'Learn the fundamentals of design, color theory, and user psychology to build stunning interfaces.',
                'level' => CourseLevel::BEGINNER,
                'language' => 'English',
                'price' => 59.99,
                'discount_price' => 29.99,
                'status' => CourseStatus::PUBLISHED,
                'has_timeline' => true,
                'start_date' => now()->addDays(5),
                'end_date' => now()->addMonths(3),
                'last_enrollment_date' => now()->addDays(15),
            ],
            [
                'category_id' => $appCat->id,
                'user_id' => $admin->id,
                'instructor_name' => 'Mark Thompson',
                'title' => 'iOS App Development with Swift',
                'thumbnail' => 'dummy_image/cat_app.png',
                'duration' => '45 Hours',
                'description' => 'Build native iOS applications using Swift and SwiftUI. Deep dive into mobile architecture.',
                'level' => CourseLevel::ADVANCED,
                'language' => 'English',
                'price' => 129.99,
                'discount_price' => 89.99,
                'status' => CourseStatus::PUBLISHED,
                'has_timeline' => false,
            ],
            [
                'category_id' => $mktCat->id,
                'user_id' => $admin->id,
                'instructor_name' => 'Jessica Alba',
                'title' => 'Social Media Strategy & Growth',
                'thumbnail' => 'dummy_image/cat_marketing.png',
                'duration' => '15 Hours',
                'description' => 'Master the algorithms of Instagram, TikTok, and LinkedIn to grow your brand organically.',
                'level' => CourseLevel::INTERMEDIATE,
                'language' => 'English',
                'price' => 39.99,
                'discount_price' => null,
                'status' => CourseStatus::PUBLISHED,
                'has_timeline' => true,
                'start_date' => now()->subDays(10),
                'end_date' => now()->addMonths(1),
                'last_enrollment_date' => now()->addDays(2),
            ],
        ];

        foreach ($courses as $courseData) {
            Course::updateOrCreate(
                ['title' => $courseData['title']],
                $courseData
            );
        }
    }
}
