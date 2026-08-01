<?php

namespace App\Services;

use App\Models\Certificate;
use App\Models\CertificateTemplate;
use App\Models\Course;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class CertificateService
{
    public function __construct(protected BusinessSettingService $settingService) {}

    /**
     * Issue a certificate to a user for a specific course.
     */
    public function issue(User $user, Course $course): ?Certificate
    {
        // Prevent duplicate issuance
        $existing = Certificate::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            return $existing;
        }

        $template = CertificateTemplate::where('is_active', true)->first();

        // Generate unique verification code
        $verificationCode = $this->generateUniqueVerificationCode();

        // Generate display ID (e.g., CERT-2026-XXXXX)
        $certificateDisplayId = 'CERT-'.date('Y').'-'.strtoupper(Str::random(6));

        $certificate = Certificate::create([
            'certificate_id' => $certificateDisplayId,
            'user_id' => $user->id,
            'course_id' => $course->id,
            'verification_code' => $verificationCode,
            'issued_at' => now(),
            'template_id' => $template?->id,
            'status' => 'issued',
        ]);

        return $certificate;
    }

    /**
     * Generate a unique verification code.
     */
    protected function generateUniqueVerificationCode(): string
    {
        do {
            $code = strtoupper(Str::random(10));
        } while (Certificate::where('verification_code', $code)->exists());

        return $code;
    }

    /**
     * Generate PDF for a certificate.
     */
    public function generatePdf(Certificate $certificate)
    {
        $certificate->load(['user', 'course', 'template']);

        $pdf = Pdf::loadView('certificates.template', [
            'certificate' => $certificate,
            'user' => $certificate->user,
            'course' => $certificate->course,
            'template' => $certificate->template,
        ])->setPaper('a4', 'landscape')
            ->setOptions([
                'isRemoteEnabled' => true,
                'isHtml5ParserEnabled' => true,
                'defaultFont' => 'sans-serif',
            ]);

        return $pdf;
    }

    /**
     * Verify a certificate by its code.
     */
    public function verify(string $code): ?Certificate
    {
        return Certificate::with(['user', 'course'])
            ->where('verification_code', $code)
            ->where('status', 'issued')
            ->first();
    }
}
