<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { CheckCircle, Clock, MessageSquare, Search, Star, Trash2, XCircle } from 'lucide-vue-next';
import { computed, PropType, ref, watch } from 'vue';

const props = defineProps({
    reviews: Object as PropType<any>,
    filters: Object as PropType<any>,
    courses: Array as PropType<any[]>,
});

const search = ref(props.filters.search || '');
const status = ref(props.filters.status || '');
const courseId = ref(props.filters.course_id || '');

watch(
    [search, status, courseId],
    debounce(() => {
        router.get(
            admin.reviews.index.url({
                query: { search: search.value, status: status.value, course_id: courseId.value },
            }),
            {},
            { preserveState: true, replace: true },
        );
    }, 300),
);

const updateStatus = (review: any, statusValue: string) => {
    router.patch(
        admin.reviews.status.url(review.id),
        { status: statusValue },
        {
            preserveScroll: true,
        },
    );
};

// Delete Logic
const showDeleteModal = ref(false);
const reviewToDelete = ref<any>(null);
const processingDelete = ref(false);

const confirmDelete = (review: any) => {
    reviewToDelete.value = review;
    showDeleteModal.value = true;
};

const handleDelete = () => {
    if (!reviewToDelete.value) return;

    processingDelete.value = true;
    router.delete(admin.reviews.destroy.url(reviewToDelete.value.id), {
        onSuccess: () => {
            showDeleteModal.value = false;
            reviewToDelete.value = null;
        },
        onFinish: () => {
            processingDelete.value = false;
        },
    });
};

const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
        case 'approved':
            return 'emerald';
        case 'rejected':
            return 'rose';
        case 'pending':
            return 'amber';
        default:
            return 'slate';
    }
};

const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
        case 'approved':
            return CheckCircle;
        case 'rejected':
            return XCircle;
        case 'pending':
            return Clock;
        default:
            return Clock;
    }
};

// Review Details Modal
const showDetailsModal = ref(false);
const selectedReview = ref<any>(null);

