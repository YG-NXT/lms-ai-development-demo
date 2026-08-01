<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import { Head, Link } from '@inertiajs/vue3';
import { Award, BadgeCheck, ChevronRight, Trophy } from 'lucide-vue-next';

defineProps<{
    user: any;
    badges: any[];
    achievements: any[];
    leaderboard: any[];
    badgeProgress: any[];
    rank: number;
}>();

const getBadgeIcon = (badge: any) => {
    if (badge.icon) {
        return badge.icon;
    }
    return '🏅';
};
</script>

<template>
    <Head :title="__('Gamification')" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Gamification') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">
                        {{ __('Track your progress, earn badges, and climb the leaderboard.') }}
                    </p>
                </div>
                <Link
                    :href="baseRoutes.student.dashboard.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    <ChevronRight :size="18" />
                    {{ __('Back to Dashboard') }}
                </Link>
            </div>

            <!-- Stats Summary -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-800 dark:bg-admin-card-dark">
                    <div class="text-center">
                        <div class="text-4xl font-bold text-amber-600 dark:text-amber-400">{{ user.total_xp ?? 0 }}</div>
                        <div class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Total XP') }}</div>
                    </div>
                </div>
                <div class="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-800 dark:bg-admin-card-dark">
                    <div class="text-center">
                        <div class="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{{ user.streak_count ?? 0 }}</div>
                        <div class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Day Streak') }}</div>
                    </div>
                </div>
                <div class="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm dark:border-sky-800 dark:bg-admin-card-dark">
                    <div class="text-center">
                        <div class="text-4xl font-bold text-sky-600 dark:text-sky-400">#{{ rank }}</div>
                        <div class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Leaderboard Rank') }}</div>
                    </div>
                </div>
            </div>

            <!-- Badges Section -->
            <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                    <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Award :size="20" class="text-amber-500" />
                        {{ __('Badges') }}
                    </h2>
                </div>
                <div class="p-6">
                    <div v-if="badgeProgress.length === 0" class="text-center py-8 text-slate-500 dark:text-slate-400">
                        {{ __('No badges available yet.') }}
                    </div>
                    <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        <div
                            v-for="item in badgeProgress"
                            :key="item.badge.id"
                            class="rounded-xl border p-4 text-center transition-shadow hover:shadow-md"
                            :class="item.earned ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50 opacity-60'"
                        >
                            <div class="mb-3 flex justify-center">
                                <div
                                    class="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                                    :style="{ backgroundColor: item.earned ? item.badge.color + '20' : '#f1f5f9' }"
                                >
                                    {{ getBadgeIcon(item.badge) }}
                                </div>
                            </div>
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ item.badge.name }}</h3>
                            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.badge.description }}</p>
                            <div v-if="!item.earned" class="mt-2">
                                <div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div
                                        class="h-full rounded-full bg-amber-400"
                                        :style="{ width: item.progress + '%' }"
                                    ></div>
                                </div>
                                <p class="mt-1 text-xs text-slate-400">{{ item.progress }}% to unlock</p>
                            </div>
                            <p v-else class="mt-2 text-xs font-bold text-amber-600 dark:text-amber-400">{{ __('Unlocked') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Leaderboard Section -->
            <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                    <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Trophy :size="20" class="text-amber-500" />
                        {{ __('Leaderboard') }}
                    </h2>
                </div>
                <div class="divide-y divide-slate-200 dark:divide-slate-800">
                    <div
                        v-for="(entry, index) in leaderboard"
                        :key="entry.id"
                        class="flex items-center gap-4 px-6 py-4"
                        :class="index === 0 ? 'bg-amber-50 dark:bg-amber-900/20' : ''"
                    >
                        <span class="w-8 text-center text-lg font-bold" :class="index < 3 ? 'text-amber-500' : 'text-slate-400'">
                            {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1) }}
                        </span>
                        <div class="flex-1">
                            <div class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ entry.name }}
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-bold text-amber-600 dark:text-amber-400">{{ entry.total_xp ?? 0 }} XP</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400">{{ entry.streak_count ?? 0 }} day streak</div>
                        </div>
                    </div>
                    <div v-if="leaderboard.length === 0" class="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                        {{ __('No leaderboard data yet.') }}
                    </div>
                </div>
            </div>

            <!-- Achievement History -->
            <div v-if="achievements.length > 0" class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                    <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <BadgeCheck :size="20" class="text-emerald-500" />
                        {{ __('Achievement History') }}
                    </h2>
                </div>
                <div class="divide-y divide-slate-200 dark:divide-slate-800">
                    <div
                        v-for="achievement in achievements"
                        :key="achievement.id"
                        class="flex items-center gap-4 px-6 py-4"
                    >
                        <span class="text-2xl">{{ getBadgeIcon(achievement.badge) }}</span>
                        <div class="flex-1">
                            <div class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ achievement.badge.name }}
                            </div>
                            <div class="text-xs text-slate-500 dark:text-slate-400">
                                {{ achievement.xp_earned }} XP earned on {{ new Date(achievement.created_at).toLocaleDateString() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>