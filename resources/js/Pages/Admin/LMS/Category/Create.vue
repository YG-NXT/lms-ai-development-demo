<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ChevronLeft, FolderPlus, Info, Save } from 'lucide-vue-next';

const form = useForm({
    name: '',
    description: '',
    icon: '',
    is_active: true,
});

const submit = () => {
    form.post(admin.categories.store.url(), {
        onSuccess: () => {
            // Handled by controller redirect
        },
    });
};
</script>

<template>
    <Head :title="__('Create Category')" />

    <AdminLayout>
        <div class="animate-fade-in mx-auto max-w-4xl space-y-8">
            <!-- Breadcrumbs / Header -->
            <div class="flex flex-col items-start justify-between gap-6 text-start md:flex-row md:items-center">
                <div class="text-start">
                    <div class="mb-2 flex items-center gap-2">
                        <Link :href="admin.categories.index.url()" class="text-slate-400 transition-colors hover:text-brand-600">
                            <ChevronLeft :size="18" />
                        </Link>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('LMS Management') }}</span>
                    </div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Create New Category') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Add a new classification for your courses.') }}</p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <!-- Left: Form -->
                    <div class="space-y-6 lg:col-span-2">
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div class="mb-2 flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/20">
                                    <FolderPlus :size="20" />
                                </div>
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Category Details') }}</h3>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Category Name') }}</label>
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        :placeholder="__('e.g. Web Development')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.name }"
                                    />
                                    <p v-if="form.errors.name" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.name }}</p>
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Description') }}</label>
                                    <textarea
                                        v-model="form.description"
                                        rows="4"
                                        :placeholder="__('Provide a brief overview of this category...')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Settings -->
                    <div class="space-y-6">
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Info :size="16" class="text-brand-600" />
                                {{ __('Visibility') }}
                            </h3>

                            <div
                                class="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50 dark:bg-slate-900/50"
                            >
                                <div class="text-start">
                                    <p class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Published') }}</p>
                                    <p class="text-[10px] text-slate-500">{{ __('Make this category visible to students.') }}</p>
                                </div>
                                <label class="relative inline-flex cursor-pointer items-center">
                                    <input type="checkbox" v-model="form.is_active" class="peer sr-only" />
                                    <div
                                        class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                    ></div>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="group flex w-full items-center justify-center rounded-4xl bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                        >
                            <Save v-if="!form.processing" :size="20" class="me-2 transition-transform group-hover:rotate-12" />
                            <span v-else class="me-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                            {{ __('Save Category') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>
