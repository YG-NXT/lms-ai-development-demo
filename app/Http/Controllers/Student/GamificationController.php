<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Services\GamificationService;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class GamificationController extends Controller
{
    public function __construct(protected GamificationService $gamification) {}

    public function index(): Response
    {
        $user = Auth::user();

        return Inertia::render('Student/Pages/Gamification', [
            'user' => $user,
            'badges' => $user->badges,
            'achievements' => $user->achievements()->with('badge')->latest()->get(),
            'leaderboard' => $this->gamification->getLeaderboard(20),
            'badgeProgress' => $this->gamification->getBadgeProgress($user),
            'rank' => $this->gamification->getUserRank($user),
        ]);
    }
}
