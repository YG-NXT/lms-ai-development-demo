<?php

use App\Models\Certificate;
use App\Models\CertificateTemplate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('certificate has template relationship', function () {
    $template = CertificateTemplate::factory()->create();
    $user = User::factory()->create();
    $course = Course::factory()->create();

    $certificate = Certificate::factory()->create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'template_id' => $template->id,
    ]);

    expect($certificate->template)->not->toBeNull();
    expect($certificate->template->title)->toBe($template->title);
});

test('certificate template relationship returns null when no template', function () {
    $user = User::factory()->create();
    $course = Course::factory()->create();

    $certificate = Certificate::factory()->create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'template_id' => null,
    ]);

    expect($certificate->template)->toBeNull();
});

test('certificate seeder creates certificates with template_id', function () {
    $template = CertificateTemplate::create([
        'title' => 'Certificate of Completion',
        'body_text' => 'has successfully completed the course',
        'is_active' => true,
    ]);

    $user = User::factory()->create();
    $course = Course::factory()->create();

    Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'status' => 'completed',
    ]);

    $seeder = new \Database\Seeders\CertificateSeeder;
    $seeder->run();

    $certificate = Certificate::where('user_id', $user->id)->first();

    expect($certificate)->not->toBeNull();
    expect($certificate->template_id)->toBe($template->id);
});
