<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { Calendar, CheckCircle, Clock, ExternalLink, MonitorPlay, Pencil, PlusCircle, Search, Trash2, Video, XCircle } from 'lucide-vue-next';
import { computed, PropType, ref, watch } from 'vue';

const props = defineProps({
    liveClasses: Object as PropType<any>,
    filters: Object as PropType<any>,
    courses: Array as PropType<any[]>,
});

const search = ref(props.filters.search || '');
const courseId = ref(props.filters.course_id || '');
const status = ref(props.filters.status || '');

const updateFilters = debounce(() => {
    router.get(
        admin.liveClasses.index.url({
            query: {
                search: search.value,
                course_id: courseId.value,
                status: status.value,
            },
        }),
        {},
        { preserveState: true, replace: true },
    );
}, 300);

watch([search, courseId, status], updateFilters);

// Delete Logic
const showDeleteModal = ref(false);
const liveClassToDelete = ref<any>(null);
const processingDelete = ref(false);

const confirmDelete = (liveClass: any) => {
    liveClassToDelete.value = liveClass;
    showDeleteModal.value = true;
};

const handleDelete = () => {
    if (!liveClassToDelete.value) return;

    processingDelete.value = true;
    router.delete(admin.liveClasses.destroy.url(liveClassToDelete.value.id), {
        onSuccess: () => {
            showDeleteModal.value = false;
            liveClassToDelete.value = null;
        },
        onFinish: () => {
            processingDelete.value = false;
        },
    });
};

const getStatusClass = (status: string) => {
    switch (status) {
        case 'live':
            return 'border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400';
        case 'upcoming':
            return 'border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400';
        case 'finished':
            return 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800';
        case 'cancelled':
            return 'border-rose-100 bg-rose-50 text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400';
        default:
            return 'border-slate-100 bg-slate-50 text-slate-400';
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
    <Head :title="__('Live Class Management')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Live Class Management') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Schedule and oversee live sessions for your courses.') }}</p>
                </div>
                <Link
                    :href="admin.liveClasses.create.url()"
                    class="flex items-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95"
                >
                    <PlusCircle :size="18" class="me-2" /> {{ __('Schedule New Class') }}
                </Link>
            </div>

            <!-- Table Card -->
            <div class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <!-- Filters -->
                <div class="flex flex-wrap items-center gap-4 border-b border-slate-100 p-4 dark:border-slate-700">
                    <div class="relative w-full sm:w-64">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search :size="16" class="text-slate-400" />
                        </div>
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="__('Search classes...')"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>

                    <div class="w-full sm:w-64">
                        <SearchableSelect v-model="courseId" :options="processedCourses" :placeholder="__('All Courses')" />
                    </div>

                    <select
                        v-model="status"
                        class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200"
                    >
                        <option value="">{{ __('All Status') }}</option>
                        <option value="upcoming">{{ __('Upcoming') }}</option>
                        <option value="live">{{ __('Live') }}</option>
                        <option value="finished">{{ __('Finished') }}</option>
                        <option value="cancelled">{{ __('Cancelled') }}</option>
                    </select>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Session Info') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Course') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Provider') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Schedule') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="liveClass in liveClasses.data"
                                :key="liveClass.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div
                                            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-900"
                                        >
                                            <Video :size="20" />
                                        </div>
                                        <div>
                                            <p class="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">{{ liveClass.title }}</p>
                                            <p class="mt-0.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                                                ID: #{{ liveClass.id }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{
                                        liveClass.course?.title || __('Deleted Course')
                                    }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <div
                                            v-if="liveClass.provider === 'zoom'"
                                            class="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                        >
                                            <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                            Zoom
                                        </div>
                                        <div
                                            v-else
                                            class="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                                        >
                                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                            Google Meet
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="space-y-1">
                                        <div class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                            <span v-if="liveClass.type === 'daily'" class="font-bold text-brand-600 dark:text-brand-400">{{
                                                __('Daily')
                                            }}</span>
                                            <span v-else class="flex items-center gap-1">
                                                <Calendar :size="12" class="text-brand-500" />
                                                {{ new Date(liveClass.class_date).toLocaleDateString() }}
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-1.5 text-[10px] text-slate-500">
                                            <Clock :size="12" />
                                            <span> {{ liveClass.start_time.slice(0, 5) }} - {{ liveClass.end_time.slice(0, 5) }} </span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                                        :class="getStatusClass(liveClass.status_label)"
                                    >
                                        <div
                                            v-if="liveClass.status_label === 'live'"
                                            class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
                                        ></div>
                                        <Clock v-else-if="liveClass.status_label === 'upcoming'" :size="12" />
                                        <CheckCircle v-else-if="liveClass.status_label === 'finished'" :size="12" />
                                        <XCircle v-else-if="liveClass.status_label === 'cancelled'" :size="12" />
                                        {{ __(liveClass.status_label) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2 text-start">
                                        <a
                                            :href="liveClass.meeting_url"
                                            target="_blank"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:hover:bg-brand-900/20"
                                            :title="__('Join Session')"
                                        >
                                            <ExternalLink :size="14" />
                                        </a>
                                        <Link
                                            :href="admin.liveClasses.edit.url(liveClass.id)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:hover:bg-brand-900/20"
                                            :title="__('Edit')"
                                        >
                                            <Pencil :size="14" />
                                        </Link>
                                        <button
                                            @click="confirmDelete(liveClass)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-800 dark:hover:bg-rose-900/20"
                                            :title="__('Delete')"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="liveClasses.data.length === 0">
                                <td colspan="6" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <MonitorPlay :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No live classes found.') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="liveClasses.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in liveClasses.links"
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
                :title="__('Delete Live Class?')"
                :message="__('Are you sure you want to delete this live class? This action cannot be undone.')"
                :confirmText="__('Yes, Delete')"
                :cancelText="__('No, Cancel')"
                type="danger"
                :processing="processingDelete"
                @close="showDeleteModal = false"
                @confirm="handleDelete"
            />
        </div>
    </AdminLayout>
</template>
