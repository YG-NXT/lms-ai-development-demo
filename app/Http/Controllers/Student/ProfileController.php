<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia; // Added for the return type hint
use Inertia\Response; // Added for MustVerifyEmail check

class ProfileController extends Controller
{
    public function __construct(protected UserService $userService) {}

    public function edit(Request $request): Response
    {
        $user = $request->user();
        
        // Get subscription data
        $subscription = null;
        if ($user->subscription_plan_id && $user->subscriptionPlan) {
            $subscription = [
                'plan_name' => $user->subscriptionPlan->name,
                'status' => $user->subscription_ends_at && now()->lt($user->subscription_ends_at) ? 'active' : 'expired',
                'ends_at' => $user->subscription_ends_at,
                'starts_at' => $user->subscription_starts_at,
            ];
        }

        return Inertia::render('Student/Pages/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $request->user()->customerProfile,
            'subscription' => $subscription,
        ]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $this->userService->update($request->user(), $request->validated());

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