const viewReviewDetails = (review: any) => {
    selectedReview.value = review;
    showDetailsModal.value = true;
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
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
    <Head :title="__('Review Moderation')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Review Moderation') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Moderate student feedback and maintain quality.') }}</p>
                </div>
            </div>

            <!-- Table Card -->
            <div class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <!-- Filters -->
                <div class="flex flex-wrap gap-4 border-b border-slate-100 p-4 dark:border-slate-700">
                    <div class="relative w-full sm:w-64">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search :size="16" class="text-slate-400" />
                        </div>
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="__('Search reviewers or courses...')"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>
                    <select
                        v-model="status"
                        class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200"
                    >
                        <option value="">{{ __('All Statuses') }}</option>
                        <option value="pending">{{ __('Pending') }}</option>
                        <option value="approved">{{ __('Approved') }}</option>
                        <option value="rejected">{{ __('Rejected') }}</option>
                    </select>
                    <div class="w-full sm:w-64">
                        <SearchableSelect v-model="courseId" :options="processedCourses" :placeholder="__('All Courses')" />
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Reviewer') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Rating & Comment') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Course') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="review in reviews.data"
                                :key="review.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            {{ review.user.name.substring(0, 2).toUpperCase() }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ review.user.name }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td
                                    class="cursor-pointer px-6 py-4 text-start transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50"
                                    @click="viewReviewDetails(review)"
                                >
                                    <div class="mb-1 flex items-center gap-1">
                                        <Star
                                            v-for="i in 5"
                                            :key="i"
                                            :size="12"
                                            :class="i <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'"
                                        />
                                    </div>
                                    <p class="line-clamp-1 text-xs text-slate-600 italic dark:text-slate-400">
                                        "{{ review.comment || 'No comment' }}"
                                    </p>
                                    <p class="mt-1 text-[10px] text-brand-600 dark:text-brand-400">{{ __('Click to view details') }}</p>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <p class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-slate-300">{{ review.course.title }}</p>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <span
                                        :class="`inline-flex items-center gap-1.5 rounded-lg border border-${getStatusColor(review.status)}-100 bg-${getStatusColor(review.status)}-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-${getStatusColor(review.status)}-600 uppercase dark:border-${getStatusColor(review.status)}-500/20 dark:bg-${getStatusColor(review.status)}-500/10 dark:text-${getStatusColor(review.status)}-400`"
                                    >
                                        <component :is="getStatusIcon(review.status)" :size="12" /> {{ review.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2 text-start">
                                        <div
                                            class="flex items-center rounded-xl border border-slate-100 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            <button
                                                @click="updateStatus(review, 'approved')"
                                                :class="`rounded-lg p-1.5 transition-all ${review.status === 'approved' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-emerald-500'}`"
                                                :title="__('Approve')"
                                            >
                                                <CheckCircle :size="14" />
                                            </button>
                                            <button
                                                @click="updateStatus(review, 'rejected')"
                                                :class="`rounded-lg p-1.5 transition-all ${review.status === 'rejected' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-rose-500'}`"
                                                :title="__('Reject')"
                                            >
                                                <XCircle :size="14" />
                                            </button>
                                        </div>
                                        <button
                                            @click="confirmDelete(review)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-800 dark:hover:bg-rose-900/20"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="reviews.data.length === 0">
                                <td colspan="5" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <MessageSquare :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No reviews found.') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="reviews.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in reviews.links"
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

        <!-- Review Details Modal -->
        <div
            v-if="showDetailsModal && selectedReview"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            @click.self="showDetailsModal = false"
        >
            <div
                class="animate-fade-in-up w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
                <div class="mb-6 flex items-start justify-between">
                    <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ __('Review Details') }}</h3>
                    <button
                        @click="showDetailsModal = false"
                        class="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
                    >
                        <XCircle :size="20" />
                    </button>
                </div>

                <div class="space-y-6">
                    <!-- Course Info -->
                    <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                        <p class="mb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Course') }}</p>
                        <p class="text-lg font-bold text-slate-900 dark:text-white">{{ selectedReview.course.title }}</p>
                    </div>

                    <!-- Reviewer Info -->
                    <div class="flex items-center gap-4">
                        <div
                            class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 text-lg font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                        >
                            {{ selectedReview.user.name.substring(0, 2).toUpperCase() }}
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ selectedReview.user.name }}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatDate(selectedReview.created_at) }}</p>
                        </div>
                    </div>

                    <!-- Rating -->
                    <div>
                        <p class="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Rating') }}</p>
                        <div class="flex items-center gap-2">
                            <Star
                                v-for="i in 5"
                                :key="i"
                                :size="24"
                                :class="i <= selectedReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'"
                            />
                            <span class="ml-2 text-xl font-bold text-slate-900 dark:text-white">{{ selectedReview.rating }}/5</span>
                        </div>
                    </div>

                    <!-- Comment -->
                    <div>
                        <p class="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Comment') }}</p>
                        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                            <p class="text-sm leading-relaxed text-slate-700 italic dark:text-slate-300">
                                "{{ selectedReview.comment || 'No comment provided' }}"
                            </p>
                        </div>
                    </div>

                    <!-- Status -->
                    <div>
                        <p class="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Status') }}</p>
                        <span
                            :class="`inline-flex items-center gap-1.5 rounded-lg border border-${getStatusColor(selectedReview.status)}-100 bg-${getStatusColor(selectedReview.status)}-50 px-3 py-1.5 text-xs font-bold tracking-widest text-${getStatusColor(selectedReview.status)}-600 uppercase dark:border-${getStatusColor(selectedReview.status)}-500/20 dark:bg-${getStatusColor(selectedReview.status)}-500/10 dark:text-${getStatusColor(selectedReview.status)}-400`"
                        >
                            <component :is="getStatusIcon(selectedReview.status)" :size="14" />
                            {{ selectedReview.status }}
                        </span>
                    </div>
                </div>

                <!-- Close Button -->
                <div class="mt-8 flex justify-end">
                    <button
                        @click="showDetailsModal = false"
                        class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {{ __('Close') }}
                    </button>
                </div>
            </div>
        </div>

        <ConfirmationModal
            :show="showDeleteModal"
            :title="__('Delete Review?')"
            :message="__('Are you sure you want to delete this review? This action cannot be undone.')"
            :confirmText="__('Yes, Delete Review')"
            :cancelText="__('No, Cancel')"
            type="danger"
            :processing="processingDelete"
            @close="showDeleteModal = false"
            @confirm="handleDelete"
        />
    </AdminLayout>
</template>
