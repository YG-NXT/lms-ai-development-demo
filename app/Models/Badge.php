<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Badge extends BaseModel
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'icon', 'color', 'xp_required', 'is_hidden'];

    protected $casts = ['xp_required' => 'integer', 'is_hidden' => 'boolean'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_achievements')
            ->withPivot('xp_earned')
            ->withTimestamps();
    }

    public function userAchievements(): HasMany
    {
        return $this->hasMany(UserAchievement::class);
    }
}
