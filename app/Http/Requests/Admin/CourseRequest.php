<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'instructor_name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'level' => ['required', 'string'], // Should be one of BEGINNER, INTERMEDIATE, ADVANCED
            'language' => ['required', 'string', 'max:100'],
            'price' => ['required_unless:is_free,true', 'numeric', 'min:0'],
            'discount_price' => ['nullable', 'numeric', 'min:0', 'lt:price'],
            'is_free' => ['boolean'],
            'status' => ['required', 'string'], // Should be one of DRAFT, PUBLISHED
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'has_timeline' => ['boolean'],
            'start_date' => ['nullable', 'required_if:has_timeline,true', 'date'],
            'end_date' => ['nullable', 'required_if:has_timeline,true', 'date', 'after_or_equal:start_date'],
            'last_enrollment_date' => ['nullable', 'required_if:has_timeline,true', 'date', 'before_or_equal:start_date'],
        ];
    }
}
