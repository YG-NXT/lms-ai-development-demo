<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';

defineProps<{
    webhook?: any;
}>();

const isEdit = !!props.webhook;

const form = useForm({
    name: props.webhook?.name ?? '',
    url: props.webhook?.url ?? '',
    secret: props.webhook?.secret ?? '',
    events: props.webhook?.events ?? [],
    is_active: props.webhook?.is_active ?? true,
    timeout: props.webhook?.timeout ?? 30,
});

const submit = () => {
    if (isEdit) {
        form.put(admin.webhooks.update.url(props.webhook.id), { onSuccess: () => form.reset() });
    } else {
        form.post(admin.webhooks.store.url(), { onSuccess: () => form.reset() });
    }
};
</script>

<template>
    <Head :title="isEdit ? __('Edit Webhook') : __('Create Webhook')" />

    <AdminLayout>
        <div class="space-y-6">
            <div class="flex items-center gap-3">
                <Link :href="admin.webhooks.index.url()" class="text-primary-600 hover:text-primary-700">
                    <ArrowLeft :size="20" />
                </Link>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    {{ isEdit ? __('Edit Webhook') : __('Create Webhook') }}
                </h1>
            </div>

            <form @submit.prevent="submit" class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Name') }}</label>
                        <input v-model="form.name" type="text" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.name" class="mt-1 text-xs text-red-500">{{ form.errors.name }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('URL') }}</label>
                        <input v-model="form.url" type="url" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.url" class="mt-1 text-xs text-red-500">{{ form.errors.url }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Secret') }}</label>
                        <input v-model="form.secret" type="text" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" placeholder="Optional signing secret" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Timeout') }} (seconds)</label>
                        <input v-model.number="form.timeout" type="number" min="5" max="300" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Events') }}</label>
                    <div class="mt-1 flex flex-wrap gap-2">
                        <label v-for="event in ['course.created', 'course.updated', 'course.deleted', 'enrollment.created', 'enrollment.completed', 'payment.completed', 'certificate.issued']" :key="event" class="flex items-center gap-1 text-sm">
                            <input type="checkbox" v-model="form.events" :value="event" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                            {{ event }}
                        </label>
                    </div>
                    <p v-if="form.errors.events" class="mt-1 text-xs text-red-500">{{ form.errors.events }}</p>
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
                        {{ isEdit ? __('Update Webhook') : __('Create Webhook') }}
                    </button>
                    <Link :href="admin.webhooks.index.url()" class="rounded-xl px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-400">
                        {{ __('Cancel') }}
                    </Link>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>