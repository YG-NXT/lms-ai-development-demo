<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TaxSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaxSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = TaxSetting::where('is_active', true)->get();

        return response()->json($settings);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:percentage,fixed',
            'rate' => 'required|numeric|min:0|max:100',
            'scope' => 'required|in:global,per_course,per_certificate',
        ]);

        $setting = TaxSetting::create($request->only('name', 'type', 'rate', 'scope', 'rules'));
        $setting->is_active = true;
        $setting->save();

        return response()->json($setting, 201);
    }

    public function update(TaxSetting $taxSetting, Request $request): JsonResponse
    {
        $taxSetting->update($request->only('name', 'type', 'rate', 'scope', 'is_active', 'rules'));

        return response()->json($taxSetting);
    }

    public function destroy(TaxSetting $taxSetting): JsonResponse
    {
        $taxSetting->delete();

        return response()->json(null, 204);
    }
}
