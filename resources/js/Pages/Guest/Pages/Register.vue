<script setup lang="ts">
import AuthLayout from '@/Layouts/AuthLayout.vue';
import { Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const submit = () => {
    form.post('/register', {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <AuthLayout
        title="Student Registration"
        headline="Join the Learning Community"
        subheadline="Create your account to access free and premium courses, track your progress, and join a global community of learners."
        :features="['Access to Free Courses', 'Personalized Dashboard', 'Community Support', 'Mobile-ready Learning']"
    >
        <!-- Header -->
        <div class="mb-10 hidden lg:block">
            <h2 class="mb-2 text-2xl font-bold text-slate-800 dark:text-white">{{ __('Create a new account') }}</h2>
            <p class="text-slate-500 dark:text-slate-400">
                {{ __('Already have an account?') }}
                <Link href="/login" class="font-bold text-primary-600 hover:text-primary-700"> {{ __('sign in') }} </Link>
            </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-4">
            <div>
                <label class="mb-2 ml-1 block text-sm font-semibold text-slate-700 dark:text-slate-300" for="name">{{ __('Full Name') }}</label>
                <div class="group relative">
                    <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors duration-300 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                    </span>
                    <input
                        id="name"
                        type="text"
                        class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 font-medium text-slate-700 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:ring-primary-500/20"
                        :placeholder="__('John Doe')"
                        v-model="form.name"
                        required
                        autofocus
                    />
                </div>
                <div v-if="form.errors.name" class="mt-1 ml-1 text-sm text-red-600">{{ form.errors.name }}</div>
            </div>

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
                        :placeholder="__('your@email.com')"
                        v-model="form.email"
                        required
                    />
                </div>
                <div v-if="form.errors.email" class="mt-1 ml-1 text-sm text-red-600">{{ form.errors.email }}</div>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label class="mb-2 ml-1 block text-sm font-semibold text-slate-700 dark:text-slate-300" for="password">{{
                        __('Password')
                    }}</label>
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
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-11 font-medium text-slate-700 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:ring-primary-500/20"
                            :placeholder="__('••••••••')"
                            v-model="form.password"
                            required
                        />
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none dark:hover:text-slate-300"
                        >
                            <svg v-if="!showPassword" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                            </svg>
                            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <label class="mb-2 ml-1 block text-sm font-semibold text-slate-700 dark:text-slate-300" for="password_confirmation">{{
                        __('Confirm')
                    }}</label>
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
                            :type="showConfirmPassword ? 'text' : 'password'"
                            id="password_confirmation"
                            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-11 font-medium text-slate-700 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:ring-primary-500/20"
                            :placeholder="__('••••••••')"
                            v-model="form.password_confirmation"
                            required
                        />
                        <button
                            type="button"
                            @click="showConfirmPassword = !showConfirmPassword"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none dark:hover:text-slate-300"
                        >
                            <svg v-if="!showConfirmPassword" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                            </svg>
                            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="form.errors.password" class="mt-1 ml-1 text-sm text-red-600">{{ form.errors.password }}</div>

            <div class="pt-2">
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="flex w-full transform items-center justify-center space-x-2 rounded-2xl bg-primary-600 py-3 font-bold text-white shadow-xl shadow-primary-200 transition-all hover:bg-primary-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75 dark:shadow-none"
                    :class="{ 'pointer-events-none opacity-80': form.processing }"
                >
                    <span v-if="form.processing">{{ __('Creating account...') }}</span>
                    <span v-else>{{ __('Register') }}</span>
                    <svg
                        v-if="!form.processing"
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
            </div>
        </form>

        <div class="mt-8 border-t border-slate-100 pt-8 text-center lg:hidden dark:border-slate-800">
            <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ __('Already have an account?') }}
                <Link href="/login" class="font-bold text-primary-600 hover:text-primary-700"> {{ __('sign in') }} </Link>
            </p>
        </div>
    </AuthLayout>
</template>
