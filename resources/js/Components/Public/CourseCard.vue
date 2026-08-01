<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ChevronRight, Globe, Layers, User } from 'lucide-vue-next';

defineProps<{
    course: any;
}>();

const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(price));
};

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/course-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};
</script>

<template>
    <div
        class="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10 dark:border dark:border-gray-700 dark:bg-gray-800"
    >
        <!-- Thumbnail -->
        <div class="relative aspect-video overflow-hidden">
            <img
                :src="getThumbnail(course.thumbnail)"
                :alt="course.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
                class="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>

            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
                <span
                    class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm backdrop-blur-md dark:bg-gray-900/90 dark:text-white"
                >
                    {{ course.category?.name || 'Uncategorized' }}
                </span>
            </div>

            <!-- Price Badge -->
            <div class="absolute right-4 bottom-4">
                <span v-if="course.is_free" class="inline-flex items-center rounded-lg bg-green-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
                    {{ __('Free') }}
                </span>
                <span v-else class="inline-flex items-center rounded-lg bg-primary-600 px-3 py-1 text-sm font-bold text-white shadow-lg">
                    {{ formatPrice(course.price) }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col p-6">
            <h3
                class="mb-2 line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
            >
                {{ course.title }}
            </h3>

            <p class="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {{ course.description }}
            </p>

            <!-- Meta Info -->
            <div class="mb-6 grid grid-cols-2 gap-y-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Layers :size="14" class="text-primary-500" />
                    <span>{{ course.level }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Globe :size="14" class="text-primary-500" />
                    <span>{{ course.language }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <User :size="14" class="text-primary-500" />
                    <span class="truncate">{{ course.instructor?.name || 'Instructor' }}</span>
                </div>
            </div>

            <!-- CTA -->
            <div class="mt-auto">
                <Link
                    :href="`/courses/${course.slug}`"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-primary-600 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-primary-600"
                >
                    {{ __('View Course') }}
                    <ChevronRight :size="16" />
                </Link>
            </div>
        </div>
    </div>
</template>
