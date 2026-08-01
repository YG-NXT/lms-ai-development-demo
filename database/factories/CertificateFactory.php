<?php

namespace Database\Factories;

use App\Models\Certificate;
use App\Models\CertificateTemplate;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Certificate>
 */
class CertificateFactory extends Factory
{
    protected $model = Certificate::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory(),
            'certificate_id' => 'CERT-'.strtoupper(Str::random(12)),
            'verification_code' => strtoupper(Str::random(16)),
            'template_id' => CertificateTemplate::factory(),
            'issued_at' => now(),
            'status' => 'issued',
        ];
    }
}
