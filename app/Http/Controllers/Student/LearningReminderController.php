<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\LearningReminder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LearningReminderController extends Controller
{
    public function index(): object
    {
        $reminders = LearningReminder::where('user_id', auth()->id())
            ->with('course')
            ->orderBy('reminder_at', 'desc')
            ->paginate(20);

        return inertia('Student/Pages/LearningReminders', [
            'reminders' => $reminders,
        ]);
    }

    public function store(Request $request, Course $course): RedirectResponse
    {
        $request->validate([
            'reminder_at' => 'required|date|after:now',
            'type' => 'required|in:daily_streak,deadline,advance_notice',
        ]);

        LearningReminder::create([
            'user_id' => auth()->id(),
            'course_id' => $course->id,
            'reminder_at' => $request->reminder_at,
            'type' => $request->type,
        ]);

        return back()->with('success', 'Reminder scheduled.');
    }

    public function destroy(LearningReminder $reminder): RedirectResponse
    {
        $reminder->delete();

        return back()->with('success', 'Reminder deleted.');
    }
}
