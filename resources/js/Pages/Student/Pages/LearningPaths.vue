<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { BookOpen, ChevronRight, GraduationCap, PlayCircle, Trophy } from 'lucide-vue-next';

defineProps<{
    paths: any;
}>();

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/learning-path-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};
</script>

<template>
    <Head :title="__('Learning Paths')" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Learning Paths') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">
                        {{ __('Curated course sequences to guide your learning journey.') }}
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

            <!-- Learning Paths Grid -->
            <div v-if="paths.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    v-for="path in paths"
                    :key="path.id"
                    :href="`/student/learning-paths/${path.slug}`"
                    class="group block rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-admin-card-dark"
                >
                    <div class="aspect-[16/9] overflow-hidden rounded-t-2xl">
                        <img
                            :src="getThumbnail(path.thumbnail)"
                            :alt="path.name"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <div class="p-5">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">{{ path.badge ?? '📚' }}</span>
                            <h3 class="text-base font-bold text-slate-900 dark:text-white">
                                {{ path.name }}
                            </h3>
                        </div>
                        <p class="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                            {{ path.description }}
                        </p>
                        <div class="mt-4 flex items-center justify-between">
                            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">
                                {{ path.courses_count }} {{ path.courses_count === 1 ? __('course') : __('courses') }}
                            </span>
                            <span class="inline-flex items-center gap-1 text-sm font-bold text-primary-600 dark:text-primary-400">
                                {{ __('Explore') }}
                                <ChevronRight :size="16" class="transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50">
                    <GraduationCap :size="40" class="text-slate-300 dark:text-slate-600" />
                </div>
                <h2 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">{{ __('No Learning Paths Yet') }}</h2>
                <p class="mx-auto mb-8 max-w-md text-slate-500 dark:text-slate-400">
                    {{ __('Learning paths will be available soon.') }}
                </p>
                <Link
                    :href="baseRoutes.student.dashboard.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    {{ __('Back to Dashboard') }}
                    <ChevronRight :size="18" />
                </Link>
            </div>
        </div>
    </StudentLayout>
</template>