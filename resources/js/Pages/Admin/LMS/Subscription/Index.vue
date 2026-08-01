<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, DollarSign, Layers } from 'lucide-vue-next';

const props = defineProps<{
    plans: Array<{
        id: number;
        name: string;
        slug: string;
        description: string | null;
        monthly_price: string;
        yearly_price: string;
        max_courses: number | null;
        is_active: boolean;
        sort_order: number;
    }>;
}>();

const toggleForm = useForm({});

const togglePlan = (planId: number) => {
    toggleForm.post(`/admin/subscriptions/${planId}/toggle`, {
        preserveScroll: true,
    });
};

const deletePlan = (planId: number) => {
    if (confirm('Are you sure you want to delete this subscription plan? This action cannot be undone.')) {
        toggleForm.delete(`/admin/subscriptions/${planId}`, {
            preserveScroll: true,
        });
    }
};

const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
};
</script>

<template>
    <Head title="Subscription Plans" />

    <AdminLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Manage subscription tiers and pricing for your platform
                    </p>
                </div>
                <Link
                    :href="'/admin/subscriptions/create'"
                    class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                    <Plus :size="18" />
                    New Plan
                </Link>
            </div>

            <!-- Plans Grid -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="plan in plans"
                    :key="plan.id"
                    class="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                    <!-- Active Status Badge -->
                    <div class="absolute top-4 right-4">
                        <button
                            @click="togglePlan(plan.id)"
                            :class="plan.is_active ? 'text-green-600' : 'text-gray-400'"
                            class="transition-colors hover:opacity-80"
                            :title="plan.is_active ? 'Click to deactivate' : 'Click to activate'"
                        >
                            <ToggleRight v-if="plan.is_active" :size="28" />
                            <ToggleLeft v-else :size="28" />
                        </button>
                    </div>

                    <div class="p-6">
                        <!-- Plan Name -->
                        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{{ plan.name }}</h3>
                        
                        <!-- Description -->
                        <p v-if="plan.description" class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            {{ plan.description }}
                        </p>

                        <!-- Pricing -->
                        <div class="mb-4 space-y-2">
                            <div class="flex items-center gap-2">
                                <DollarSign :size="16" class="text-gray-500" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">Monthly:</span>
                                <span class="font-bold text-gray-900 dark:text-white">{{ formatPrice(plan.monthly_price) }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <DollarSign :size="16" class="text-gray-500" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">Yearly:</span>
                                <span class="font-bold text-gray-900 dark:text-white">{{ formatPrice(plan.yearly_price) }}</span>
                            </div>
                        </div>

                        <!-- Max Courses -->
                        <div v-if="plan.max_courses" class="mb-4 flex items-center gap-2">
                            <Layers :size="16" class="text-gray-500" />
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                Max {{ plan.max_courses }} courses
                            </span>
                        </div>

                        <!-- Sort Order -->
                        <div class="mb-4 text-xs text-gray-500 dark:text-gray-500">
                            Display Order: #{{ plan.sort_order }}
                        </div>

                        <!-- Status -->
                        <div class="mb-4">
                            <span
                                :class="plan.is_active 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
                                class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            >
                                {{ plan.is_active ? 'Active' : 'Inactive' }}
                            </span>
                        </div>

                        <!-- Actions -->
                        <div class="flex justify-end gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                            <Link
                                :href="`/admin/subscriptions/${plan.id}/edit`"
                                class="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                title="Edit Plan"
                            >
                                <Edit :size="18" />
                            </Link>
                            <button
                                @click="deletePlan(plan.id)"
                                class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Delete Plan"
                            >
                                <Trash2 :size="18" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="plans.length === 0" class="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
                <DollarSign :size="48" class="mx-auto mb-4 text-gray-400" />
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">No Subscription Plans</h3>
                <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Create your first subscription plan to start monetizing your platform.</p>
                <Link
                    :href="'/admin/subscriptions/create'"
                    class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                    <Plus :size="18" />
                    Create Plan
                </Link>
            </div>
        </div>
    </AdminLayout>
</template>
