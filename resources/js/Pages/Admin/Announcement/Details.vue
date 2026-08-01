<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { BookOpen, Calendar, Clock, Edit, Globe, Plus, Trash2, Users } from 'lucide-vue-next';
import { PropType } from 'vue';

const props = defineProps({
    announcement: Object as PropType<any>,
});

// Declare translation function type
declare const __: (key: string) => string;

const deleteAnnouncement = () => {
    if (confirm(__('Are you sure you want to delete this announcement?'))) {
        router.delete(admin.announcements.destroy.url(props.announcement.id));
    }
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
    <Head :title="__('Announcement Details')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div class="flex items-center gap-4">
                    <Link
                        :href="admin.announcements.index.url()"
                        class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-slate-300 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800"
                    >
                        <Plus :size="20" class="rotate-45" />
                    </Link>
                    <div>
                        <h2 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Announcement Details') }}</h2>
                        <div class="mt-1 flex items-center gap-3">
                            <span
                                :class="`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getStatusClass(announcement.status)}`"
                            >
                                {{ announcement.status }}
                            </span>
                            <span class="text-xs text-slate-500">{{ __('ID') }}: #{{ announcement.id }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <Link
                        :href="admin.announcements.edit.url(announcement.id)"
                        class="flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-600 transition-all hover:bg-brand-100 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400"
                    >
                        <Edit :size="16" />
                        {{ __('Edit') }}
                    </Link>
                    <button
                        @click="deleteAnnouncement"
                        class="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600 transition-all hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400"
                    >
                        <Trash2 :size="16" />
                        {{ __('Delete') }}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Content -->
                <div class="space-y-6 lg:col-span-2">
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h1 class="text-2xl font-black text-slate-900 dark:text-white">{{ announcement.title }}</h1>
                        <div class="mt-4 flex items-center gap-4 text-xs text-slate-500">
                            <div class="flex items-center gap-1.5">
                                <component :is="announcement.scope === 'global' ? Globe : BookOpen" :size="14" />
                                <span class="capitalize">{{ announcement.scope }}</span>
                            </div>
                            <div v-if="announcement.course" class="flex items-center gap-1.5">
                                <BookOpen :size="14" />
                                <span>{{ announcement.course.title }}</span>
                            </div>
                            <div class="flex items-center gap-1.5 border-l border-slate-200 pl-4 dark:border-slate-700">
                                <Calendar :size="14" />
                                <span>{{ __('Created at') }}: {{ formatDate(announcement.created_at) }}</span>
                            </div>
                        </div>

                        <div class="mt-8 border-t border-slate-100 pt-8 dark:border-slate-700/50">
                            <div class="prose max-w-none prose-slate dark:prose-invert">
                                <div
                                    class="prose max-w-none whitespace-pre-wrap text-slate-600 prose-slate dark:text-slate-300 dark:prose-invert"
                                    v-html="announcement.content"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Info Sidebar -->
                <div class="space-y-6">
                    <!-- Targeted Students -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-4 flex items-center gap-2">
                            <Users :size="20" class="text-brand-500" />
                            <h3 class="font-bold text-slate-900 dark:text-white">{{ __('Target Audience') }}</h3>
                        </div>

                        <div v-if="announcement.scope === 'global'" class="rounded-2xl bg-brand-50 p-4 text-center dark:bg-brand-500/5">
                            <p class="text-xs font-bold text-brand-700 dark:text-brand-400">{{ __('Broadcasted to all students') }}</p>
                        </div>
                        <div v-else-if="announcement.scope === 'course'" class="rounded-2xl bg-amber-50 p-4 text-center dark:bg-amber-500/5">
                            <p class="text-xs font-bold text-amber-700 dark:text-amber-400">
                                {{ __('Targeted to students of') }}
                                <br />
                                <span class="text-sm">{{ announcement.course?.title }}</span>
                            </p>
                        </div>

                        <div v-if="announcement.users?.length > 0" class="mt-4 space-y-3">
                            <p class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                {{ __('Specifically Selected') }} ({{ announcement.users.length }})
                            </p>
                            <div class="custom-scrollbar max-h-64 space-y-2 overflow-y-auto pr-2">
                                <div
                                    v-for="user in announcement.users"
                                    :key="user.id"
                                    class="flex items-center gap-3 rounded-xl bg-slate-50 p-2 dark:bg-slate-900/50"
                                >
                                    <div
                                        class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold dark:bg-slate-800"
                                    >
                                        {{ user.name.substring(0, 2).toUpperCase() }}
                                    </div>
                                    <div class="min-w-0">
                                        <p class="truncate text-[10px] font-bold text-slate-900 dark:text-white">{{ user.name }}</p>
                                        <p class="truncate text-[8px] text-slate-500">{{ user.email }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-else-if="announcement.scope !== 'global' && announcement.scope !== 'course'"
                            class="mt-4 rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-900/50"
                        >
                            <Users :size="24" class="mx-auto text-slate-300" />
                            <p class="mt-2 text-[10px] text-slate-500">{{ __('No specific students targeted.') }}</p>
                        </div>
                    </div>

                    <!-- Additional Info -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-4 flex items-center gap-2">
                            <Clock :size="20" class="text-slate-400" />
                            <h3 class="font-bold text-slate-900 dark:text-white">{{ __('Publishing Info') }}</h3>
                        </div>

                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-xs text-slate-500">{{ __('Status') }}</span>
                                <span :class="`text-[10px] font-bold uppercase ${getStatusClass(announcement.status)}`">{{
                                    announcement.status
                                }}</span>
                            </div>
                            <div class="flex justify-between" v-if="announcement.scheduled_at">
                                <span class="text-xs text-slate-500">{{ __('Scheduled for') }}</span>
                                <span class="text-[10px] font-bold text-slate-900 dark:text-white">{{ formatDate(announcement.scheduled_at) }}</span>
                            </div>
                            <div class="flex justify-between" v-if="announcement.published_at">
                                <span class="text-xs text-slate-500">{{ __('Published at') }}</span>
                                <span class="text-[10px] font-bold text-slate-900 dark:text-white">{{ formatDate(announcement.published_at) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-xs text-slate-500">{{ __('Last updated') }}</span>
                                <span class="text-[10px] font-bold text-slate-900 dark:text-white">{{ formatDate(announcement.updated_at) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
}
</style>
