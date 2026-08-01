<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import student from '@/routes/student';
import { Head, Link } from '@inertiajs/vue3';
import { Award, CheckCircle, ChevronRight, Clock, FileText, Package, RefreshCw, XCircle } from 'lucide-vue-next';

defineProps<{
    orders: any;
}>();

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
</script>

<template>
    <Head title="My Orders" />

    <StudentLayout>
        <template #header>
            <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Purchase History</h2>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your course enrollments and view receipts.</p>
        </template>

        <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div
                v-if="orders.data.length > 0"
                class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse text-left">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50">
                                <th class="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Order Info</th>
                                <th class="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Course</th>
                                <th class="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Date</th>
                                <th class="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Total</th>
                                <th class="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Status</th>
                                <th class="px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                            <tr
                                v-for="order in orders.data"
                                :key="order.id"
                                class="group transition-colors hover:bg-slate-50/30 dark:hover:bg-slate-700/30"
                            >
                                <td class="px-6 py-4">
                                    <div class="font-bold text-slate-900 dark:text-white">#{{ order.order_number }}</div>
                                    <div class="mt-0.5 text-xs tracking-tight text-slate-500 uppercase dark:text-slate-400">
                                        VIA {{ order.payment_method }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <img
                                            :src="
                                                order.course.thumbnail?.startsWith('http')
                                                    ? order.course.thumbnail
                                                    : '/storage/' + order.course.thumbnail
                                            "
                                            class="h-10 w-10 rounded-lg object-cover"
                                            alt=""
                                            @error="($event.target as HTMLImageElement).src = '/images/placeholder.jpg'"
                                        />
                                        <div>
                                            <div
                                                class="text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400"
                                            >
                                                {{ order.course.title }}
                                            </div>
                                            <div class="text-xs text-slate-500 dark:text-slate-400">{{ order.course.category?.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                    {{ new Date(order.created_at).toLocaleDateString() }}
                                </td>
                                <td class="px-6 py-4 font-bold text-slate-900 dark:text-white">${{ order.total_amount }}</td>
                                <td class="px-6 py-4">
                                    <div
                                        class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold"
                                        :class="getStatusColor(order.status)"
                                    >
                                        <component :is="getStatusIcon(order.status)" class="h-3.5 w-3.5" />
                                        <span class="capitalize">{{ order.status }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <!-- Certificate Download -->
                                        <a
                                            v-if="order.course.certificates && order.course.certificates.length > 0"
                                            :href="student.certificates.download({ certificate: order.course.certificates[0].id }).url"
                                            class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-all hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                                            title="Download Certificate"
                                        >
                                            <Award class="h-4 w-4" />
                                        </a>

                                        <!-- Invoice Download -->
                                        <a
                                            :href="student.orders.invoice({ order: order.id }).url"
                                            class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-white"
                                            title="Download Invoice"
                                        >
                                            <FileText class="h-4 w-4" />
                                        </a>

                                        <Link
                                            :href="student.orders.show({ order: order.id }).url"
                                            class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:bg-brand-600 hover:text-white dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-brand-600 dark:hover:text-white"
                                            title="View Details"
                                        >
                                            <ChevronRight class="h-4 w-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Placeholder (Simple) -->
                <div v-if="orders.links.length > 3" class="flex justify-center gap-2 border-t border-slate-100 p-4 dark:border-slate-700">
                    <Link
                        v-for="link in orders.links"
                        :key="link.label"
                        :href="link.url ?? '#'"
                        v-html="link.label"
                        class="rounded-xl px-4 py-2 text-sm transition-all"
                        :class="
                            link.active
                                ? 'bg-brand-600 font-bold text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                        "
                    />
                </div>
            </div>

            <!-- Empty State -->
            <div
                v-else
                class="mx-auto mt-12 max-w-lg rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800"
            >
                <div
                    class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-300 dark:bg-slate-700 dark:text-slate-500"
                >
                    <Package class="h-10 w-10" />
                </div>
                <h3 class="text-xl font-bold text-slate-900 italic dark:text-white">No orders found yet</h3>
                <p class="mt-2 mb-8 text-slate-500 dark:text-slate-400">
                    You haven't purchased any courses. Browse our catalog and start learning today!
                </p>
                <Link
                    href="/"
                    class="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-6 font-bold text-white shadow-lg shadow-brand-100 transition-all hover:bg-brand-700 dark:shadow-none"
                >
                    Explore Courses
                    <ArrowRight class="h-4 w-4" />
                </Link>
            </div>
        </div>
    </StudentLayout>
</template>
