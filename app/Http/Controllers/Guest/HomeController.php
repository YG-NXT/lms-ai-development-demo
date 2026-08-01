<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Services\BusinessSettingService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(protected BusinessSettingService $settingService) {}

    public function index(\Illuminate\Http\Request $request)
    {
        $query = \App\Models\Course::with(['category', 'instructor'])
            ->withCount('allLessons')
            ->withAvg(['reviews' => fn ($q) => $q->where('status', \App\Enums\ReviewStatus::APPROVED)], 'rating')
            ->where('status', \App\Enums\CourseStatus::PUBLISHED)
            ->where(function ($q) {
                $q->where('has_timeline', false)
                    ->orWhere(function ($q) {
                        $q->where('has_timeline', true)
                            ->where('start_date', '>', now());
                    });
            });

        // Search by title, description, or instructor name
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhereHas('instructor', function ($q) use ($request) {
                        $q->where('name', 'like', "%{$request->search}%");
                    });
            });
        }

        // Filter by category
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by level
        if ($request->level) {
            $query->where('level', $request->level);
        }

        // Filter by price type
        if ($request->price_type === 'free') {
            $query->where('is_free', true);
        } elseif ($request->price_type === 'paid') {
            $query->where('is_free', false)->where('price', '>', 0);
        }

        // Sorting
        if ($request->sort === 'popular') {
            $query->withCount('enrollments')->orderBy('enrollments_count', 'desc');
        } else {
            $query->latest(); // default: latest
        }

        $courses = $query->get();

        $categories = \App\Models\Category::where('is_active', true)->get();

        $featuredTutorials = \App\Models\Tutorial::where('status', 'published')
            ->where('is_free', true)
            ->with('category')
            ->withCount('sections')
            ->latest()
            ->take(6)
            ->get();

        // Get branding settings with defaults
        $brandingKeys = [
            'landing_title',
            'landing_subtitle',
            'landing_hero_image',
            'landing_students_count',
            'landing_courses_count',
            'landing_mentors_count',
            'landing_success_rate',
        ];
        $brandingSettings = $this->settingService->getSettings($brandingKeys, true);

        return Inertia::render('Guest/Pages/Home', [
            'courses' => $courses,
            'categories' => $categories,
            'featuredTutorials' => $featuredTutorials,
            'filters' => $request->only(['search', 'category_id', 'level', 'price_type', 'sort']),
            'heroBranding' => [
                'title' => $brandingSettings['landing_title'] ?? 'Master New Skills',
                'subtitle' => $brandingSettings['landing_subtitle'] ?? 'Join thousands of students learning from experts around the world. High-quality courses and professional certificates.',
                'heroImage' => $brandingSettings['landing_hero_image'] ?? 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
                'studentsCount' => $brandingSettings['landing_students_count'] ?? '15K+',
                'coursesCount' => $brandingSettings['landing_courses_count'] ?? '120+',
                'mentorsCount' => $brandingSettings['landing_mentors_count'] ?? '45+',
                'successRate' => $brandingSettings['landing_success_rate'] ?? '98%',
            ],
        ]);
    }

    public function courseIndex(\Illuminate\Http\Request $request)
    {
        $query = \App\Models\Course::with(['category', 'instructor'])
            ->withCount('allLessons')
            ->withAvg(['reviews' => fn ($q) => $q->where('status', \App\Enums\ReviewStatus::APPROVED)], 'rating')
            ->where('status', \App\Enums\CourseStatus::PUBLISHED)
            ->where(function ($q) {
                $q->where('has_timeline', false)
                    ->orWhere(function ($q) {
                        $q->where('has_timeline', true)
                            ->where('start_date', '>', now());
                    });
            });

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhereHas('instructor', function ($q) use ($request) {
                        $q->where('name', 'like', "%{$request->search}%");
                    });
            });
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->level) {
            $query->where('level', $request->level);
        }

        if ($request->price_type === 'free') {
            $query->where('is_free', true);
        } elseif ($request->price_type === 'paid') {
            $query->where('is_free', false)->where('price', '>', 0);
        }

        if ($request->sort === 'popular') {
            $query->withCount('enrollments')->orderBy('enrollments_count', 'desc');
        } else {
            $query->latest();
        }

        $courses = $query->paginate(12)->withQueryString();

        $categories = \App\Models\Category::where('is_active', true)->get();

        // Get ads for courses page
        $headerAds = \App\Services\AdService::getHeaderAds('courses');
        $sidebarAds = \App\Services\AdService::getSidebarAds('courses');
        $betweenCoursesAds = \App\Services\AdService::getBetweenCoursesAds();

        return Inertia::render('Guest/Pages/Courses', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'level', 'price_type', 'sort']),
            'ads' => [
                'header' => $headerAds,
                'sidebar' => $sidebarAds,
                'between_courses' => $betweenCoursesAds,
            ],
        ]);
    }

    public function show(\App\Models\Course $course): Response
    {
        $course->load(['category', 'instructor', 'sections', 'prerequisites']);

        $enrollment = null;
        $canReview = false;
        $hasReviewed = false;
        $prerequisitesMet = true;
        $unmetPrerequisites = [];
        $isBookmarked = false;

        if (auth()->check()) {
            $enrollment = auth()->user()->enrollments()->where('course_id', $course->id)->first();

            // User can review if they have an active enrollment
            $canReview = $enrollment && $enrollment->status === \App\Enums\EnrollmentStatus::ACTIVE;

            // Check if user has already reviewed this course
            $hasReviewed = auth()->user()->reviews()->where('course_id', $course->id)->exists();

            // Check prerequisites
            $prereqCheck = $course->checkPrerequisites(auth()->user());
            $prerequisitesMet = $prereqCheck['met'];
            $unmetPrerequisites = $prereqCheck['unmet'];

            // Check bookmark status
            $isBookmarked = auth()->check()
                ? auth()->user()->bookmarks()->where('course_id', $course->id)->exists()
                : false;
        }

        // Load approved reviews with user relationship
        $reviews = $course->reviews()
            ->with('user')
            ->where('status', \App\Enums\ReviewStatus::APPROVED)
            ->latest()
            ->get();

        // Calculate average rating from approved reviews
        $averageRating = $reviews->avg('rating') ?? 0;
        $totalReviews = $reviews->count();

        return Inertia::render('Guest/CourseDetails', [
            'course' => $course,
            'enrollment' => $enrollment,
            'reviews' => $reviews,
            'averageRating' => round($averageRating, 1),
            'totalReviews' => $totalReviews,
            'canReview' => $canReview && ! $hasReviewed,
            'hasReviewed' => $hasReviewed,
            'prerequisitesMet' => $prerequisitesMet,
            'unmetPrerequisites' => $unmetPrerequisites,
            'isBookmarked' => $isBookmarked,
        ]);
    }
}
