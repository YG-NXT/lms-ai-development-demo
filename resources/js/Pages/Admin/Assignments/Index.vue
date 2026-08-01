<script setup lang="ts">
import { index, show } from '@/actions/App/Http/Controllers/Admin/AssignmentController';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { AlertCircle, CheckCircle, ClipboardList, Clock, GraduationCap, Search, Tag } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    courses: {
        data: any[];
        links: any[];
        meta: any;
    };
}>();

const search = ref('');

watch(
    search,
    debounce((value) => {
        router.get(index.url({ query: { search: value } }), {}, { preserveState: true, replace: true });
    }, 300),
);

const getStatusBadge = (pending: number, total: number) => {
    if (total === 0) return { label: 'No Submissions', class: 'border-slate-100 bg-slate-50 text-slate-400' };
    if (pending === 0) return { label: 'All Graded', class: 'border-emerald-100 bg-emerald-50 text-emerald-600' };
    if (pending === total) return { label: 'All Pending', class: 'border-amber-100 bg-amber-50 text-amber-600' };
    return { label: `${pending} Pending`, class: 'border-amber-100 bg-amber-50 text-amber-600' };
};
</script>

<template>
    <Head title="Assignment Management" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Assignment Management</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Review and grade student assignment submissions by course.</p>
                </div>
            </div>

            <!-- Table Card -->
            <div class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <!-- Search -->
                <div class="border-b border-slate-100 p-4 dark:border-slate-700">
                    <div class="relative w-full sm:w-64">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search :size="16" class="text-slate-400" />
                        </div>
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Search courses..."
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Course</th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Category</th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Sections</th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Assignments</th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Submissions</th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Status</th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="course in courses.data"
                                :key="course.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div class="h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
                                            <img
                                                v-if="course.thumbnail"
                                                :src="course.thumbnail.startsWith('http') ? course.thumbnail : '/storage/' + course.thumbnail"
                                                class="h-full w-full object-cover"
                                            />
                                            <div v-else class="flex h-full w-full items-center justify-center text-slate-300">
                                                <GraduationCap :size="20" />
                                            </div>
                                        </div>
                                        <div>
                                            <p class="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">{{ course.title }}</p>
                                            <p class="mt-0.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">{{ course.level }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                        <Tag :size="12" class="text-brand-500" />
                                        <span>{{ course.category?.name || 'Uncategorized' }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <span class="text-sm font-bold">{{ course.sections_count || 0 }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <span class="text-sm font-bold">{{ course.assignment_count || 0 }}</span>
                                        <ClipboardList :size="14" class="opacity-50" />
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div class="flex flex-col gap-1">
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm font-bold text-slate-900 dark:text-white">{{ course.total_submissions || 0 }}</span>
                                            <span class="text-[10px] text-slate-400">total</span>
                                        </div>
                                        <div v-if="course.total_submissions > 0" class="flex items-center gap-2">
                                            <div class="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                                <div
                                                    class="h-full bg-emerald-500 transition-all"
                                                    :style="{ width: `${((course.graded_submissions || 0) / course.total_submissions) * 100}%` }"
                                                ></div>
                                            </div>
                                            <span class="text-[10px] text-emerald-600">{{ course.graded_submissions || 0 }} graded</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <span
                                        class="dark:border-opacity-20 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                                        :class="getStatusBadge(course.pending_submissions || 0, course.total_submissions || 0).class"
                                    >
                                        <Clock v-if="course.pending_submissions > 0" :size="12" />
                                        <CheckCircle v-else-if="course.total_submissions > 0" :size="12" />
                                        <AlertCircle v-else :size="12" />
                                        {{ getStatusBadge(course.pending_submissions || 0, course.total_submissions || 0).label }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <Link
                                        :href="show.url(course.id)"
                                        class="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-900/20"
                                    >
                                        <ClipboardList :size="14" />
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                            <tr v-if="courses.data.length === 0">
                                <td colspan="7" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <GraduationCap :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">No courses found.</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="courses.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in courses.links"
                            :key="key"
                            :href="link.url || '#'"
                            v-html="link.label"
                            class="rounded-lg border border-transparent px-3 py-1 text-xs transition-colors"
                            :class="
                                link.active
                                    ? 'bg-brand-600 text-white'
                                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                            "
                            :preserve-state="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
