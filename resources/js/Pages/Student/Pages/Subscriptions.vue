<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, BadgeCheck, ChevronRight, Sparkles } from 'lucide-vue-next';

defineProps<{
    plans: Array<{
        id: number;
        name: string;
        slug: string;
        description: string | null;
        monthly_price: string;
        yearly_price: string;
        max_courses: number | null;
        is_active: boolean;
    }>;
    currentPlan?: {
        id: number;
        name: string;
        subscription_ends_at: string | null;
    } | null;
}>();

const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
};

const calculateSavings = (monthly: string, yearly: string) => {
    const monthlyTotal = parseFloat(monthly) * 12;
    const yearlyPrice = parseFloat(yearly);
    const savings = monthlyTotal - yearlyPrice;
    return savings > 0 ? savings : 0;
};
</script>

<template>
    <Head title="Subscription Plans" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Subscription Plans</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">Unlock all courses with a subscription.</p>
                </div>
                <Link
                    :href="student.dashboard.url()"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white"
                >
                    <ChevronRight :size="18" />
                    Back to Dashboard
                </Link>
            </div>

            <!-- Current Subscription Status -->
            <div v-if="currentPlan" class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                            ✅ Currently subscribed to: {{ currentPlan.name }}
                        </span>
                        <p v-if="currentPlan.subscription_ends_at" class="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                            Expires: {{ new Date(currentPlan.subscription_ends_at).toLocaleDateString() }}
                        </p>
                    </div>
                    <form action="/student/subscriptions/cancel" method="POST" class="inline">
                        <input type="hidden" name="_token" :value="$page.props.csrf" />
                        <button
                            type="submit"
                            class="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                        >
                            Cancel Subscription
                        </button>
                    </form>
                </div>
            </div>

            <!-- Plans Grid -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div
                    v-for="plan in plans"
                    :key="plan.id"
                    class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800"
                >
                    <!-- Popular Badge -->
                    <div v-if="plan.name.toLowerCase().includes('pro')" class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-bold text-white">
                        Most Popular
                    </div>

                    <!-- Plan Header -->
                    <div class="mb-4">
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ plan.name }}</h3>
                        <p v-if="plan.description" class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ plan.description }}</p>
                    </div>

                    <!-- Pricing -->
                    <div class="mb-6 space-y-3">
                        <!-- Monthly Price -->
                        <div class="rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
                            <div class="text-xs text-slate-500 dark:text-slate-400">Monthly</div>
                            <div class="text-2xl font-black text-slate-900 dark:text-white">{{ formatPrice(plan.monthly_price) }}<span class="text-sm font-normal text-slate-500">/mo</span></div>
                        </div>

                        <!-- Yearly Price -->
                        <div class="rounded-lg bg-gradient-to-r from-brand-50 to-white p-3 dark:from-brand-900/20 dark:to-slate-700">
                            <div class="flex items-center justify-between">
                                <div class="text-xs text-slate-500 dark:text-slate-400">Yearly</div>
                                <span v-if="calculateSavings(plan.monthly_price, plan.yearly_price) > 0" class="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                                    Save ${{ calculateSavings(plan.monthly_price, plan.yearly_price).toFixed(0) }}
                                </span>
                            </div>
                            <div class="text-2xl font-black text-brand-600">{{ formatPrice(plan.yearly_price) }}<span class="text-sm font-normal text-slate-500">/yr</span></div>
                        </div>
                    </div>

                    <!-- Features -->
                    <ul class="mb-6 space-y-2 text-sm">
                        <li class="flex items-start gap-2">
                            <BadgeCheck :size="16" class="mt-0.5 flex-shrink-0 text-emerald-600" />
                            <span class="text-slate-700 dark:text-slate-300">Access to all courses</span>
                        </li>
                        <li v-if="plan.max_courses" class="flex items-start gap-2">
                            <BadgeCheck :size="16" class="mt-0.5 flex-shrink-0 text-emerald-600" />
                            <span class="text-slate-700 dark:text-slate-300">Up to {{ plan.max_courses }} enrollments</span>
                        </li>
                        <li v-else class="flex items-start gap-2">
                            <BadgeCheck :size="16" class="mt-0.5 flex-shrink-0 text-emerald-600" />
                            <span class="text-slate-700 dark:text-slate-300">Unlimited enrollments</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <BadgeCheck :size="16" class="mt-0.5 flex-shrink-0 text-emerald-600" />
                            <span class="text-slate-700 dark:text-slate-300">Certificates included</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <BadgeCheck :size="16" class="mt-0.5 flex-shrink-0 text-emerald-600" />
                            <span class="text-slate-700 dark:text-slate-300">Priority support</span>
                        </li>
                    </ul>

                    <!-- CTA Button -->
                    <Link
                        :href="`/student/subscriptions/${plan.slug}/checkout`"
                        class="block w-full rounded-xl bg-brand-600 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-brand-100 transition-all hover:bg-brand-700"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="plans.length === 0" class="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-800">
                <Sparkles :size="48" class="mx-auto mb-4 text-slate-400" />
                <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">No Plans Available</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">Check back later for subscription options.</p>
            </div>
        </div>
    </StudentLayout>
</template>
