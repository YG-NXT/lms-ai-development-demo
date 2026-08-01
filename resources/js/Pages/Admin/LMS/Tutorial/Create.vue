<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';

defineProps<{
    tutorial?: any;
}>();

const isEdit = !!props.tutorial;

const form = useForm({
    title: props.tutorial?.title ?? '',
    category_id: props.tutorial?.category_id ?? null,
    description: props.tutorial?.description ?? '',
    level: props.tutorial?.level ?? 'beginner',
    language: props.tutorial?.language ?? 'English',
    price: props.tutorial?.price ?? 0,
    discount_price: props.tutorial?.discount_price ?? null,
    is_free: props.tutorial?.is_free ?? false,
    status: props.tutorial?.status ?? 'draft',
    thumbnail: props.tutorial?.thumbnail ?? '',
    has_timeline: props.tutorial?.has_timeline ?? false,
});

const submit = () => {
    if (isEdit) {
        form.put(admin.tutorials.update.url(props.tutorial.id), { onSuccess: () => form.reset() });
    } else {
        form.post(admin.tutorials.store.url(), { onSuccess: () => form.reset() });
    }
};
</script>

<template>
    <Head :title="isEdit ? __('Edit Tutorial') : __('Create Tutorial')" />

    <AdminLayout>
        <div class="space-y-6">
            <div class="flex items-center gap-3">
                <Link :href="admin.tutorials.index.url()" class="text-primary-600 hover:text-primary-700">
                    <ArrowLeft :size="20" />
                </Link>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    {{ isEdit ? __('Edit Tutorial') : __('Create Tutorial') }}
                </h1>
            </div>

            <form @submit.prevent="submit" class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-admin-card-dark">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Title') }}</label>
                        <input v-model="form.title" type="text" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" required />
                        <p v-if="form.errors.title" class="mt-1 text-xs text-red-500">{{ form.errors.title }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Category') }}</label>
                        <input v-model="form.category_id" type="number" min="1" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Level') }}</label>
                        <select v-model="form.level" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Language') }}</label>
                        <input v-model="form.language" type="text" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Status') }}</label>
                        <select v-model="form.status" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Price') }}</label>
                        <input v-model.number="form.price" type="number" step="0.01" min="0" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Discount Price') }}</label>
                        <input v-model.number="form.discount_price" type="number" step="0.01" min="0" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" placeholder="Optional" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">{{ __('Description') }}</label>
                    <textarea v-model="form.description" rows="4" class="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"></textarea>
                </div>

                <div class="flex items-center gap-6">
                    <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <input v-model="form.is_free" type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                        {{ __('Free') }}
                    </label>
                    <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <input v-model="form.has_timeline" type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                        {{ __('Has Timeline') }}
                    </label>
                </div>

                <div class="flex items-center gap-3 pt-4">
                    <button type="submit" :disabled="form.processing" class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-50">
                        <Save :size="16" />
                        {{ isEdit ? __('Update Tutorial') : __('Create Tutorial') }}
                    </button>
                    <Link :href="admin.tutorials.index.url()" class="rounded-xl px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-400">
                        {{ __('Cancel') }}
                    </Link>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>