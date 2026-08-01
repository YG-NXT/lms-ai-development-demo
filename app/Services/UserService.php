<?php

namespace App\Services;

use App\Models\User;
use App\Traits\LogsActivity;
use Illuminate\Support\Facades\Hash;

class UserService
{
    use \App\Traits\UploadsMedia, LogsActivity;

    public function getAll(array $filters = [], int $perPage = 10)
    {
        return User::query()
            ->with('roles')
            ->when(! empty($filters['search']), function ($query) use ($filters) {
                $search = $filters['search'];
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when(! empty($filters['type']), function ($query) use ($filters) {
                if (is_array($filters['type'])) {
                    $query->whereIn('type', $filters['type']);
                } else {
                    $query->where('type', $filters['type']);
                }
            })
            ->withCount(['enrollments', 'enrollments as active_enrollments_count' => function ($query) {
                $query->where('status', \App\Enums\EnrollmentStatus::ACTIVE);
            }])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'type' => $data['type'] ?? \App\Enums\UserType::ADMIN,
            'brand_id' => $data['brand_id'] ?? null,
        ]);

        if (in_array($user->type, [\App\Enums\UserType::ADMIN, \App\Enums\UserType::SUPER_ADMIN])) {
            $user->adminProfile()->create();
        }

        if ($user->type === \App\Enums\UserType::CUSTOMER) {
            $user->customerProfile()->create();
        }

        if (isset($data['roles'])) {
            $user->roles()->sync($data['roles']);
        }

        $this->logActivity('create_user', "Created user {$user->name}");

        return $user;
    }

    public function update(User $user, array $data, $image = null): User
    {
        if (isset($data['password']) && $data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        if ($image) {
            if ($user->profile_image) {
                $this->deleteOne($user->profile_image);
            }
            $data['profile_image'] = $this->uploadOne($image, 'profile');
        }

        $user->update(\Illuminate\Support\Arr::except($data, ['roles']));

        if (isset($data['roles'])) {
            $user->roles()->sync($data['roles']);
        }

        $this->logActivity('update_user', "Updated user {$user->name}");

        return $user;
    }

    public function delete(User $user): void
    {
        $this->logActivity('delete_user', "Deleted user {$user->name}");
        $user->delete();
    }

    public function updateStatus(User $user, string $status): void
    {
        $user->forceFill([
            'status' => $status,
        ])->save();

        $this->logActivity('update_user_status', "Updated user status for {$user->name} to {$status}");
    }
}
