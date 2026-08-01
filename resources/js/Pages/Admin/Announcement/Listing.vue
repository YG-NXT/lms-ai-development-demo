<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { BookOpen, Calendar, Edit, Eye, Globe, Megaphone, Plus, Trash2 } from 'lucide-vue-next';
import { PropType, ref } from 'vue';

const props = defineProps({
    announcements: Object as PropType<any>,
});

// Declare translation function type
declare const __: (key: string) => string;

// Delete Logic
const showDeleteModal = ref(false);
const announcementToDelete = ref<any>(null);
const processingDelete = ref(false);

const confirmDelete = (announcement: any) => {
    announcementToDelete.value = announcement;
    showDeleteModal.value = true;
};

const handleDelete = () => {
    if (!announcementToDelete.value) return;

    processingDelete.value = true;
    router.delete(admin.announcements.destroy.url(announcementToDelete.value.id), {
        preserveScroll: true,
        onSuccess: () => {
            showDeleteModal.value = false;
            announcementToDelete.value = null;
        },
        onFinish: () => {
            processingDelete.value = false;
        },
    });
};

const getStatusClass = (status: string) => {
    switch (status) {
        case 'broadcast':
            return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
        case 'scheduled':
            return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
        default:
            return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    }
};

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};
</script>

<template>
    <Head :title="__('Announcements')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Announcements') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Create and manage global or course-wise announcements.') }}</p>
                </div>
                <Link
                    :href="admin.announcements.create.url()"
                    class="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95"
                >
                    <Plus :size="18" />
                    {{ __('Create Announcement') }}
                </Link>
            </div>

            <!-- Table Card -->
            <div class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Title') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Scope') }}
                                </th>
                                <th class="px-6 py-4 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Scheduled/Published') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <tr
                                v-for="announcement in announcements.data"
                                :key="announcement.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <Link
                                        :href="admin.announcements.show.url(announcement.id)"
                                        class="block max-w-xs truncate text-sm font-bold text-slate-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                                    >
                                        {{ announcement.title }}
                                    </Link>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <component :is="announcement.scope === 'global' ? Globe : BookOpen" :size="14" class="text-slate-400" />
                                        <span class="text-xs text-slate-600 capitalize dark:text-slate-400">
                                            {{ announcement.scope }}
                                            <template v-if="announcement.course"> ({{ announcement.course.title }}) </template>
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        :class="`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold tracking-wide uppercase ${getStatusClass(announcement.status)}`"
                                    >
                                        {{ announcement.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2 text-xs text-slate-500">
                                        <Calendar :size="12" />
                                        <span>
                                            {{ formatDate(announcement.published_at || announcement.scheduled_at) }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link
                                            :href="admin.announcements.show.url(announcement.id)"
                                            class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
                                            :title="__('View Details')"
                                        >
                                            <Eye :size="14" />
                                        </Link>
                                        <Link
                                            :href="admin.announcements.edit.url(announcement.id)"
                                            class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20"
                                            :title="__('Edit')"
                                        >
                                            <Edit :size="14" />
                                        </Link>
                                        <button
                                            @click="confirmDelete(announcement)"
                                            class="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                                            :title="__('Delete')"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="announcements.data.length === 0">
                                <td colspan="5" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <Megaphone :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No announcements found.') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="announcements.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in announcements.links"
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
                :title="__('Delete Announcement?')"
                :message="__('Are you sure you want to delete this announcement? This action cannot be undone.')"
                :confirmText="__('Yes, Delete Announcement')"
                :cancelText="__('No, Cancel')"
                type="danger"
                :processing="processingDelete"
                @close="showDeleteModal = false"
                @confirm="handleDelete"
            />
        </div>
    </AdminLayout>
</template>
