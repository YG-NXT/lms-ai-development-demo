<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, BarChart3, Settings } from 'lucide-vue-next';

const props = defineProps<{
    adZones: {
        data: Array<{
            id: number;
            name: string;
            zone_id: string;
            position: string;
            page_type: string;
            ad_type: string;
            is_active: boolean;
            priority: number;
            total_impressions_count: number;
            total_clicks_count: number;
            ctr: number;
        }>;
        current_page: number;
        last_page: number;
    };
    settings: Record<string, any>;
}>();

const toggleForm = useForm({});

const toggleAdZone = (adZoneId: number) => {
    toggleForm.post(`/admin/ads/${adZoneId}/toggle`, {
        preserveScroll: true,
    });
};

const deleteAdZone = (adZoneId: number) => {
    if (confirm('Are you sure you want to delete this ad zone?')) {
        toggleForm.delete(`/admin/ads/${adZoneId}`, {
            preserveScroll: true,
        });
    }
};

const getPositionLabel = (position: string) => {
    const labels: Record<string, string> = {
        header: 'Header',
        sidebar: 'Sidebar',
        footer: 'Footer',
        content: 'Content',
        between_courses: 'Between Courses',
        between_tutorials: 'Between Tutorials',
    };
    return labels[position] || position;
};

const getPageTypeLabel = (pageType: string) => {
    const labels: Record<string, string> = {
        all: 'All Pages',
        home: 'Homepage',
        courses: 'Courses Page',
        tutorials: 'Tutorials Page',
        course_detail: 'Course Detail',
        tutorial_detail: 'Tutorial Detail',
    };
    return labels[pageType] || pageType;
};
</script>

<template>
    <Head title="Ad Management" />

    <AdminLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Ad Management</h1>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Manage TheMoneytizer ad zones and track performance
                    </p>
                </div>
                <div class="flex gap-3">
                    <Link
                        :href="'/admin/ads/analytics'"
                        class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                    >
                        <BarChart3 :size="18" />
                        Analytics
                    </Link>
                    <Link
                        :href="'/admin/ads/create'"
                        class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                    >
                        <Plus :size="18" />
                        New Ad Zone
                    </Link>
                </div>
            </div>

            <!-- Global Settings Card -->
            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="mb-4 flex items-center gap-2">
                    <Settings :size="20" class="text-gray-600 dark:text-gray-400" />
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">Global Settings</h2>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Publisher ID</label>
                        <div class="mt-1 rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-300">
                            {{ settings.publisher_id || 'Not configured' }}
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ads Enabled</label>
                        <div class="mt-1">
                            <span :class="settings.enable_ads ? 'text-green-600' : 'text-red-600'" class="text-sm font-semibold">
                                {{ settings.enable_ads ? 'Yes' : 'No' }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">GDPR Compliance</label>
                        <div class="mt-1">
                            <span :class="settings.gdpr_compliance ? 'text-green-600' : 'text-yellow-600'" class="text-sm font-semibold">
                                {{ settings.gdpr_compliance ? 'Enabled' : 'Disabled' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ad Zones Table -->
            <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Zone ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Position</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Page Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Impressions</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">CTR</th>
                                <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                            <tr v-for="zone in adZones.data" :key="zone.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ zone.name }}</div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="text-sm text-gray-600 dark:text-gray-400">{{ zone.zone_id }}</div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <span class="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {{ getPositionLabel(zone.position) }}
                                    </span>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <span class="inline-flex rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                        {{ getPageTypeLabel(zone.page_type) }}
                                    </span>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button
                                        @click="toggleAdZone(zone.id)"
                                        :class="zone.is_active ? 'text-green-600' : 'text-gray-400'"
                                        class="transition-colors hover:opacity-80"
                                    >
                                        <ToggleRight v-if="zone.is_active" :size="24" />
                                        <ToggleLeft v-else :size="24" />
                                    </button>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ zone.total_impressions_count.toLocaleString() }}</div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="text-sm font-semibold" :class="zone.ctr > 2 ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'">
                                        {{ zone.ctr }}%
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 text-right">
                                    <div class="flex justify-end gap-2">
                                        <Link
                                            :href="`/admin/ads/${zone.id}/edit`"
                                            class="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        >
                                            <Edit :size="18" />
                                        </Link>
                                        <button
                                            @click="deleteAdZone(zone.id)"
                                            class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 :size="18" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="adZones.last_page > 1" class="flex justify-center">
                <nav class="flex gap-2">
                    <Link
                        v-for="page in adZones.last_page"
                        :key="page"
                        :href="`/admin/ads?page=${page}`"
                        :class="[
                            'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                            page === adZones.current_page
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
                        ]"
                    >
                        {{ page }}
                    </Link>
                </nav>
            </div>
        </div>
    </AdminLayout>
</template>
