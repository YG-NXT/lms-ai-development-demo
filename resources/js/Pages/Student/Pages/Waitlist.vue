<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { Users, Clock, UserPlus, Clock as ClockIcon, X } from 'lucide-vue-next';

defineProps<{
    waitlistEntries: any[];
}>();
</script>

<template>
    <Head title="Waitlist" />

    <StudentLayout>
        <div class="space-y-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Waitlist</h1>

            <div v-if="waitlistEntries.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-admin-card-dark">
                <Users :size="48" class="mx-auto text-gray-300 dark:text-gray-600" />
                <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No waitlist entries</h3>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Join waitlists for full courses to get notified when a spot opens.</p>
            </div>

            <div class="space-y-4">
                <div v-for="entry in waitlistEntries" :key="entry.id" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center gap-3">
                            <div class="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
                                <Users :size="18" class="text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-900 dark:text-white">{{ entry.course?.title }}</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400">Position #{{ entry.position }}</p>
                            </div>
                        </div>
                        <form :action="student.waitlist.destroy.url(entry.id)" method="POST" @submit.prevent="if(confirm('Leave this waitlist?')) $event.target.submit()">
                            <button type="submit" class="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                                <X :size="16" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>