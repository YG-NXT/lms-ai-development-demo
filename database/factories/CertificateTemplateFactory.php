<?php

namespace Database\Factories;

use App\Models\CertificateTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CertificateTemplate>
 */
class CertificateTemplateFactory extends Factory
{
    protected $model = CertificateTemplate::class;

    public function definition(): array
    {
        return [
            'title' => 'Certificate of Completion',
            'body_text' => 'has successfully completed the course',
            'instructor_name_label' => 'Course Instructor',
            'organization_name' => fake()->company(),
            'logo_url' => null,
            'background_url' => null,
            'signature_url' => null,
            'is_active' => true,
        ];
    }
}
