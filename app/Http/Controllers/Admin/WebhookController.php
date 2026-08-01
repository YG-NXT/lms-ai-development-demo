<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Webhook;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebhookController extends Controller
{
    public function index(): Response
    {
        $webhooks = Webhook::latest()->paginate(15);

        return Inertia::render('Admin/LMS/Webhooks', [
            'webhooks' => $webhooks,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url',
            'secret' => 'nullable|string|max:255',
            'events' => 'nullable|array',
            'events.*' => 'string',
            'is_active' => 'required|boolean',
            'timeout' => 'nullable|integer|min:5|max:300',
        ]);

        Webhook::create([
            'name' => $validated['name'],
            'url' => $validated['url'],
            'secret' => $validated['secret'] ?? null,
            'events' => $validated['events'] ?? [],
            'is_active' => $validated['is_active'],
            'timeout' => $validated['timeout'] ?? 30,
        ]);

        return back()->with('success', 'Webhook created successfully.');
    }

    public function update(Request $request, Webhook $webhook): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url',
            'secret' => 'nullable|string|max:255',
            'events' => 'nullable|array',
            'events.*' => 'string',
            'is_active' => 'required|boolean',
            'timeout' => 'nullable|integer|min:5|max:300',
        ]);

        $webhook->update([
            'name' => $validated['name'],
            'url' => $validated['url'],
            'secret' => $validated['secret'] ?? null,
            'events' => $validated['events'] ?? [],
            'is_active' => $validated['is_active'],
            'timeout' => $validated['timeout'] ?? 30,
        ]);

        return back()->with('success', 'Webhook updated successfully.');
    }

    public function destroy(Webhook $webhook): RedirectResponse
    {
        $webhook->delete();

        return back()->with('success', 'Webhook deleted successfully.');
    }
}
