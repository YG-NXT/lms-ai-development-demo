<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Web Development',
                'description' => 'Master the art of building websites with PHP, Laravel, Vue, and more.',
                'icon' => 'dummy_image/cat_web.png',
                'is_active' => true,
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'Learn to create beautiful and user-friendly interfaces.',
                'icon' => 'dummy_image/cat_ui_ux.png',
                'is_active' => true,
            ],
            [
                'name' => 'App Development',
                'description' => 'Build high-performance mobile applications for iOS and Android.',
                'icon' => 'dummy_image/cat_app.png',
                'is_active' => true,
            ],
            [
                'name' => 'Digital Marketing',
                'description' => 'Grow your business with SEO, Social Media, and Content Marketing.',
                'icon' => 'dummy_image/cat_marketing.png',
                'is_active' => true,
            ],
            [
                'name' => 'Data Analytics',
                'description' => 'Unlock insights from data using modern analytical tools.',
                'icon' => null,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['name' => $categoryData['name']],
                $categoryData
            );
        }
    }
}
