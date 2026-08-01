<script setup lang="ts">
import Toast from '@/Components/Common/Toast.vue';
import ThemeToggle from '@/Components/ThemeToggle.vue';
import { contact, login } from '@/routes';
import tutorials from '@/routes/tutorials';
import { dashboard as adminDashboard, login as adminLogin } from '@/routes/admin';
import certificate from '@/routes/certificate';
import { about, privacy, terms } from '@/routes/legal';
import { dashboard as studentDashboard } from '@/routes/student';
import { Link, usePage } from '@inertiajs/vue3';
import { Menu, ShieldCheck, X } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

// ... (previous imports)

const page = usePage();
const user = computed(() => (page.props as any).auth?.user);
const businessSettings = computed(() => (page.props.branding as any)?.business_settings || {});

const logoUrl = computed(() => {
    const logo = businessSettings.value.logo_url || businessSettings.value.business_logo;
    if (!logo) return null;
    return logo.startsWith('http') ? logo : '/storage/' + logo;
});

const businessName = computed(() => {
    return businessSettings.value.business_name || (page.props.branding as any)?.name || 'Learning Hub';
});

const props = defineProps<{
    wFull?: boolean;
}>();

const dashboardUrl = computed(() => {
    if (!user.value) return '#';
    return user.value.type === 'admin' || user.value.type === 'super-admin' ? adminDashboard.url() : studentDashboard.url();
});

const isMobileMenuOpen = ref(false);

onMounted(() => {
    const direction = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', direction);
});
</script>

<template>
    <div class="flex min-h-screen flex-col bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
        <Toast />

        <!-- Header -->
        <header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <!-- Logo/Brand & Legal Links -->
                    <div class="flex items-center gap-8">
                        <Link href="/" class="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <img
                                v-if="logoUrl"
                                :src="logoUrl"
                                class="h-10 w-auto object-contain"
                                :alt="businessSettings.business_name || (page.props.branding as any)?.name || 'Logo'"
                            />
                            <span class="max-w-40 truncate text-xl font-bold text-gray-800 md:max-w-none dark:text-white">
                                {{ businessName }}
                            </span>
                        </Link>

                        <!-- Desktop Legal Links -->
                        <div class="hidden items-center gap-6 lg:flex">
                            <Link
                                :href="privacy.url()"
                                class="text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                {{ __('Privacy Policy') }}
                            </Link>
                            <Link
                                :href="terms.url()"
                                class="text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                {{ __('Terms') }}
                            </Link>
                            <Link
                                :href="about.url()"
                                class="text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                {{ __('About Us') }}
                            </Link>
                            <Link
                                :href="contact.url()"
                                class="text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                {{ __('Contact Us') }}
                            </Link>
                    <Link
                        :href="certificate.verify.url()"
                        class="text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                        {{ __('Verify Certificate') }}
                    </Link>
                    <Link
                        :href="tutorials.index.url()"
                        class="text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                        {{ __('Tutorials') }}
                    </Link>
                </div>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden items-center gap-4 lg:flex">
                        <ThemeToggle />
                        <!-- <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"></div> -->

                        <template v-if="user">
                            <Link
                                :href="dashboardUrl"
                                class="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700 hover:shadow-primary-500/50"
                            >
                                {{ __('Dashboard') }}
                            </Link>
                        </template>
                        <template v-else>
                            <Link
                                v-if="$page.props.app_mode === 'demo'"
                                :href="adminLogin.url()"
                                class="flex items-center gap-2 rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-bold text-primary-600 transition-all hover:bg-primary-50 active:scale-95 dark:border-primary-800 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-primary-900/10"
                            >
                                <ShieldCheck class="h-4 w-4" />
                                {{ __('Login As Admin') }}
                            </Link>

                            <Link
                                :href="login.url()"
                                class="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700 hover:shadow-primary-500/50"
                            >
                                {{ __('Login / Join') }}
                            </Link>
                        </template>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="flex items-center gap-3 lg:hidden">
                        <ThemeToggle />
                        <button
                            @click="isMobileMenuOpen = !isMobileMenuOpen"
                            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                        >
                            <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
                            <X v-else class="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div v-show="isMobileMenuOpen" class="border-t border-gray-200 py-4 lg:hidden dark:border-gray-700">
                    <div class="flex flex-col gap-3">
                        <div class="mb-2 flex items-center justify-between">
                            <!-- Mobile items if any -->
                        </div>

                        <!-- Mobile Legal Links -->
                        <div class="mb-2 space-y-2">
                            <Link
                                :href="privacy.url()"
                                class="block py-2 text-base font-bold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                            >
                                {{ __('Privacy Policy') }}
                            </Link>
                            <Link
                                :href="terms.url()"
                                class="block py-2 text-base font-bold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                            >
                                {{ __('Terms') }}
                            </Link>
                            <Link
                                :href="about.url()"
                                class="block py-2 text-base font-bold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                            >
                                {{ __('About Us') }}
                            </Link>
                            <Link
                                :href="contact.url()"
                                class="block py-2 text-base font-bold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                            >
                                {{ __('Contact Us') }}
                            </Link>
                            <Link
                                :href="certificate.verify.url()"
                                class="block py-2 text-base font-bold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                            >
                                {{ __('Verify Certificate') }}
                            </Link>
                            <Link
                                :href="tutorials.index.url()"
                                class="block py-2 text-base font-bold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                            >
                                {{ __('Tutorials') }}
                            </Link>
                        </div>

                        <div class="flex flex-col gap-3 border-t border-gray-100 pt-2 dark:border-gray-800">
                            <template v-if="user">
                                <Link
                                    :href="dashboardUrl"
                                    class="rounded-lg bg-primary-50 px-4 py-2 text-center font-medium text-primary-600 dark:bg-primary-900/10 dark:text-primary-400"
                                >
                                    {{ __('Dashboard') }}
                                </Link>
                            </template>
                            <template v-else>
                                <Link
                                    v-if="$page.props.app_mode === 'demo'"
                                    :href="adminLogin.url()"
                                    class="flex items-center justify-center gap-2 rounded-lg border border-primary-200 bg-white px-5 py-3 text-center text-sm font-bold text-primary-600 dark:border-primary-800 dark:bg-gray-800 dark:text-primary-400"
                                >
                                    <ShieldCheck class="h-5 w-5" />
                                    {{ __('Login As Admin') }}
                                </Link>

                                <Link
                                    :href="login.url()"
                                    class="rounded-lg bg-primary-600 px-5 py-3 text-center font-bold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700"
                                >
                                    {{ __('Login / Join') }}
                                </Link>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Content -->
        <main class="grow">
            <div :class="props.wFull ? '' : 'mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'">
                <slot />
            </div>
        </main>

        <!-- Footer -->
        <footer class="mt-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div class="text-center text-sm text-gray-500 md:text-left dark:text-gray-400">
                        &copy; {{ new Date().getFullYear() }} {{ businessName }}. {{ __('All rights reserved.') }}
                    </div>
                    <div class="flex flex-wrap justify-center gap-6">
                        <Link
                            :href="privacy.url()"
                            class="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                            {{ __('Privacy Policy') }}
                        </Link>
                        <Link
                            :href="terms.url()"
                            class="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                            {{ __('Terms & Conditions') }}
                        </Link>
                        <Link
                            :href="about.url()"
                            class="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                            {{ __('About Us') }}
                        </Link>
                        <Link
                            :href="certificate.verify.url()"
                            class="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                            {{ __('Verify Certificate') }}
                        </Link>
                        <Link
                            :href="tutorials.index.url()"
                            class="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                            {{ __('Tutorials') }}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
