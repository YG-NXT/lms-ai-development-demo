<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaxSetting extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'rate',
        'scope',
        'is_active',
        'rules',
    ];

    protected $casts = [
        'rate' => 'decimal:2',
        'is_active' => 'boolean',
        'rules' => 'array',
    ];
}
