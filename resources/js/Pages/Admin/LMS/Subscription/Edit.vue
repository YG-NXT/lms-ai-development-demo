<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';

const props = defineProps<{
    plan: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        monthly_price: string;
        yearly_price: string;
        max_courses: number | null;
        is_active: boolean;
        sort_order: number;
    };
}>();

const form = useForm({
    name: props.plan.name,
    description: props.plan.description || '',
    monthly_price: parseFloat(props.plan.monthly_price),
    yearly_price: parseFloat(props.plan.yearly_price),
    max_courses: props.plan.max_courses,
    is_active: props.plan.is_active,
    sort_order: props.plan.sort_order,
});

const submit = () => {
    form.put(`/admin/subscriptions/${props.plan.id}`);
};
</script>

<template>
    <Head title="Edit Subscription Plan" />

    <AdminLayout>
        <div class="mx-auto max-w-3xl space-y-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link href="/admin/subscriptions" class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <ArrowLeft :size="20" />
                </Link>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Edit Subscription Plan</h1>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Update subscription plan details</p>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submit" class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="space-y-6">
                    <!-- Plan Name -->
                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Plan Name *</label>
                        <input
                            v-model="form.name"
                            type="text"
                            required
                            placeholder="e.g., Pro, Premium, Enterprise"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <p v-if="form.errors.name" class="mt-1 text-sm text-red-600">{{ form.errors.name }}</p>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            v-model="form.description"
                            rows="3"
                            placeholder="Brief description of what this plan includes..."
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                        <p v-if="form.errors.description" class="mt-1 text-sm text-red-600">{{ form.errors.description }}</p>
                    </div>

                    <!-- Pricing -->
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Price ($) *</label>
                            <input
                                v-model="form.monthly_price"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <p v-if="form.errors.monthly_price" class="mt-1 text-sm text-red-600">{{ form.errors.monthly_price }}</p>
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Yearly Price ($) *</label>
                            <input
                                v-model="form.yearly_price"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <p v-if="form.errors.yearly_price" class="mt-1 text-sm text-red-600">{{ form.errors.yearly_price }}</p>
                        </div>
                    </div>

                    <!-- Max Courses -->
                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Max Courses (Optional)</label>
                        <input
                            v-model="form.max_courses"
                            type="number"
                            min="0"
                            placeholder="Leave empty for unlimited courses"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Set limit on number of courses users can enroll in</p>
                        <p v-if="form.errors.max_courses" class="mt-1 text-sm text-red-600">{{ form.errors.max_courses }}</p>
                    </div>

                    <!-- Sort Order -->
                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
                        <input
                            v-model="form.sort_order"
                            type="number"
                            min="0"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Lower numbers appear first (0 = highest priority)</p>
                        <p v-if="form.errors.sort_order" class="mt-1 text-sm text-red-600">{{ form.errors.sort_order }}</p>
                    </div>

                    <!-- Active Status Toggle -->
                    <div class="flex items-center gap-3">
                        <button
                            type="button"
                            @click="form.is_active = !form.is_active"
                            :class="form.is_active ? 'bg-green-600' : 'bg-gray-300'"
                            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        >
                            <span
                                :class="form.is_active ? 'translate-x-6' : 'translate-x-1'"
                                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                            ></span>
                        </button>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ form.is_active ? 'Active - Visible to users' : 'Inactive - Hidden from users' }}
                        </span>
                    </div>
                </div>

                <!-- Actions -->
                <div class="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <Link
                        href="/admin/subscriptions"
                        class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                    >
                        <Save :size="18" />
                        {{ form.processing ? 'Saving...' : 'Save Changes' }}
                    </button>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>
