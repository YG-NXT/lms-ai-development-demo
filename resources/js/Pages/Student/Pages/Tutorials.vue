<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { BookOpen, ChevronRight, PlayCircle, Clock, Users, Award, Lock } from 'lucide-vue-next';

defineProps<{
    tutorials: any;
}>();
</script>

<template>
    <Head title="Tutorials" />

    <StudentLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Tutorials</h1>
                <span class="text-sm text-slate-500 dark:text-slate-400">{{ tutorials.total }} tutorials</span>
            </div>

            <div v-if="tutorials.data.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-admin-card-dark">
                <BookOpen :size="48" class="mx-auto text-gray-300 dark:text-gray-600" />
                <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No tutorials yet</h3>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Check back soon for new tutorials.</p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    v-for="tutorial in tutorials.data"
                    :key="tutorial.id"
                    :href="student.tutorials.show.url(tutorial.slug)"
                    class="group block rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-admin-card-dark"
                >
                    <div class="relative h-40 bg-slate-100 dark:bg-slate-800">
                        <img
                            v-if="tutorial.thumbnail"
                            :src="tutorial.thumbnail"
                            :alt="tutorial.title"
                            class="h-full w-full object-cover"
                        />
                        <div v-else class="flex h-full items-center justify-center">
                            <PlayCircle :size="48" class="text-slate-300 dark:text-slate-600" />
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <span class="absolute top-3 right-3 rounded-full bg-primary-600 px-2.5 py-1 text-xs font-bold text-white">
                            {{ tutorial.is_free ? 'Free' : '$' + tutorial.effective_price }}
                        </span>
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {{ tutorial.title }}
                        </h3>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{{ tutorial.description }}</p>
                        <div class="mt-3 flex items-center gap-4 text-xs text-slate-400">
                            <span class="flex items-center gap-1">
                                <Clock :size="12" />
                                {{ tutorial.duration ?? 'N/A' }}
                            </span>
                            <span class="flex items-center gap-1">
                                <BookOpen :size="12" />
                                {{ tutorial.sections_count }} sections
                            </span>
                            <span class="flex items-center gap-1">
                                <Users :size="12" />
                                {{ tutorial.level }}
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            <div v-if="tutorials.last_page > 1" class="flex justify-center gap-2">
                <Link
                    v-for="page in tutorials.last_page"
                    :key="page"
                    :href="`/tutorials?page=${page}`"
                    class="rounded-lg px-3 py-1.5 text-sm font-medium"
                    :class="page === tutorials.current_page
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-admin-card-dark dark:border-slate-800 dark:text-slate-400'"
                >
                    {{ page }}
                </Link>
            </div>
        </div>
    </StudentLayout>
</template>