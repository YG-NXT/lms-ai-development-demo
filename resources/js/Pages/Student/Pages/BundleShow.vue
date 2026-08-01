<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, BookOpen, ChevronRight, GraduationCap } from 'lucide-vue-next';

defineProps<{
    bundle: any;
    enrolledCount: number;
}>();

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/course-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};

const progressPercent = computed(() => {
    if (props.bundle.courses.length === 0) return 0;
    return Math.round((props.enrolledCount / props.bundle.courses.length) * 100);
});
</script>

<template>
    <Head :title="bundle.name" />

    <StudentLayout>
        <div class="space-y-6">
            <Link :href="baseRoutes.student.bundles.index.url()" class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                <ArrowLeft :size="16" />
                {{ __('All Bundles') }}
            </Link>

            <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="aspect-[2/1] overflow-hidden rounded-t-2xl">
                    <img :src="getThumbnail(bundle.thumbnail)" :alt="bundle.name" class="h-full w-full object-cover" loading="lazy" />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-6 left-6">
                    <h1 class="text-3xl font-bold text-white">{{ bundle.name }}</h1>
                    <p class="mt-1 text-sm text-white/80">{{ bundle.description }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-800 dark:bg-admin-card-dark">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-amber-600 dark:text-amber-400">${{ bundle.bundle_price.toFixed(2) }}</div>
                        <div class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 line-through">{{ '$' + bundle.original_price.toFixed(2) }}</div>
                        <div class="mt-1 text-sm font-bold text-emerald-600">Save ${{ (bundle.original_price - bundle.bundle_price).toFixed(2) }}</div>
                    </div>
                </div>
                <div class="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm dark:border-sky-800 dark:bg-admin-card-dark">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-sky-600 dark:text-sky-400">{{ bundle.courses_count }}</div>
                        <div class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Courses') }}</div>
                    </div>
                </div>
                <div class="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-800 dark:bg-admin-card-dark">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ enrolledCount }}/{{ bundle.courses_count }}</div>
                        <div class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ __('Enrolled') }}</div>
                    </div>
                </div>
            </div>

            <!-- Progress -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Your Progress') }}</h3>
                <div class="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div class="h-full rounded-full bg-primary-600" :style="{ width: progressPercent + '%' }"></div>
                </div>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ enrolledCount }} of {{ bundle.courses_count }} courses enrolled</p>
            </div>

            <!-- Courses -->
            <div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">{{ __('Courses in Bundle') }}</h2>
                <div class="space-y-3">
                    <div v-for="course in bundle.courses" :key="course.id" class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-admin-card-dark">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                            <BookOpen :size="20" />
                        </div>
                        <Link :href="`/courses/${course.slug}`" class="flex-1">
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ course.title }}</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ course.category?.name ?? '' }}</p>
                        </Link>
                        <Link :href="`/courses/${course.slug}`" class="text-sm font-bold text-primary-600 dark:text-primary-400">
                            View <ChevronRight :size="14" />
                        </Link>
                    </div>
                </div>
            </div>

            <Link
                v-if="enrolledCount < bundle.courses.length"
                :href="`/student/bundles/${bundle.slug}/enroll`"
                method="post"
                as="button"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
            >
                <GraduationCap :size="18" />
                {{ __('Enroll in All Courses') }}
            </Link>
            <div v-else class="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                ✅ {{ __('You are enrolled in all courses in this bundle.') }}
            </div>
        </div>
    </StudentLayout>
</template>