<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class LearningPath extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'thumbnail', 'badge', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'learning_path_courses')
            ->withPivot(['sort_order', 'is_required'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }
}
