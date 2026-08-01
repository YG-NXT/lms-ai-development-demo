<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TutorialLesson extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'tutorial_section_id',
        'title',
        'slug',
        'description',
        'content',
        'video_url',
        'content_type',
        'order',
        'duration',
        'is_free',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_free' => 'boolean',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(TutorialSection::class);
    }
}
