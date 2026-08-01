<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, BadgePercent, ChevronRight, Download, Plus, Search, Trash2 } from 'lucide-vue-next';

defineProps<{
    coupons: any;
}>();

const formatDate = (date: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getTypeInfo = (type: string) => {
    return type === 'percentage'
        ? { label: '%', color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20' }
        : { label: '$', color: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-900/20' };
};
</script>

<template>
    <Head :title="__('Coupons')" />

    <AdminLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Coupons') }}</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">{{ __('Manage discount codes for your courses.') }}</p>
                </div>
                <Link
                    :href="admin.coupons.create.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                    <Plus :size="18" />
                    {{ __('New Coupon') }}
                </Link>
            </div>

            <!-- Coupons Table -->
            <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                    <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('All Coupons') }}</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                            <tr>
                                <th class="px-6 py-3 font-medium">{{ __('Code') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Type') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Value') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Used') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Valid Until') }}</th>
                                <th class="px-6 py-3 font-medium">{{ __('Status') }}</th>
                                <th class="px-6 py-3 font-medium text-right">{{ __('Actions') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr v-for="coupon in coupons.data" :key="coupon.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td class="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">
                                    {{ coupon.code }}
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex rounded-full px-2 py-1 text-xs font-bold" :class="getTypeInfo(coupon.type).color">
                                        {{ getTypeInfo(coupon.type).label }} {{ coupon.type === 'percentage' ? coupon.value + '%' : '$' + coupon.value }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    <span v-if="coupon.max_discount">Max ${{ coupon.max_discount }}</span>
                                    <span v-else>Unlimited</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    {{ coupon.used_count }}/{{ coupon.max_uses ?? '∞' }}
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    {{ formatDate(coupon.valid_until) }}
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex h-2 w-2 items-center justify-center rounded-full"
                                        :class="coupon.is_active ? 'bg-emerald-500' : 'bg-slate-400'"
                                    ></span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link
                                            :href="admin.coupons.edit.url(coupon.id)"
                                            class="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                                        >
                                            Edit
                                        </Link>
                                        <form :action="admin.coupons.destroy.url(coupon.id)" method="POST" class="inline" @submit.prevent="if(confirm('Delete this coupon?')) $event.target.submit()">
                                            <button type="submit" class="text-sm font-medium text-rose-600 hover:text-rose-700">
                                                <Trash2 :size="14" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="coupons.data.length === 0">
                                <td colspan="7" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                    No coupons found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="coupons.links && coupons.links.length > 3" class="flex items-center justify-center gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
                    <Link
                        v-for="link in coupons.links"
                        :key="link.label"
                        :href="link.url || '#'"
                        v-html="link.label"
                        class="rounded-lg px-3 py-1 text-sm font-medium"
                        :class="link.active
                            ? 'bg-primary-600 text-white'
                            : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400'"
                    />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>