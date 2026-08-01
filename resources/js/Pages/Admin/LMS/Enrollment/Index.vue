<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import { wTrans as __ } from '@/Core/i18n';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { Ban, CheckCircle, Clock, GraduationCap, RotateCcw, Search, Trash2, UserCheck } from 'lucide-vue-next';
import { computed, PropType, ref, watch } from 'vue';

const props = defineProps({
    enrollments: Object as PropType<any>,
    courses: Array as PropType<any[]>,
    filters: Object as PropType<any>,
});

const search = ref(props.filters.search || '');
const course_id = ref(props.filters.course_id || '');
const status = ref(props.filters.status || '');

watch(
    [search, course_id, status],
    debounce(([searchVal, courseVal, statusVal]) => {
        router.get(
            admin.enrollments.index.url({
                query: {
                    search: searchVal,
                    course_id: courseVal,
                    status: statusVal,
                },
            }),
            {},
            { preserveState: true, replace: true },
        );
    }, 300),
);

const updateStatus = (enrollment: any, status: string) => {
    router.patch(
        admin.enrollments.status.url(enrollment.id),
        { status },
        {
            preserveScroll: true,
        },
    );
};

// Delete Logic
const showDeleteModal = ref(false);
const enrollmentToDelete = ref<any>(null);
const processingDelete = ref(false);

const confirmDelete = (enrollment: any) => {
    enrollmentToDelete.value = enrollment;
    showDeleteModal.value = true;
};

const handleDelete = () => {
    if (!enrollmentToDelete.value) return;

    processingDelete.value = true;
    router.delete(admin.enrollments.destroy.url(enrollmentToDelete.value.id), {
        preserveScroll: true,
        onSuccess: () => {
            showDeleteModal.value = false;
            enrollmentToDelete.value = null;
        },
        onFinish: () => {
            processingDelete.value = false;
        },
        onError: (errors) => {
            console.error('Delete Enrollment Error:', errors);
        },
    });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
            return 'emerald';
        case 'pending':
            return 'amber';
        case 'rejected':
            return 'red';
        case 'completed':
            return 'blue';
        case 'refunded':
            return 'rose';
        default:
            return 'slate';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'active':
            return CheckCircle;
        case 'pending':
            return Clock;
        case 'rejected':
            return Ban;
        case 'completed':
            return GraduationCap;
        case 'refunded':
            return RotateCcw;
        default:
            return Clock;
    }
};

const processedCourses = computed(() => {
    return (
        props.courses?.map((course: any) => ({
            id: course.id,
            name: course.title,
        })) || []
    );
});
</script>

<template>
    <Head :title="__('Enrollment Management')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Enrollment Management') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Track student progress and manage course access.') }}</p>
                </div>
            </div>

            <!-- Table Card -->
            <div class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <!-- Filters -->
                <div class="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center dark:border-slate-700">
                    <!-- Search -->
                    <div class="relative w-full sm:w-64">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search :size="16" class="text-slate-400" />
                        </div>
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="__('Search students or courses...')"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>

                    <!-- Course Filter -->
                    <div class="w-full sm:w-64">
                        <SearchableSelect v-model="course_id" :options="processedCourses" :placeholder="__('Filter by Course')" />
                    </div>

                    <!-- Status Filter -->
                    <div class="w-full sm:w-48">
                        <select
                            v-model="status"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200"
                        >
                            <option value="">{{ __('All Status') }}</option>
                            <option value="active">{{ __('Active') }}</option>
                            <option value="pending">{{ __('Pending') }}</option>
                            <option value="completed">{{ __('Completed') }}</option>
                            <option value="rejected">{{ __('Rejected') }}</option>
                            <option value="refunded">{{ __('Refunded') }}</option>
                        </select>
                    </div>

                    <!-- Clear Filters -->
                    <button
                        v-if="search || course_id || status"
                        @click="
                            () => {
                                search = '';
                                course_id = '';
                                status = '';
                            }
                        "
                        class="text-sm font-medium text-rose-500 hover:text-rose-600 dark:hover:text-rose-400"
                    >
                        {{ __('Clear Filters') }}
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Student') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Course') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Enrolled At') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="enrollment in enrollments.data"
                                :key="enrollment.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            {{ enrollment.user.name.substring(0, 2).toUpperCase() }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ enrollment.user.name }}</p>
                                            <p class="text-[10px] text-slate-500">{{ enrollment.user.email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <p class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-slate-300">{{ enrollment.course.title }}</p>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <span
                                        :class="`inline-flex items-center gap-1.5 rounded-lg border border-${getStatusColor(enrollment.status)}-100 bg-${getStatusColor(enrollment.status)}-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-${getStatusColor(enrollment.status)}-600 uppercase dark:border-${getStatusColor(enrollment.status)}-500/20 dark:bg-${getStatusColor(enrollment.status)}-500/10 dark:text-${getStatusColor(enrollment.status)}-400`"
                                    >
                                        <component :is="getStatusIcon(enrollment.status)" :size="12" /> {{ enrollment.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <p class="text-xs text-slate-500">{{ new Date(enrollment.created_at).toLocaleDateString() }}</p>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2">
                                        <div
                                            class="flex items-center rounded-xl border border-slate-100 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            <!-- Approve / Set Active -->
                                            <button
                                                v-if="enrollment.status === 'pending' || enrollment.status === 'rejected'"
                                                @click="updateStatus(enrollment, 'active')"
                                                class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-emerald-500 hover:text-white hover:shadow-lg"
                                                :title="__('Approve / Set Active')"
                                            >
                                                <CheckCircle :size="14" />
                                            </button>

                                            <!-- Reject -->
                                            <button
                                                v-if="enrollment.status === 'pending' || enrollment.status === 'active'"
                                                @click="updateStatus(enrollment, 'rejected')"
                                                class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-500 hover:text-white hover:shadow-lg"
                                                :title="__('Reject Enrollment')"
                                            >
                                                <Ban :size="14" />
                                            </button>

                                            <!-- Complete -->
                                            <button
                                                v-if="enrollment.status === 'active'"
                                                @click="updateStatus(enrollment, 'completed')"
                                                class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-blue-500 hover:text-white hover:shadow-lg"
                                                :title="__('Mark as Completed')"
                                            >
                                                <GraduationCap :size="14" />
                                            </button>

                                            <!-- Refund -->
                                            <button
                                                v-if="enrollment.status === 'active' || enrollment.status === 'completed'"
                                                @click="updateStatus(enrollment, 'refunded')"
                                                class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-500 hover:text-white hover:shadow-lg"
                                                :title="__('Refund')"
                                            >
                                                <RotateCcw :size="14" />
                                            </button>
                                        </div>
                                        <button
                                            @click="confirmDelete(enrollment)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-800 dark:hover:bg-rose-900/20"
                                            :title="__('Delete Enrollment')"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="enrollments.data.length === 0">
                                <td colspan="5" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <UserCheck :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No enrollments found.') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="enrollments.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in enrollments.links"
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

            <ConfirmationModal
                :show="showDeleteModal"
                :title="__('Remove Enrollment?')"
                :message="__('Are you sure you want to remove this enrollment? The student will lose access to all course contents immediately.')"
                :confirmText="__('Yes, Remove Enrollment')"
                :cancelText="__('No, Cancel')"
                type="danger"
                :processing="processingDelete"
                @close="showDeleteModal = false"
                @confirm="handleDelete"
            />
        </div>
    </AdminLayout>
</template>
