<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\OfflineDownload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OfflineDownloadController extends Controller
{
    public function index(): JsonResponse
    {
        $downloads = auth()->user()->offlineDownloads()
            ->with('lesson')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($downloads);
    }

    public function store(Request $request, Lesson $lesson): JsonResponse
    {
        $enrollment = auth()->user()->enrollments()
            ->where('course_id', $lesson->course_id)
            ->where('status', 'active')
            ->first();

        if (! $enrollment) {
            return response()->json(['error' => 'Not enrolled'], 403);
        }

        $existing = OfflineDownload::where('enrollment_id', $enrollment->id)
            ->where('lesson_id', $lesson->id)
            ->first();

        if ($existing && ! $existing->is_expired) {
            return response()->json($existing);
        }

        $token = Str::uuid();
        $expiresAt = now()->addDays(7);

        $download = OfflineDownload::create([
            'enrollment_id' => $enrollment->id,
            'lesson_id' => $lesson->id,
            'course_title' => $lesson->course->title,
            'lesson_title' => $lesson->title,
            'content_type' => 'lesson',
            'download_token' => $token,
            'expires_at' => $expiresAt,
        ]);

        return response()->json($download, 201);
    }

    public function destroy(OfflineDownload $download): JsonResponse
    {
        $download->update(['is_expired' => true]);

        return response()->json(['message' => 'Download revoked']);
    }
}
