<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\LiveClass;
use App\Models\User;

class LiveClassPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission(Permissions::LIVE_CLASS_MANAGEMENT) || $user->isCustomer();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, LiveClass $liveClass): bool
    {
        if ($user->hasPermission(Permissions::LIVE_CLASS_MANAGEMENT)) {
            return true;
        }

        if ($user->isCustomer()) {
            return $user->enrolledCourses()->where('courses.id', $liveClass->course_id)->exists();
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission(Permissions::LIVE_CLASS_MANAGEMENT);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LiveClass $liveClass): bool
    {
        return $user->hasPermission(Permissions::LIVE_CLASS_MANAGEMENT);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, LiveClass $liveClass): bool
    {
        return $user->hasPermission(Permissions::LIVE_CLASS_MANAGEMENT);
    }
}
