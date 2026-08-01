<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LessonRequest;
use App\Http\Requests\Admin\SectionRequest;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CurriculumController extends Controller
{
    /**
     * Show the curriculum builder for a course.
     */
    public function edit(Course $course): Response
    {
        $course->load(['sections.lessons']);

        return Inertia::render('Admin/LMS/Course/Curriculum', [
            'course' => $course,
        ]);
    }

    /**
     * Store a new section for the course.
     */
    public function storeSection(SectionRequest $request, Course $course): RedirectResponse
    {
        $course->sections()->create($request->validated());

        return back()->with('success', 'Section added successfully');
    }

    /**
     * Update a section.
     */
    public function updateSection(SectionRequest $request, CourseSection $section): RedirectResponse
    {
        $section->update($request->validated());

        return back()->with('success', 'Section updated successfully');
    }

    /**
     * Remove a section.
     */
    public function destroySection(CourseSection $section): RedirectResponse
    {
        $section->delete();

        return back()->with('success', 'Section deleted successfully');
    }

    /**
     * Store a new lesson for a section.
     */
    public function storeLesson(LessonRequest $request, CourseSection $section): RedirectResponse
    {
        $data = $this->processVideoData($request->validated());

        if ($request->hasFile('file_path')) {
            $data['file_path'] = $request->file('file_path')->store('lessons/files', 'public');
        }

        $section->lessons()->create($data);

        return back()->with('success', 'Lesson added successfully');
    }

    /**
     * Update a lesson.
     */
    public function updateLesson(LessonRequest $request, Lesson $lesson): RedirectResponse
    {
        $data = $this->processVideoData($request->validated());

        if ($request->hasFile('file_path')) {
            // Delete old file if exists
            if ($lesson->file_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($lesson->file_path);
            }
            $data['file_path'] = $request->file('file_path')->store('lessons/files', 'public');
        }

        $lesson->update($data);

        return back()->with('success', 'Lesson updated successfully');
    }

    /**
     * Remove a lesson.
     */
    public function destroyLesson(Lesson $lesson): RedirectResponse
    {
        $lesson->delete();

        return back()->with('success', 'Lesson deleted successfully');
    }

    /**
     * Extract Vimeo ID from URL or Embed Code.
     */
    private function getVimeoId(string $input): ?string
    {
        // Check for standard URL
        if (preg_match('/(?:vimeo\.com\/)(\d+)/', $input, $matches)) {
            return $matches[1];
        }
        // Check for player URL
        if (preg_match('/(?:player\.vimeo\.com\/video\/)(\d+)/', $input, $matches)) {
            return $matches[1];
        }
        // If the input is just digits, assume it's the ID
        if (ctype_digit($input)) {
            return $input;
        }

        return null;
    }

    /**
     * Process video data for storage.
     */
    private function processVideoData(array $data): array
    {
        if (($data['type'] ?? '') === 'VIDEO') {
            // Default to YouTube if not specified but URL looks like YouTube
            if (empty($data['video_provider'])) {
                if (str_contains($data['video_url'] ?? '', 'youtu')) {
                    $data['video_provider'] = 'YOUTUBE';
                } elseif (str_contains($data['video_url'] ?? '', 'vimeo')) {
                    $data['video_provider'] = 'VIMEO';
                } else {
                    $data['video_provider'] = 'CUSTOM';
                }
            }

            if ($data['video_provider'] === 'VIMEO') {
                $vimeoId = $this->getVimeoId($data['video_url']);
                if ($vimeoId) {
                    $data['video_id'] = $vimeoId;
                    // Normalize the stored URL for consistency, but keep original input?
                    // Requirement says: "Store normalized Vimeo data... prefer video_provider=vimeo + video_id"
                    // We'll store the ID. The video_url column is still required by schema so we can keep a reference or the normalized player URL.
                    $data['video_url'] = 'https://player.vimeo.com/video/'.$vimeoId;
                } else {
                    // Fallback or error? For now, keep as is, validation might strict it if we added a rule.
                    // But we relaxed the 'url' rule in Request.
                }
            }
        }

        return $data;
    }
}
