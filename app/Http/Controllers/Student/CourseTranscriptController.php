<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\CourseTranscript;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseTranscriptController extends Controller
{
    public function index(int $lessonId): JsonResponse
    {
        $transcripts = CourseTranscript::where('lesson_id', $lessonId)
            ->where('locale', app()->getLocale())
            ->get();

        return response()->json($transcripts);
    }

    public function store(Request $request, int $lessonId): JsonResponse
    {
        $request->validate([
            'locale' => 'required|string|max:10',
            'language_name' => 'required|string',
            'content' => 'required|string',
            'format' => 'in:vtt,srt',
        ]);

        $transcript = CourseTranscript::create([
            'lesson_id' => $lessonId,
            'locale' => $request->locale,
            'language_name' => $request->language_name,
            'content' => $request->content,
            'format' => $request->format ?? 'vtt',
            'word_count' => str_word_count(strip_tags($request->content)),
        ]);

        return response()->json($transcript, 201);
    }

    public function download(int $id): JsonResponse
    {
        $transcript = CourseTranscript::findOrFail($id);

        return response()->json([
            'content' => $transcript->content,
            'format' => $transcript->format,
            'language_name' => $transcript->language_name,
        ]);
    }
}
