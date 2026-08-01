<script setup lang="ts">
import { index as certificateIndex } from '@/actions/App/Http/Controllers/Student/CertificateController';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Link, usePage } from '@inertiajs/vue3';
import { Award, BookOpen, ChevronLeft, FileBadge, GraduationCap, LayoutDashboard, ShoppingBag, User, Zap, Bell, Download, Users, Share2 } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
    isCollapsed: boolean;
}>();

const emit = defineEmits(['toggleCollapse', 'update:activeSection']);

const page = usePage();

// Initialize active section based on current URL
const getInitialSection = () => {
    const url = page.url;

    if (url.startsWith('/student/profile')) {
        return 'profile';
    }

    if (url.startsWith('/student/announcements')) {
        return 'announcements';
    }

    if (url.startsWith('/student/dashboard') || url === '/student') {
        return 'dashboard';
    }
    if (url.startsWith('/student/certificates')) {
        return 'certificates';
    }
    // Default fallback
    return 'dashboard';
};

const activeSection = ref(getInitialSection());

// Update active section when URL changes
watch(
    () => page.url,
    () => {
        activeSection.value = getInitialSection();
    },
);

const switchSection = (section: string) => {
    activeSection.value = section;
    emit('update:activeSection', section);
};

// Branding helper
const t = (key: string) => {
    const brand = page.props.branding;
    if (key === 'tier_title') return brand?.student?.sidebar?.tier_title || brand?.customer?.sidebar?.tier_title || 'student_tier_title';
    if (key === 'tier_subtitle') return brand?.student?.sidebar?.tier_subtitle || brand?.customer?.sidebar?.tier_subtitle || 'student_tier_subtitle';
    return brand?.student?.sidebar?.[key] || brand?.customer?.sidebar?.[key] || key;
};
</script>

