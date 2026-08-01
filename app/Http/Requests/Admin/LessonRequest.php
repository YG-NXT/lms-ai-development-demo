<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LessonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $sectionId = $this->route('section')?->id ?? $this->route('lesson')?->course_section_id;
        $lessonId = $this->route('lesson')?->id;

        return [
            'title' => [
                'required',
                'string',
                'max:255',
                // Unique within the same section
                Rule::unique('lessons', 'title')
                    ->where('course_section_id', $sectionId)
                    ->ignore($lessonId),
            ],
            'type' => ['required', 'string'], // VIDEO, TEXT, FILE, LIVE, ASSIGNMENT
            'content' => ['required_if:type,TEXT', 'nullable', 'string'],
            'video_provider' => ['nullable', 'string', 'in:YOUTUBE,VIMEO,CUSTOM'],
            'video_id' => ['nullable', 'string'],
            'video_url' => ['required_if:type,VIDEO', 'nullable', 'string'], // Relaxed URL rule to allow embed codes if needed, or keep stringent but handle provider specific logic in controller
            'file_path' => ['required_if:type,FILE', 'nullable', $this->hasFile('file_path') ? 'file' : 'sometimes', $this->hasFile('file_path') ? 'max:10240' : ''], // Max 10MB if file
            'duration' => ['nullable', 'integer', 'min:0'],
            'is_preview' => ['boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
            'total_marks' => ['nullable', 'integer', 'min:0'],
            'deadline' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.unique' => 'A lesson with this title already exists in this section. Please use a different title.',
            'title.required' => 'Please enter a lesson title.',
            'title.max' => 'The lesson title cannot exceed 255 characters.',
            'type.required' => 'Please select a lesson type.',
        ];
    }
}
