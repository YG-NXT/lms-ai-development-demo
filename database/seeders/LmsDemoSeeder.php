<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class LmsDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting LMS Demo Seeding...');

        // 1. Media Synchronization
        $this->syncMedia();

        // 2. Roles and Permissions
        $this->call(RoleSeeder::class);

        // 3. User Seeders
        $this->call(AdminUserSeeder::class);
        $this->call(StudentUserSeeder::class);

        // 4. Content Seeders
        $this->call(CategorySeeder::class);
        $this->call(CourseSeeder::class);
        $this->call(CurriculumSeeder::class);
        $this->call(TutorialContentSeeder::class);

        // 5. Activity Seeders
        $this->call(EnrollmentSeeder::class);
        $this->call(ReviewSeeder::class);
        $this->call(CertificateTemplateSeeder::class);
        $this->call(CertificateSeeder::class);
        $this->call(RevenueSeeder::class);

        // 6. System Settings
        $this->call(BrandingSettingsSeeder::class);

        $this->command->info('LMS Demo Seeding Completed!');
    }

    /**
     * Sync dummy images to public storage.
     */
    protected function syncMedia(): void
    {
        $sourcePath = database_path('seeders/dummy_image');
        $destinationPath = storage_path('app/public/dummy_image');

        if (! File::exists($sourcePath)) {
            $this->command->error('Source dummy images directory not found: '.$sourcePath);

            return;
        }

        if (! File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }

        $files = File::files($sourcePath);
        foreach ($files as $file) {
            File::copy($file->getPathname(), $destinationPath.'/'.$file->getFilename());
        }

        $this->command->info('Media synced to storage/app/public/dummy_image');
    }
}
