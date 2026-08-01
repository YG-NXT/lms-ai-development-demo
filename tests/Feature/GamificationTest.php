<?php

use App\Models\Badge;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Services\GamificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('badge factory creates a badge', function () {
    $badge = Badge::factory()->create();

    expect($badge)->toBeInstanceOf(Badge::class);
    expect($badge->name)->toBeString();
    expect($badge->slug)->toBeString();
    expect($badge->xp_required)->toBeInt();
});

test('badge can be awarded to a user', function () {
    $badge = Badge::factory()->create(['xp_required' => 0]);
    $user = User::factory()->create();

    $user->badges()->attach($badge->id, ['xp_earned' => 100]);

    expect($user->badges)->toHaveCount(1);
    expect($user->badges->first->name)->toBe($badge->name);
});

test('gamification service awards XP', function () {
    $service = new GamificationService;
    $user = User::factory()->create();

    $service->awardXp($user, 50, 'test');

    expect($user->fresh()->xp)->toBe(50);
    expect($user->fresh()->total_xp)->toBe(50);
});

test('gamification service completes lesson and awards XP', function () {
    $service = new GamificationService;
    $user = User::factory()->create();
    $course = Course::factory()->create();
    $enrollment = Enrollment::create([
        'user_id' => $user->id,
        'course_id' => $course->id,
        'status' => \App\Enums\EnrollmentStatus::ACTIVE,
        'enrolled_at' => now(),
    ]);

    $service->completeLesson($user, $enrollment, 10);

    expect($user->fresh()->total_xp)->toBe(10);
});

test('gamification service updates streak on consecutive days', function () {
    $service = new GamificationService;
    $user = User::factory()->create();

    $service->updateStreak($user);

    expect($user->fresh()->streak_count)->toBe(1);
    expect($user->fresh()->last_learning_day)->toBeToday();
});

test('gamification service leaderboard returns top users', function () {
    $service = new GamificationService;

    for ($i = 0; $i < 5; $i++) {
        User::factory()->create([
            'type' => 'student',
            'total_xp' => ($i + 1) * 100,
        ]);
    }

    $leaderboard = $service->getLeaderboard(3);

    expect($leaderboard)->toHaveCount(3);
    expect($leaderboard[0]['total_xp'])->toBe(500);
});

test('gamification service returns correct user rank', function () {
    $service = new GamificationService;

    User::factory()->create(['type' => 'student', 'total_xp' => 300]);
    User::factory()->create(['type' => 'student', 'total_xp' => 200]);
    User::factory()->create(['type' => 'student', 'total_xp' => 100]);
    $targetUser = User::factory()->create(['type' => 'student', 'total_xp' => 250]);

    $rank = $service->getUserRank($targetUser);

    expect($rank)->toBe(2);
});

test('badge progress shows earned and unearned badges', function () {
    $badge = Badge::factory()->create(['xp_required' => 100, 'is_hidden' => false]);
    $user = User::factory()->create(['total_xp' => 50]);

    $service = new GamificationService;
    $progress = $service->getBadgeProgress($user);

    $badgeProgress = collect($progress)->first(fn ($p) => $p['badge']->id === $badge->id);
    expect($badgeProgress['earned'])->toBeFalse();
    expect($badgeProgress['progress'])->toBe(50);
});

test('badge progress marks earned badges', function () {
    $badge = Badge::factory()->create(['xp_required' => 100, 'is_hidden' => false]);
    $user = User::factory()->create(['total_xp' => 200]);
    $user->badges()->attach($badge->id, ['xp_earned' => 200]);

    $service = new GamificationService;
    $progress = $service->getBadgeProgress($user);

    $badgeProgress = collect($progress)->first(fn ($p) => $p['badge']->id === $badge->id);
    expect($badgeProgress['earned'])->toBeTrue();
});

test('gamification badges page loads correctly', function () {
    $user = User::factory()->create(['type' => 'student']);

    $response = $this->actingAs($user)->get('/student/gamification');

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        expect($page->component)->toBe('Student/Pages/Gamification');
    });
});
