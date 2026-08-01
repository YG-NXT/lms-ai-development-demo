<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Bookmark, ChevronRight, Clock, PlayCircle } from 'lucide-vue-next';

defineProps<{
    bookmarks: any;
}>();

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/course-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};
</script>

<template>
    <Head :title="__('My Bookmarks')" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('My Bookmarks') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">{{ __('Courses you want to explore later.') }}</p>
                </div>
                <Link
                    :href="baseRoutes.home.url()"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    {{ __('Browse Courses') }}
                    <ChevronRight :size="18" />
                </Link>
            </div>

            <!-- Bookmarks Grid -->
            <div v-if="bookmarks.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="bookmark in bookmarks.data"
                    :key="bookmark.id"
                    class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-admin-card-dark"
                >
                    <Link :href="`/courses/${bookmark.course.slug}`">
                        <div class="aspect-video overflow-hidden">
                            <img
                                :src="getThumbnail(bookmark.course.thumbnail)"
                                :alt="bookmark.course.title"
                                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    </Link>
                    <div class="p-4">
                        <Link :href="`/courses/${bookmark.course.slug}`">
                            <h3 class="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">
                                {{ bookmark.course.title }}
                            </h3>
                        </Link>
                        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {{ bookmark.course.category?.name ?? '' }}
                        </p>
                        <div class="mt-2 flex items-center justify-between">
                            <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
                                {{ bookmark.course.instructor?.name ?? '' }}
                            </span>
                            <span class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ '$' + (bookmark.course.effective_price ?? 0).toFixed(2) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- pagination -->
            <div v-if="bookmarks.links && bookmarks.links.length > 3" class="flex items-center justify-center gap-2 pt-6">
                <template v-for="link in bookmarks.links" :key="link.label">
                    <Link
                        v-if="link.url"
                        :href="link.url"
                        v-html="link.label"
                        class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 dark:text-slate-300 dark:bg-admin-card-dark dark:border-slate-800 dark:hover:bg-slate-800"
                        :class="{ 'bg-primary-600 text-white border-primary-600': link.active }"
                        :aria-current="link.active ? 'page' : undefined"
                    />
                    <span v-else v-html="link.label" class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-400" />
                </template>
            </div>

            <!-- Empty State -->
            <div
                v-else
                class="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm dark:border-slate-800 dark:bg-admin-card-dark"
            >
                <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50">
                    <Bookmark :size="40" class="text-slate-300 dark:text-slate-600" />
                </div>
                <h2 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">{{ __('No Bookmarks Yet') }}</h2>
                <p class="mx-auto mb-8 max-w-md text-slate-500 dark:text-slate-400">
                    {{ __('Browse our library and save courses you are interested in.') }}
                </p>
                <Link
                    :href="baseRoutes.home.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    {{ __('Browse Courses') }}
                    <ChevronRight :size="18" />
                </Link>
            </div>
        </div>
    </StudentLayout>
</template>