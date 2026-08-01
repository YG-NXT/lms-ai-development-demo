<?php

namespace App\Http\Requests\Admin\LiveClass;

use Illuminate\Foundation\Http\FormRequest;

class StoreLiveClassRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'course_id' => ['required', 'exists:courses,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'type' => ['required', 'in:daily,specific'],
            'class_date' => [
                'required_if:type,specific',
                'nullable',
                'date',
                'after_or_equal:today',
                'before_or_equal:+1 day', // "class date cannot be beyond one day from current date"
            ],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'provider' => ['required', 'in:zoom,google_meet'],
            'meeting_url' => ['required', 'url'],
            'timezone' => ['required', 'string'],
            'reminder_minutes_before' => ['required', 'integer', 'min:0'],
        ];
    }
}
