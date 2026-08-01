<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, BookOpen, ChevronRight, PlayCircle } from 'lucide-vue-next';

defineProps<{
    path: any;
    isEnrolled: boolean;
    completedCourses: number;
    totalCourses: number;
}>();

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/course-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};

const progressPercent = computed(() => {
    if (totalCourses === 0) return 0;
    return Math.round((completedCourses / totalCourses) * 100);
});
</script>

<template>
    <Head :title="path.name" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Back Link -->
            <Link
                :href="baseRoutes.student.learningPaths.index.url()"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400"
            >
                <ArrowLeft :size="16" />
                {{ __('All Learning Paths') }}
            </Link>

            <!-- Path Header -->
            <div class="relative overflow-hidden rounded-2xl">
                <div class="aspect-[2/1] overflow-hidden">
                    <img
                        :src="getThumbnail(path.thumbnail)"
                        :alt="path.name"
                        class="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6">
                    <div class="flex items-center gap-3">
                        <span class="text-4xl">{{ path.badge ?? '📚' }}</span>
                        <div>
                            <h1 class="text-3xl font-bold text-white">{{ path.name }}</h1>
                            <p class="mt-1 text-sm text-white/80">{{ path.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Section -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Your Progress') }}</h2>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {{ completedCourses }} of {{ totalCourses }} courses completed
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {{ progressPercent }}%
                        </div>
                    </div>
                </div>
                <div class="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                        class="h-full rounded-full bg-primary-600 transition-all duration-500"
                        :style="{ width: progressPercent + '%' }"
                    ></div>
                </div>

                <div v-if="!isEnrolled" class="mt-6">
                    <Link
                        :href="route('student.learning-paths.enroll', { learningPath: path.slug })"
                        method="post"
                        as="button"
                        class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                    >
                        <PlayCircle :size="18" />
                        {{ __('Enroll in All Courses') }}
                    </Link>
                </div>
                <div v-else class="mt-6 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    ✅ {{ __('You are enrolled in all courses in this path.') }}
                </div>
            </div>

            <!-- Courses List -->
            <div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {{ __('Courses in This Path') }}
                </h2>
                <div class="space-y-3">
                    <div
                        v-for="(course, index) in path.courses"
                        :key="course.id"
                        class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-admin-card-dark"
                    >
                        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                            {{ index + 1 }}
                        </span>
                        <Link :href="`/courses/${course.slug}`" class="flex-1">
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ course.title }}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ course.category?.name ?? '' }} • {{ course.instructor?.name ?? '' }}
                            </p>
                        </Link>
                        <Link
                            :href="`/courses/${course.slug}`"
                            class="inline-flex items-center gap-1 text-sm font-bold text-primary-600 dark:text-primary-400"
                        >
                            {{ __('View') }}
                            <ChevronRight :size="14" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>