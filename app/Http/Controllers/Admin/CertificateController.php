<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function __construct(
        protected CertificateService $certificateService
    ) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Certificate::class);

        $query = Certificate::with(['user', 'course', 'template'])
            ->latest();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('certificate_id', 'like', "%{$request->search}%")
                    ->orWhere('verification_code', 'like', "%{$request->search}%")
                    ->orWhereHas('user', function ($q) use ($request) {
                        $q->where('name', 'like', "%{$request->search}%");
                    })->orWhereHas('course', function ($q) use ($request) {
                        $q->where('title', 'like', "%{$request->search}%");
                    });
            });
        }

        return Inertia::render('Admin/LMS/Certificate/Index', [
            'certificates' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function download(Certificate $certificate)
    {
        $this->authorize('view', $certificate);

        $certificate->load(['course']);
        $pdf = $this->certificateService->generatePdf($certificate);

        $filename = Str::slug($certificate->course->title).'-'.now()->format('Y-m-d').'.pdf';

        if (ob_get_length()) {
            ob_clean();
        }

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
            'Content-Transfer-Encoding' => 'binary',
        ]);
    }
}
