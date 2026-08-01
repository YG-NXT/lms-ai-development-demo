<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TutorialSection extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'tutorial_id',
        'title',
        'description',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function tutorial(): BelongsTo
    {
        return $this->belongsTo(Tutorial::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(TutorialLesson::class)->orderBy('order');
    }
}
