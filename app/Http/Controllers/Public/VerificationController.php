<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\BusinessSettingService;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VerificationController extends Controller
{
    public function __construct(
        protected CertificateService $certificateService,
        protected BusinessSettingService $settingService
    ) {}

    public function index(Request $request): Response
    {
        $certificate = null;
        if ($request->code) {
            $certificate = $this->certificateService->verify($request->code);
        }

        return Inertia::render('Public/Certificate/Verify', [
            'certificate' => $certificate,
            'code' => $request->code,
            'businessName' => business_config('business_name', config('app.name')),
            'businessLogo' => business_config('business_logo'),
        ]);
    }
}
