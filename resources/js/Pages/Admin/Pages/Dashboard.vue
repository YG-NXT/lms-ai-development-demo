<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, usePage } from '@inertiajs/vue3';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BookOpen,
    DollarSign,
    GraduationCap,
    LayoutDashboard,
    MessageSquare,
    MonitorPlay,
    Package,
    Users,
} from 'lucide-vue-next';
import { computed, markRaw } from 'vue';

const props = defineProps<{
    stats: {
        total_students: number;
        total_courses: number;
        total_revenue: number;
        total_enrollments: number;
    };
    recentOrders: Array<any>;
    topCourses: Array<any>;
    recentStudents: Array<any>;
    salesTrend: Array<{ date: string; total: number }>;
}>();

const { props: pageProps } = usePage();

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const statsWidgets = computed(() => [
    {
        label: 'Total Revenue',
        value: formatCurrency(props.stats.total_revenue),
        change: '+12.5%',
        trend: 'up',
        icon: markRaw(DollarSign),
        color: 'blue',
    },
    {
        label: 'Total Students',
        value: props.stats.total_students,
        change: '+8.2%',
        trend: 'up',
        icon: markRaw(Users),
        color: 'indigo',
    },
    {
        label: 'Enrollments',
        value: props.stats.total_enrollments,
        change: '+15.3%',
        trend: 'up',
        icon: markRaw(GraduationCap),
        color: 'emerald',
    },
    {
        label: 'Courses',
        value: props.stats.total_courses,
        change: '+2',
        trend: 'up',
        icon: markRaw(BookOpen),
        color: 'amber',
    },
]);

// Simple SVG Chart data generation
const chartPoints = computed(() => {
    if (!props.salesTrend || props.salesTrend.length <= 1) {
        // Handle single point or empty data (Straight line at 0 or single dot)
        if (props.salesTrend.length === 1) {
            const maxVal = Math.max(Number(props.salesTrend[0].total), 100);
            const y = 100 - (Number(props.salesTrend[0].total) / maxVal) * 100;
            return `0,${y} 600,${y}`;
        }
        return '0,100 600,100';
    }
    const maxVal = Math.max(...props.salesTrend.map((d) => Number(d.total)), 100);
    const height = 100;
    const width = 600;
    const stepX = width / (props.salesTrend.length - 1);

    return props.salesTrend
        .map((d, i) => {
            const x = i * stepX;
            const y = height - (Number(d.total) / maxVal) * height;
            return `${x},${y}`;
        })
        .join(' ');
});

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400';
        case 'pending':
            return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400';
        case 'cancelled':
            return 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400';
        default:
            return 'bg-slate-50 text-slate-600 dark:bg-slate-900/20 dark:text-slate-400';
    }
};
</script>

