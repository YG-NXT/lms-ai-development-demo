<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';

defineProps<{
    coupon?: any;
}>();

const isEdit = !!props.coupon;

const form = useForm({
    code: props.coupon?.code ?? '',
    type: props.coupon?.type ?? 'percentage',
    value: props.coupon?.value ?? 0,
    max_discount: props.coupon?.max_discount ?? null,
    max_uses: props.coupon?.max_uses ?? null,
    valid_from: props.coupon?.valid_from ?? '',
    valid_until: props.coupon?.valid_until ?? '',
    is_active: props.coupon?.is_active ?? true,
    course_ids: props.coupon?.courses?.map((c: any) => c.id) ?? [],
});

const submit = () => {
    if (isEdit) {
        form.put(admin.coupons.update.url(props.coupon.id), {
            onSuccess: () => form.reset(),
        });
    } else {
        form.post(admin.coupons.store.url(), {
            onSuccess: () => form.reset(),
        });
    }
};
</script>

<template>
    <Head :title="isEdit ? __('Edit Coupon') : __('Create Coupon')" />

    <AdminLayout>
        <div class="space-y-6">
            <div class="flex items-center gap-3">
                <Link :href="admin.coupons.index.url()" class="text-primary-600 hover:text-primary-700">
                    <ArrowLeft :size="20" />
                </Link>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    {{ isEdit ? __('Edit Coupon') : __('Create Coupon') }}
                </h1>
            </div>

            <form @submit.prevent="submit" class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Code') }}</label>
                        <input v-model="form.code" type="text" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.code" class="mt-1 text-xs text-red-500">{{ form.errors.code }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Type') }}</label>
                        <select v-model="form.type" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                            <option value="percentage">{{ __('Percentage (%)') }}</option>
                            <option value="fixed">{{ __('Fixed Amount ($)') }}</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Value') }}</label>
                        <input v-model.number="form.value" type="number" step="0.01" min="0" max="100" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.value" class="mt-1 text-xs text-red-500">{{ form.errors.value }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Max Discount') }}</label>
                        <input v-model.number="form.max_discount" type="number" step="0.01" min="0" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" placeholder="Optional" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Max Uses') }}</label>
                        <input v-model.number="form.max_uses" type="number" min="1" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" placeholder="Unlimited" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Valid Until') }}</label>
                        <input v-model="form.valid_until" type="date" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button type="submit" :disabled="form.processing" class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-50">
                        <Save :size="16" />
                        {{ isEdit ? __('Update Coupon') : __('Create Coupon') }}
                    </button>
                    <Link :href="admin.coupons.index.url()" class="rounded-xl px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-400">
                        {{ __('Cancel') }}
                    </Link>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>