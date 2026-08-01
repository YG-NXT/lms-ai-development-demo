<script setup lang="ts">
import { index as coInstructorIndex, attach as coInstructorAttach, detach as coInstructorDetach } from '@/actions/App/Http/Controllers/Admin/CoInstructorController';
import Pagination from '@/Components/Pagination.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import debounce from 'lodash/debounce';
import { BookOpen, Search, User, Users } from 'lucide-vue-next';
import { PropType, ref, watch } from 'vue';

const props = defineProps({
    courses: {
        type: Object as PropType<any>,
        default: () => ({ data: [], links: [] }),
    },
    filters: {
        type: Object as PropType<any>,
        default: () => ({ search: '' }),
    },
});

const search = ref(props.filters.search || '');

const handleSearch = debounce(() => {
    router.get(
        coInstructorIndex.url({
            query: { search: search.value },
        }),
        {},
        {
            preserveState: true,
            replace: true,
        },
    );
}, 300);

watch(search, handleSearch);
</script>

<template>
    <Head :title="__('Co-Instructors')" />

    <AdminLayout>
        <div class="h-full">
            <div class="animate-fade-in mx-auto max-w-6xl space-y-6">
                <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <h1 class="flex items-center gap-3 text-xl font-extrabold text-slate-900 dark:text-white">
                            <Users class="text-primary-500" :size="28" />
                            {{ __('Co-Instructors') }}
                        </h1>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {{ __('Manage additional instructors assigned to each course.') }}
                        </p>
                    </div>

                    <div class="group relative w-full md:w-72">
                        <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary-500"
                        >
                            <Search :size="18" />
                        </div>
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="__('Search courses, instructors...')"
                            class="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pr-4 pl-11 font-medium shadow-sm transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-800 dark:bg-slate-900"
                        />
                    </div>
                </div>

                <div class="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="bg-slate-50 dark:bg-slate-800/50">
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ __('Course') }}
                                    </th>
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ __('Primary Instructor') }}
                                    </th>
                                    <th class="px-6 py-4 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ __('Co-Instructors Count') }}
                                    </th>
                                    <th class="px-6 py-4 text-end text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{ __('Actions') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr
                                    v-for="course in courses.data"
                                    :key="course.id"
                                    class="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                                >
                                    <td class="px-6 py-5">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-900/10"
                                            >
                                                <BookOpen :size="18" />
                                            </div>
                                            <span class="text-sm font-bold text-slate-900 dark:text-white">{{ course.title }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-5">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800"
                                            >
                                                <User :size="18" />
                                            </div>
                                            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ course.instructor?.name || 'N/A' }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-5">
                                        <span class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ course.instructors_count }}</span>
                                    </td>
                                    <td class="px-6 py-5 text-end">
                                        <div class="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <a
                                                :href="`/admin/co-instructors/${course.id}`"
                                                class="rounded-xl p-2 text-slate-400 transition-all hover:bg-primary-50 hover:text-primary-500 dark:hover:bg-primary-900/10"
                                                :title="__('Manage Instructors')"
                                            >
                                                <Users :size="18" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="courses.data.length === 0">
                                    <td colspan="4" class="px-6 py-12 text-center text-slate-400">
                                        {{ __('No courses found matching your criteria.') }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="border-t border-slate-100 bg-slate-50/30 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/10">
                        <Pagination :links="courses.links" />
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
