<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SubscriptionPlanController extends Controller
{
    /**
     * Display subscription plans
     */
    public function index()
    {
        $plans = SubscriptionPlan::orderBy('sort_order')->get();

        return Inertia::render('Admin/LMS/Subscription/Index', [
            'plans' => $plans,
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('Admin/LMS/Subscription/Create');
    }

    /**
     * Store new subscription plan
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'monthly_price' => 'required|numeric|min:0',
            'yearly_price' => 'required|numeric|min:0',
            'max_courses' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // Auto-generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Ensure slug uniqueness
        $originalSlug = $validated['slug'];
        $counter = 1;
        while (SubscriptionPlan::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        SubscriptionPlan::create($validated);

        return redirect()->route('admin.subscriptions.index')
            ->with('success', 'Subscription plan created successfully!');
    }

    /**
     * Show edit form
     */
    public function edit(SubscriptionPlan $subscriptionPlan)
    {
        return Inertia::render('Admin/LMS/Subscription/Edit', [
            'plan' => $subscriptionPlan,
        ]);
    }

    /**
     * Update subscription plan
     */
    public function update(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'monthly_price' => 'required|numeric|min:0',
            'yearly_price' => 'required|numeric|min:0',
            'max_courses' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $subscriptionPlan->update($validated);

        return redirect()->route('admin.subscriptions.index')
            ->with('success', 'Subscription plan updated successfully!');
    }

    /**
     * Delete subscription plan
     */
    public function destroy(SubscriptionPlan $subscriptionPlan)
    {
        // Check if any users are subscribed to this plan
        $subscribedUsers = \App\Models\User::where('subscription_plan_id', $subscriptionPlan->id)->count();

        if ($subscribedUsers > 0) {
            return back()->with('error', "Cannot delete plan. {$subscribedUsers} users are currently subscribed to this plan.");
        }

        $subscriptionPlan->delete();

        return redirect()->route('admin.subscriptions.index')
            ->with('success', 'Subscription plan deleted successfully!');
    }

    /**
     * Toggle subscription plan active status
     */
    public function toggle(SubscriptionPlan $subscriptionPlan)
    {
        $subscriptionPlan->update(['is_active' => !$subscriptionPlan->is_active]);

        $status = $subscriptionPlan->is_active ? 'activated' : 'deactivated';

        return back()->with('success', "Subscription plan {$status} successfully!");
    }

    /**
     * Update sort order
     */
    public function updateSort(Request $request)
    {
        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:subscription_plans,id',
            'orders.*.sort_order' => 'required|integer|min:0',
        ]);

        foreach ($validated['orders'] as $order) {
            SubscriptionPlan::where('id', $order['id'])
                ->update(['sort_order' => $order['sort_order']]);
        }

        return back()->with('success', 'Sort order updated successfully!');
    }
}
