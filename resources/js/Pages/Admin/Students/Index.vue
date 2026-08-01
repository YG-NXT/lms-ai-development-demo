<script setup lang="ts">
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import SlideOver from '@/Components/Common/SlideOver.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import axios from 'axios';
import { debounce } from 'lodash';
import { Ban, BookOpen, CheckCircle, Eye, Search, Trash2, User, X } from 'lucide-vue-next';
import { PropType, ref, watch } from 'vue';

const props = defineProps({
    students: Object as PropType<any>,
    courses: Object as PropType<any>,
    filters: Object as PropType<any>,
});

// Declare translation function type
declare const __: (key: string) => string;

const search = ref(props.filters.search || '');

watch(
    search,
    debounce((value) => {
        router.get(admin.students.index.url({ query: { search: value } }), {}, { preserveState: true, replace: true });
    }, 300),
);

// Assign Course Modal Logic
const isAssignModalOpen = ref(false);
const selectedStudent = ref<any>(null);
const assignForm = useForm({
    course_id: '',
});

const availableCourses = ref<any[]>([]);
const isLoadingCourses = ref(false);

const openAssignModal = async (student: any) => {
    selectedStudent.value = student;
    isAssignModalOpen.value = true;
    isLoadingCourses.value = true;
    availableCourses.value = [];

    try {
        const response = await axios.get(admin.students.availableCourses.url(student.id));
        availableCourses.value = response.data.courses.map((c: any) => ({
            id: c.id,
            name: c.title,
        }));
    } catch (error) {
        console.error('Failed to fetch available courses:', error);
    } finally {
        isLoadingCourses.value = false;
    }
};

const closeAssignModal = () => {
    isAssignModalOpen.value = false;
    selectedStudent.value = null;
    assignForm.reset();
};

const submitAssignCourse = () => {
    if (!selectedStudent.value) return;

    assignForm.post(admin.students.assignCourse.url(selectedStudent.value.id), {
        onSuccess: () => {
            closeAssignModal();
        },
    });
};

// Course Search Logic...

import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';

// Confirmation Modal State
const modalSelection = ref<any>(null);
const modalAction = ref<string>(''); // 'delete' | 'block' | 'activate'
const showConfirmModal = ref(false);
const processingAction = ref(false);

const openStatusModal = (student: any, status: 'blocked' | 'active') => {
    modalSelection.value = student;
    modalAction.value = status === 'blocked' ? 'block' : 'activate';
    showConfirmModal.value = true;
};

const openDeleteModal = (student: any) => {
    modalSelection.value = student;
    modalAction.value = 'delete';
    showConfirmModal.value = true;
};

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    modalSelection.value = null;
    modalAction.value = '';
};

const handleConfirm = () => {
    if (!modalSelection.value) return;

    processingAction.value = true;

    if (modalAction.value === 'delete') {
        router.delete(admin.students.destroy.url(modalSelection.value.id), {
            preserveScroll: true,
            onSuccess: () => closeConfirmModal(),
            onFinish: () => {
                processingAction.value = false;
            },
        });
    } else {
        // Block or Activate
        router.patch(
            admin.students.status.url(modalSelection.value.id),
            { status: modalAction.value === 'block' ? 'blocked' : 'active' },
            {
                preserveScroll: true,
                onSuccess: () => closeConfirmModal(),
                onFinish: () => {
                    processingAction.value = false;
                },
            },
        );
    }
};

// Enrollment Drawer Logic
const isEnrollmentDrawerOpen = ref(false);
const enrolledStudent = ref<any>(null);
const studentEnrollments = ref<any[]>([]);
const isLoadingEnrollments = ref(false);

const openEnrollmentDrawer = async (student: any) => {
    enrolledStudent.value = student;
    isEnrollmentDrawerOpen.value = true;
    isLoadingEnrollments.value = true;
    studentEnrollments.value = [];

    try {
        const response = await axios.get(admin.students.enrollments.url(student.id));
        studentEnrollments.value = response.data.enrollments;
    } catch (error) {
        console.error('Failed to fetch enrollments:', error);
    } finally {
        isLoadingEnrollments.value = false;
    }
};

const closeEnrollmentDrawer = () => {
    isEnrollmentDrawerOpen.value = false;
    enrolledStudent.value = null;
    studentEnrollments.value = [];
};
</script>

