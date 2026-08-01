<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\LiveClass;
use App\Models\LiveClassAttendance;
use Illuminate\Support\Facades\Auth;

class LiveClassController extends Controller
{
    public function join(LiveClass $liveClass)
    {
        $this->authorize('view', $liveClass);

        if ($liveClass->status_label !== 'live') {
            return back()->with('error', 'This class is not currently live.');
        }

        // Track attendance
        LiveClassAttendance::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'live_class_id' => $liveClass->id,
            ],
            [
                'joined_at' => now(),
                'status' => 'joined',
            ]
        );

        return redirect($liveClass->meeting_url);
    }
}
