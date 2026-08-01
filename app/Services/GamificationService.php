<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\Enrollment;
use App\Models\User;

class GamificationService
{
    public function awardXp(User $user, int $xp, string $reason = ''): void
    {
        $user->increment('xp', $xp);
        $user->increment('total_xp', $xp);
    }

    public function completeLesson(User $user, Enrollment $enrollment, int $xpEarned = 10): void
    {
        $this->awardXp($user, $xpEarned, 'lesson_complete');

        $enrollment->increment('xp_earned', $xpEarned);

        $this->updateStreak($user);

        $this->checkBadges($user);
    }

    public function completeCourse(User $user, Enrollment $enrollment, int $xpEarned = 100): void
    {
        $this->awardXp($user, $xpEarned, 'course_complete');
        $enrollment->increment('xp_earned', $xpEarned);
        $this->updateStreak($user);
        $this->checkBadges($user);
    }

    public function updateStreak(User $user): void
    {
        $today = now()->toDateString();
        $lastLearningDay = $user->last_learning_day;

        if ($lastLearningDay === $today) {
            return;
        }

        $yesterday = now()->subDay()->toDateString();

        if ($lastLearningDay === $yesterday) {
            $user->increment('streak_count');
        } else {
            $user->update(['streak_count' => 1]);
        }

        $user->update(['last_learning_day' => $today]);
    }

    public function checkBadges(User $user): void
    {
        $totalXp = $user->total_xp;
        $eligibleBadges = Badge::where('xp_required', '<=', $totalXp)->where('is_hidden', false)->get();

        foreach ($eligibleBadges as $badge) {
            if (! $user->badges()->where('badge_id', $badge->id)->exists()) {
                $user->badges()->attach($badge->id, ['xp_earned' => $totalXp]);
            }
        }
    }

    public function getLeaderboard(int $limit = 10): array
    {
        return User::where('type', 'student')
            ->select('id', 'name', 'email', 'total_xp', 'streak_count')
            ->orderByDesc('total_xp')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    public function getUserRank(User $user): int
    {
        return User::where('type', 'student')
            ->where('total_xp', '>', $user->total_xp)
            ->count() + 1;
    }

    public function getBadgeProgress(User $user): array
    {
        $totalXp = $user->total_xp;
        $earnedBadges = $user->badges;

        $allBadges = Badge::where('is_hidden', false)->get();

        $progress = [];
        foreach ($allBadges as $badge) {
            $progress[] = [
                'badge' => $badge,
                'earned' => $earnedBadges->contains('id', $badge->id),
                'progress' => min(100, (int) round(($totalXp / max(1, $badge->xp_required)) * 100)),
            ];
        }

        return $progress;
    }
}
