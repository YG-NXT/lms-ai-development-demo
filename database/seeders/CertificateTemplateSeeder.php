<?php

namespace Database\Seeders;

use App\Models\CertificateTemplate;
use Illuminate\Database\Seeder;

class CertificateTemplateSeeder extends Seeder
{
    public function run(): void
    {
        CertificateTemplate::firstOrCreate(
            ['title' => 'Certificate of Completion'],
            [
                'body_text' => 'has successfully completed the course',
                'instructor_name_label' => 'Course Instructor',
                'organization_name' => config('app.name', 'LMS'),
                'is_active' => true,
            ]
        );
    }
}
