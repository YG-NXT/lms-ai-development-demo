<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, useForm } from '@inertiajs/vue3';
import { Clock, BookOpen, TrendingUp, Trophy, Target } from 'lucide-vue-next';

defineProps<{
    timeSpentHours?: number;
    lessonsCompleted?: number;
    coursesEnrolled?: number;
    avgProgress?: number;
}>();

const progressForm = useForm({});
</script>

<template>
    <Head title="Learning Dashboard" />

    <StudentLayout>
        <div class="space-y-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Learning Dashboard</h1>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Clock :size="16" />
                        Time Spent
                    </div>
                    <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{{ timeSpentHours ?? 0 }}h</p>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <BookOpen :size="16" />
                        Lessons Done
                    </div>
                    <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{{ lessonsCompleted ?? 0 }}</p>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Target :size="16" />
                        Courses Enrolled
                    </div>
                    <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{{ coursesEnrolled ?? 0 }}</p>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <TrendingUp :size="16" />
                        Avg Progress
                    </div>
                    <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{{ avgProgress ?? 0 }}%</p>
                </div>
            </div>

            <Link :href="student.dashboard.url()" class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                Back to Dashboard
            </Link>
        </div>
    </StudentLayout>
</template>