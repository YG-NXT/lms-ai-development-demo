<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tutorial;
use App\Services\KhanAcademyService;
use Illuminate\Http\Request;

class TutorialController extends Controller
{
    public function index(KhanAcademyService $service)
    {
        $tutorials = Tutorial::with('category', 'instructor')
            ->latest()
            ->paginate(20);

        $khanCourses = $service->fetchCourses();

        return inertia('Admin/LMS/Tutorials/Index', [
            'tutorials' => $tutorials,
            'khanCourses' => $khanCourses,
        ]);
    }

    public function create()
    {
        return inertia('Admin/LMS/Tutorials/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'level' => 'nullable|string',
            'language' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'is_free' => 'boolean',
            'status' => 'required|in:draft,published,archived',
            'thumbnail' => 'nullable|string',
            'has_timeline' => 'boolean',
        ]);

        $tutorial = Tutorial::create($validated);

        return redirect()->route('admin.tutorials.edit', $tutorial)->with('success', 'Tutorial created.');
    }

    public function show(Tutorial $tutorial)
    {
        $tutorial->load('sections.lessons', 'category', 'instructor');

        return inertia('Admin/LMS/Tutorials/Show', [
            'tutorial' => $tutorial,
        ]);
    }

    public function edit(Tutorial $tutorial)
    {
        $tutorial->load('sections.lessons');

        return inertia('Admin/LMS/Tutorials/Edit', [
            'tutorial' => $tutorial,
        ]);
    }

    public function update(Request $request, Tutorial $tutorial)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'level' => 'nullable|string',
            'language' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'is_free' => 'boolean',
            'status' => 'required|in:draft,published,archived',
            'thumbnail' => 'nullable|string',
            'has_timeline' => 'boolean',
        ]);

        $tutorial->update($validated);

        return back()->with('success', 'Tutorial updated.');
    }

    public function destroy(Tutorial $tutorial)
    {
        $tutorial->delete();

        return redirect()->route('admin.tutorials.index')->with('success', 'Tutorial deleted.');
    }

    public function importKhanAcademy(Request $request, KhanAcademyService $service)
    {
        $asType = $request->input('as_type', 'tutorial');
        $limit = (int) $request->input('limit', 10);
        $course = $request->input('course');

        $imported = 0;

        if ($course) {
            $service->importCourse($course, null, null, $asType);
            $imported = 1;
        } else {
            $imported = $service->syncCourses($limit, $asType);
        }

        $typeName = $asType === 'course' ? 'courses' : 'tutorials';

        return back()->with('success', "Imported {$imported} Khan Academy ".($imported === 1 ? 'course' : 'courses')." as {$typeName}.");
    }
}
