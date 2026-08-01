<?php

namespace App\Http\Controllers\Student;

use App\Enums\ReviewStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Student\StoreReviewRequest;
use App\Models\Course;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, Course $course): RedirectResponse
    {
        $user = Auth::user();

        // Check if user has already reviewed this course
        $existingReview = Review::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existingReview) {
            return back()->with('error', 'You have already submitted a review for this course.');
        }

        // Create the review
        Review::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'status' => ReviewStatus::PENDING,
        ]);

        return back()->with('success', 'Thank you! Your review has been submitted and is pending approval.');
    }
}
