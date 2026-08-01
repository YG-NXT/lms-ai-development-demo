<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GradeAssignmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow if user has permission to grade assignments
        // This will be enforced by middleware/controller
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $assignment = $this->route('assignment');

        // Load lesson if not already loaded
        if (! $assignment->relationLoaded('lesson')) {
            $assignment->load('lesson');
        }

        $maxMarks = $assignment->lesson->total_marks ?? 100;

        return [
            'obtained_mark' => [
                'required',
                'numeric',
                'min:0',
                "max:{$maxMarks}",
            ],
            'feedback' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'status' => [
                'required',
                'in:graded,recheck_reviewed',
            ],
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
            'obtained_mark.required' => 'Please enter the marks obtained by the student.',
            'obtained_mark.numeric' => 'Marks must be a number.',
            'obtained_mark.min' => 'Marks cannot be negative.',
            'obtained_mark.max' => 'Marks cannot exceed the total marks for this assignment.',
            'status.required' => 'Please select a grading status.',
            'status.in' => 'Invalid grading status selected.',
        ];
    }
}
