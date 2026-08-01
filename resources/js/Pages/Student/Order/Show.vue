<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { CheckCircle2, ChevronLeft, Clock, CreditCard, Printer } from 'lucide-vue-next';

const props = defineProps<{
    order: any;
}>();

const printInvoice = () => {
    window.print();
};
</script>

<template>
    <Head title="Order Details" />

    <StudentLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link
                        :href="student.orders.index().url"
                        class="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition-all hover:text-brand-600"
                    >
                        <ChevronLeft class="h-5 w-5" />
                    </Link>
                    <div>
                        <h2 class="text-2xl font-bold tracking-tight text-slate-900">Order #{{ order.order_number }}</h2>
                        <div class="mt-0.5 flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 uppercase">
                            <span>Placed on {{ new Date(order.created_at).toLocaleDateString() }}</span>
                            <span>•</span>
                            <span :class="order.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'">{{ order.status }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button
                        @click="printInvoice"
                        class="no-print hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 sm:flex"
                    >
                        <Printer class="h-4 w-4" />
                        Print Receipt
                    </button>
                    <Link
                        v-if="order.status === 'completed'"
                        :href="student.courses.show({ course: order.course.slug }).url"
                        class="no-print flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-brand-100 transition-all hover:bg-brand-700"
                    >
                        Start Learning
                        <ChevronLeft class="h-4 w-4 rotate-180" />
                    </Link>
                </div>
            </div>
        </template>

        <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div
                class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 print:border-none print:shadow-none"
            >
                <!-- Receipt Header -->
                <div class="border-b border-slate-100 bg-slate-50/50 p-8 sm:p-12">
                    <div class="flex flex-col justify-between gap-8 sm:flex-row">
                        <div class="space-y-4">
                            <div class="text-3xl font-black text-brand-600">LMS</div>
                            <div class="space-y-1 text-sm text-slate-500">
                                <p class="font-bold text-slate-900">Billed To:</p>
                                <p>{{ order.user.name }}</p>
                                <p>{{ order.user.email }}</p>
                            </div>
                        </div>
                        <div class="space-y-4 sm:text-right">
                            <div
                                class="inline-flex rounded-lg border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-sm font-black tracking-widest text-emerald-700 uppercase"
                            >
                                {{ order.status }}
                            </div>
                            <div class="space-y-1 text-sm text-slate-500">
                                <p class="font-bold text-slate-900">Receipt Details:</p>
                                <p>No: {{ order.order_number }}</p>
                                <p>Date: {{ new Date(order.created_at).toLocaleDateString() }}</p>
                                <p>Method: {{ order.payment_method }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Items -->
                <div class="p-8 sm:p-12">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-slate-100 text-left">
                                <th class="pb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">Description</th>
                                <th class="pb-4 text-right text-xs font-bold tracking-widest text-slate-400 uppercase">Price</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr>
                                <td class="py-8">
                                    <div class="flex gap-4">
                                        <div class="hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:block">
                                            <img
                                                :src="
                                                    order.course.thumbnail?.startsWith('http')
                                                        ? order.course.thumbnail
                                                        : '/storage/' + order.course.thumbnail
                                                "
                                                class="h-full w-full object-cover"
                                                alt=""
                                                @error="($event.target as HTMLImageElement).src = '/images/placeholder.jpg'"
                                            />
                                        </div>
                                        <div>
                                            <p class="text-lg leading-tight font-bold text-slate-900">{{ order.course.title }}</p>
                                            <p class="mt-1 text-sm tracking-tight text-slate-500 uppercase">{{ order.course.category?.name }}</p>
                                            <div class="mt-2 flex items-center gap-2 text-xs font-bold text-brand-600">
                                                <CheckCircle2 class="h-3.5 w-3.5" />
                                                Lifetime Access
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-8 text-right text-lg font-black text-slate-900">${{ order.amount }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Totals -->
                    <div class="mt-8 ml-auto max-w-xs space-y-4 border-t border-slate-100 pt-8">
                        <div class="flex justify-between text-sm">
                            <span class="font-medium text-slate-500">Subtotal</span>
                            <span class="font-bold text-slate-900">${{ order.amount }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="font-medium text-slate-500">Discount</span>
                            <span class="font-bold text-emerald-600">-$0.00</span>
                        </div>
                        <div class="flex items-center justify-between border-t border-slate-200 pt-4">
                            <span class="text-xl font-bold text-slate-900 italic underline decoration-brand-500/30">Total Paid</span>
                            <span class="text-3xl font-black text-brand-600">${{ order.total_amount }}</span>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="no-print space-y-2 bg-slate-50/50 p-8 text-center sm:p-12">
                    <p class="text-sm font-bold text-slate-900 italic">Thank you for investing in your future!</p>
                    <p class="text-xs text-slate-400">If you have any questions regarding this purchase, please contact our support team.</p>
                </div>
            </div>

            <!-- Payment Timeline (Optional Visual) -->
            <div class="no-print mt-8 space-y-4">
                <h3 class="flex items-center gap-2 px-2 font-bold text-slate-900">
                    <Clock class="h-4 w-4 text-brand-500" />
                    Transaction History
                </h3>
                <div class="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
                    <div v-for="payment in order.payments" :key="payment.id" class="flex items-center justify-between p-4">
                        <div class="flex items-center gap-3">
                            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <CreditCard class="h-4 w-4" />
                            </div>
                            <div>
                                <div class="text-xs font-bold text-slate-900">Payment via {{ payment.payment_method }}</div>
                                <div class="text-[10px] font-medium text-slate-400">TXN: {{ payment.transaction_id }}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-xs font-black text-slate-900">${{ payment.amount }}</div>
                            <div class="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">Successful</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>

<style>
@media print {
    .no-print {
        display: none !important;
    }
    body {
        background-color: white !important;
    }
}
</style>
