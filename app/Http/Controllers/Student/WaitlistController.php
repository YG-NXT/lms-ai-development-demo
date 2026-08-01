<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Waitlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WaitlistController extends Controller
{
    public function index(): JsonResponse
    {
        $entries = Waitlist::where('user_id', auth()->id())->get();

        return response()->json($entries);
    }

    public function store(Request $request, Course $course): JsonResponse
    {
        $existing = Waitlist::where('course_id', $course->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($existing) {
            return response()->json($existing);
        }

        $position = Waitlist::where('course_id', $course->id)->count() + 1;

        $entry = Waitlist::create([
            'course_id' => $course->id,
            'user_id' => auth()->id(),
            'position' => $position,
            'notification_method' => $request->input('notification_method', 'email'),
        ]);

        return response()->json($entry, 201);
    }

    public function destroy(Waitlist $waitlist): JsonResponse
    {
        $waitlist->delete();

        return response()->json(null, 204);
    }
}
