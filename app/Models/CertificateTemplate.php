<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CertificateTemplate extends BaseModel
{
    /** @use HasFactory<\Database\Factories\CertificateTemplateFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'body_text',
        'instructor_name_label',
        'organization_name',
        'logo_url',
        'background_url',
        'signature_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
