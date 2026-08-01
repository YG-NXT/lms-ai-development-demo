<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Tutorial;
use App\Models\TutorialEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorialController extends Controller
{
    public function index(Request $request)
    {
        $query = Tutorial::where('status', 'published')
            ->with('category')
            ->withCount('sections');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhereHas('category', function ($q) use ($request) {
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

        if ($request->source) {
            $query->where('source', $request->source);
        }

        if ($request->sort === 'popular') {
            $query->withCount('enrollments')->orderBy('enrollments_count', 'desc');
        } else {
            $query->latest();
        }

        $tutorials = $query->paginate(20)->withQueryString();

        $categories = \App\Models\Category::where('is_active', true)->get();

        return Inertia::render('Guest/Pages/Tutorials', [
            'tutorials' => $tutorials,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'level', 'price_type', 'sort']),
        ]);
    }

    public function show(Tutorial $tutorial)
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

        $isFree = $tutorial->is_free;
        $canAccess = $isFree || ($enrollment !== null);

        return Inertia::render('Guest/Pages/TutorialShow', [
            'tutorial' => $tutorial,
            'enrollment' => $enrollment,
            'canAccess' => $canAccess,
        ]);
    }
}
