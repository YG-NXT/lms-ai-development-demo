<script setup lang="ts">
import { index, review } from '@/actions/App/Http/Controllers/Admin/AssignmentController';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { CheckCircle, ChevronDown, ChevronLeft, ChevronUp, ClipboardList, Clock, Eye, GraduationCap } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    course: {
        id: number;
        title: string;
        thumbnail: string;
        level: string;
        sections: Array<{
            id: number;
            title: string;
            description: string;
            order: number;
            lessons: Array<{
                id: number;
                title: string;
                total_marks: number;
                order: number;
                completions: Array<{
                    id: number;
                    user: {
                        name: string;
                        email: string;
                        profile_photo_url: string;
                    };
                    obtained_mark: number | null;
                    grading_status: string;
                    feedback: string | null;
                    created_at: string;
                    updated_at: string;
                    graded_at: string | null;
                    grader?: {
                        name: string;
                    };
                }>;
            }>;
        }>;
    };
}>();

const expandedSections = ref<number[]>([]);

const toggleSection = (sectionId: number) => {
    const index = expandedSections.value.indexOf(sectionId);
    if (index > -1) {
        expandedSections.value.splice(index, 1);
    } else {
        expandedSections.value.push(sectionId);
    }
};

const statusLabels: Record<string, string> = {
    pending: 'Pending',
    graded: 'Graded',
    recheck_requested: 'Recheck Requested',
    recheck_reviewed: 'Recheck Reviewed',
};

const statusClasses: Record<string, string> = {
    pending: 'border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400',
    graded: 'border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400',
    recheck_requested: 'border-red-100 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400',
    recheck_reviewed: 'border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400',
};

const getSectionStats = (section: any) => {
    const totalSubmissions = section.lessons.reduce((acc: number, lesson: any) => acc + lesson.completions.length, 0);
    const pendingSubmissions = section.lessons.reduce(
        (acc: number, lesson: any) => acc + lesson.completions.filter((c: any) => c.grading_status === 'pending').length,
        0,
    );
    return { total: totalSubmissions, pending: pendingSubmissions };
};
</script>

<template>
    <Head :title="`${course.title} - Assignment Management`" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link
                    :href="index.url()"
                    class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                    <ChevronLeft :size="20" />
                </Link>
                <div class="flex items-center gap-4">
                    <div class="h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
                        <img
                            v-if="course.thumbnail"
                            :src="course.thumbnail.startsWith('http') ? course.thumbnail : '/storage/' + course.thumbnail"
                            class="h-full w-full object-cover"
                        />
                        <div v-else class="flex h-full w-full items-center justify-center text-slate-300">
                            <GraduationCap :size="24" />
                        </div>
                    </div>
                    <div>
                        <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">{{ course.title }}</h1>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Assignment Submissions by Section</p>
                    </div>
                </div>
            </div>

            <!-- Sections -->
            <div class="space-y-4">
                <div
                    v-for="section in course.sections"
                    :key="section.id"
                    class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                    <!-- Section Header -->
                    <button
                        @click="toggleSection(section.id)"
                        class="flex w-full items-center justify-between border-b border-slate-100 p-6 text-start transition-colors hover:bg-slate-50/50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                    >
                        <div class="flex-1">
                            <div class="flex items-center gap-3">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ section.title }}</h3>
                                <span
                                    v-if="getSectionStats(section).total > 0"
                                    class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                                >
                                    <ClipboardList :size="12" />
                                    {{ getSectionStats(section).total }} submissions
                                </span>
                                <span
                                    v-if="getSectionStats(section).pending > 0"
                                    class="inline-flex items-center gap-1.5 rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-amber-600 uppercase dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                                >
                                    <Clock :size="12" />
                                    {{ getSectionStats(section).pending }} pending
                                </span>
                            </div>
                            <p v-if="section.description" class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ section.description }}</p>
                        </div>
                        <ChevronDown v-if="!expandedSections.includes(section.id)" :size="20" class="text-slate-400 transition-transform" />
                        <ChevronUp v-else :size="20" class="text-slate-400 transition-transform" />
                    </button>

                    <!-- Assignments Table -->
                    <div v-show="expandedSections.includes(section.id)" class="overflow-x-auto">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Student</th>
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Assignment</th>
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Submitted</th>
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Status</th>
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">Marks</th>
                                    <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                                <template v-for="lesson in section.lessons" :key="lesson.id">
                                    <tr
                                        v-for="completion in lesson.completions"
                                        :key="completion.id"
                                        class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                    >
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-400 to-brand-600 text-xs font-bold text-white"
                                                >
                                                    {{ completion.user.name.charAt(0).toUpperCase() }}
                                                </div>
                                                <div>
                                                    <p class="text-sm font-bold text-slate-900 dark:text-white">{{ completion.user.name }}</p>
                                                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ completion.user.email }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div>
                                                <p class="text-sm font-bold text-slate-900 dark:text-white">{{ lesson.title }}</p>
                                                <p class="text-xs text-slate-500 dark:text-slate-400">Total: {{ lesson.total_marks }} marks</p>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <p class="text-xs text-slate-600 dark:text-slate-400">
                                                {{ new Date(completion.created_at).toLocaleDateString() }}
                                            </p>
                                            <p class="text-[10px] text-slate-400">
                                                {{ new Date(completion.created_at).toLocaleTimeString() }}
                                            </p>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span
                                                class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                                                :class="statusClasses[completion.grading_status]"
                                            >
                                                <Clock v-if="completion.grading_status === 'pending'" :size="12" />
                                                <CheckCircle v-else :size="12" />
                                                {{ statusLabels[completion.grading_status] }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div v-if="completion.obtained_mark !== null">
                                                <p class="text-sm font-bold text-slate-900 dark:text-white">
                                                    {{ completion.obtained_mark }} / {{ lesson.total_marks }}
                                                </p>
                                                <p v-if="completion.graded_at" class="text-[10px] text-slate-400">
                                                    Graded {{ new Date(completion.graded_at).toLocaleDateString() }}
                                                </p>
                                            </div>
                                            <span v-else class="text-xs text-slate-400">Not graded</span>
                                        </td>
                                        <td class="px-6 py-4 text-end">
                                            <Link
                                                :href="review.url(completion.id)"
                                                class="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-900/20"
                                            >
                                                <Eye :size="14" />
                                                Review
                                            </Link>
                                        </td>
                                    </tr>
                                </template>
                                <tr v-if="section.lessons.every((l: any) => l.completions.length === 0)">
                                    <td colspan="6" class="px-6 py-8 text-center">
                                        <div class="flex flex-col items-center gap-2 text-slate-400">
                                            <ClipboardList :size="32" class="opacity-20" />
                                            <p class="text-sm font-medium">No submissions in this section yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div
                    v-if="course.sections.length === 0"
                    class="rounded-4xl border border-slate-200/60 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800"
                >
                    <div class="flex flex-col items-center gap-2 text-slate-400">
                        <GraduationCap :size="48" class="opacity-20" />
                        <p class="text-sm font-medium">This course has no sections yet.</p>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
