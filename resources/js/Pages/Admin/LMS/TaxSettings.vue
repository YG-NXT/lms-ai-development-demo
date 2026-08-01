<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, Trash2 } from 'lucide-vue-next';

defineProps<{
    taxSettings?: any[];
}>();

const form = useForm({
    name: '',
    type: 'percentage',
    rate: 0,
    scope: 'global',
    is_active: true,
    rules: [],
});

const submit = () => {
    form.post(admin.tax-settings.store.url(), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Tax Configuration" />

    <AdminLayout>
        <div class="space-y-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ __('Tax Configuration') }}</h1>

            <form @submit.prevent="submit" class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Name') }}</label>
                        <input v-model="form.name" type="text" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.name" class="mt-1 text-xs text-red-500">{{ form.errors.name }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Type') }}</label>
                        <select v-model="form.type" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                            <option value="percentage">{{ __('Percentage (%)') }}</option>
                            <option value="fixed">{{ __('Fixed Amount ($)') }}</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Rate') }}</label>
                        <input v-model.number="form.rate" type="number" step="0.01" min="0" max="100" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.rate" class="mt-1 text-xs text-red-500">{{ form.errors.rate }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Scope') }}</label>
                        <select v-model="form.scope" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                            <option value="global">{{ __('Global') }}</option>
                            <option value="per_course">{{ __('Per Course') }}</option>
                            <option value="per_certificate">{{ __('Per Certificate') }}</option>
                        </select>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <input v-model="form.is_active" type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                        {{ __('Active') }}
                    </label>
                </div>

                <div class="flex items-center gap-3">
                    <button type="submit" :disabled="form.processing" class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-50">
                        <Save :size="16" />
                        {{ __('Add Tax Setting') }}
                    </button>
                </div>
            </form>

            <div class="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <table class="w-full text-left text-sm">
                    <thead class="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-700">
                        <tr>
                            <th class="px-6 py-3">{{ __('Name') }}</th>
                            <th class="px-6 py-3">{{ __('Type') }}</th>
                            <th class="px-6 py-3">{{ __('Rate') }}</th>
                            <th class="px-6 py-3">{{ __('Scope') }}</th>
                            <th class="px-6 py-3">{{ __('Active') }}</th>
                            <th class="px-6 py-3 text-right">{{ __('Actions') }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr v-for="setting in taxSettings" :key="setting.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">{{ setting.name }}</td>
                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ setting.type }}</td>
                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ setting.rate }}%</td>
                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ setting.scope }}</td>
                            <td class="px-6 py-4">
                                <span :class="setting.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                                    {{ setting.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button class="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
                                    <Trash2 :size="14" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="!taxSettings || taxSettings.length === 0">
                            <td colspan="6" class="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">No tax settings configured yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
</template>