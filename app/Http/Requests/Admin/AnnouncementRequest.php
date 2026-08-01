<?php

namespace App\Http\Requests\Admin;

use App\Enums\AnnouncementScope;
use App\Enums\AnnouncementStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnnouncementRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'scope' => ['required', Rule::enum(AnnouncementScope::class)],
            'course_id' => [
                Rule::requiredIf($this->scope === AnnouncementScope::COURSE->value),
                'nullable',
                'exists:courses,id',
            ],
            'status' => ['required', Rule::enum(AnnouncementStatus::class)],
            'scheduled_at' => [
                Rule::requiredIf($this->status === AnnouncementStatus::SCHEDULED->value),
                'nullable',
                'date',
                'after:now',
            ],
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'exists:users,id',
        ];
    }
}
