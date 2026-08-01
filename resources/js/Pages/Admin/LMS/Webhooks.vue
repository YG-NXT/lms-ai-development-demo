<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-vue-next';

defineProps<{
    webhooks: any;
}>();

const formatEvents = (events: string[] | null) => {
    if (!events) return '—';
    return events.join(', ');
};
</script>

<template>
    <Head :title="__('Webhooks')" />

    <AdminLayout>
        <div class="space-y-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Webhooks') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">{{ __('Manage event webhook integrations.') }}</p>
                </div>
                <Link
                    :href="admin.webhooks.create.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20"
                >
                    <Plus :size="18" />
                    {{ __('New Webhook') }}
                </Link>
            </div>

            <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                    <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('All Webhooks') }}</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                            <tr>
                                <th class="px-6 py-3 font-medium">{{ __('Name') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('URL') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Events') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Status') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Last Delivery') }}</th>
                                <th class="px-6 py-3 font-medium text-right">{{ __('Actions') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr v-for="webhook in webhooks.data" :key="webhook.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td class="px-6 py-4 font-bold text-slate-900 dark:text-white">{{ webhook.name }}</td>
                                <td class="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">
                                    {{ webhook.url }}
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    {{ formatEvents(webhook.events) }}
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex h-2 w-2 items-center justify-center rounded-full" :class="webhook.is_active ? 'bg-emerald-500' : 'bg-slate-400'"></span>
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">—</td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link
                                            :href="admin.webhooks.edit.url(webhook.id)"
                                            class="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                                        >
                                            Edit
                                        </Link>
                                        <form :action="admin.webhooks.destroy.url(webhook.id)" method="POST" class="inline" @submit.prevent="confirm('Delete this webhook?') && $event.target.submit()">
                                            <button type="submit" class="text-sm font-medium text-rose-600 hover:text-rose-700">
                                                <Trash2 :size="14" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="webhooks.data.length === 0">
                                <td colspan="6" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                    No webhooks found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>