<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Tutorial;
use App\Models\TutorialEnrollment;
use Illuminate\Http\JsonResponse;

class TutorialController extends Controller
{
    public function index(): JsonResponse
    {
        $tutorials = Tutorial::where('status', 'published')
            ->with('category')
            ->withCount('sections')
            ->latest()
            ->paginate(20);

        return response()->json($tutorials);
    }

    public function show(Tutorial $tutorial): JsonResponse
    {
        $tutorial->load([
            'sections' => fn ($q) => $q->with('lessons')->orderBy('order'),
            'category',
            'instructor',
        ]);

        $enrollment = null;
        if (auth()->check()) {
            $enrollment = TutorialEnrollment::where('user_id', auth()->id())
                ->where('tutorial_id', $tutorial->id)
                ->first();
        }

        return response()->json([
            'tutorial' => $tutorial,
            'enrollment' => $enrollment,
        ]);
    }

    public function enroll(Tutorial $tutorial): JsonResponse
    {
        if (auth()->guest()) {
            return response()->json(['error' => 'Must be logged in'], 401);
        }

        $existing = TutorialEnrollment::where('user_id', auth()->id())
            ->where('tutorial_id', $tutorial->id)
            ->first();

        if ($existing) {
            return response()->json($existing);
        }

        $enrollment = TutorialEnrollment::create([
            'user_id' => auth()->id(),
            'tutorial_id' => $tutorial->id,
            'status' => 'active',
            'progress' => 0,
        ]);

        return response()->json($enrollment, 201);
    }
}
