<script setup lang="ts">
import { show, update } from '@/actions/App/Http/Controllers/Admin/AssignmentController';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Calendar, ChevronLeft, Download, FileText, Save, User } from 'lucide-vue-next';

const props = defineProps<{
    assignment: {
        id: number;
        user: {
            name: string;
            email: string;
            profile_photo_url: string;
        };
        lesson: {
            title: string;
            total_marks: number;
            section: {
                course: {
                    title: string;
                };
            };
        };
        meta: {
            submission_text?: string;
            file_path?: string;
            file_name?: string;
        };
        obtained_mark: number | null;
        feedback: string | null;
        grading_status: string; // pending, graded, recheck_requested, recheck_reviewed
        created_at: string;
        updated_at: string;
        graded_at: string | null;
        graded_by: number | null;
        grader?: {
            name: string;
        };
        is_edited: boolean;
        edited_at: string | null;
    };
    courseId: number;
}>();

const form = useForm({
    obtained_mark: props.assignment.obtained_mark || '',
    feedback: props.assignment.feedback || '',
    status:
        props.assignment.grading_status === 'pending' || props.assignment.grading_status === 'recheck_requested'
            ? 'graded'
            : props.assignment.grading_status === 'recheck_requested'
              ? 'recheck_reviewed'
              : props.assignment.grading_status,
});

const submitGrade = () => {
    // If recheck requested, changing status to recheck_reviewed is appropriate
    if (props.assignment.grading_status === 'recheck_requested') {
        form.status = 'recheck_reviewed';
    } else {
        form.status = 'graded';
    }

    form.put(update.url(props.assignment.id), {
        preserveScroll: true,
        onSuccess: () => {
            // Form will automatically update with new data from server
        },
    });
};

const getFileUrl = (path: string) => {
    return `/storage/${path}`;
};
</script>

<template>
    <Head :title="`Grade Assignment - ${assignment.user.name}`" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link
                    :href="show.url(courseId)"
                    class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                    <ChevronLeft :size="20" />
                </Link>
                <div>
                    <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Submission Details</h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                        {{ assignment.lesson.section.course.title }} - {{ assignment.lesson.title }}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Left Column: Submission Content -->
                <div class="space-y-6 lg:col-span-2">
                    <!-- Student Info Card -->
                    <div
                        class="flex items-center gap-4 rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-400 to-brand-600 text-lg font-bold text-white"
                        >
                            {{ assignment.user.name.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ assignment.user.name }}</h3>
                            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                <span class="flex items-center gap-1">
                                    <User :size="14" />
                                    {{ assignment.user.email }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <Calendar :size="14" />
                                    Submitted: {{ new Date(assignment.updated_at).toLocaleString() }}
                                </span>
                                <span v-if="assignment.is_edited" class="font-medium text-amber-600">(Edited)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Submission Content -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h3 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">Submitted Work</h3>

                        <div v-if="!assignment.meta?.submission_text && !assignment.meta?.file_path" class="text-slate-500 italic">
                            No content submitted.
                        </div>

                        <!-- Text Submission -->
                        <div v-if="assignment.meta?.submission_text" class="mb-6">
                            <h4 class="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">Text Response</h4>
                            <div class="rounded-xl bg-slate-50 p-4 whitespace-pre-wrap text-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
                                {{ assignment.meta.submission_text }}
                            </div>
                        </div>

                        <!-- File Submission -->
                        <div v-if="assignment.meta?.file_path">
                            <h4 class="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">Attached File</h4>
                            <a
                                :href="getFileUrl(assignment.meta.file_path)"
                                target="_blank"
                                class="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"
                                >
                                    <FileText :size="20" />
                                </div>
                                <div>
                                    <div class="text-sm font-bold text-slate-900 dark:text-white">
                                        {{ assignment.meta.file_name || 'Download File' }}
                                    </div>
                                    <div class="text-xs text-slate-500">Click to download</div>
                                </div>
                                <Download :size="16" class="ml-2 text-slate-400" />
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Grading Form -->
                <div class="lg:col-span-1">
                    <div class="sticky top-6 rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-6 flex items-center justify-between">
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Grading</h3>
                            <span
                                class="inline-flex items-center rounded-lg border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                                :class="{
                                    'border-amber-100 bg-amber-50 text-amber-600': assignment.grading_status === 'pending',
                                    'border-emerald-100 bg-emerald-50 text-emerald-600': assignment.grading_status === 'graded',
                                    'border-red-100 bg-red-50 text-red-600': assignment.grading_status === 'recheck_requested',
                                    'border-blue-100 bg-blue-50 text-blue-600': assignment.grading_status === 'recheck_reviewed',
                                }"
                            >
                                {{ assignment.grading_status.replace('_', ' ') }}
                            </span>
                        </div>

                        <form @submit.prevent="submitGrade" class="space-y-4">
                            <div>
                                <label class="mb-1 block text-sm font-bold text-slate-700 dark:text-slate-300"> Marks Obtained </label>
                                <div class="relative">
                                    <input
                                        v-model="form.obtained_mark"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        :max="assignment.lesson.total_marks"
                                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pr-24 text-slate-900 shadow-sm transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                        placeholder="Enter marks"
                                        required
                                    />
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                        <span class="text-sm font-bold text-slate-400"> / {{ assignment.lesson.total_marks }} </span>
                                    </div>
                                </div>
                                <p class="mt-1 text-xs text-slate-500">Maximum marks: {{ assignment.lesson.total_marks }}</p>
                                <div v-if="form.errors.obtained_mark" class="mt-1 text-sm text-red-600">{{ form.errors.obtained_mark }}</div>
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-bold text-slate-700 dark:text-slate-300">Feedback / Comments</label>
                                <textarea
                                    v-model="form.feedback"
                                    rows="4"
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-sm transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    placeholder="Provide feedback to the student..."
                                ></textarea>
                                <div v-if="form.errors.feedback" class="mt-1 text-sm text-red-600">{{ form.errors.feedback }}</div>
                            </div>

                            <div v-if="assignment.grader" class="border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-700">
                                Last graded by <span class="font-medium text-slate-700 dark:text-slate-300">{{ assignment.grader.name }}</span>
                                <br />
                                on {{ new Date(assignment.graded_at!).toLocaleString() }}
                            </div>

                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                            >
                                <Save :size="18" />
                                {{ form.processing ? 'Saving...' : 'Save Grade' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
