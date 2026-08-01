<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { Bookmark, BookOpen, Calendar, ChevronRight, Clock, GraduationCap, PlayCircle } from 'lucide-vue-next';

defineProps<{
    enrollments: any[];
    bookmarks?: any[];
    totalXp?: number;
    streakCount?: number;
    userRank?: number;
    achievements?: any[];
}>();

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/course-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};
</script>

<template>
    <Head :title="__('Student Dashboard')" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Welcome Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Welcome back!') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">{{ __('Continue your learning journey.') }}</p>
                </div>
                <Link
                    :href="baseRoutes.home.url()"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    {{ __('Browse Courses') }}
                    <ChevronRight :size="18" />
                </Link>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-4">
                        <div class="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                            <BookOpen :size="24" />
                        </div>
                        <div>
                            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Enrolled Courses') }}</div>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ enrollments.length }}</div>
                        </div>
                    </div>
                </div>

                <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-4">
                        <div class="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                            <PlayCircle :size="24" />
                        </div>
                        <div>
                            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Active Courses') }}</div>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">
                                {{ enrollments.filter((e) => e.status === 'active').length }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-4">
                        <div class="rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                            <Clock :size="24" />
                        </div>
                        <div>
                            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Pending Courses') }}</div>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">
                                {{ enrollments.filter((e) => e.status === 'pending').length }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gamification Stats -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-4">
                        <div class="rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 011.212 1.212l-.838 1.676 1.318.481a1 1 0 01-.686 1.894l-1.984.295-.295 1.984a1 1 0 01-1.894.686l-.481-1.318-.838 1.676a1 1 0 01-1.212 1.212l1.599-.801L11 15.677V17a1 1 0 01-2 0v-1.323l-3.954-1.582-1.599.8a1 1 0 01-1.212-1.212l.838-1.676-1.318-.481a1 1 0 01.686-1.894l1.984-.295.295-1.984a1 1 0 011.894-.686l.481 1.318.838-1.676a1 1 0 011.212-1.212l-1.599.801L9 4.327V3a1 1 0 011-1z"/>
                            </svg>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Total XP') }}</div>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">
                                {{ totalXp ?? 0 }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-4">
                        <div class="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Learning Streak') }}</div>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">
                                {{ streakCount ?? 0 }} {{ __('days') }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm dark:border-sky-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-4">
                        <div class="rounded-xl bg-sky-50 p-3 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.05 2A2.5 2.5 0 017.5 0h5A2.5 2.5 0 0115 2.5v15a2.5 2.5 0 01-2.5 2.5h-5A2.5 2.5 0 015 17.5V2zm3.5 7a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm7 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM10 12a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Leaderboard Rank') }}</div>
                            <div class="text-2xl font-bold text-slate-900 dark:text-white">
                                #{{ userRank ?? '—' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Learning Paths Link -->
            <div class="mt-6">
                <Link
                    :href="baseRoutes.student.learningPaths.index.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm4 10a1 1 0 100 2h4a1 1 0 100-2h-4zm-4 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm4-8a1 1 0 100 2h4a1 1 0 100-2h-4z" clip-rule="evenodd"/>
                    </svg>
                    {{ __('Browse Learning Paths') }}
                    <ChevronRight :size="18" />
                </Link>
            </div>

            <!-- Course Grid -->
            <div>
                <h2 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">{{ __('My Courses') }}</h2>

                <div v-if="enrollments.length > 0" class="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    <div
                        v-for="enrollment in enrollments"
                        :key="enrollment.id"
                        class="group flex overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-admin-card-dark dark:shadow-none dark:hover:border-primary-500/50"
                        :class="{ 'opacity-75': enrollment.status !== 'active' }"
                    >
                        <!-- Thumbnail -->
                        <div class="relative aspect-4/3 w-40 shrink-0 overflow-hidden sm:w-44 md:w-48">
                            <img
                                :src="getThumbnail(enrollment.course?.thumbnail)"
                                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                :alt="enrollment.course?.title"
                            />
                            <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                            <!-- Status Badge -->
                            <div class="absolute top-2 left-2">
                                <span
                                    v-if="enrollment.status === 'pending'"
                                    class="rounded-lg bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm"
                                >
                                    {{ __('Pending') }}
                                </span>
                                <span
                                    v-else-if="enrollment.status === 'active'"
                                    class="rounded-lg bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm"
                                >
                                    {{ __('Active') }}
                                </span>
                                <span
                                    v-else-if="enrollment.status === 'completed'"
                                    class="rounded-lg bg-blue-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm"
                                >
                                    {{ __('Completed') }}
                                </span>
                                <span
                                    v-else
                                    class="rounded-lg bg-rose-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm"
                                >
                                    {{ enrollment.status }}
                                </span>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="flex flex-1 flex-col p-4">
                            <!-- Category Badge -->
                            <div class="mb-2">
                                <span
                                    class="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                >
                                    {{ enrollment.course?.category?.name || __('Uncategorized') }}
                                </span>
                            </div>

                            <!-- Title -->
                            <h3
                                class="mb-2 line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
                            >
                                {{ enrollment.course?.title }}
                            </h3>

                            <!-- Progress Bar (Active courses only) -->
                            <div v-if="enrollment.status === 'active'" class="mb-3">
                                <div class="mb-1 flex items-center justify-between text-[10px] font-bold">
                                    <span class="text-slate-500 dark:text-slate-400">{{ __('Progress') }}</span>
                                    <span
                                        :class="{
                                            'text-amber-600 dark:text-amber-400': enrollment.progress_percentage <= 30,
                                            'text-primary-600 dark:text-primary-400':
                                                enrollment.progress_percentage > 30 && enrollment.progress_percentage <= 70,
                                            'text-emerald-600 dark:text-emerald-400': enrollment.progress_percentage > 70,
                                        }"
                                    >
                                        {{ enrollment.progress_percentage }}%
                                    </span>
                                </div>
                                <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div
                                        class="h-full rounded-full transition-all duration-500"
                                        :class="{
                                            'bg-linear-to-r from-amber-400 to-amber-500': enrollment.progress_percentage <= 30,
                                            'bg-linear-to-r from-primary-400 to-primary-600':
                                                enrollment.progress_percentage > 30 && enrollment.progress_percentage <= 70,
                                            'bg-linear-to-r from-emerald-400 to-emerald-600': enrollment.progress_percentage > 70,
                                        }"
                                        :style="{ width: `${enrollment.progress_percentage}%` }"
                                    ></div>
                                </div>
                            </div>

                            <!-- Meta Info -->
                            <div class="mb-3 flex items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                <div class="flex items-center gap-1">
                                    <BookOpen :size="12" class="text-primary-500" />
                                    <span>{{ enrollment.course?.sections_count || 0 }} {{ __('Sections') }}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <Calendar :size="12" class="text-primary-500" />
                                    <span>{{
                                        new Date(enrollment.enrolled_at || enrollment.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })
                                    }}</span>
                                </div>
                            </div>

                            <!-- Action Button -->
                            <div class="mt-auto">
                                <template v-if="enrollment.status === 'active' || enrollment.status === 'completed'">
                                    <Link
                                        :href="student.courses.show.url(enrollment.course?.slug)"
                                        class="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-50 px-3 py-2 text-xs font-bold text-primary-600 transition-all hover:bg-primary-600 hover:text-white dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-600 dark:hover:text-white"
                                    >
                                        {{ enrollment.status === 'completed' ? __('View Course') : __('Continue Learning') }}
                                        <ChevronRight :size="14" />
                                    </Link>
                                </template>
                                <template v-else>
                                    <button
                                        disabled
                                        class="flex w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                                    >
                                        {{ enrollment.status === 'pending' ? __('Awaiting Approval') : __('Access Restricted') }}
                                    </button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bookmarks Section -->
                <div v-if="bookmarks && bookmarks.length > 0" class="mt-8">
                    <div class="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                        </svg>
                        <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Bookmarked Courses') }}</h2>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div
                            v-for="bookmark in bookmarks"
                            :key="bookmark.id"
                            class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-admin-card-dark"
                        >
                            <Link :href="`/courses/${bookmark.course.slug}`">
                                <div class="aspect-video overflow-hidden">
                                    <img
                                        :src="getThumbnail(bookmark.course.thumbnail)"
                                        :alt="bookmark.course.title"
                                        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                            <div class="p-4">
                                <h3 class="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">
                                    {{ bookmark.course.title }}
                                </h3>
                                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {{ bookmark.course.category?.name ?? '' }}
                                </p>
                                <div class="mt-2 flex items-center justify-between">
                                    <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {{ bookmark.course.instructor?.name ?? '' }}
                                    </span>
                                    <span class="text-sm font-bold text-slate-900 dark:text-white">
                                        {{ '$' + (bookmark.course.effective_price ?? 0).toFixed(2) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div
                    v-else
                    class="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm dark:border-slate-800 dark:bg-admin-card-dark"
                >
                    <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50">
                        <GraduationCap :size="40" class="text-slate-300 dark:text-slate-600" />
                    </div>
                    <h2 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">{{ __('No Enrolled Courses Yet') }}</h2>
                    <p class="mx-auto mb-8 max-w-md text-slate-500 dark:text-slate-400">
                        {{ __('Browse our library and start your learning journey today.') }}
                    </p>
                    <Link
                        :href="baseRoutes.home.url()"
                        class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                    >
                        {{ __('Browse Courses') }}
                        <ChevronRight :size="18" />
                    </Link>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>
