<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AiTutorMessage;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class AiTutorController extends Controller
{
    public function show(Course $course): Response
    {
        $messages = AiTutorMessage::where('course_id', $course->id)
            ->where('user_id', Auth::id())
            ->latest()
            ->take(50)
            ->get();

        return Inertia::render('Student/Pages/AiTutor', [
            'course' => $course,
            'messages' => $messages,
        ]);
    }

    public function ask(Request $request, Course $course): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:2000',
        ]);

        $user = Auth::user();

        // Store user message
        $message = AiTutorMessage::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'message' => $request->input('message'),
        ]);

        // Generate AI response (mock for demo — in production, call an LLM API)
        $response = $this->generateResponse($request->input('message'), $course);

        $message->update([
            'response' => $response,
            'responded_at' => now(),
        ]);

        return response()->json([
            'message' => $message,
            'response' => $response,
        ]);
    }

    protected function generateResponse(string $question, Course $course): string
    {
        $courseTitle = $course->title;
        $courseDescription = $course->description ?? '';

        return "Thank you for your question about {$courseTitle}. ";
    }
}
