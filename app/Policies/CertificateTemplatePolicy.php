<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\CertificateTemplate;
use App\Models\User;

class CertificateTemplatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT);
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
    public function update(User $user, CertificateTemplate $certificateTemplate): bool
    {
        return $user->hasPermission(Permissions::CERTIFICATE_MANAGEMENT);
    }
}
