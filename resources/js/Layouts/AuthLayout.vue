<script setup lang="ts">
import Toast from '@/Components/Common/Toast.vue';
import ThemeToggle from '@/Components/ThemeToggle.vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed, onMounted } from 'vue';

const props = defineProps<{
    title: string;
    headline: string;
    subheadline: string;
    features: string[];
}>();

const page = usePage();
const appName = computed(() => page.props.name || 'Laravel');

onMounted(() => {
    const direction = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', direction);
});
</script>

<template>
    <Head :title="`${appName} | ${__(title)}`" />
    <Toast />

    <div
        class="flex min-h-screen flex-col bg-white font-sans text-slate-700 transition-colors duration-300 lg:flex-row dark:bg-gray-900 dark:text-slate-300"
    >
        <!-- Left Side: System Branding/Information -->
        <div class="branded-bg relative hidden flex-col items-center justify-center overflow-hidden p-12 text-white lg:flex lg:w-1/2">
            <!-- Decorative Shapes -->
            <div class="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10">
                <div class="animate-float absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white mix-blend-overlay blur-3xl filter"></div>
                <div
                    class="animate-float absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-white mix-blend-overlay blur-3xl filter"
                    style="animation-delay: 2s"
                ></div>
            </div>

            <div class="relative z-10 max-w-lg text-center lg:text-left">
                <Link
                    href="/"
                    class="mb-8 inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10 text-3xl text-white backdrop-blur-md"
                >
                    <img
                        v-if="$page.props.branding?.business_settings?.logo_url"
                        :src="
                            $page.props.branding.business_settings.logo_url.startsWith('http')
                                ? $page.props.branding.business_settings.logo_url
                                : '/storage/' + $page.props.branding.business_settings.logo_url
                        "
                        class="h-full w-full object-contain p-2"
                        :alt="appName"
                    />
                    <svg v-else class="h-8 w-8" fill="currentColor" viewBox="0 0 320 512">
                        <path
                            d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 25.2 288 40 288h115.4l-42.6 129.8C108.8 434.9 120.3 448 136 448h144c12 0 22.2-8.9 23.8-20.8l32-240c1.9-14.3-9.2-27.2-24-27.2zM250.7 220.3l-32 240c-.6 4.3-4.1 7.7-8.7 7.7h-144c-4.1 0-7.7-2.9-8.4-7L100.2 332H40c-4.1 0-7.7-2.9-8.4-7L-11.4 69.8c-.8-5.8 3.7-10.9 9.5-10.9h144c4.1 0 7.7 2.9 8.4 7L167.8 196H228c4.1 0 7.7 2.9 8.4 7l24.3 15.3z"
                        />
                    </svg>
                </Link>
                <h1 class="mb-6 text-4xl leading-tight font-bold lg:text-6xl">{{ __(headline) }}</h1>
                <p class="mb-12 text-lg leading-relaxed font-light text-primary-100 lg:text-xl">
                    {{ __(subheadline) }}
                </p>

                <!-- Feature Checklist -->
                <div class="space-y-4">
                    <div v-for="(feature, index) in features" :key="index" class="flex items-center space-x-3">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-400/20 text-primary-200">
                            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 512 512">
                                <path
                                    d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                />
                            </svg>
                        </div>
                        <span class="font-medium text-primary-50">{{ __(feature) }}</span>
                    </div>
                </div>
            </div>

            <!-- Footer Copyright (Left) -->
            <div class="absolute bottom-8 left-12 hidden text-sm text-primary-200/50 lg:block">
                &copy; {{ new Date().getFullYear() }} {{ appName }} Inc. All rights reserved.
            </div>
        </div>

        <!-- Right Side: Content Area -->
        <div class="relative flex items-center justify-center bg-white p-6 transition-colors duration-300 md:p-8 lg:w-1/2 dark:bg-gray-900">
            <div class="absolute top-4 right-4 flex items-center space-x-2">
                <ThemeToggle />
            </div>

            <div class="w-full max-w-md">
                <!-- Mobile Branding (Only visible on small screens) -->
                <div class="mb-10 text-center lg:hidden">
                    <Link href="/" class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                        <img
                            v-if="$page.props.branding?.business_settings?.logo_url"
                            :src="
                                $page.props.branding.business_settings.logo_url.startsWith('http')
                                    ? $page.props.branding.business_settings.logo_url
                                    : '/storage/' + $page.props.branding.business_settings.logo_url
                            "
                            class="h-full w-full object-contain p-2"
                            :alt="appName"
                        />
                        <svg v-else class="h-6 w-6" fill="currentColor" viewBox="0 0 320 512">
                            <path
                                d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 25.2 288 40 288h115.4l-42.6 129.8C108.8 434.9 120.3 448 136 448h144c12 0 22.2-8.9 23.8-20.8l32-240c1.9-14.3-9.2-27.2-24-27.2zM250.7 220.3l-32 240c-.6 4.3-4.1 7.7-8.7 7.7h-144c-4.1 0-7.7-2.9-8.4-7L100.2 332H40c-4.1 0-7.7-2.9-8.4-7L-11.4 69.8c-.8-5.8 3.7-10.9 9.5-10.9h144c4.1 0 7.7 2.9 8.4 7L167.8 196H228c4.1 0 7.7 2.9 8.4 7l24.3 15.3z"
                            />
                        </svg>
                    </Link>
                    <h2 class="text-2xl font-bold text-slate-800 dark:text-white">{{ __(title) }}</h2>
                </div>

                <slot />

                <div class="mt-8 border-t border-slate-100 pt-6 text-center dark:border-slate-800">
                    <Link
                        href="/"
                        class="inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                        <svg class="mr-2 h-4 w-4 rotate-180 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                        {{ __('Back to Home') }}
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

.branded-bg {
    background: linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-600) 100%);
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}
</style>
