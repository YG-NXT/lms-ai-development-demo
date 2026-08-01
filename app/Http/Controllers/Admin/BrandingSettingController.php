<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\BusinessSettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BrandingSettingController extends Controller
{
    public function __construct(protected BusinessSettingService $settingService) {}

    /**
     * Display the branding settings page.
     */
    public function index(): Response
    {
        $keys = [
            'landing_title',
            'landing_subtitle',
            'landing_hero_image',
            'landing_students_count',
            'landing_courses_count',
            'landing_mentors_count',
            'landing_success_rate',
        ];

        return Inertia::render('Admin/LMS/Branding/Settings', [
            'settings' => $this->settingService->getSettings($keys),
        ]);
    }

    /**
     * Update the branding settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'landing_title' => 'required|string|max:255',
            'landing_subtitle' => 'required|string|max:500',
            'landing_hero_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'landing_students_count' => 'required|string|max:20',
            'landing_courses_count' => 'required|string|max:20',
            'landing_mentors_count' => 'required|string|max:20',
            'landing_success_rate' => 'required|string|max:20',
        ]);

        $files = [];
        if ($request->hasFile('landing_hero_image')) {
            $files['landing_hero_image'] = $request->file('landing_hero_image');
        }

        $this->settingService->updateBranding($data, $files);

        return back()->with('success', 'Branding settings updated successfully.');
    }
}
