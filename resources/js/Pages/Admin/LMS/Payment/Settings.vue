<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, useForm } from '@inertiajs/vue3';
import { CreditCard, Landmark, Save, ShieldCheck, Wallet } from 'lucide-vue-next';

interface Settings {
    stripe_enabled: string | number | boolean;
    stripe_key: string;
    stripe_secret: string;
    stripe_mode: string;
    paypal_enabled: string | number | boolean;
    paypal_client_id: string;
    paypal_secret: string;
    paypal_mode: string;
    bkash_enabled: string | number | boolean;
    bkash_app_key: string;
    bkash_app_secret: string;
    bkash_username: string;
    bkash_password: string;
    bkash_mode: string;
}

const props = defineProps<{
    settings: Settings;
}>();

const form = useForm({
    stripe_enabled: props.settings.stripe_enabled == '1' || props.settings.stripe_enabled === true,
    stripe_key: props.settings.stripe_key || '',
    stripe_secret: props.settings.stripe_secret || '',
    stripe_mode: props.settings.stripe_mode || 'sandbox',

    paypal_enabled: props.settings.paypal_enabled == '1' || props.settings.paypal_enabled === true,
    paypal_client_id: props.settings.paypal_client_id || '',
    paypal_secret: props.settings.paypal_secret || '',
    paypal_mode: props.settings.paypal_mode || 'sandbox',

    bkash_enabled: props.settings.bkash_enabled == '1' || props.settings.bkash_enabled === true,
    bkash_app_key: props.settings.bkash_app_key || '',
    bkash_app_secret: props.settings.bkash_app_secret || '',
    bkash_username: props.settings.bkash_username || '',
    bkash_password: props.settings.bkash_password || '',
    bkash_mode: props.settings.bkash_mode || 'sandbox',
});

const submit = () => {
    form.post(admin.paymentSettings.update().url, {
        preserveScroll: true,
    });
};
</script>

<template>
    <Head title="Payment Settings" />

    <AdminLayout>
        <div class="animate-fade-in mx-auto max-w-5xl space-y-8 text-start">
            <!-- Breadcrumbs / Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <div class="mb-2 flex items-center gap-2">
                        <Link :href="admin.dashboard.url()" class="text-slate-400 transition-colors hover:text-brand-600">
                            <ChevronLeft :size="18" />
                        </Link>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">System settings</span>
                    </div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Payment Gateways</h2>
                    <p class="mt-1 text-start text-sm text-slate-500 dark:text-slate-400">
                        Configure and manage your organization's payment processing integrations.
                    </p>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/20">
                    <ShieldCheck :size="24" />
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <!-- Stripe Settings -->
                <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                                <CreditCard :size="22" />
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Stripe Integration</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Manage global card payment processing via Stripe.</p>
                            </div>
                        </div>
                        <label class="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" v-model="form.stripe_enabled" class="peer sr-only" />
                            <div
                                class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                            ></div>
                        </label>
                    </div>

                    <div v-if="form.stripe_enabled" class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Stripe Publishable Key</label>
                            <input
                                v-model="form.stripe_key"
                                type="text"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="pk_test_..."
                            />
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Stripe Secret Key</label>
                            <input
                                v-model="form.stripe_secret"
                                type="password"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="sk_test_..."
                            />
                        </div>
                        <div class="space-y-2 text-left md:col-span-2">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Environment Mode</label>
                            <select
                                v-model="form.stripe_mode"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            >
                                <option value="sandbox">Sandbox / Test</option>
                                <option value="live">Live / Production</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- PayPal Settings -->
                <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">
                                <Wallet :size="22" />
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">PayPal Integration</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Accept payments via PayPal accounts and credit cards.</p>
                            </div>
                        </div>
                        <label class="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" v-model="form.paypal_enabled" class="peer sr-only" />
                            <div
                                class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-indigo-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                            ></div>
                        </label>
                    </div>

                    <div v-if="form.paypal_enabled" class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Client ID</label>
                            <input
                                v-model="form.paypal_client_id"
                                type="text"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Client Secret</label>
                            <input
                                v-model="form.paypal_secret"
                                type="password"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                        </div>
                        <div class="space-y-2 text-left md:col-span-2">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Environment Mode</label>
                            <select
                                v-model="form.paypal_mode"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            >
                                <option value="sandbox">Sandbox / Test</option>
                                <option value="live">Live / Production</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- bKash Settings -->
                <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 dark:bg-pink-900/20">
                                <Landmark :size="22" />
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">bKash Integration</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Enable local payments via bKash (Bangladesh).</p>
                            </div>
                        </div>
                        <label class="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" v-model="form.bkash_enabled" class="peer sr-only" />
                            <div
                                class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-pink-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                            ></div>
                        </label>
                    </div>

                    <div v-if="form.bkash_enabled" class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">App Key</label>
                            <input
                                v-model="form.bkash_app_key"
                                type="text"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">App Secret</label>
                            <input
                                v-model="form.bkash_app_secret"
                                type="password"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Username</label>
                            <input
                                v-model="form.bkash_username"
                                type="text"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Password</label>
                            <input
                                v-model="form.bkash_password"
                                type="password"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                        </div>
                        <div class="space-y-2 text-left md:col-span-2">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Environment Mode</label>
                            <select
                                v-model="form.bkash_mode"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            >
                                <option value="sandbox">Sandbox / Test</option>
                                <option value="live">Live / Production</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Submit Section -->
                <div
                    class="flex items-center justify-between rounded-4xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm dark:border-emerald-900/20 dark:bg-emerald-900/10"
                >
                    <div class="flex items-start gap-4 text-left">
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm dark:bg-slate-800 dark:text-emerald-400"
                        >
                            <ShieldCheck :size="24" />
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-900 dark:text-white">Secure Configuration</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-400">Sensitive credentials are encrypted and stored securely.</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="group flex h-14 items-center gap-2 rounded-4xl bg-brand-600 px-10 font-black text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                    >
                        <Save v-if="!form.processing" :size="20" class="transition-transform group-hover:rotate-12" />
                        <span v-if="form.processing" class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        <span uppercase>{{ form.processing ? 'Updating...' : 'Save Changes' }}</span>
                    </button>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>
