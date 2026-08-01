<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { Ban, CheckCircle, Clock, GraduationCap, ListTree, Pencil, PlusCircle, Search, Tag, Trash2, User, XCircle, Copy } from 'lucide-vue-next';
import { PropType, ref, watch } from 'vue';

const props = defineProps({
    courses: Object as PropType<any>,
});

const search = ref('');

watch(
    search,
    debounce((value) => {
        router.get(admin.courses.index.url({ query: { search: value } }), {}, { preserveState: true, replace: true });
    }, 300),
);

// Delete Logic
const showDeleteModal = ref(false);
const courseToDelete = ref<any>(null);
const processingDelete = ref(false);

// Clone Logic
const showCloneModal = ref(false);
const courseToClone = ref<any>(null);
const processingClone = ref(false);

const confirmClone = (course: any) => {
    courseToClone.value = course;
    showCloneModal.value = true;
};

const handleClone = async () => {
    if (!courseToClone.value) return;
    processingClone.value = true;
    try {
        await router.post(route('admin.courses.clone', courseToClone.value.id));
        showCloneModal.value = false;
        courseToClone.value = null;
        processingClone.value = false;
        router.reload();
    } catch (error) {
        processingClone.value = false;
    }
};

const confirmDelete = (course: any) => {
    courseToDelete.value = course;
    showDeleteModal.value = true;
};

const handleDelete = () => {
    if (!courseToDelete.value) return;

    processingDelete.value = true;
    router.delete(admin.courses.destroy.url(courseToDelete.value.id), {
        onSuccess: () => {
            showDeleteModal.value = false;
            courseToDelete.value = null;
        },
        onFinish: () => {
            processingDelete.value = false;
        },
    });
};
</script>

<template>
    <Head :title="__('Course Management')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Course Management') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Create and oversee your educational content.') }}</p>
                </div>
                <Link
                    :href="admin.courses.create.url()"
                    class="flex items-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95"
                >
                    <PlusCircle :size="18" class="me-2" /> {{ __('Create New Course') }}
                </Link>
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
                            :placeholder="__('Search courses...')"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Course') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Category & Instructor') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Pricing') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Enrollments') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Timeline') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
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
                                    <div class="space-y-1">
                                        <div class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                            <Tag :size="12" class="text-brand-500" />
                                            <span>{{ course.category?.name || __('Uncategorized') }}</span>
                                        </div>
                                        <div class="flex items-center gap-1.5 text-xs text-slate-500">
                                            <User :size="12" />
                                            <span>{{ course.instructor_name || __('Unknown') }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div v-if="course.is_free">
                                        <span class="text-xs font-black tracking-widest text-emerald-600 uppercase">{{ __('Free') }}</span>
                                    </div>
                                    <div v-else class="flex flex-col">
                                        <span class="text-sm font-bold text-slate-900 dark:text-white">${{ course.price }}</span>
                                        <span v-if="course.discount_price" class="text-[10px] text-rose-500 line-through"
                                            >${{ course.discount_price }}</span
                                        >
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <span
                                        v-if="course.status === 'published'"
                                        class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-600 uppercase dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                                    >
                                        <CheckCircle :size="12" /> {{ __('Published') }}
                                    </span>
                                    <span
                                        v-else
                                        class="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:border-slate-700 dark:bg-slate-800"
                                    >
                                        <XCircle :size="12" /> {{ __('Draft') }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <span class="text-sm font-bold">{{ course.enrollments_count || 0 }}</span>
                                        <GraduationCap :size="14" class="opacity-50" />
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-start">
                                    <div v-if="course.has_timeline && course.start_date" class="flex flex-col gap-1">
                                        <span
                                            v-if="new Date(course.start_date) > new Date()"
                                            class="inline-flex items-center gap-1.5 rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-amber-600 uppercase dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                                        >
                                            <Clock :size="12" /> {{ __('Upcoming') }}
                                        </span>
                                        <span
                                            v-else-if="!course.end_date || new Date(course.end_date) >= new Date()"
                                            class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-600 uppercase dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        >
                                            <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
                                            {{ __('Running') }}
                                        </span>
                                        <span
                                            v-else
                                            class="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-red-600 uppercase dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                                        >
                                            <Ban :size="12" /> {{ __('Ended') }}
                                        </span>
                                        <span class="text-[9px] text-slate-400">
                                            {{ new Date(course.start_date).toLocaleDateString() }}
                                            <template v-if="course.end_date"> - {{ new Date(course.end_date).toLocaleDateString() }}</template>
                                        </span>
                                    </div>
                                    <span
                                        v-else
                                        class="inline-flex items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-brand-600 uppercase dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400"
                                    >
                                        <GraduationCap :size="12" /> {{ __('Always Open') }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2 text-start">
                                        <Link
                                            :href="admin.courses.curriculum.url(course.id)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:hover:bg-brand-900/20"
                                            :title="__('Curriculum')"
                                        >
                                            <ListTree :size="14" />
                                        </Link>
                                        <Link
                                            :href="admin.courses.edit.url(course.id)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:hover:bg-brand-900/20"
                                        >
                                            <Pencil :size="14" />
                                        </Link>
                                        <button
                                            @click="confirmClone(course)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-emerald-50 hover:text-emerald-500 dark:bg-slate-800 dark:hover:bg-emerald-900/20"
                                            :title="__('Clone Course')"
                                        >
                                            <Copy :size="14" />
                                        </button>
                                        <button
                                            @click="confirmDelete(course)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-800 dark:hover:bg-rose-900/20"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="courses.data.length === 0">
                                <td colspan="7" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <GraduationCap :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No courses found.') }}</p>
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

            <ConfirmationModal
                :show="showDeleteModal"
                :title="__('Delete Course?')"
                :message="__('Are you sure you want to delete this course? All associated lessons and enrollments will be permanently removed.')"
                :confirmText="__('Yes, Delete Course')"
                :cancelText="__('No, Cancel')"
                type="danger"
                :processing="processingDelete"
                @close="showDeleteModal = false"
                @confirm="handleDelete"
            />

            <ConfirmationModal
                :show="showCloneModal"
                :title="__('Clone Course?')"
                :message="__('This will create a draft copy of this course with all sections and lessons. The cloned course will be named \'Copy of [original title]\'.')"
                :confirmText="__('Yes, Clone Course')"
                :cancelText="__('No, Cancel')"
                type="warning"
                :processing="processingClone"
                @close="showCloneModal = false"
                @confirm="handleClone"
            />
        </div>
    </AdminLayout>
</template>
