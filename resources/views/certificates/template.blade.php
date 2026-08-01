<!DOCTYPE html><html><head><meta charset="utf-8"><title>{{ __('Certificate of Completion') }}</title><style>
@page { margin: 0; size: a4 landscape; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 297mm; height: 210mm; margin: 0; padding: 0; background-color: #667eea; overflow: hidden; }
body { font-family: 'DejaVu Sans', 'Helvetica', 'Arial', sans-serif; line-height: 1.2; position: relative; }
.certificate-container { width: 296mm; height: 209mm; margin: auto; padding: 10mm; position: relative; overflow: hidden; }
.certificate-inner { width: 100%; height: 100%; background: #ffffff; position: relative; overflow: hidden; border: 1px solid #e2e8f0; }
.header-section { text-align: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 2px solid #e9ecef; }
.business-logo { max-width: 100px; max-height: 50px; margin-bottom: 8px; }
.business-name { font-size: 22px; font-weight: bold; color: #1e293b; margin: 0; letter-spacing: 1px; }
.business-tagline { font-size: 10px; color: #64748b; margin: 3px 0 0 0; }
.certificate-title { text-align: center; margin: 15px 0; }
.title-main { font-size: 36px; font-weight: bold; color: #667eea; margin: 0; text-transform: uppercase; letter-spacing: 2px; }
.title-subtitle { font-size: 14px; color: #64748b; margin: 5px 0 0 0; }
.recipient-section { text-align: center; margin: 20px 0; }
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ __('Certificate of Completion') }}</title>
    <style>
        @page {
            margin: 0;
            size: 297mm 210mm landscape;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            width: 297mm;
            height: 210mm;
            margin: 0;
            padding: 0;
            font-family: 'DejaVu Sans', sans-serif;
            background: #ffffff;
            overflow: hidden;
        }

        /* The master wrapper that prevents any splitting */
        .master-wrapper {
            position: relative;
            width: 297mm;
            height: 210mm;
            overflow: hidden;
            background-color: #ffffff;
        }

        /* Background/Border Layer */
        .decor-layer {
            position: absolute;
            top: 10mm;
            left: 10mm;
            width: 277mm;
            height: 190mm;
            border: 1mm solid #667eea;
            z-index: 1;
        }

        .inner-border {
            position: absolute;
            top: 3mm;
            left: 3mm;
            right: 3mm;
            bottom: 3mm;
            border: 0.5mm solid #cbd5e1;
        }

        /* Corner Ornaments */
        .ornament {
            position: absolute;
            width: 50px;
            height: 50px;
            z-index: 5;
        }
        .otl { top: 0; left: 0; border-top: 5px solid #667eea; border-left: 5px solid #667eea; }
        .otr { top: 0; right: 0; border-top: 5px solid #667eea; border-right: 5px solid #667eea; }
        .obl { bottom: 0; left: 0; border-bottom: 5px solid #667eea; border-left: 5px solid #667eea; }
        .obr { bottom: 0; right: 0; border-bottom: 5px solid #667eea; border-right: 5px solid #667eea; }

        /* Content Layer - Absolute positioned to avoid splitting */
        .content-layer {
            position: absolute;
            top: 22mm; /* Slightly higher */
            left: 25mm;
            width: 247mm;
            height: 155mm; /* Reduced slightly to pull bottom up */
            z-index: 10;
            text-align: center;
        }

        .header-logo {
            max-width: 140px;
            max-height: 40px; /* Reduced from 45 */
            margin-bottom: 4mm;
        }

        .org-name {
            font-size: 16px; /* Slightly smaller */
            font-weight: bold;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 6mm;
            display: block;
        }

        .cert-title {
            font-size: 40px; /* Reduced from 44 */
            font-weight: bold;
            color: #667eea;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 4mm;
        }

        .presentation-text {
            font-size: 14px;
            font-style: italic;
            color: #64748b;
            margin-bottom: 8mm;
        }

        .recipient-name {
            font-family: 'DejaVu Serif', serif;
            font-size: 38px; /* Reduced from 40 */
            font-weight: bold;
            color: #1e293b;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 10mm;
            display: inline-block;
            min-width: 160mm;
        }

        .body-msg {
            font-size: 15px; /* Slightly smaller */
            color: #475569;
            line-height: 1.5;
            width: 80%;
            margin: 0 auto;
        }

        .course-title {
            font-size: 20px; /* Reduced from 22 */
            font-weight: bold;
            color: #667eea;
            display: block;
            margin: 3mm 0;
        }

        /* Footer - pinned at bottom of content-layer */
        .footer-table {
            position: absolute;
            bottom: 5mm; /* Pulled up from 0 */
            left: 0;
            width: 100%;
            border-collapse: collapse;
        }

        .footer-table td {
            vertical-align: bottom;
            text-align: center;
        }

        .signature-img {
            max-height: 50px;
            margin-bottom: 3mm;
        }

        .sign-line {
            border-top: 1px solid #94a3b8;
            width: 180px;
            margin: 0 auto 2mm auto;
        }

        .sign-name {
            font-size: 14px;
            font-weight: bold;
            color: #1e293b;
        }

        .sign-label {
            font-size: 10px;
            color: #94a3b8;
            text-transform: uppercase;
        }

        .meta-box {
            text-align: left;
        }
        .meta-box-right {
            text-align: right;
        }

        .meta-label {
            font-size: 9px;
            font-weight: bold;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 1mm;
        }

        .meta-value {
            font-size: 12px;
            font-weight: bold;
            color: #1e293b;
        }

        .v-code {
            font-family: monospace;
            font-weight: bold;
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="master-wrapper">
        <!-- Decoration Layer -->
        <div class="decor-layer">
            <div class="inner-border"></div>
            <div class="ornament otl"></div>
            <div class="ornament otr"></div>
            <div class="ornament obl"></div>
            <div class="ornament obr"></div>
        </div>

        <!-- Content Layer -->
        <div class="content-layer">
            @if($template && $template->logo_url)
                <img src="{{ public_path('storage/' . $template->logo_url) }}" class="header-logo" alt="Logo">
            @endif

            <div class="org-name">{{ $template->organization_name ?? business_config('business_name', config('app.name')) }}</div>

            <h1 class="cert-title">{{ $template->title ?? __('Certificate of Completion') }}</h1>

            <p class="presentation-text">{{ __('This high achievement is proudly presented to') }}</p>

            <div class="recipient-name">{{ $user->name }}</div>

            <div class="body-msg">
                {{ $template->body_text ?? __('on the successful completion of the specialized course program') }}
                <span class="course-title">{{ $course->title }}</span>
                {{ __('demonstrating exceptional proficiency and commitment to personal and professional growth.') }}
            </div>

            <table class="footer-table">
                <tr>
                    <td style="width: 30%; text-align: left;">
                        <div class="meta-box">
                            <div class="meta-label">{{ __('Date of Issue') }}</div>
                            <div class="meta-value">{{ $certificate->issued_at->format('F d, Y') }}</div>
                            <div style="margin-top: 5mm;">
                                <div class="meta-label">{{ __('Course Duration') }}</div>
                                <div class="meta-value">{{ $course->duration }}</div>
                            </div>
                        </div>
                    </td>
                    <td style="width: 40%;">
                        <div class="signature-block">
                            @if($template && $template->signature_url)
                                <img src="{{ public_path('storage/' . $template->signature_url) }}" class="signature-img" alt="Signature">
                            @else
                                <div style="height: 50px;"></div>
                            @endif
                            <div class="sign-line"></div>
                            <div class="sign-name">{{ $template->instructor_name_label ?? __('Authorized Signature') }}</div>
                            <div class="sign-label">{{ __('Director / Lead Instructor') }}</div>
                        </div>
                    </td>
                    <td style="width: 30%; text-align: right;">
                        <div class="meta-box-right">
                            <div class="meta-label">{{ __('Certificate ID') }}</div>
                            <div class="meta-value" style="font-family: monospace;">{{ $certificate->certificate_id }}</div>
                            <div style="margin-top: 5mm;">
                                <div class="meta-label">{{ __('Verification Code') }}</div>
                                <div class="meta-value v-code">#{{ $certificate->verification_code }}</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
