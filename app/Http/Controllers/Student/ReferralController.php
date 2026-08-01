<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReferralController extends Controller
{
    public function index(): JsonResponse
    {
        $referral = auth()->user()->referral;

        return response()->json([
            'referral' => $referral,
            'referral_code' => auth()->user()->username ?? auth()->user()->name,
            'referrer_count' => Referral::where('referred_id', auth()->id())->count(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $code = Str::upper(Str::random(8));

        $referral = Referral::create([
            'referrer_id' => auth()->id(),
            'referral_code' => $code,
            'source' => $request->input('source', 'link'),
        ]);

        return response()->json($referral, 201);
    }

    public function complete(Referral $referral): JsonResponse
    {
        if ($referral->referred_id !== null) {
            return response()->json(['error' => 'Already converted'], 422);
        }

        $referral->update([
            'referred_id' => auth()->id(),
            'is_converted' => true,
            'converted_at' => now(),
        ]);

        return response()->json($referral);
    }
}
