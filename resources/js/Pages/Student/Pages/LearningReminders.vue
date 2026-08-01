<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { Bell, Clock, Calendar, Plus, Trash2, X } from 'lucide-vue-next';

defineProps<{
    reminders: any[];
}>();
</script>

<template>
    <Head title="Learning Reminders" />

    <StudentLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Learning Reminders</h1>
                <Link :href="student.courses.index.url()" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Browse Courses
                </Link>
            </div>

            <div v-if="reminders.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-admin-card-dark">
                <Bell :size="48" class="mx-auto text-gray-300 dark:text-gray-600" />
                <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No reminders yet</h3>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Set up reminders to stay on track with your learning.</p>
            </div>

            <div class="space-y-4">
                <div v-for="reminder in reminders" :key="reminder.id" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center gap-3">
                            <div class="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
                                <Clock :size="18" class="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-900 dark:text-white">{{ reminder.course?.title }}</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400">{{ reminder.type }} &middot; {{ new Date(reminder.reminder_at).toLocaleString() }}</p>
                            </div>
                        </div>
                        <form :action="student.reminders.destroy.url(reminder.id)" method="POST" @submit.prevent="confirm('Delete this reminder?') && $event.target.submit()">
                            <button type="submit" class="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
                                <Trash2 :size="16" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>