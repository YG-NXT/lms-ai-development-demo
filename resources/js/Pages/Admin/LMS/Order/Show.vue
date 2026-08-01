<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { AlertCircle, BookOpen, ChevronLeft, CreditCard, Printer, RefreshCw } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    order: any;
}>();

const refundForm = useForm({
    reason: '',
});

const showRefundModal = ref(false);

const processRefund = () => {
    refundForm.post(admin.orders.refund({ order: props.order.id }).url, {
        onSuccess: () => {
            showRefundModal.value = false;
            refundForm.reset();
        },
    });
};

const printInvoice = () => {
    window.print();
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'pending':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'cancelled':
            return 'bg-slate-100 text-slate-700 border-slate-200';
        case 'refunded':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-slate-100 text-slate-700 border-slate-200';
    }
};
</script>

<template>
    <Head title="Order Details" />

    <AdminLayout>
        <div class="no-print mb-6 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <Link
                    :href="admin.orders.index().url"
                    class="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition-all hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-brand-400"
                >
                    <ChevronLeft class="h-5 w-5" />
                </Link>
                <div>
                    <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Order #{{ order.order_number }}</h2>
                    <div class="mt-0.5 flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                        <span>Placed on {{ new Date(order.created_at).toLocaleDateString() }}</span>
                        <span>•</span>
                        <span
                            :class="order.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'"
                            >{{ order.status }}</span
                        >
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <a
                    :href="admin.orders.invoice({ order: order.id }).url"
                    target="_blank"
                    class="flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 transition-all hover:bg-brand-100 dark:border-brand-900 dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30"
                >
                    <Printer class="h-4 w-4" />
                    Download Invoice
                </a>
            </div>
        </div>

        <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <!-- Main Order Details -->
                <div class="space-y-6 lg:col-span-2">
                    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="border-b border-slate-100 p-5 font-bold text-slate-900 dark:border-slate-700 dark:text-white">Order Items</div>
                        <div class="space-y-6 p-5">
                            <div class="flex gap-4">
                                <!-- Image Fix: Handle both external and local storage URLs -->
                                <img
                                    :src="order.course.thumbnail?.startsWith('http') ? order.course.thumbnail : '/storage/' + order.course.thumbnail"
                                    class="h-16 w-16 rounded-xl border border-slate-100 object-cover dark:border-slate-700"
                                    alt=""
                                    @error="($event.target as HTMLImageElement).src = '/images/placeholder.jpg'"
                                />
                                <div class="flex-1">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <h4 class="text-base leading-tight font-bold text-slate-900 dark:text-white">{{ order.course.title }}</h4>
                                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ order.course.category?.name }}</p>
                                        </div>
                                        <div class="text-right">
                                            <div class="font-bold text-slate-900 dark:text-white">${{ order.amount }}</div>
                                            <div class="text-xs text-slate-400 dark:text-slate-500">Qty: 1</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium text-slate-500 dark:text-slate-400">Subtotal</span>
                                <span class="font-bold text-slate-900 dark:text-white">${{ order.amount }}</span>
                            </div>
                            <!-- Dynamic Discount Calculation -->
                            <div class="flex justify-between text-sm" v-if="parseFloat(String(order.discount_amount)) > 0">
                                <span class="font-medium text-slate-500 dark:text-slate-400">Discount</span>
                                <span class="font-bold text-emerald-600 dark:text-emerald-400">-${{ order.discount_amount }}</span>
                            </div>
                            <div class="flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                                <span class="text-xs font-bold tracking-widest text-slate-900 uppercase dark:text-white">Grand Total</span>
                                <span class="text-xl font-black text-brand-600 dark:text-brand-400">${{ order.total_amount }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Details -->
                    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div
                            class="flex items-center justify-between border-b border-slate-100 p-5 font-bold text-slate-900 dark:border-slate-700 dark:text-white"
                        >
                            Payment Activity
                            <span
                                class="dark:border-opacity-20 inline-flex rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase"
                                :class="getStatusColor(order.status)"
                            >
                                {{ order.status }}
                            </span>
                        </div>
                        <div class="divide-y divide-slate-100 dark:divide-slate-700">
                            <div v-for="payment in order.payments" :key="payment.id" class="flex items-center justify-between p-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-700 dark:text-slate-300"
                                    >
                                        <CreditCard class="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div class="text-sm font-bold text-slate-900 dark:text-white">{{ payment.payment_method }} Payment</div>
                                        <div class="text-xs font-medium text-slate-400 dark:text-slate-500">
                                            Transaction: {{ payment.transaction_id }}
                                        </div>
                                        <div class="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                                            {{ new Date(payment.created_at).toLocaleString() }}
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-sm font-black text-slate-900 dark:text-white">${{ payment.amount }}</div>
                                    <div class="text-[10px] font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">Success</div>
                                </div>
                            </div>
                            <div v-if="order.payments.length === 0" class="p-8 text-center text-sm text-slate-400 italic dark:text-slate-500">
                                No payment records found for this order.
                            </div>
                        </div>
                    </div>

                    <!-- Refund Section -->
                    <div
                        v-if="order.refund"
                        class="overflow-hidden rounded-2xl border border-red-100 bg-red-50 shadow-sm shadow-red-100/50 dark:border-red-900/30 dark:bg-red-900/10"
                    >
                        <div
                            class="flex items-center gap-2 border-b border-red-100 p-5 font-bold text-red-900 dark:border-red-900/30 dark:text-red-400"
                        >
                            <RefreshCw class="h-4 w-4" />
                            Refund Information
                        </div>
                        <div class="space-y-4 p-5">
                            <div class="flex items-start justify-between">
                                <div>
                                    <div class="text-sm font-bold text-red-900 dark:text-red-400">Refund Processed</div>
                                    <div class="text-xs font-medium text-red-600 dark:text-red-500">By: {{ order.refund.user.name }}</div>
                                    <div class="mt-0.5 text-[10px] text-red-400 dark:text-red-500/70">
                                        {{ new Date(order.refund.created_at).toLocaleString() }}
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-black text-red-700 dark:text-red-400">-${{ order.refund.amount }}</div>
                                </div>
                            </div>
                            <div
                                class="rounded-lg border border-red-100 bg-white/50 p-3 text-xs text-red-800 italic dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-300"
                            >
                                Reason: {{ order.refund.reason || 'No reason provided' }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Details -->
                <div class="no-print space-y-6">
                    <!-- Customer Summary -->
                    <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h3 class="text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">Customer</h3>
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                            >
                                {{ order.user.name.charAt(0) }}
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 dark:text-white">{{ order.user.name }}</div>
                                <div class="text-xs text-slate-500 dark:text-slate-400">{{ order.user.email }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Course Summary -->
                    <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h3 class="text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">Product</h3>
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                            >
                                <BookOpen class="h-4 w-4" />
                            </div>
                            <div class="line-clamp-2 text-sm leading-tight font-bold text-slate-900 dark:text-white">{{ order.course.title }}</div>
                        </div>
                    </div>

                    <!-- Danger Zone / Refund Action -->
                    <div
                        v-if="order.status === 'completed' && !order.refund"
                        class="no-print space-y-4 rounded-2xl border border-red-200 bg-white p-5 shadow-sm dark:border-red-900/30 dark:bg-slate-800"
                    >
                        <h3 class="flex items-center gap-1 text-[10px] font-bold tracking-widest text-red-600 uppercase dark:text-red-400">
                            <AlertCircle class="h-3 w-3" />
                            Danger Zone
                        </h3>
                        <p class="border-l-2 border-red-500 pl-2 text-[10px] leading-relaxed font-bold text-slate-500 italic dark:text-slate-400">
                            Once a refund is processed, it will revoke student access to the course content immediately.
                        </p>
                        <button
                            @click="showRefundModal = true"
                            class="w-full rounded-xl border border-red-100 bg-red-50 py-2.5 text-xs font-bold text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-white"
                        >
                            Issue Full Refund
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Refund Confirmation Modal -->
        <div v-if="showRefundModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div
                class="animate-in fade-in zoom-in w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl duration-300 dark:border-slate-700 dark:bg-slate-800"
            >
                <div class="space-y-4 p-8 text-center">
                    <div
                        class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    >
                        <RefreshCw class="h-8 w-8" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900 italic dark:text-white">Confirm Refund</h3>
                        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Are you sure you want to refund this order? This action will revoke student access immediately and cannot be undone.
                        </p>
                    </div>

                    <div class="mt-6 space-y-2 text-left">
                        <label class="pl-1 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">Reason for Refund</label>
                        <textarea
                            v-model="refundForm.reason"
                            rows="3"
                            placeholder="e.g. Student requested cancellation"
                            class="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm transition-all focus:ring-2 focus:ring-brand-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                        ></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-3 pt-4">
                        <button
                            @click="showRefundModal = false"
                            class="rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            @click="processRefund"
                            :disabled="refundForm.processing"
                            class="rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 disabled:opacity-50 dark:shadow-none"
                        >
                            {{ refundForm.processing ? 'Processing...' : 'Confirm Refund' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style>
@media print {
    .no-print {
        display: none !important;
    }
}
</style>
