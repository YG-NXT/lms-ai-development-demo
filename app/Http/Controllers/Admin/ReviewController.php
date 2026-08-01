<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Review::with(['user', 'course'])
            ->latest();

        if ($request->search) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            })->orWhereHas('course', function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->course_id) {
            $query->where('course_id', $request->course_id);
        }

        $courses = \App\Models\Course::select('id', 'title')
            ->orderBy('title')
            ->get();

        return Inertia::render('Admin/LMS/Review/Index', [
            'reviews' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status', 'course_id']),
            'courses' => $courses,
        ]);
    }

    public function updateStatus(Request $request, Review $review): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $review->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Review status updated successfully');
    }

    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return back()->with('success', 'Review deleted successfully');
    }
}
