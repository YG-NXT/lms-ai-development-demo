<script setup lang="ts">
import AuthLayout from '@/Layouts/AuthLayout.vue';
import { login } from '@/routes/admin';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

defineProps<{
    status?: string;
    canResetPassword?: boolean;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const showPassword = ref(false);
const isAuthenticating = ref(false);

const submit = () => {
    isAuthenticating.value = true;
    form.post(login.url(), {
        onFinish: () => {
            form.reset('password');
            isAuthenticating.value = false;
        },
        onError: () => {
            isAuthenticating.value = false;
        },
    });
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
</script>

<template>
    <AuthLayout
        :title="__($page.props.branding.admin_login?.welcome_back)"
        headline="Educator Empowerment Portal"
        subheadline="Seamlessly manage courses, students, and system configurations with our premium educator dashboard."
        :features="['Comprehensive Course Management', 'Advanced Student Analytics', 'Dynamic Content Delivery', 'Seamless System Configuration']"
    >
        <!-- Header -->
        <div class="mb-10 hidden lg:block">
            <h2 class="mb-2 text-2xl font-bold text-slate-800 dark:text-white">{{ __($page.props.branding.admin_login?.form_title) }}</h2>
            <p class="text-slate-500 dark:text-slate-400">{{ __($page.props.branding.admin_login?.form_subtitle) }}</p>
        </div>

        <div
            v-if="status"
            class="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-600 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
        >
            {{ status }}
        </div>

        <!-- Demo Credentials -->
        <div
            v-if="$page.props.app_mode === 'demo'"
            class="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/50"
        >
            <div class="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900">
                <div class="flex items-center space-x-2">
                    <div
                        class="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                    >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            ></path>
                        </svg>
                    </div>
                    <span class="text-xs font-bold tracking-tight text-slate-800 uppercase dark:text-slate-200">{{
                        __('Login with credentials')
                    }}</span>
                </div>
                <button
                    type="button"
                    @click="
                        () => {
                            form.email = 'admin@admin.com';
                            form.password = '12345678';
                        }
                    "
                    class="rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-black text-primary-700 transition-all hover:bg-primary-100 active:scale-95 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                >
                    {{ __('Use') }}
                </button>
            </div>
            <div class="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
                <div class="px-5 py-3">
                    <p class="mb-0.5 text-[10px] font-bold text-slate-400 uppercase">{{ __('Email') }}</p>
                    <p class="text-xs font-medium text-slate-700 dark:text-slate-300">admin@admin.com</p>
                </div>
                <div class="px-5 py-3">
                    <p class="mb-0.5 text-[10px] font-bold text-slate-400 uppercase">{{ __('Password') }}</p>
                    <p class="text-xs font-medium text-slate-700 dark:text-slate-300">12345678</p>
                </div>
            </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-6">
            <div>
                <label class="mb-2 ml-1 block text-sm font-semibold text-slate-700 dark:text-slate-300" for="email">{{ __('Email Address') }}</label>
                <div class="group relative">
                    <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors duration-300 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            ></path>
                        </svg>
                    </span>
                    <input
                        id="email"
                        type="email"
                        class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 font-medium text-slate-700 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:ring-primary-500/20"
                        :placeholder="__('name@company.com')"
                        v-model="form.email"
                        required
                        autofocus
                    />
                </div>
                <div v-if="form.errors.email" class="mt-2 ml-1 text-sm text-red-600">{{ form.errors.email }}</div>
            </div>

            <div>
                <div class="mb-2 flex justify-between px-1">
                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="password">{{ __('Password') }}</label>
                    <a
                        v-if="canResetPassword"
                        href="#"
                        class="text-xs font-bold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >{{ __('Forgot?') }}</a
                    >
                </div>
                <div class="group relative">
                    <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors duration-300 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400"
                    >
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 448 512">
                            <path
                                d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                            />
                        </svg>
                    </span>
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-11 font-medium text-slate-700 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:ring-primary-500/20"
                        :placeholder="__('••••••••')"
                        v-model="form.password"
                        required
                    />
                    <button
                        type="button"
                        @click="togglePassword"
                        class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none dark:hover:text-slate-300"
                    >
                        <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                        </svg>
                        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div v-if="form.errors.password" class="mt-2 ml-1 text-sm text-red-600">{{ form.errors.password }}</div>
            </div>

            <div class="flex items-center px-1">
                <input
                    type="checkbox"
                    id="remember"
                    v-model="form.remember"
                    class="h-4 w-4 cursor-pointer rounded border-slate-300 bg-gray-100 text-primary-600 transition-all focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label for="remember" class="ml-2 cursor-pointer text-sm font-medium text-slate-600 select-none dark:text-slate-400">{{
                    __('Stay signed in')
                }}</label>
            </div>

            <button
                type="submit"
                :disabled="form.processing || isAuthenticating"
                class="flex w-full transform items-center justify-center space-x-2 rounded-2xl bg-primary-600 py-3 font-bold text-white shadow-xl shadow-primary-200 transition-all hover:bg-primary-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75 dark:shadow-none"
                :class="{ 'pointer-events-none opacity-80': form.processing || isAuthenticating }"
            >
                <span v-if="form.processing || isAuthenticating">{{ __('Logging in...') }}</span>
                <span v-else>{{ __('Login to Platform') }}</span>
                <svg
                    v-if="!(form.processing || isAuthenticating)"
                    class="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                <svg v-else class="mr-3 -ml-1 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </button>
        </form>
    </AuthLayout>
</template>
