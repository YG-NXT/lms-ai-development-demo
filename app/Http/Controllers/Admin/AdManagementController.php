<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdZone;
use App\Models\AdSetting;
use App\Models\AdImpression;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdManagementController extends Controller
{
    /**
     * Display ad zones list
     */
    public function index()
    {
        $adZones = AdZone::withCount(['impressions as total_impressions_count' => function ($query) {
            $query->where('type', 'impression');
        }])
        ->withCount(['impressions as total_clicks_count' => function ($query) {
            $query->where('type', 'click');
        }])
        ->ordered()
        ->paginate(20);

        $settings = AdSetting::getAllSettings();

        return Inertia::render('Admin/Ads/Index', [
            'adZones' => $adZones,
            'settings' => $settings,
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('Admin/Ads/Create');
    }

    /**
     * Store new ad zone
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'zone_id' => 'required|string|unique:ad_zones,zone_id',
            'position' => 'required|in:header,sidebar,footer,content,between_courses,between_tutorials',
            'page_type' => 'required|string',
            'ad_type' => 'required|in:banner,native,video,popup',
            'width' => 'nullable|integer|min:1',
            'height' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
            'priority' => 'integer|min:0',
            'custom_code' => 'nullable|string',
            'targeting_rules' => 'nullable|array',
        ]);

        AdZone::create($validated);

        return redirect()->route('admin.ads.index')
            ->with('success', 'Ad zone created successfully!');
    }

    /**
     * Show edit form
     */
    public function edit(AdZone $adZone)
    {
        return Inertia::render('Admin/Ads/Edit', [
            'adZone' => $adZone,
        ]);
    }

    /**
     * Update ad zone
     */
    public function update(Request $request, AdZone $adZone)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'zone_id' => 'required|string|unique:ad_zones,zone_id,' . $adZone->id,
            'position' => 'required|in:header,sidebar,footer,content,between_courses,between_tutorials',
            'page_type' => 'required|string',
            'ad_type' => 'required|in:banner,native,video,popup',
            'width' => 'nullable|integer|min:1',
            'height' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
            'priority' => 'integer|min:0',
            'custom_code' => 'nullable|string',
            'targeting_rules' => 'nullable|array',
        ]);

        $adZone->update($validated);

        return redirect()->route('admin.ads.index')
            ->with('success', 'Ad zone updated successfully!');
    }

    /**
     * Delete ad zone
     */
    public function destroy(AdZone $adZone)
    {
        $adZone->delete();

        return redirect()->route('admin.ads.index')
            ->with('success', 'Ad zone deleted successfully!');
    }

    /**
     * Toggle ad zone active status
     */
    public function toggle(AdZone $adZone)
    {
        $adZone->update(['is_active' => !$adZone->is_active]);

        return back()->with('success', 'Ad zone status updated!');
    }

    /**
     * Update global settings
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'publisher_id' => 'required|string',
            'api_key' => 'nullable|string',
            'enable_ads' => 'boolean',
            'gdpr_compliance' => 'boolean',
        ]);

        foreach ($validated as $key => $value) {
            AdSetting::setValue($key, $value);
        }

        return back()->with('success', 'Ad settings updated successfully!');
    }

    /**
     * View analytics/statistics
     */
    public function analytics(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30));
        $endDate = $request->input('end_date', now());

        $stats = AdZone::with(['impressions' => function ($query) use ($startDate, $endDate) {
            $query->dateRange($startDate, $endDate);
        }])->get()->map(function ($zone) {
            return [
                'id' => $zone->id,
                'name' => $zone->name,
                'impressions' => $zone->impressions->where('type', 'impression')->count(),
                'clicks' => $zone->impressions->where('type', 'click')->count(),
                'ctr' => $zone->ctr,
                'revenue' => $zone->total_revenue,
            ];
        });

        $totals = [
            'total_impressions' => $stats->sum('impressions'),
            'total_clicks' => $stats->sum('clicks'),
            'total_revenue' => $stats->sum('revenue'),
            'average_ctr' => $stats->avg('ctr'),
        ];

        return Inertia::render('Admin/Ads/Analytics', [
            'stats' => $stats,
            'totals' => $totals,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }

    /**
     * Track ad impression (API endpoint)
     */
    public function trackImpression(Request $request)
    {
        $validated = $request->validate([
            'zone_id' => 'required|exists:ad_zones,zone_id',
            'type' => 'required|in:impression,click',
            'page_url' => 'required|url',
            'revenue' => 'nullable|numeric|min:0',
        ]);

        $adZone = AdZone::where('zone_id', $validated['zone_id'])->first();

        if (!$adZone || !$adZone->is_active) {
            return response()->json(['error' => 'Ad zone not found or inactive'], 404);
        }

        AdImpression::create([
            'ad_zone_id' => $adZone->id,
            'user_id' => auth()->id(),
            'session_id' => session()->getId(),
            'page_url' => $validated['page_url'],
            'ip_address' => $request->ip(),
            'type' => $validated['type'],
            'revenue' => $validated['revenue'] ?? 0,
        ]);

        return response()->json(['success' => true]);
    }
}
