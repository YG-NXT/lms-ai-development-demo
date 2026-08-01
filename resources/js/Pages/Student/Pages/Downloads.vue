<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { Download, FileText, Clock, Trash2, CheckCircle } from 'lucide-vue-next';

defineProps<{
    downloads: any[];
}>();
</script>

<template>
    <Head title="Offline Downloads" />

    <StudentLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Offline Downloads</h1>
                <span class="text-sm text-slate-500 dark:text-slate-400">{{ downloads.length }} items</span>
            </div>

            <div v-if="downloads.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-admin-card-dark">
                <Download :size="48" class="mx-auto text-gray-300 dark:text-gray-600" />
                <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No downloads yet</h3>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Download lessons for offline access.</p>
            </div>

            <div class="space-y-4">
                <div v-for="download in downloads" :key="download.id" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center gap-3">
                            <div class="rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
                                <FileText :size="18" class="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-900 dark:text-white">{{ download.course_title }}</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400">{{ download.lesson_title }}</p>
                                <p class="mt-1 text-xs text-slate-400">Expires {{ new Date(download.expires_at).toLocaleDateString() }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <Link :href="download.file_path" target="_blank" class="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-700" v-if="!download.is_expired">
                                Download
                            </Link>
                            <span v-else class="text-xs text-gray-400">Expired</span>
                            <form :action="student.downloads.destroy.url(download.id)" method="POST" @submit.prevent="confirm('Revoke this download?') && $event.target.submit()">
                                <button type="submit" class="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                                    <Trash2 :size="16" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>