<template>
    <aside
        id="customer-sidebar"
        class="fixed inset-y-0 start-0 top-0 z-50 flex h-screen border-e border-admin-sidebar-border bg-admin-sidebar transition-all duration-300 ease-in-out lg:sticky dark:border-admin-sidebar-border-dark dark:bg-admin-sidebar-dark"
        :class="{ 'w-18': isCollapsed, 'w-75': !isCollapsed }"
    >
        <!-- TIER 1: Command Rail -->
        <div class="z-20 flex w-18 shrink-0 flex-col items-center space-y-6 bg-admin-sidebar-rail py-4 dark:bg-admin-sidebar-rail-dark">
            <Link
                :href="student.dashboard.url()"
                class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-colors hover:brightness-110 dark:border-slate-700 dark:bg-slate-800"
            >
                <img
                    v-if="$page.props.branding.business_settings?.logo_url"
                    :src="
                        $page.props.branding.business_settings.logo_url.startsWith('http')
                            ? $page.props.branding.business_settings.logo_url
                            : '/storage/' + $page.props.branding.business_settings.logo_url
                    "
                    class="h-full w-full object-contain p-1"
                />
                <Zap v-else :size="20" fill="currentColor" class="text-(--brand-primary)" />
            </Link>

            <div class="flex w-full flex-1 flex-col items-center space-y-2">
                <!-- Dashboard -->
                <div class="flex w-full flex-col items-center">
                    <button
                        @click="switchSection('dashboard')"
                        class="admin-rail-btn group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                        :class="activeSection === 'dashboard' ? 'active-rail' : 'rail-icon hover:bg-slate-800 hover:brightness-110'"
                    >
                        <LayoutDashboard :size="20" />
                        <span
                            class="rail-label pointer-events-none absolute left-17.5 z-50 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
                            >{{ __(t('dashboard')) }}</span
                        >
                    </button>
                </div>

                <!-- Certificates -->
                <div class="flex w-full flex-col items-center">
                    <button
                        @click="switchSection('certificates')"
                        class="admin-rail-btn group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                        :class="activeSection === 'certificates' ? 'active-rail' : 'rail-icon hover:bg-slate-800 hover:brightness-110'"
                    >
                        <Award :size="20" />
                        <span
                            class="rail-label pointer-events-none absolute left-17.5 z-50 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
                            >{{ __('Certificates') }}</span
                        >
                    </button>
                </div>

                <!-- Profile -->
                <div class="flex w-full flex-col items-center">
                    <button
                        @click="switchSection('profile')"
                        class="admin-rail-btn group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                        :class="activeSection === 'profile' ? 'active-rail' : 'rail-icon hover:bg-slate-800 hover:brightness-110'"
                    >
                        <User :size="20" />
                        <span
                            class="rail-label pointer-events-none absolute left-17.5 z-50 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
                            >{{ __(t('profile')) }}</span
                        >
                    </button>
                </div>
            </div>

            <div class="flex w-full flex-col items-center space-y-4 border-t border-slate-800/50 px-4 pt-4">
                <button
                    @click="emit('toggleCollapse')"
                    class="rail-icon group relative hidden h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-slate-800 hover:text-sky-400 lg:flex"
                >
                    <ChevronLeft :size="20" :class="{ 'rotate-180': isCollapsed }" />
                    <span
                        class="rail-label pointer-events-none absolute left-17.5 z-50 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
                        >{{ __(t('collapse')) }}</span
                    >
                </button>
                <button
                    class="rail-icon group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-slate-800 hover:text-sky-400"
                >
                    <LifeBuoy :size="20" />
                    <span
                        class="rail-label pointer-events-none absolute left-17.5 z-50 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
                        >{{ __(t('support')) }}</span
                    >
                </button>
            </div>
        </div>

        <!-- TIER 2: Sub-menu -->
        <div
            id="tier-2-container"
            class="flex h-full flex-col overflow-hidden bg-admin-sidebar transition-all duration-300 ease-in-out dark:bg-admin-sidebar-dark"
            :class="isCollapsed ? 'pointer-events-none w-0 opacity-0' : 'w-57 opacity-100'"
        >
            <div class="border-sidebar-border dark:border-sidebar-border-dark border-b p-5">
                <h2
                    class="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                    :title="$page.props.branding.business_settings?.business_name"
                >
                    {{ $page.props.branding.business_settings?.business_name || __(t('student_portal')) }}
                </h2>
                <p class="mt-1.5 text-xs leading-snug font-semibold text-slate-500">
                    {{ $page.props.branding.business_settings?.tagline || __(t('student_tagline')) }}
                </p>
            </div>

            <div class="flex-1 space-y-1 overflow-y-auto p-4">
                <div class="animate-fade-in">
                    <div class="mb-3 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                        {{ __(t('menu')) }}
                    </div>

                    <Link
                        :href="student.dashboard.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url === student.dashboard.definition.url
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <LayoutDashboard :size="16" class="opacity-70" />
                        <span>{{ __(t('dashboard')) }}</span>
                    </Link>

                    <Link
                        :href="baseRoutes.home.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url === baseRoutes.home.definition.url
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <BookOpen :size="16" class="opacity-70" />
                        <span>{{ __('Browse Courses') }}</span>
                    </Link>

                    <Link
                        :href="student.dashboard.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith('/student/learning-dashboard')
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <Zap :size="16" class="opacity-70" />
                        <span>{{ __('Learning Dashboard') }}</span>
                    </Link>

                    <Link
                        :href="student.reminders.index.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.reminders.index.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <Bell :size="16" class="opacity-70" />
                        <span>{{ __('Reminders') }}</span>
                    </Link>

                    <Link
                        :href="student.downloads.index.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.downloads.index.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <Download :size="16" class="opacity-70" />
                        <span>{{ __('Downloads') }}</span>
                    </Link>

                    <Link
                        :href="student.tutorials.index.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.tutorials.index.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <GraduationCap :size="16" class="opacity-70" />
                        <span>{{ __('Tutorials') }}</span>
                    </Link>

                    <Link
                        :href="student.waitlist.index.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.waitlist.index.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <Users :size="16" class="opacity-70" />
                        <span>{{ __('Waitlist') }}</span>
                    </Link>

                    <Link
                        :href="student.referral.index.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.referral.index.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <Share2 :size="16" class="opacity-70" />
                        <span>{{ __('Referral') }}</span>
                    </Link>

                    <Link
                        :href="student.orders.index().url"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.orders.index.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <ShoppingBag :size="16" class="opacity-70" />
                        <span>{{ __('Purchase History') }}</span>
                    </Link>

                    <Link
                        :href="certificateIndex.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(certificateIndex.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <FileBadge :size="16" class="opacity-70" />
                        <span>{{ __('My Certificates') }}</span>
                    </Link>

                    <Link
                        :href="student.profile.edit.url()"
                        class="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all"
                        :class="
                            $page.url.startsWith(student.profile.edit.definition.url)
                                ? 'nav-link-active bg-admin-active font-bold text-admin-active-text'
                                : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                        "
                    >
                        <User :size="16" class="opacity-70" />
                        <span>{{ __(t('my_profile')) }}</span>
                    </Link>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.active-rail {
    background-color: var(--admin-active-item-bg);
    color: var(--admin-active-item-text) !important;
}
:global(.dark) .active-rail {
    background-color: var(--admin-active-item-bg-dark);
    color: var(--admin-active-item-text-dark) !important;
}

.nav-link-active {
    background-color: var(--admin-active-item-bg);
    color: var(--admin-active-item-text);
    font-weight: 700;
}
:global(.dark) .nav-link-active {
    background-color: var(--admin-active-item-bg-dark);
    color: var(--admin-active-item-text-dark);
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.rail-icon {
    color: var(--admin-sidebar-icon);
}
:global(.dark) .rail-icon {
    color: var(--admin-sidebar-icon-dark);
}
</style>
