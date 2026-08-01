<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { Calendar, CheckCircle, Clock, Eye, Landmark, Package, RefreshCw, Search, XCircle } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    orders: any;
    filters: any;
}>();

const search = ref(props.filters.search);
const status = ref(props.filters.status);
const payment_method = ref(props.filters.payment_method);
const date_from = ref(props.filters.date_from);
const date_to = ref(props.filters.date_to);

watch(
    [search, status, payment_method, date_from, date_to],
    debounce(() => {
        router.get(
            admin.orders.index().url,
            {
                search: search.value,
                status: status.value,
                payment_method: payment_method.value,
                date_from: date_from.value,
                date_to: date_to.value,
            },
            { preserveState: true, replace: true },
        );
    }, 500),
);

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

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return CheckCircle;
        case 'pending':
            return Clock;
        case 'cancelled':
            return XCircle;
        case 'refunded':
            return RefreshCw;
        default:
            return Clock;
    }
};

const clearFilters = () => {
    search.value = '';
    status.value = undefined;
    payment_method.value = undefined;
    date_from.value = '';
    date_to.value = '';
};
</script>

<template>
    <Head title="Orders Management" />

    <AdminLayout>
        <template #header>
            <h2 class="text-left text-2xl font-bold tracking-tight text-slate-900">Orders Management</h2>
            <p class="mt-1 text-left text-sm text-slate-500">Monitor and manage all system transactions and enrollments.</p>
        </template>

        <div class="space-y-6">
            <!-- Advanced Filters -->
            <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
                    <div class="relative w-full lg:w-96">
                        <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Search by order#, customer, or course..."
                            class="w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                        />
                    </div>
                    <div class="flex w-full flex-wrap items-center gap-2 lg:w-auto">
                        <select
                            v-model="status"
                            class="min-w-[140px] rounded-xl border-slate-200 bg-slate-50 py-2.5 pr-10 pl-4 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                        >
                            <option :value="undefined">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                        </select>

                        <select
                            v-model="payment_method"
                            class="min-w-[140px] rounded-xl border-slate-200 bg-slate-50 py-2.5 pr-10 pl-4 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                        >
                            <option :value="undefined">All Methods</option>
                            <option value="stripe">Stripe</option>
                            <option value="paypal">PayPal</option>
                            <option value="bkash">bKash</option>
                            <option value="local">Local/Bank</option>
                        </select>

                        <button
                            @click="clearFilters"
                            class="px-2 text-xs font-bold tracking-wider text-slate-400 uppercase transition-colors hover:text-brand-600"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-4 border-t border-slate-50 pt-4 sm:flex-row">
                    <div class="flex w-full items-center gap-2 sm:w-auto">
                        <span class="text-xs font-bold tracking-tighter text-slate-500 uppercase">From:</span>
                        <div class="relative w-full">
                            <Calendar class="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                                v-model="date_from"
                                type="date"
                                class="w-full rounded-xl border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                    <div class="flex w-full items-center gap-2 sm:w-auto">
                        <span class="text-xs font-bold tracking-tighter text-slate-500 uppercase">To:</span>
                        <div class="relative w-full">
                            <Calendar class="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                                v-model="date_to"
                                type="date"
                                class="w-full rounded-xl border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse text-left">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                <th class="px-6 py-4">Order</th>
                                <th class="px-6 py-4">Customer</th>
                                <th class="px-6 py-4">Course</th>
                                <th class="px-6 py-4">Amount</th>
                                <th class="px-6 py-4">Method</th>
                                <th class="px-6 py-4">Status</th>
                                <th class="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="order in orders.data" :key="order.id" class="group transition-colors hover:bg-slate-50/40">
                                <td class="px-6 py-4">
                                    <div class="text-left font-bold text-slate-900">#{{ order.order_number }}</div>
                                    <div class="mt-0.5 text-left text-[10px] font-medium text-slate-400">
                                        {{ new Date(order.created_at).toLocaleDateString() }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-slate-100 text-xs font-bold text-slate-500 shadow-sm"
                                        >
                                            {{ order.user.name.charAt(0) }}
                                        </div>
                                        <div class="text-left">
                                            <div class="text-sm leading-none font-bold text-slate-900">{{ order.user.name }}</div>
                                            <div class="mt-1 text-[10px] text-slate-400">{{ order.user.email }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="line-clamp-1 max-w-50 text-left text-sm font-bold text-slate-900">{{ order.course.title }}</div>
                                </td>
                                <td class="px-6 py-4 text-sm font-black text-slate-900">${{ order.total_amount }}</td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-1.5 text-xs font-bold tracking-tight text-slate-500 uppercase">
                                        <Landmark class="h-3.5 w-3.5 text-slate-400" />
                                        {{ order.payment_method }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div
                                        class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black tracking-widest uppercase"
                                        :class="getStatusColor(order.status)"
                                    >
                                        <component :is="getStatusIcon(order.status)" class="h-3 w-3" />
                                        {{ order.status }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <Link
                                        :href="admin.orders.show({ order: order.id }).url"
                                        class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 shadow-sm transition-all hover:bg-brand-600 hover:text-white"
                                    >
                                        <Eye class="h-4 w-4" />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Footer / Pagination -->
                <div class="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 p-4">
                    <div class="text-xs font-bold text-slate-400 italic">Showing {{ orders.from }}-{{ orders.to }} of {{ orders.total }} orders</div>
                    <div v-if="orders.links.length > 3" class="flex gap-1">
                        <Link
                            v-for="link in orders.links"
                            :key="link.label"
                            :href="link.url ?? '#'"
                            v-html="link.label"
                            class="rounded-lg border px-3 py-1.5 text-xs font-black transition-all"
                            :class="
                                link.active
                                    ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            "
                        />
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div
                v-if="orders.data.length === 0"
                class="mx-auto mt-12 max-w-lg rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center"
            >
                <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-200">
                    <Package class="h-10 w-10" />
                </div>
                <h3 class="text-xl font-bold text-slate-900 italic">No orders match your criteria</h3>
                <p class="mt-2 text-slate-500">Try adjusting your filters or search terms.</p>
                <button @click="clearFilters" class="mt-6 font-bold text-brand-600 hover:underline">Reset all filters</button>
            </div>
        </div>
    </AdminLayout>
</template>
