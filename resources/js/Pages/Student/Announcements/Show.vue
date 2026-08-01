<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import { Head } from '@inertiajs/vue3';
import { PropType } from 'vue';

const props = defineProps({
    announcement: Object as PropType<any>,
});

// Declare translation function type
declare const __: (key: string) => string;

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};
</script>

<template>
    <Head :title="announcement.title" />

    <StudentLayout>
        <div class="mx-auto max-w-4xl space-y-6">
            <!-- Header -->
            <div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="mb-4">
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-white">{{ announcement.title }}</h1>
                    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {{ formatDate(announcement.published_at || announcement.created_at) }}
                    </p>
                </div>

                <!-- Content -->
                <div class="prose max-w-none prose-slate dark:prose-invert">
                    <div class="leading-relaxed text-slate-700 dark:text-slate-300" v-html="announcement.content"></div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>
