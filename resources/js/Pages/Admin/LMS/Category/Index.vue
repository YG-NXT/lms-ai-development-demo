<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { CheckCircle, Folder, Pencil, PlusCircle, Search, Trash2, XCircle } from 'lucide-vue-next';
import { PropType, ref, watch } from 'vue';

const props = defineProps({
    categories: Object as PropType<any>,
});

const search = ref('');

watch(
    search,
    debounce((value) => {
        router.get(admin.categories.index.url({ query: { search: value } }), {}, { preserveState: true, replace: true });
    }, 300),
);

// Delete Logic
const showDeleteModal = ref(false);
const categoryToDelete = ref<any>(null);
const processingDelete = ref(false);

const confirmDelete = (category: any) => {
    categoryToDelete.value = category;
    showDeleteModal.value = true;
};

const handleDelete = () => {
    if (!categoryToDelete.value) return;

    processingDelete.value = true;
    router.delete(admin.categories.destroy.url(categoryToDelete.value.id), {
        onSuccess: () => {
            showDeleteModal.value = false;
            categoryToDelete.value = null;
        },
        onFinish: () => {
            processingDelete.value = false;
        },
    });
};
</script>

<template>
    <Head :title="__('Course Categories')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 text-start md:flex-row md:items-center">
                <div class="text-start">
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Course Categories') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Organize your courses into logical groups.') }}</p>
                </div>
                <Link
                    :href="admin.categories.create.url()"
                    class="flex items-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95"
                >
                    <PlusCircle :size="18" class="me-2" /> {{ __('Add New Category') }}
                </Link>
            </div>

            <!-- Table Card -->
            <div class="overflow-hidden rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <!-- Search -->
                <div class="border-b border-slate-100 p-4 dark:border-slate-700">
                    <div class="relative w-full sm:w-64">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search :size="16" class="text-slate-400" />
                        </div>
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="__('Search categories...')"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse text-start">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700/50 dark:bg-slate-800/20">
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Category') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Description') }}
                                </th>
                                <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    {{ __('Status') }}
                                </th>
                                <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 text-start dark:divide-slate-800/50">
                            <tr
                                v-for="category in categories.data"
                                :key="category.id"
                                class="group transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div
                                            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-brand-600 dark:bg-slate-800"
                                        >
                                            <Folder :size="20" />
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ category.name }}</p>
                                            <p class="text-[11px] text-slate-500">{{ category.slug }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="line-clamp-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
                                        {{ category.description || __('No description') }}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <span
                                            v-if="category.is_active"
                                            class="flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-600 uppercase dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        >
                                            <CheckCircle :size="12" /> {{ __('Active') }}
                                        </span>
                                        <span
                                            v-else
                                            class="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:border-slate-700 dark:bg-slate-800"
                                        >
                                            <XCircle :size="12" /> {{ __('Inactive') }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-end">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link
                                            :href="admin.categories.edit.url(category.id)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-800 dark:hover:bg-brand-900/20"
                                        >
                                            <Pencil :size="14" />
                                        </Link>
                                        <button
                                            @click="confirmDelete(category)"
                                            class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-800 dark:hover:bg-rose-900/20"
                                        >
                                            <Trash2 :size="14" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="categories.data.length === 0">
                                <td colspan="4" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center gap-2 text-slate-400">
                                        <Folder :size="48" class="opacity-20" />
                                        <p class="text-sm font-medium">{{ __('No categories found.') }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="categories.links.length > 3" class="flex justify-end border-t border-slate-100 p-6 dark:border-slate-700">
                    <div class="flex space-x-1">
                        <Link
                            v-for="(link, key) in categories.links"
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
                :title="__('Delete Category?')"
                :message="__('Are you sure you want to delete this category? All courses in this category will be affected.')"
                :confirmText="__('Yes, Delete Category')"
                :cancelText="__('No, Cancel')"
                type="danger"
                :processing="processingDelete"
                @close="showDeleteModal = false"
                @confirm="handleDelete"
            />
        </div>
    </AdminLayout>
</template>
