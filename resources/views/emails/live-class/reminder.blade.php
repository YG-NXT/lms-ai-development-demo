<x-mail::message>
# Hi {{ $user->name }},

This is a reminder that your live session **{{ $liveClass->title }}** for the course **{{ $liveClass->course->title }}** is starting soon.

**Details:**
- **Time:** {{ $liveClass->start_at->format('M d, Y h:i A') }} ({{ $liveClass->timezone }})
- **Provider:** {{ ucfirst(str_replace('_', ' ', $liveClass->provider)) }}

You can join the session directly through the course player or by clicking the button below.

<x-mail::button :url="route('student.live-classes.join', $liveClass->id)">
Join Live Session
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
