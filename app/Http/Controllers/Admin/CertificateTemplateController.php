<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CertificateTemplate;
use App\Traits\UploadsMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificateTemplateController extends Controller
{
    use UploadsMedia;

    public function index(): Response
    {
        $this->authorize('update', CertificateTemplate::class);

        $template = CertificateTemplate::firstOrCreate([], [
            'title' => 'Certificate of Completion',
            'body_text' => 'has successfully completed the course',
            'is_active' => true,
        ]);

        return Inertia::render('Admin/LMS/Certificate/Template', [
            'template' => $template,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $this->authorize('update', CertificateTemplate::class);

        $template = CertificateTemplate::first();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'body_text' => 'required|string',
            'instructor_name_label' => 'nullable|string|max:255',
            'organization_name' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $data['logo_url'] = $this->upload($request->file('logo'), 'certificates/logos');
        }

        if ($request->hasFile('background')) {
            $data['background_url'] = $this->upload($request->file('background'), 'certificates/backgrounds');
        }

        if ($request->hasFile('signature')) {
            $data['signature_url'] = $this->upload($request->file('signature'), 'certificates/signatures');
        }

        $template->update($data);

        return back()->with('success', 'Certificate template updated successfully');
    }
}
