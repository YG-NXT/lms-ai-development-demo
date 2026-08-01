<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import { Head, Link } from '@inertiajs/vue3';
import { ChevronRight, Gift, PlayCircle } from 'lucide-vue-next';

defineProps<{
    bundles: any;
}>();

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/bundle-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};
</script>

<template>
    <Head :title="__('Course Bundles')" />

    <StudentLayout>
        <div class="space-y-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Course Bundles') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">{{ __('Save big with bundled courses.') }}</p>
                </div>
                <Link :href="baseRoutes.student.dashboard.url()" class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white">
                    {{ __('Back to Dashboard') }}
                    <ChevronRight :size="18" />
                </Link>
            </div>

            <div v-if="bundles.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    v-for="bundle in bundles"
                    :key="bundle.id"
                    :href="`/student/bundles/${bundle.slug}`"
                    class="group block rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-admin-card-dark"
                >
                    <div class="aspect-[16/9] overflow-hidden rounded-t-2xl">
                        <img :src="getThumbnail(bundle.thumbnail)" :alt="bundle.name" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div class="p-5">
                        <h3 class="text-base font-bold text-slate-900 dark:text-white">{{ bundle.name }}</h3>
                        <p class="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{{ bundle.description }}</p>
                        <div class="mt-4 flex items-center justify-between">
                            <div>
                                <span class="text-xs text-slate-400 line-through">{{ '$' + bundle.original_price.toFixed(2) }}</span>
                                <span class="ml-2 text-lg font-bold text-primary-600 dark:text-primary-400">${{ bundle.bundle_price.toFixed(2) }}</span>
                            </div>
                            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ bundle.courses_count }} courses</span>
                        </div>
                    </div>
                </Link>
            </div>

            <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50">
                    <Gift :size="40" class="text-slate-300 dark:text-slate-600" />
                </div>
                <h2 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">{{ __('No Bundles Yet') }}</h2>
                <p class="mx-auto mb-8 max-w-md text-slate-500 dark:text-slate-400">{{ __('Course bundles will be available soon.') }}</p>
            </div>
        </div>
    </StudentLayout>
</template>