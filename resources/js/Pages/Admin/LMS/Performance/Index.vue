<script setup lang="ts">
import { index } from '@/actions/App/Http/Controllers/Admin/CoursePerformanceController';
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ArrowDown, ArrowUp, ArrowUpDown, BarChart2, GraduationCap, Mail, User } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    courses: any[];
    course?: any;
    students?: {
        data: any[];
        links: any[];
        meta: any;
    };
    filters?: {
        search?: string;
        sort?: string;
        direction?: string;
    };
}>();

const selectedCourseId = ref<string | number>(props.course?.id || '');

watch(
    () => props.course,
    (newCourse) => {
        if (newCourse) {
            selectedCourseId.value = newCourse.id;
        }
    },
);

const viewPerformance = () => {
    if (selectedCourseId.value) {
        router.get(
            index.url(),
            { course_id: selectedCourseId.value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }
};

const sort = (column: string) => {
    let direction = 'asc';
    if (props.filters?.sort === column && props.filters.direction === 'asc') {
        direction = 'desc';
    }

    router.get(
        index.url(),
        {
            course_id: selectedCourseId.value,
            sort: column,
            direction: direction,
        },
        {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        },
    );
};
</script>

<template>
    <Head title="Student Performance" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header & Selection -->
            <!-- Header & Selection -->
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-4">
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                        >
                            <BarChart2 :size="24" />
                        </div>
                        <div>
                            <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Student Performance</h2>
                            <p class="text-sm text-slate-500 dark:text-slate-400">View detailed academic performance.</p>
                        </div>
                    </div>

                    <div class="flex w-full items-start">
                        <div class="w-full flex-1">
                            <SearchableSelect
                                v-model="selectedCourseId"
                                :options="courses"
                                label=""
                                placeholder="Select a course..."
                                triggerClass="rounded-r-none border-r-0 hover:z-10 relative focus:z-10 !text-xs !py-3.5"
                            />
                        </div>
                        <button
                            @click="viewPerformance"
                            :disabled="!selectedCourseId"
                            class="flex shrink-0 items-center justify-center gap-2 rounded-r-2xl border border-l-0 border-transparent bg-brand-600 px-8 py-3.5 text-xs font-bold text-white transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>

            <!-- Table Card -->
            <div
                v-if="course && students"
                class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
                <div class="border-b border-slate-100 p-6 dark:border-slate-700">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ course.title }}</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th
                                    @click="sort('name')"
                                    class="group cursor-pointer px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <div class="flex items-center gap-1">
                                        Student
                                        <ArrowUp v-if="filters?.sort === 'name' && filters?.direction === 'asc'" :size="12" />
                                        <ArrowDown v-else-if="filters?.sort === 'name' && filters?.direction === 'desc'" :size="12" />
                                        <ArrowUpDown v-else :size="12" class="opacity-40 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </th>
                                <th
                                    @click="sort('joined_at')"
                                    class="group cursor-pointer px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <div class="flex items-center gap-1">
                                        Joined
                                        <ArrowUp v-if="filters?.sort === 'joined_at' && filters?.direction === 'asc'" :size="12" />
                                        <ArrowDown v-else-if="filters?.sort === 'joined_at' && filters?.direction === 'desc'" :size="12" />
                                        <ArrowUpDown v-else :size="12" class="opacity-40 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </th>
                                <th
                                    @click="sort('quiz_score')"
                                    class="group cursor-pointer px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <div class="flex items-center gap-1">
                                        Quiz Score
                                        <ArrowUp v-if="filters?.sort === 'quiz_score' && filters?.direction === 'asc'" :size="12" />
                                        <ArrowDown v-else-if="filters?.sort === 'quiz_score' && filters?.direction === 'desc'" :size="12" />
                                        <ArrowUpDown v-else :size="12" class="opacity-40 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </th>
                                <th
                                    @click="sort('quiz_count')"
                                    class="group cursor-pointer px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <div class="flex items-center gap-1">
                                        Quiz Count
                                        <ArrowUp v-if="filters?.sort === 'quiz_count' && filters?.direction === 'asc'" :size="12" />
                                        <ArrowDown v-else-if="filters?.sort === 'quiz_count' && filters?.direction === 'desc'" :size="12" />
                                        <ArrowUpDown v-else :size="12" class="opacity-40 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </th>
                                <th
                                    @click="sort('assignment_obtained')"
                                    class="group cursor-pointer px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <div class="flex items-center gap-1">
                                        Assignment Score
                                        <ArrowUp v-if="filters?.sort === 'assignment_obtained' && filters?.direction === 'asc'" :size="12" />
                                        <ArrowDown v-else-if="filters?.sort === 'assignment_obtained' && filters?.direction === 'desc'" :size="12" />
                                        <ArrowUpDown v-else :size="12" class="opacity-40 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </th>
                                <th
                                    @click="sort('assignment_count')"
                                    class="group cursor-pointer px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <div class="flex items-center gap-1">
                                        Assign. Count
                                        <ArrowUp v-if="filters?.sort === 'assignment_count' && filters?.direction === 'asc'" :size="12" />
                                        <ArrowDown v-else-if="filters?.sort === 'assignment_count' && filters?.direction === 'desc'" :size="12" />
                                        <ArrowUpDown v-else :size="12" class="opacity-40 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="student in students.data"
                                :key="student.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-3">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                                        >
                                            <img
                                                v-if="student.avatar"
                                                :src="student.avatar.startsWith('http') ? student.avatar : '/storage/' + student.avatar"
                                                class="h-full w-full object-cover"
                                            />
                                            <div v-else class="flex h-full w-full items-center justify-center text-slate-400">
                                                <User :size="14" />
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ student.name }}</p>
                                            <div class="flex items-center gap-1.5 text-[10px] text-slate-500">
                                                <Mail :size="10" />
                                                <span>{{ student.email }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-3 text-start">
                                    <span class="text-xs font-medium text-slate-600 dark:text-slate-400">
                                        {{ student.joined_at ? new Date(student.joined_at).toLocaleDateString() : '-' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-start">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-bold text-slate-900 dark:text-white">{{ student.quiz_score }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-3 text-start">
                                    <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {{ student.quiz_count }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-start">
                                    <div class="flex items-center gap-1">
                                        <span class="text-sm font-bold text-slate-900 dark:text-white">{{ student.assignment_obtained }}</span>
                                        <span class="text-xs text-slate-400">/</span>
                                        <span class="text-xs font-medium text-slate-500">{{ student.assignment_total }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-3 text-start">
                                    <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {{ student.assignment_count }}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="students.data.length === 0">
                                <td colspan="6" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <GraduationCap :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">No students found for this course.</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="students.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in students.links"
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

            <!-- Empty State Placeholder (Optional, ensures layout height consistency or just empty) -->
            <div
                v-else
                class="flex h-64 flex-col items-center justify-center rounded-4xl border border-dashed border-slate-200 bg-slate-50/50 text-slate-400 dark:border-slate-700 dark:bg-slate-800/50"
            >
                <GraduationCap :size="48" class="mb-4 opacity-20" />
                <p>Select a course above to view performance data.</p>
            </div>
        </div>
    </AdminLayout>
</template>