<template>
    <AdminLayout>
        <Head title="Admin Dashboard" />

        <div class="animate-fade-in space-y-8 pb-12">
            <!-- Header Section -->
            <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div class="text-start">
                    <div class="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                        <Activity :size="14" />
                        System Analytics
                    </div>
                    <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {{ formatDate(new Date().toISOString()) }} • Comprehensive summary of your educational platform.
                    </p>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="widget in statsWidgets"
                    :key="widget.label"
                    class="group relative overflow-hidden rounded-4xl border border-slate-200/60 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                >
                    <div class="relative z-10 flex flex-col gap-4">
                        <div class="flex items-start justify-between">
                            <div
                                :class="`rounded-2xl p-3 bg-${widget.color}-50 dark:bg-${widget.color}-900/20 text-${widget.color}-600 dark:text-${widget.color}-400`"
                            >
                                <component :is="widget.icon" :size="24" />
                            </div>
                            <div
                                :class="`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${widget.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`"
                            >
                                <ArrowUpRight v-if="widget.trend === 'up'" :size="12" />
                                <ArrowDownRight v-else :size="12" />
                                {{ widget.change }}
                            </div>
                        </div>
                        <div>
                            <h3 class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __(widget.label) }}</h3>
                            <p class="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{{ widget.value }}</p>
                        </div>
                    </div>
                    <!-- Decorative Element -->
                    <div
                        :class="`absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-5 bg-${widget.color}-500 transition-transform group-hover:scale-150`"
                    />
                </div>
            </div>

            <!-- Main Analytics Split -->
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <!-- Left: Sales Trend & Recent Orders -->
                <div class="space-y-8 lg:col-span-2">
                    <!-- Sales Trend Chart -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-8 flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">Revenue Analytics</h3>
                                <p class="text-sm text-slate-500 dark:text-slate-400">Daily revenue performance over the last 7 days</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="h-3 w-3 rounded-full bg-brand-500"></span>
                                <span class="text-xs font-bold text-slate-600 dark:text-slate-300">Daily Sales</span>
                            </div>
                        </div>

                        <!-- Mini Chart (SVG) -->
                        <div class="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                            <svg viewBox="0 0 600 100" class="h-full w-full" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="var(--color-brand-500)" stop-opacity="0.3" />
                                        <stop offset="100%" stop-color="var(--color-brand-500)" stop-opacity="0" />
                                    </linearGradient>
                                </defs>
                                <polyline fill="url(#gradient)" stroke="none" :points="`0,100 ${chartPoints} 600,100`" />
                                <polyline
                                    fill="none"
                                    stroke="var(--color-brand-500)"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    :points="chartPoints"
                                />
                            </svg>
                            <!-- Empty State for Chart -->
                            <div v-if="!salesTrend.length" class="absolute inset-0 flex items-center justify-center text-slate-400">
                                <p class="text-xs italic">Insufficient data for chart visualization</p>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Orders Table -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="flex items-center justify-between border-b border-slate-100 p-8 dark:border-slate-700">
                            <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">Recent Transactions</h3>
                            <Link :href="admin.orders.index().url" class="text-sm font-bold text-brand-600 hover:text-brand-700">
                                View all orders
                            </Link>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-start">
                                <thead>
                                    <tr class="bg-slate-50/50 dark:bg-slate-900/50">
                                        <th class="px-8 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Order #</th>
                                        <th class="px-8 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Customer</th>
                                        <th class="px-8 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Amount</th>
                                        <th class="px-8 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Status</th>
                                        <th class="px-8 py-4 text-right text-[10px] font-bold tracking-widest text-slate-400 uppercase">Date</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                                    <tr
                                        v-for="order in recentOrders"
                                        :key="order.id"
                                        class="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
                                    >
                                        <td class="px-8 py-5">
                                            <span class="font-bold text-slate-900 dark:text-white">#{{ order.order_number }}</span>
                                        </td>
                                        <td class="px-8 py-5">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                                                >
                                                    {{ order.user.name.charAt(0) }}
                                                </div>
                                                <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ order.user.name }}</span>
                                            </div>
                                        </td>
                                        <td class="px-8 py-5">
                                            <span class="text-sm font-bold text-slate-900 dark:text-white">{{
                                                formatCurrency(order.total_amount)
                                            }}</span>
                                        </td>
                                        <td class="px-8 py-5 text-start">
                                            <span
                                                :class="`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${getStatusColor(order.status)}`"
                                            >
                                                {{ order.status }}
                                            </span>
                                        </td>
                                        <td class="px-8 py-5 text-right">
                                            <span class="text-xs text-slate-500">{{ formatDate(order.created_at) }}</span>
                                        </td>
                                    </tr>
                                    <tr v-if="!recentOrders.length">
                                        <td colspan="5" class="py-12 text-center text-sm text-slate-400 italic">No recent orders found.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Right: Top Courses & New Students -->
                <div class="space-y-8">
                    <!-- Top Courses List -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-6">
                            <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">Top Performing Courses</h3>
                            <p class="text-xs text-slate-500">Based on lifetime enrollments</p>
                        </div>
                        <div class="space-y-5">
                            <div v-for="course in topCourses" :key="course.id" class="group flex items-center gap-4">
                                <div class="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
                                    <img
                                        v-if="course.thumbnail"
                                        :src="course.thumbnail.startsWith('http') ? course.thumbnail : '/storage/' + course.thumbnail"
                                        class="h-full w-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div v-else class="flex h-full w-full items-center justify-center text-slate-400">
                                        <BookOpen :size="20" />
                                    </div>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h4
                                        class="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white"
                                    >
                                        {{ course.title }}
                                    </h4>
                                    <div class="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                        <GraduationCap :size="12" />
                                        {{ course.enrollments_count }} Students
                                    </div>
                                </div>
                                <div class="text-right">
                                    <ArrowUpRight :size="16" class="text-slate-300 transition-colors group-hover:text-emerald-500" />
                                </div>
                            </div>
                            <div v-if="!topCourses.length" class="py-8 text-center text-xs text-slate-400 italic">No course data available.</div>
                        </div>
                    </div>

                    <!-- New Students Pulse -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-6 flex items-center justify-between">
                            <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">Fresh Faces</h3>
                            <span class="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                        </div>
                        <div class="grid grid-cols-4 gap-4">
                            <div v-for="student in recentStudents" :key="student.id" class="flex flex-col items-center gap-2" title="student.name">
                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-lg font-black text-brand-600 ring-2 ring-slate-100 dark:ring-slate-700"
                                >
                                    {{ student.name.charAt(0) }}
                                </div>
                                <span class="max-w-12.5 truncate text-center text-[10px] font-bold text-slate-500">{{
                                    student.name.split(' ')[0]
                                }}</span>
                            </div>
                        </div>
                        <div v-if="!recentStudents.length" class="py-12 text-center text-xs text-slate-400 italic">No new students recently.</div>

                        <div class="mt-8 border-t border-slate-100 pt-6 dark:border-slate-700">
                            <div
                                class="flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900/50"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/20">
                                        <Users :size="18" />
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-700 dark:text-slate-200">Total User Base</p>
                                        <p class="text-[10px] text-slate-500">Includes active students</p>
                                    </div>
                                </div>
                                <span class="text-sm font-black text-slate-900 dark:text-white">{{ stats.total_students }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Management Shortcuts (Re-styled) -->
            <div class="space-y-6">
                <div class="flex items-center gap-3">
                    <div class="h-px flex-1 bg-slate-100 dark:bg-slate-700"></div>
                    <h3 class="text-sm font-bold tracking-widest text-slate-400 uppercase">Quick Management Access</h3>
                    <div class="h-px flex-1 bg-slate-100 dark:bg-slate-700"></div>
                </div>

                <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    <Link
                        v-for="item in [
                            { label: 'Courses', icon: BookOpen, route: admin.courses.index().url, color: 'blue' },
                            { label: 'Orders', icon: Package, route: admin.orders.index().url, color: 'emerald' },
                            { label: 'Students', icon: GraduationCap, route: admin.students.index().url, color: 'indigo' },
                            { label: 'Live Class', icon: MonitorPlay, route: admin.liveClasses.index().url, color: 'rose' },
                            { label: 'Reviews', icon: MessageSquare, route: admin.reviews.index().url, color: 'amber' },
                            { label: 'Settings', icon: LayoutDashboard, route: admin.business.settings.index().url, color: 'purple' },
                        ]"
                        :key="item.label"
                        :href="item.route"
                        class="group flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-brand-100 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div
                            :class="`rounded-2xl p-3 bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400 transition-transform group-hover:scale-110`"
                        >
                            <component :is="item.icon" :size="20" />
                        </div>
                        <span class="text-xs font-bold text-slate-700 transition-colors group-hover:text-brand-600 dark:text-slate-200">{{
                            item.label
                        }}</span>
                    </Link>
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
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
