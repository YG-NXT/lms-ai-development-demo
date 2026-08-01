<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CourseRequest;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $courses = Course::query()
            ->with(['category', 'instructor'])
            ->withCount('enrollments')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/LMS/Course/Index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = Category::where('is_active', true)->get(['id', 'name']);

        return Inertia::render('Admin/LMS/Course/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('courses/thumbnails', 'public');
        }

        Course::create($data);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course): Response
    {
        $categories = Category::where('is_active', true)->get(['id', 'name']);

        return Inertia::render('Admin/LMS/Course/Edit', [
            'course' => $course,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseRequest $request, Course $course): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($course->thumbnail) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($course->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('courses/thumbnails', 'public');
        } else {
            unset($data['thumbnail']);
        }

        $course->update($data);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        return back()->with('success', 'Course deleted successfully');
    }

    /**
     * Clone a course as a new draft.
     */
    public function clone(Course $course): RedirectResponse
    {
        $newCourse = $course->replicate()->fill([
            'title' => 'Copy of '.$course->title,
            'slug' => null,
            'status' => \App\Enums\CourseStatus::DRAFT,
            'thumbnail' => $course->thumbnail,
            'duration' => $course->duration,
            'description' => $course->description,
            'level' => $course->level,
            'language' => $course->language,
            'price' => $course->price,
            'discount_price' => $course->discount_price,
            'is_free' => $course->is_free,
            'meta_title' => $course->meta_title,
            'meta_description' => $course->meta_description,
            'start_date' => null,
            'end_date' => null,
            'has_timeline' => $course->has_timeline,
            'last_enrollment_date' => null,
        ]);

        $newCourse->save();

        // Clone sections and lessons
        foreach ($course->sections as $section) {
            $newSection = $section->replicate()->fill([
                'course_id' => $newCourse->id,
            ]);
            $newSection->save();

            foreach ($section->lessons as $lesson) {
                $newLesson = $lesson->replicate()->fill([
                    'course_section_id' => $newSection->id,
                    'course_id' => $newCourse->id,
                    'slug' => null,
                    'release_date' => $lesson->release_date,
                ]);
                $newLesson->save();
            }
        }

        return redirect()->route('admin.courses.edit', $newCourse->id)
            ->with('success', 'Course cloned successfully. Review and publish the new course.');
    }
}
