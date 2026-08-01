<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function __construct(
        protected CertificateService $certificateService
    ) {}

    public function index(): Response
    {
        $certificates = Auth::user()->certificates()
            ->with(['course'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Certificate/Index', [
            'certificates' => $certificates,
        ]);
    }

    public function download(Certificate $certificate)
    {
        if ($certificate->user_id !== Auth::id()) {
            abort(403);
        }

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
