<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Services\CertificateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    public function __construct(
        protected CertificateService $certificateService
    ) {}

    public function index(Request $request): Response
    {
        $query = Enrollment::with(['user', 'course'])
            ->latest();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', "%{$request->search}%")
                        ->orWhere('email', 'like', "%{$request->search}%");
                })->orWhereHas('course', function ($q) use ($request) {
                    $q->where('title', 'like', "%{$request->search}%");
                });
            });
        }

        if ($request->course_id) {
            $query->where('course_id', $request->course_id);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/LMS/Enrollment/Index', [
            'enrollments' => $query->paginate(10)->withQueryString(),
            'courses' => Course::select('id', 'title')->get(),
            'filters' => $request->only(['search', 'course_id', 'status']),
        ]);
    }

    public function updateStatus(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string|in:active,completed,refunded,rejected,pending',
        ]);

        $enrollment->update([
            'status' => $request->status,
            'completed_at' => $request->status === 'completed' ? now() : $enrollment->completed_at,
        ]);

        if ($request->status === 'completed') {
            $this->certificateService->issue($enrollment->user, $enrollment->course);
        }

        // If enrollment is approved (active), mark order as completed
        if ($request->status === 'active' && $enrollment->order) {
            $enrollment->order->update([
                'status' => \App\Enums\OrderStatus::COMPLETED,
            ]);

            // Also ensure payment is marked completed if it exists
            $enrollment->order->payments()->update([
                'status' => \App\Enums\PaymentStatus::COMPLETED,
            ]);
        }

        return back()->with('success', 'Enrollment status updated successfully');
    }

    public function destroy(Enrollment $enrollment): RedirectResponse
    {
        $enrollment->delete();

        return back()->with('success', 'Enrollment removed successfully');
    }
}
