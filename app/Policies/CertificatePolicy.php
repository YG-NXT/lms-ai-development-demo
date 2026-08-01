<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\Certificate;
use App\Models\User;

class CertificatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Certificate $certificate): bool
    {
        if ($user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT)) {
            return true;
        }

        return $user->id === $certificate->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Certificate $certificate): bool
    {
        return $user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Certificate $certificate): bool
    {
        return $user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT);
    }
}