<template>
    <Head :title="__('Student Management')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Student Management') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Manage students, track progress, and assign courses.') }}</p>
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
                            :placeholder="__('Search students...')"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Name') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Email') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Joined') }}
                                </th>
                                <th class="px-6 py-4 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Enrolled') }}
                                </th>
                                <th class="px-6 py-4 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Active') }}
                                </th>
                                <th class="px-6 py-4 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="student in students.data"
                                :key="student.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            <span v-if="!student.profile_image_url">{{ student.name.substring(0, 2).toUpperCase() }}</span>
                                            <img v-else :src="student.profile_image_url" class="h-full w-full object-cover" />
                                        </div>
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">{{ student.name }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ student.email }}</p>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <p class="text-xs text-slate-500">{{ new Date(student.created_at).toLocaleDateString() }}</p>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                    >
                                        {{ student.enrollments_count }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <span
                                            class="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                        >
                                            {{ student.active_enrollments_count }}
                                        </span>
                                        <button
                                            v-if="student.enrollments_count > 0"
                                            @click="openEnrollmentDrawer(student)"
                                            class="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
                                            :title="__('View Enrollments')"
                                        >
                                            <Eye :size="14" />
                                        </button>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        :class="`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold tracking-wide uppercase ${
                                            student.status === 'active'
                                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                                        }`"
                                    >
                                        {{ student.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2">
                                        <button
                                            @click="openAssignModal(student)"
                                            class="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900/20"
                                            :title="__('Assign Course')"
                                        >
                                            <BookOpen :size="14" />
                                            {{ __('Assign') }}
                                        </button>
                                        <div class="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                                        <button
                                            v-if="student.status === 'active'"
                                            @click="openStatusModal(student, 'blocked')"
                                            class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                                            :title="__('Block Student')"
                                        >
                                            <Ban :size="14" />
                                        </button>
                                        <button
                                            v-else
                                            @click="openStatusModal(student, 'active')"
                                            class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-emerald-50 hover:text-emerald-600"
                                            :title="__('Activate Student')"
                                        >
                                            <CheckCircle :size="14" />
                                        </button>
                                        <button
                                            @click="openDeleteModal(student)"
                                            class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                                            :title="__('Delete Student')"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="students.data.length === 0">
                                <td colspan="7" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <User :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No students found.') }}</p>
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
        </div>

        <!-- Assign Course Modal -->
        <div v-if="isAssignModalOpen" class="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Assign Course to') }} {{ selectedStudent?.name }}</h3>
                    <button
                        @click="closeAssignModal"
                        class="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
                    >
                        <X :size="20" />
                    </button>
                </div>

                <form @submit.prevent="submitAssignCourse" class="space-y-4">
                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Select Course') }}</label>
                        <div v-if="isLoadingCourses" class="flex items-center justify-center py-4">
                            <div class="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
                        </div>
                        <SearchableSelect
                            v-else
                            v-model="assignForm.course_id"
                            :options="availableCourses"
                            :placeholder="__('Choose a course...')"
                            required
                        />
                        <p v-if="assignForm.errors.course_id" class="mt-1 text-xs text-rose-500">{{ assignForm.errors.course_id }}</p>
                    </div>

                    <div class="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            @click="closeAssignModal"
                            class="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            {{ __('Cancel') }}
                        </button>
                        <button
                            type="submit"
                            :disabled="assignForm.processing"
                            class="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-brand-700 disabled:opacity-50"
                        >
                            {{ __('Assign Course') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>

    <ConfirmationModal
        :show="showConfirmModal"
        :title="modalAction === 'delete' ? __('Delete Student') : modalAction === 'block' ? __('Block Student') : __('Activate Student')"
        :message="
            modalAction === 'delete'
                ? __('Are you sure you want to delete this student? This action cannot be undone and will delete all their data.')
                : modalAction === 'block'
                  ? __('Are you sure you want to block this student? They will not be able to log in.')
                  : __('Are you sure you want to activate this student? They will regain access to their account.')
        "
        :confirm-text="modalAction === 'delete' ? __('Delete') : modalAction === 'block' ? __('Block') : __('Activate')"
        :type="modalAction === 'activate' ? 'info' : 'danger'"
        :processing="processingAction"
        @close="closeConfirmModal"
        @confirm="handleConfirm"
    />

    <!-- Enrollment Side Drawer -->
    <SlideOver
        :show="isEnrollmentDrawerOpen"
        :title="__('Course Enrollments for') + ' ' + enrolledStudent?.name"
        maxWidth="md"
        @close="closeEnrollmentDrawer"
    >
        <div v-if="isLoadingEnrollments" class="flex h-full flex-col items-center justify-center py-12">
            <div class="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
            <p class="mt-4 text-sm text-slate-500">{{ __('Loading enrollments...') }}</p>
        </div>

        <div v-else-if="studentEnrollments.length > 0" class="space-y-4">
            <div
                v-for="enrollment in studentEnrollments"
                :key="enrollment.id"
                class="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-brand-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0 flex-1">
                        <h4 class="truncate text-sm font-bold text-slate-900 dark:text-white">
                            {{ enrollment.course_title }}
                        </h4>
                        <div class="mt-2 flex items-center gap-3">
                            <div class="flex items-center gap-1 text-[10px] text-slate-500">
                                <Clock :size="12" />
                                <span>{{ __('Joined') }}: {{ enrollment.enrolled_at }}</span>
                            </div>
                            <span
                                :class="`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                                    enrollment.status === 'active'
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : enrollment.status === 'completed'
                                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                }`"
                            >
                                {{ enrollment.status }}
                            </span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="flex flex-col items-end">
                            <span class="text-xs font-bold text-slate-900 dark:text-white">{{ enrollment.progress }}%</span>
                            <div class="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div class="h-full bg-brand-500 transition-all duration-500" :style="{ width: enrollment.progress + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-12 text-center">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900">
                <BookOpen :size="32" class="text-slate-300" />
            </div>
            <h4 class="mt-4 text-base font-bold text-slate-900 dark:text-white">{{ __('No Enrollments') }}</h4>
            <p class="mt-1 max-w-50 text-sm text-slate-500">
                {{ __('This student highlight is not currently enrolled in any courses.') }}
            </p>
        </div>

        <template #footer>
            <div class="flex justify-end">
                <button
                    @click="closeEnrollmentDrawer"
                    class="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                    {{ __('Close') }}
                </button>
            </div>
        </template>
    </SlideOver>
</template>
