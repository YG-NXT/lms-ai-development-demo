<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, BadgeCheck, CheckCircle2, CreditCard, Landmark, ShieldCheck, Sparkles, Wallet } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    plan: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        monthly_price: string;
        yearly_price: string;
        max_courses: number | null;
    };
    paymentMethods: Array<{
        id: string;
        name: string;
        icon: string;
    }>;
}>();

const billingCycle = ref<'monthly' | 'yearly'>('monthly');
const form = useForm({
    billing_cycle: billingCycle.value,
    payment_method: props.paymentMethods[0]?.id || 'stripe',
});

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'CreditCard':
            return CreditCard;
        case 'Bank':
            return Landmark;
        case 'Wallet':
            return Wallet;
        default:
            return CreditCard;
    }
};

const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
};

const getCurrentPrice = () => {
    return billingCycle.value === 'yearly' 
        ? parseFloat(props.plan.yearly_price)
        : parseFloat(props.plan.monthly_price);
};

const calculateSavings = () => {
    const monthlyTotal = parseFloat(props.plan.monthly_price) * 12;
    const yearlyPrice = parseFloat(props.plan.yearly_price);
    const savings = monthlyTotal - yearlyPrice;
    return savings > 0 ? savings : 0;
};

const submit = async () => {
    form.billing_cycle = billingCycle.value;
    
    try {
        const response = await fetch(`/student/subscriptions/${props.plan.slug}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                billing_cycle: billingCycle.value,
                payment_method: form.payment_method,
            }),
        });

        const data = await response.json();

        if (data.success && data.redirect_url) {
            window.location.href = data.redirect_url;
        } else {
            alert(data.message || 'Payment processing failed. Please try again.');
        }
    } catch (error) {
        console.error('Purchase error:', error);
        alert('An error occurred. Please try again.');
    }
};
</script>

<template>
    <Head title="Subscribe" />

    <StudentLayout>
        <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <!-- Breadcrumb -->
            <div class="mb-6 flex items-center gap-2 text-sm text-slate-500">
                <Link href="/student/subscriptions" class="transition-colors hover:text-brand-600">
                    <ArrowLeft :size="16" />
                </Link>
                <Link href="/student/subscriptions" class="transition-colors hover:text-brand-600">Subscription Plans</Link>
                <span>/</span>
                <span class="font-medium text-slate-900">{{ plan.name }}</span>
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <!-- Plan Details -->
                <div class="space-y-6 lg:col-span-2">
                    <!-- Plan Header -->
                    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-8 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                        <div class="flex items-start justify-between">
                            <div>
                                <h1 class="text-3xl font-black text-slate-900 dark:text-white">{{ plan.name }}</h1>
                                <p v-if="plan.description" class="mt-2 text-slate-600 dark:text-slate-400">{{ plan.description }}</p>
                            </div>
                            <Sparkles :size="32" class="text-brand-600" />
                        </div>

                        <!-- Billing Cycle Toggle -->
                        <div class="mt-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800">
                            <button
                                @click="billingCycle = 'monthly'"
                                :class="billingCycle === 'monthly' ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'"
                                class="flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-all"
                            >
                                Monthly
                            </button>
                            <button
                                @click="billingCycle = 'yearly'"
                                :class="billingCycle === 'yearly' ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'"
                                class="flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-all"
                            >
                                Yearly
                                <span v-if="calculateSavings() > 0" class="ml-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
                                    Save ${{ calculateSavings().toFixed(0) }}
                                </span>
                            </button>
                        </div>

                        <!-- Price Display -->
                        <div class="mt-6">
                            <div class="flex items-baseline gap-2">
                                <span class="text-5xl font-black text-brand-600">{{ formatPrice(billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price) }}</span>
                                <span class="text-slate-500">/{{ billingCycle === 'yearly' ? 'year' : 'month' }}</span>
                            </div>
                            <p v-if="billingCycle === 'yearly' && calculateSavings() > 0" class="mt-2 text-sm text-emerald-600">
                                You save ${{ calculateSavings().toFixed(2) }} per year compared to monthly billing
                            </p>
                        </div>
                    </div>

                    <!-- Payment Method Selection -->
                    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                        <div class="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                                <ShieldCheck class="h-5 w-5 text-brand-600" />
                                Select Payment Method
                            </h3>
                        </div>
                        <div class="space-y-4 p-6">
                            <div
                                v-for="method in paymentMethods"
                                :key="method.id"
                                @click="form.payment_method = method.id"
                                class="group relative flex cursor-pointer items-center rounded-xl border-2 p-4 transition-all"
                                :class="
                                    form.payment_method === method.id
                                        ? 'border-brand-600 bg-brand-50/30 dark:bg-brand-900/20'
                                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600'
                                "
                            >
                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-lg"
                                    :class="
                                        form.payment_method === method.id
                                            ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/40'
                                            : 'bg-white text-slate-400 group-hover:text-slate-600 dark:bg-slate-700'
                                    "
                                >
                                    <component :is="getIcon(method.icon)" class="h-6 w-6" />
                                </div>
                                <div class="ml-4 flex-1">
                                    <div class="pb-0.5 font-bold" :class="form.payment_method === method.id ? 'text-brand-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'">
                                        {{ method.name }}
                                    </div>
                                    <div class="text-xs text-slate-500 dark:text-slate-400">Secure and encrypted payment processing</div>
                                </div>
                                <div
                                    class="flex h-6 w-6 items-center justify-center rounded-full border-2"
                                    :class="form.payment_method === method.id ? 'border-brand-600 bg-brand-600' : 'border-slate-200 dark:border-slate-600'"
                                >
                                    <div v-if="form.payment_method === method.id" class="h-2 w-2 rounded-full bg-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Features List -->
                    <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                        <h3 class="mb-4 text-lg font-bold text-slate-900 dark:text-white">What's Included</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3">
                                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span class="text-slate-700 dark:text-slate-300">Access to all courses in the platform</span>
                            </li>
                            <li v-if="plan.max_courses" class="flex items-start gap-3">
                                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span class="text-slate-700 dark:text-slate-300">Up to {{ plan.max_courses }} course enrollments</span>
                            </li>
                            <li v-else class="flex items-start gap-3">
                                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span class="text-slate-700 dark:text-slate-300">Unlimited course enrollments</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span class="text-slate-700 dark:text-slate-300">Certificate of completion for each course</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span class="text-slate-700 dark:text-slate-300">Priority support</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span class="text-slate-700 dark:text-slate-300">Cancel anytime</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="lg:col-span-1">
                    <div class="sticky top-4 space-y-6">
                        <!-- Summary Card -->
                        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                            <div class="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-800">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Order Summary</h3>
                            </div>
                            <div class="space-y-4 p-6">
                                <div class="flex justify-between text-sm">
                                    <span class="text-slate-600 dark:text-slate-400">{{ plan.name }} Plan</span>
                                    <span class="font-bold text-slate-900 dark:text-white">{{ formatPrice(billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price) }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-slate-600 dark:text-slate-400">Billing Cycle</span>
                                    <span class="font-bold capitalize text-slate-900 dark:text-white">{{ billingCycle }}</span>
                                </div>
                                <div v-if="billingCycle === 'yearly' && calculateSavings() > 0" class="flex justify-between text-sm">
                                    <span class="text-emerald-600">Yearly Savings</span>
                                    <span class="font-bold text-emerald-600">-${{ formatPrice(calculateSavings().toString()) }}</span>
                                </div>
                                <div class="border-t border-slate-200 pt-4 dark:border-slate-700">
                                    <div class="flex justify-between">
                                        <span class="text-base font-bold text-slate-900 dark:text-white">Total Today</span>
                                        <span class="text-2xl font-black text-brand-600">{{ formatPrice(getCurrentPrice().toString()) }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="border-t border-slate-100 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-800">
                                <button
                                    @click="submit"
                                    :disabled="form.processing"
                                    class="w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-100 transition-all hover:bg-brand-700 disabled:opacity-50"
                                >
                                    <span v-if="!form.processing">Complete Subscription</span>
                                    <span v-else>Processing...</span>
                                </button>
                                <p class="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                                    Secure payment powered by {{ paymentMethods.find(m => m.id === form.payment_method)?.name || 'Stripe' }}
                                </p>
                            </div>
                        </div>

                        <!-- Trust Badges -->
                        <div class="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
                            <div class="mb-3 flex justify-center gap-4 text-slate-400">
                                <ShieldCheck :size="24" />
                                <BadgeCheck :size="24" />
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                🔒 SSL Secured Payment<br />
                                ✓ Money-back guarantee<br />
                                ✕ Cancel anytime
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>
