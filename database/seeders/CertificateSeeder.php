<?php

namespace Database\Seeders;

use App\Enums\EnrollmentStatus;
use App\Models\Certificate;
use App\Models\CertificateTemplate;
use App\Models\Enrollment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $template = CertificateTemplate::where('is_active', true)->first();

        $completedEnrollments = Enrollment::where('status', EnrollmentStatus::COMPLETED)->get();

        foreach ($completedEnrollments as $enrollment) {
            Certificate::updateOrCreate(
                [
                    'user_id' => $enrollment->user_id,
                    'course_id' => $enrollment->course_id,
                ],
                [
                    'certificate_id' => 'CERT-'.strtoupper(Str::random(12)),
                    'verification_code' => strtoupper(Str::random(16)),
                    'template_id' => $template?->id,
                    'issued_at' => $enrollment->completed_at ?? now(),
                    'status' => 'issued',
                ]
            );
        }
    }
}
