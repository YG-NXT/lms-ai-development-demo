<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { ArrowLeft, Plus, Pencil, Trash2, BookOpen, Clock, DollarSign, Download, RefreshCw } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    tutorials: any;
    khanCourses?: Array<{
        id: string;
        title: string;
        description?: string;
    }>;
}>();

const selectedCourse = ref('');
const asType = ref('tutorial');
const isImporting = ref(false);

const importKhanAcademy = () => {
    if (!selectedCourse.value) {
        alert('Please select a course first.');
        return;
    }
    isImporting.value = true;
    router.post(admin.tutorials.importKhanAcademy.url(), { course: selectedCourse.value, as_type: asType.value }, {
        preserveScroll: true,
        onFinish: () => { isImporting.value = false; },
    });
};

const importKhanAcademyAll = () => {
    if (!confirm('Import up to 10 Khan Academy courses as tutorials?')) return;
    isImporting.value = true;
    router.post(admin.tutorials.importKhanAcademy.url(), { limit: 10, as_type: asType.value }, {
        preserveScroll: true,
        onFinish: () => { isImporting.value = false; },
    });
};

const deleteTutorial = (tutorial: any) => {
    if (confirm('Delete this tutorial? This cannot be undone.')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `${admin.tutorials.destroy.url(tutorial.id)}`;
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = '_token';
            input.value = token;
            form.appendChild(input);
        }
        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';
        form.appendChild(methodInput);
        document.body.appendChild(form);
        form.submit();
    }
};
</script>

<template>
    <Head title="Tutorials" />

    <AdminLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Tutorials</h1>
                <Link
                    :href="admin.tutorials.create.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700"
                >
                    <Plus :size="18" />
                    New Tutorial
                </Link>
            </div>

            <!-- Khan Academy Import Section -->
            <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-admin-card-dark">
                <h2 class="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                    <Download :size="20" class="text-primary-600" />
                    Import from Khan Academy
                </h2>
                <p class="mb-4 text-sm text-slate-500 dark:text-slate-400">
                    Pull free tutorials directly from Khan Academy. Choose whether to import as a published tutorial (standalone, no enrollment needed) or as a paid/free course (with full LMS course features like enrollments, quizzes, progress tracking).
                </p>

                <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <!-- Source Type -->
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Import As</label>
                        <select
                            v-model="asType"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="tutorial">Tutorial (standalone, free access)</option>
                            <option value="course">Course (LMS course with enrollments)</option>
                        </select>
                    </div>

                    <!-- Course Select -->
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Select a Course (optional, blank = all)</label>
                        <select
                            v-model="selectedCourse"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="">Any course (limited to 10)...</option>
                            <option v-for="course in khanCourses" :key="course.id" :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>
                    </div>

                    <div class="flex gap-3">
                        <button
                            @click="importKhanAcademy"
                            :disabled="!selectedCourse || isImporting"
                            class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 disabled:opacity-50"
                        >
                            <Download :size="18" v-if="!isImporting" />
                            <RefreshCw :size="18" class="animate-spin" v-else />
                            Import as {{ asType === 'course' ? 'Course' : 'Tutorial' }}
                        </button>
                        <button
                            @click="importKhanAcademyAll"
                            :disabled="isImporting"
                            class="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200 dark:border-slate-700"
                        >
                            <Download :size="18" />
                            Import 10 as {{ asType === 'course' ? 'Courses' : 'Tutorials' }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <table class="w-full text-left text-sm">
                    <thead class="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-700">
                        <tr>
                            <th class="px-6 py-3">Title</th>
                            <th class="px-6 py-3">Instructor</th>
                            <th class="px-6 py-3">Price</th>
                            <th class="px-6 py-3">Status</th>
                            <th class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr v-for="tutorial in tutorials.data" :key="tutorial.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                <div class="flex items-center gap-3">
                                    <BookOpen :size="16" class="text-slate-400" />
                                    {{ tutorial.title }}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ tutorial.instructor_name }}</td>
                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">
                                <DollarSign v-if="!tutorial.is_free" :size="14" class="inline" />
                                {{ tutorial.is_free ? 'Free' : '$' + tutorial.effective_price }}
                            </td>
                            <td class="px-6 py-4">
                                <span :class="tutorial.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                                    {{ tutorial.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <Link :href="admin.tutorials.edit.url(tutorial.id)" class="rounded-lg p-1.5 text-gray-400 hover:text-primary-600">
                                    <Pencil :size="14" />
                                </Link>
                                <button @click="deleteTutorial(tutorial)" class="rounded-lg p-1.5 text-gray-400 hover:text-red-500">
                                    <Trash2 :size="14" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
</template>