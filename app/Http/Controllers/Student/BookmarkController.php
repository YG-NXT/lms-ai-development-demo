<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseBookmark;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class BookmarkController extends Controller
{
    public function index(): Response
    {
        $bookmarks = Auth::user()->bookmarks()
            ->with('course.category')
            ->with('course.instructor')
            ->with('course.reviews')
            ->latest()
            ->paginate(12);

        $bookmarks->getCollection()->transform(function ($bookmark) {
            return $bookmark->course;
        });

        return Inertia::render('Student/Pages/Bookmarks', [
            'bookmarks' => $bookmarks,
        ]);
    }

    public function toggle(Course $course): RedirectResponse
    {
        $user = Auth::user();

        $bookmark = $user->bookmarks()->where('course_id', $course->id)->first();

        if ($bookmark) {
            $bookmark->delete();

            return redirect()->route('student.bookmarks.index')
                ->with('success', __('Course removed from bookmarks.'));
        }

        CourseBookmark::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);

        return redirect()->back()
            ->with('success', __('Course added to bookmarks.'));
    }
}
