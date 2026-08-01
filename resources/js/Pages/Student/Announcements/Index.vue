<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { BookOpen, Globe, Megaphone } from 'lucide-vue-next';
import { PropType } from 'vue';

const props = defineProps({
    announcements: Object as PropType<any>,
});

// Declare translation function type
declare const __: (key: string) => string;
</script>

<template>
    <Head :title="__('Announcements')" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Announcements') }}</h1>
                <p class="mt-1 text-slate-500 dark:text-slate-400">{{ __('Stay updated with the latest news and course updates.') }}</p>
            </div>

            <!-- Feed -->
            <div class="space-y-4">
                <div
                    v-for="announcement in announcements.data"
                    :key="announcement.id"
                    class="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-admin-card-dark"
                >
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <div class="mb-2 flex items-center gap-2">
                                <span
                                    v-if="announcement.scope === 'global'"
                                    class="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary-600 uppercase dark:bg-primary-500/10 dark:text-primary-400"
                                >
                                    <Globe :size="10" />
                                    {{ __('Global') }}
                                </span>
                                <span
                                    v-else
                                    class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-600 uppercase dark:bg-amber-500/10 dark:text-amber-400"
                                >
                                    <BookOpen :size="10" />
                                    {{ __('Course Update') }}
                                </span>
                                <span class="text-[10px] text-slate-400">
                                    {{ announcement.published_at || announcement.created_at }}
                                </span>
                            </div>

                            <h3
                                class="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
                            >
                                {{ announcement.title }}
                            </h3>

                            <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {{ announcement.content }}
                            </p>
                        </div>
                    </div>
                </div>

                <div v-if="announcements.data.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
                    <div class="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50">
                        <Megaphone :size="40" class="text-slate-300 dark:text-slate-700" />
                    </div>
                    <h2 class="mt-6 text-xl font-bold text-slate-900 dark:text-white">{{ __('No Announcements Yet') }}</h2>
                    <p class="mt-2 max-w-xs text-slate-500 dark:text-slate-400">
                        {{ __("You're all caught up! We'll notify you when there's something new.") }}
                    </p>
                </div>

                <!-- Pagination -->
                <div v-if="announcements.links.length > 3" class="mt-8 flex items-center justify-center gap-2">
                    <Link
                        v-for="(link, key) in announcements.links"
                        :key="key"
                        :href="link.url || '#'"
                        v-html="link.label"
                        class="flex h-10 min-w-10 items-center justify-center rounded-xl px-4 text-sm font-bold transition-all"
                        :class="
                            link.active
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                : 'border border-slate-100 bg-white text-slate-600 hover:border-primary-200 dark:border-slate-800 dark:bg-admin-card-dark dark:text-slate-400'
                        "
                        :preserve-state="true"
                    />
                </div>
            </div>
        </div>
    </StudentLayout>
</template>
