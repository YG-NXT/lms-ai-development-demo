<?php

namespace App\Services;

use App\Enums\UserType;
use App\Models\Category;
use App\Models\Course;
use App\Models\Tutorial;
use App\Models\TutorialLesson;
use App\Models\TutorialSection;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class KhanAcademyService
{
    protected string $apiUrl = 'https://khan-api.herokuapp.com';

    protected int $timeout = 30;

    public function fetchCourses(): array
    {
        return Cache::remember('khan_academy_courses', 3600, function () {
            $response = Http::timeout($this->timeout)->get($this->apiUrl.'/courses');

            if (! $response->successful()) {
                return [];
            }

            return $response->json('courses', []);
        });
    }

    public function fetchCourse(string $courseId): ?array
    {
        return Cache::remember("khan_academy_course_{$courseId}", 3600, function () use ($courseId) {
            $response = Http::timeout($this->timeout)->get($this->apiUrl."/course/{$courseId}");

            if (! $response->successful()) {
                return null;
            }

            return $response->json();
        });
    }

    public function fetchTopic(string $topicId): ?array
    {
        return Cache::remember("khan_academy_topic_{$topicId}", 3600, function () use ($topicId) {
            $response = Http::timeout($this->timeout)->get($this->apiUrl."/topic/{$topicId}");

            if (! $response->successful()) {
                return null;
            }

            return $response->json();
        });
    }

    public function mapCategoryForCourse(array $course): int
    {
        $courseTitle = $course['title'] ?? '';
        $courseId = $course['id'] ?? '';

        $categoryMapping = [
            'math' => 1,
            'science' => 1,
            'grammar' => 1,
            'arithmetic' => 1,
            'algebra' => 1,
            'geometry' => 1,
            'calculus' => 1,
            'biology' => 1,
            'chemistry' => 1,
            'physics' => 1,
            'history' => 4,
            'art' => 2,
            'music' => 3,
            'economics' => 1,
        ];

        foreach ($categoryMapping as $keyword => $categoryId) {
            if (Str::contains(strtolower($courseTitle), $keyword) || $courseId === $keyword) {
                return $categoryId;
            }
        }

        return 1;
    }

    public function importCourse(string $courseId, ?int $categoryId = null, ?int $userId = null, string $asType = 'tutorial'): ?Tutorial
    {
        $course = $this->fetchCourse($courseId);

        if (! $course) {
            return null;
        }

        $mappedCategory = $categoryId ?? $this->mapCategoryForCourse($course);
        $mappedUserId = $userId ?? User::where('type', UserType::SUPER_ADMIN)->first()?->id ?? User::first()?->id ?? 1;

        if ($asType === 'course') {
            return $this->importAsCourse($course, $courseId, $mappedCategory, $mappedUserId);
        }

        $tutorial = Tutorial::updateOrCreate(
            ['source_id' => $courseId, 'source' => 'khan_academy'],
            [
                'category_id' => $mappedCategory,
                'user_id' => $mappedUserId,
                'instructor_name' => 'Khan Academy',
                'title' => $course['title'] ?? 'Untitled',
                'slug' => Str::slug($course['title'] ?? 'untitled').'-ka-'.$courseId,
                'description' => substr($course['description'] ?? $course['summary'] ?? 'Learn from Khan Academy', 0, 65535),
                'level' => 'beginner',
                'language' => 'English',
                'price' => 0.00,
                'is_free' => true,
                'status' => 'published',
                'thumbnail' => $course['thumbnail_url'] ?? $course['image'] ?? null,
                'duration' => $this->calculateDuration($course),
                'is_tutorial' => true,
                'source' => 'khan_academy',
                'source_id' => $courseId,
            ]
        );

        $this->importTopics($tutorial, $course);

        Cache::forget('khan_academy_courses');
        Cache::forget("khan_academy_course_{$courseId}");

        return $tutorial;
    }

    protected function importAsCourse(array $course, string $courseId, int $categoryId, int $userId): ?Tutorial
    {
        $model = Course::updateOrCreate(
            ['source_id' => $courseId, 'source' => 'khan_academy'],
            [
                'category_id' => $categoryId,
                'user_id' => $userId,
                'instructor_name' => 'Khan Academy',
                'title' => $course['title'] ?? 'Untitled',
                'slug' => Str::slug($course['title'] ?? 'untitled').'-ka-'.$courseId,
                'description' => substr($course['description'] ?? $course['summary'] ?? 'Learn from Khan Academy', 0, 65535),
                'level' => 'beginner',
                'language' => 'English',
                'price' => 0.00,
                'discount_price' => null,
                'is_free' => true,
                'status' => 'published',
                'thumbnail' => $course['thumbnail_url'] ?? $course['image'] ?? null,
                'duration' => $this->calculateDuration($course),
                'has_timeline' => false,
                'source' => 'khan_academy',
                'source_id' => $courseId,
            ]
        );

        // Courses use CourseSection / Lesson models, not TutorialSection / TutorialLesson
        // We import topics as course sections with lessons
        $this->importCourseSections($model, $course);

        Cache::forget('khan_academy_courses');
        Cache::forget("khan_academy_course_{$courseId}");

        // Return null but cast to Tutorial for type compatibility? No - need to handle differently
        return null;
    }

    protected function importCourseSections(Course $course, array $data): void
    {
        $topics = $data['topics'] ?? $data['children'] ?? [];
        $sectionOrder = 1;

        foreach ($topics as $topic) {
            $topicId = $topic['id'] ?? $topic['slug'] ?? '';
            $topicData = $this->fetchTopic($topicId);

            if (! $topicData) {
                $topicData = $this->mapInlineTopic($topic);
            }

            if (! $topicData) {
                continue;
            }

            $section = CourseSection::updateOrCreate(
                ['course_id' => $course->id, 'title' => $topicData['title'] ?? $topic['title'] ?? 'Topic'],
                [
                    'order' => $sectionOrder,
                ]
            );

            $lessonOrder = 1;

            $exercises = $topicData['exercises'] ?? [];
            foreach ($exercises as $exercise) {
                if ($lessonOrder > 50) {
                    break;
                }

                Lesson::create([
                    'course_section_id' => $section->id,
                    'title' => $exercise['title'] ?? $exercise['name'] ?? 'Exercise',
                    'slug' => $exercise['slug'] ?? Str::slug($exercise['title'] ?? 'exercise'),
                    'type' => 'QUIZ',
                    'content' => $exercise['description'] ?? $exercise['instructions'] ?? null,
                    'video_url' => null,
                    'duration' => $exercise['duration'] ?? null,
                    'order' => $lessonOrder,
                    'is_preview' => true,
                ]);

                $lessonOrder++;
            }

            $videos = $topicData['videos'] ?? $topicData['recommended_videos'] ?? [];
            foreach ($videos as $video) {
                if ($lessonOrder > 50) {
                    break;
                }

                Lesson::create([
                    'course_section_id' => $section->id,
                    'title' => $video['title'] ?? $video['name'] ?? 'Video',
                    'slug' => $video['slug'] ?? Str::slug($video['title'] ?? 'video'),
                    'type' => 'VIDEO',
                    'content' => $video['description'] ?? $video['summary'] ?? null,
                    'video_url' => $video['download_urls']['mp4']['high'] ?? $video['download_urls']['mp4']['medium']
                        ?? $video['download_urls']['mp4']['low'] ?? $video['url'] ?? $video['video_url'] ?? null,
                    'duration' => isset($video['duration']) ? (int) $video['duration'] : null,
                    'order' => $lessonOrder,
                    'is_preview' => true,
                ]);

                $lessonOrder++;
            }

            $sectionOrder++;
        }
    }

    public function syncCourses(int $limit = 10, string $asType = 'tutorial'): int
    {
        $courses = $this->fetchCourses();

        $count = 0;
        $existingCategory = Category::where('is_active', true)->first();

        foreach ($courses as $index => $course) {
            if ($index >= $limit) {
                break;
            }

            $existing = Tutorial::where('source_id', $course['id'] ?? '')
                ->where('source', 'khan_academy')
                ->first();

            if ($existing) {
                continue;
            }

            $tutorial = $this->importCourse($course['id'] ?? '', $existingCategory?->id ?? 1, null, $asType);

            if ($tutorial || $asType === 'course') {
                $count++;
            }
        }

        return $count;
    }

    protected function importTopics(Tutorial $tutorial, array $course): void
    {
        $topics = $course['topics'] ?? $course['children'] ?? [];

        $order = 1;
        foreach ($topics as $topic) {
            $topicId = $topic['id'] ?? $topic['slug'] ?? '';
            $topicData = $this->fetchTopic($topicId);

            if (! $topicData) {
                $topicData = $this->mapInlineTopic($topic);
            }

            if (! $topicData) {
                continue;
            }

            $section = TutorialSection::updateOrCreate(
                ['tutorial_id' => $tutorial->id, 'title' => $topicData['title'] ?? $topic['title'] ?? 'Topic'],
                [
                    'description' => $topicData['description'] ?? $topic['description'] ?? null,
                    'order' => $order,
                ]
            );

            $this->importTopicContent($section, $topicData);

            $order++;
        }
    }

    protected function importTopicContent(TutorialSection $section, array $topicData): void
    {
        $lessonOrder = 1;

        $exercises = $topicData['exercises'] ?? [];
        foreach ($exercises as $exercise) {
            if ($lessonOrder > 50) {
                break;
            }

            TutorialLesson::create([
                'tutorial_section_id' => $section->id,
                'title' => $exercise['title'] ?? $exercise['name'] ?? 'Exercise',
                'slug' => $exercise['slug'] ?? Str::slug($exercise['title'] ?? 'exercise'),
                'description' => $exercise['description'] ?? null,
                'content' => $exercise['description'] ?? $exercise['instructions'] ?? null,
                'content_type' => 'exercise',
                'duration' => $exercise['duration'] ?? null,
                'order' => $lessonOrder,
                'is_free' => true,
            ]);

            $lessonOrder++;
        }

        $videos = $topicData['videos'] ?? $topicData['recommended_videos'] ?? [];
        foreach ($videos as $video) {
            if ($lessonOrder > 50) {
                break;
            }

            TutorialLesson::create([
                'tutorial_section_id' => $section->id,
                'title' => $video['title'] ?? $video['name'] ?? 'Video',
                'slug' => $video['slug'] ?? Str::slug($video['title'] ?? 'video'),
                'description' => $video['description'] ?? $video['summary'] ?? null,
                'content' => null,
                'video_url' => $video['download_urls']['mp4']['high'] ?? $video['download_urls']['mp4']['medium']
                    ?? $video['download_urls']['mp4']['low'] ?? $video['url'] ?? $video['video_url'] ?? null,
                'content_type' => 'video',
                'duration' => isset($video['duration']) ? (int) $video['duration'] : null,
                'order' => $lessonOrder,
                'is_free' => true,
            ]);

            $lessonOrder++;
        }
    }

    protected function mapInlineTopic(array $topic): ?array
    {
        if (empty($topic)) {
            return null;
        }

        return [
            'title' => $topic['title'] ?? $topic['name'] ?? null,
            'description' => $topic['description'] ?? $topic['summary'] ?? null,
            'exercises' => $topic['exercises'] ?? [],
            'videos' => $topic['videos'] ?? [],
        ];
    }

    protected function calculateDuration(array $course): ?string
    {
        $duration = $course['duration'] ?? null;

        if ($duration === null) {
            return null;
        }

        if (is_numeric($duration)) {
            $hours = floor($duration / 3600);
            $minutes = floor(($duration % 3600) / 60);

            if ($hours > 0) {
                return "{$hours}h {$minutes}m";
            }

            return "{$minutes}m";
        }

        return $duration;
    }

    public function getImportedTutorials(): array
    {
        return Tutorial::where('source', 'khan_academy')
            ->where('status', 'published')
            ->with('category')
            ->withCount('sections')
            ->latest()
            ->get()
            ->toArray();
    }

    public function searchCourses(string $keyword): array
    {
        $courses = $this->fetchCourses();

        return array_filter($courses, function ($course) use ($keyword) {
            return Str::contains(strtolower($course['title'] ?? ''), strtolower($keyword));
        });
    }
}
