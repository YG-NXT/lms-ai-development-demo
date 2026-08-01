<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Share2, Check, Clock, Users, Zap } from 'lucide-vue-next';

defineProps<{
    referral: any;
    referralCode: string;
    referrerCount: number;
}>();

const shareForm = useForm({});

const shareLink = () => {
    const url = `${window.location.origin}/referral/${referralCode}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
    } else {
        window.prompt('Copy this referral link:', url);
    }
};
</script>

<template>
    <Head title="Affiliate & Referral" />

    <StudentLayout>
        <div class="space-y-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Affiliate & Referral</h1>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Share2 :size="16" />
                        Referral Code
                    </div>
                    <p class="mt-1 text-xl font-bold text-slate-900 dark:text-white">{{ referralCode }}</p>
                    <button @click="shareLink" class="mt-2 text-xs font-medium text-primary-600 hover:text-primary-700">
                        Copy Link
                    </button>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Users :size="16" />
                        Referrals
                    </div>
                    <p class="mt-1 text-xl font-bold text-slate-900 dark:text-white">{{ referrerCount }}</p>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Zap :size="16" />
                        Status
                    </div>
                    <p class="mt-1 text-xl font-bold text-slate-900 dark:text-white">Active</p>
                </div>
            </div>

            <Link :href="student.dashboard.url()" class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                Back to Dashboard
            </Link>
        </div>
    </StudentLayout>
</template>