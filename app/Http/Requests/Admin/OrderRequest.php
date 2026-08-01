<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Use existing admin middleware for authorization
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => 'nullable|string',
            'status' => 'nullable|string|in:pending,completed,cancelled,refunded',
            'payment_method' => 'nullable|string|in:stripe,paypal,bkash,local',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
        ];
    }
}
