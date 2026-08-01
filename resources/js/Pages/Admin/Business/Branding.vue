<script setup lang="ts">
import { update } from '@/actions/App/Http/Controllers/Admin/BusinessSettingController';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { Briefcase, Camera, Facebook, Info, Instagram, Link as LinkIcon, Mail, MapPin, Palette, Phone, Save, Twitter, Upload } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps({
    settings: {
        type: Object,
        default: () => ({}),
    },
    default_colors: {
        type: Object,
        default: () => ({
            primary: '#179753ff',
            primary_light: '#ecfdf5',
            primary_dark_text: '#6ee7b7',
            secondary: '#64748b',
            admin: {
                sidebar_rail_bg: '#064e3b',
                sidebar_rail_bg_dark: '#022c22',
                sidebar_icon_color: '#ffffffff',
                sidebar_icon_color_dark: '#ffffffff',
            },
        }),
    },
});

const form = useForm({
    business_name: props.settings.business_name || 'Nexus Global Corp',
    tagline: props.settings.tagline || 'Innovating the future of enterprise',
    industry: props.settings.industry || 'Technology & SaaS',

    logo_url: props.settings.logo_url || 'https://api.dicebear.com/7.x/initials/svg?seed=Nexus&backgroundColor=0284c7',
    favicon_url: props.settings.favicon_url || 'https://api.dicebear.com/7.x/initials/svg?seed=N',
    cover_url: props.settings.cover_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',

    primary: props.settings.primary || props.default_colors.primary,
    primary_light: props.settings.primary_light || props.default_colors.primary_light,
    primary_dark_text: props.settings.primary_dark_text || props.default_colors.primary_dark_text,

    secondary: props.settings.secondary || props.default_colors.secondary,

    sidebar_rail_bg: props.settings.sidebar_rail_bg || props.default_colors.admin.sidebar_rail_bg,
    sidebar_rail_bg_dark: props.settings.sidebar_rail_bg_dark || props.default_colors.admin.sidebar_rail_bg_dark,
    sidebar_icon_color: props.settings.sidebar_icon_color || props.default_colors.admin.sidebar_icon_color,
    sidebar_icon_color_dark: props.settings.sidebar_icon_color_dark || props.default_colors.admin.sidebar_icon_color_dark,

    contact_email: props.settings.contact_email || 'contact@nexus-global.io',
    contact_phone: props.settings.contact_phone || '+1 (555) 000-1234',
    contact_address: props.settings.contact_address || 'San Francisco, CA 94103',

    social_facebook: props.settings.social_facebook || '',
    social_twitter: props.settings.social_twitter || '',
    social_instagram: props.settings.social_instagram || '',
});

// File inputs handling
const logoInput = ref<HTMLInputElement | null>(null);
const coverInput = ref<HTMLInputElement | null>(null);
const faviconInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event, key: keyof typeof form) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const url = URL.createObjectURL(file);

        form[key] = file as any;
        previews.value[key] = url;
    }
};

const previews = ref<Record<string, string>>({
    logo_url: props.settings.logo_url || form.logo_url,
    cover_url: props.settings.cover_url || form.cover_url,
    favicon_url: props.settings.favicon_url || form.favicon_url,
});

watch(
    () => props.settings,
    (newSettings) => {
        form.business_name = newSettings.business_name || 'Nexus Global Corp';
        form.tagline = newSettings.tagline || 'Innovating the future of enterprise';
        form.industry = newSettings.industry || 'Technology & SaaS';
        form.logo_url = newSettings.logo_url || 'https://api.dicebear.com/7.x/initials/svg?seed=Nexus&backgroundColor=0284c7';
        form.favicon_url = newSettings.favicon_url || 'https://api.dicebear.com/7.x/initials/svg?seed=N';
        form.cover_url = newSettings.cover_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000';

        form.primary = newSettings.primary || props.default_colors.primary;
        form.primary_light = newSettings.primary_light || props.default_colors.primary_light;
        form.primary_dark_text = newSettings.primary_dark_text || props.default_colors.primary_dark_text;

        form.secondary = newSettings.secondary || props.default_colors.secondary;

        form.sidebar_rail_bg = newSettings.sidebar_rail_bg || props.default_colors.admin.sidebar_rail_bg;
        form.sidebar_rail_bg_dark = newSettings.sidebar_rail_bg_dark || props.default_colors.admin.sidebar_rail_bg_dark;
        form.sidebar_icon_color = newSettings.sidebar_icon_color || props.default_colors.admin.sidebar_icon_color;
        form.sidebar_icon_color_dark = newSettings.sidebar_icon_color_dark || props.default_colors.admin.sidebar_icon_color_dark;

        form.contact_email = newSettings.contact_email || 'contact@nexus-global.io';
        form.contact_phone = newSettings.contact_phone || '+1 (555) 000-1234';
        form.contact_address = newSettings.contact_address || 'San Francisco, CA 94103';
        form.social_facebook = newSettings.social_facebook || '';
        form.social_twitter = newSettings.social_twitter || '';
        form.social_instagram = newSettings.social_instagram || '';

        previews.value = {
            logo_url: newSettings.logo_url || form.logo_url,
            cover_url: newSettings.cover_url || form.cover_url,
            favicon_url: newSettings.favicon_url || form.favicon_url,
        };
    },
    { deep: true },
);

const submit = () => {
    form.post(update.url(), {
        preserveScroll: true,
        onSuccess: () => {
            // Update favicon dynamically if changed
            const faviconUrl = previews.value.favicon_url || props.settings.favicon_url;
            if (faviconUrl) {
                // Force reload to ensure browser picks up new favicon and clears old cache
                window.location.reload();
            } else {
                // If just other settings changed, we can maybe avoid reload, but for consistency:
                window.location.reload();
            }
        },
    });
};

// UI Helpers
const triggerInput = (id: string) => {
    document.getElementById(id)?.click();
};

const triggerFileInput = (refName: 'logoInput' | 'coverInput' | 'faviconInput') => {
    if (refName === 'logoInput') logoInput.value?.click();
    if (refName === 'coverInput') coverInput.value?.click();
    if (refName === 'faviconInput') faviconInput.value?.click();
};
</script>

<template>
    <Head :title="__('Business Branding')" />

    <AdminLayout>
        <div class="h-full">
            <!-- BUSINESS PANE -->
            <div class="animate-fade-in mx-auto max-w-6xl space-y-6">
                <!-- Header -->
                <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <h1 class="text-xl font-extrabold text-slate-900 dark:text-white">{{ __('business_branding') }}</h1>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {{ __("Manage your organization's visual identity and public profile.") }}
                        </p>
                    </div>
                    <div class="flex gap-3">
                        <button
                            @click="submit"
                            :disabled="form.processing"
                            class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 disabled:opacity-70"
                            :style="{
                                backgroundColor: 'var(--brand-primary)',
                                boxShadow: '0 10px 15px -3px var(--brand-primary-transparent, rgba(0,0,0,0.1))',
                            }"
                        >
                            <Save v-if="!form.processing" :size="18" />
                            <span v-if="form.processing">{{ __('Saving...') }}</span>
                            <span v-else>{{ __('Save Changes') }}</span>
                        </button>
                    </div>
                </div>

                <!-- 1. HEADER & COVER SECTION -->
                <div
                    class="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
                >
                    <div class="group relative h-64 bg-slate-200 dark:bg-slate-800">
                        <img :src="previews.cover_url" class="h-full w-full object-cover transition-opacity duration-500" />
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100"
                        >
                            <button
                                @click="triggerFileInput('coverInput')"
                                class="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-6 py-2 font-bold text-white backdrop-blur-md transition-all hover:bg-white/40"
                            >
                                <Camera :size="18" /> {{ __('Change Cover') }}
                            </button>
                            <input type="file" ref="coverInput" class="hidden" accept="image/*" @change="(e) => handleFileChange(e, 'cover_url')" />
                        </div>
                        <div class="absolute inset-x-10 -bottom-12 flex items-end space-x-6 rtl:space-x-reverse">
                            <div class="group/logo relative">
                                <img
                                    :src="previews.logo_url"
                                    class="h-32 w-32 rounded-4xl border-4 border-white bg-white object-contain p-2 shadow-2xl dark:border-slate-900 dark:bg-slate-800"
                                />
                                <button
                                    @click="triggerFileInput('logoInput')"
                                    class="absolute inset-0 flex cursor-pointer items-center justify-center rounded-4xl bg-black/40 text-xs font-bold text-white opacity-0 transition-all group-hover/logo:opacity-100"
                                >
                                    {{ __('Edit') }}
                                </button>
                                <input type="file" ref="logoInput" class="hidden" accept="image/*" @change="(e) => handleFileChange(e, 'logo_url')" />
                            </div>
                            <div class="mb-14 text-start">
                                <h3 class="text-2xl font-black text-white drop-shadow-xl">{{ form.business_name }}</h3>
                                <p class="text-sm font-medium text-white/80 drop-shadow-md">{{ form.tagline }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="px-5 pt-20 pb-5">
                        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div class="space-y-2">
                                <label class="mb-2 block ps-1 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Business Name')
                                }}</label>
                                <input
                                    v-model="form.business_name"
                                    type="text"
                                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                />
                            </div>
                            <div class="space-y-2">
                                <label class="mb-2 block ps-1 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Tagline / Slogan')
                                }}</label>
                                <input
                                    v-model="form.tagline"
                                    type="text"
                                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                />
                            </div>
                            <div class="space-y-2">
                                <label class="mb-2 block ps-1 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Industry Type')
                                }}</label>
                                <select
                                    v-model="form.industry"
                                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                >
                                    <option value="Technology & SaaS">{{ __('Technology & SaaS') }}</option>
                                    <option value="Healthcare">{{ __('Healthcare') }}</option>
                                    <option value="Finance">{{ __('Finance') }}</option>
                                    <option value="E-commerce">{{ __('E-commerce') }}</option>
                                    <option value="Retail">{{ __('Retail') }}</option>
                                    <option value="Education">{{ __('Education') }}</option>
                                    <option value="Others">{{ __('Others') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. VISUAL ASSETS & COLORS -->
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <!-- Assets -->
                    <div
                        class="space-y-5 rounded-4xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <h4 class="mb-6 flex items-center text-sm font-black tracking-widest text-slate-400 uppercase">
                            <LinkIcon class="me-3" :size="16" :style="{ color: 'var(--brand-primary)' }" /> {{ __('Asset Resources') }}
                        </h4>
                        <div class="space-y-6">
                            <!-- Logo -->
                            <div>
                                <label class="mb-2 block ps-1 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Logo')
                                }}</label>
                                <div class="flex items-center gap-4">
                                    <div
                                        class="group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
                                        @click="triggerFileInput('logoInput')"
                                    >
                                        <img :src="previews.logo_url" class="h-full w-full object-contain" />
                                        <div
                                            class="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Camera class="text-white" :size="16" />
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <button
                                            type="button"
                                            @click="triggerFileInput('logoInput')"
                                            class="hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 text-xs font-bold text-slate-700 transition-colors dark:text-slate-300"
                                        >
                                            <Upload :size="12" /> {{ __('Upload New Logo') }}
                                        </button>
                                        <p class="mt-1 text-[10px] text-slate-400">{{ __('Recommended: 512x512px PNG') }}</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref="logoInput"
                                        class="hidden"
                                        accept="image/*"
                                        @change="(e) => handleFileChange(e, 'logo_url')"
                                    />
                                </div>
                            </div>

                            <!-- Favicon -->
                            <div>
                                <label class="mb-2 block ps-1 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Favicon')
                                }}</label>
                                <div class="flex items-center gap-4">
                                    <div
                                        class="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800"
                                        @click="triggerFileInput('faviconInput')"
                                    >
                                        <img :src="previews.favicon_url" class="h-full w-full object-contain" />
                                        <div
                                            class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Camera class="text-white" :size="14" />
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <button
                                            type="button"
                                            @click="triggerFileInput('faviconInput')"
                                            class="hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 text-xs font-bold text-slate-700 transition-colors dark:text-slate-300"
                                        >
                                            <Upload :size="12" /> {{ __('Upload Favicon') }}
                                        </button>
                                        <p class="mt-1 text-[10px] text-slate-400">{{ __('Recommended: 32x32px or 64x64px PNG/ICO') }}</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref="faviconInput"
                                        class="hidden"
                                        accept="image/x-icon,image/png"
                                        @change="(e) => handleFileChange(e, 'favicon_url')"
                                    />
                                </div>
                            </div>

                            <!-- Cover Image -->
                            <div>
                                <label class="mb-2 block ps-1 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Hero Cover')
                                }}</label>
                                <div
                                    class="group relative h-24 cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
                                    @click="triggerFileInput('coverInput')"
                                >
                                    <img :src="previews.cover_url" class="h-full w-full object-cover" />
                                    <div
                                        class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100"
                                    >
                                        <button
                                            type="button"
                                            class="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur"
                                        >
                                            <Camera :size="12" /> {{ __('Change Cover') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Colors -->
                    <div
                        class="space-y-5 rounded-4xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <h4 class="mb-6 flex items-center text-sm font-black tracking-widest text-slate-400 uppercase">
                            <Palette class="me-3" :size="16" :style="{ color: 'var(--brand-primary)' }" /> {{ __('Brand Colors') }}
                        </h4>
                        <div class="space-y-6">
                            <!-- Helper Text -->
                            <div class="rounded-xl border border-blue-100 bg-blue-50 p-3 dark:border-blue-900/30 dark:bg-blue-900/10">
                                <p class="flex items-start gap-2 text-[11px] text-blue-600 dark:text-blue-400">
                                    <Info :size="14" class="mt-0.5 shrink-0" />
                                    <span>{{
                                        __('Customize your admin panel theme. These colors affect navigation, buttons, and text contrast.')
                                    }}</span>
                                </p>
                            </div>

                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <!-- Primary Palette -->
                                <div class="space-y-4">
                                    <h5
                                        class="border-b border-slate-100 pb-2 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:border-slate-800"
                                    >
                                        {{ __('Primary Palette') }}
                                    </h5>

                                    <div class="space-y-3">
                                        <!-- Primary -->
                                        <div>
                                            <label class="mb-1 block text-start text-[10px] font-bold text-slate-500 dark:text-slate-400">{{
                                                __('Primary Color')
                                            }}</label>
                                            <div class="flex items-center gap-3">
                                                <input
                                                    v-model="form.primary"
                                                    type="color"
                                                    class="h-8 w-14 cursor-pointer rounded border-0 bg-transparent p-0"
                                                />
                                                <input
                                                    v-model="form.primary"
                                                    type="text"
                                                    class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1.5 font-mono text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <!-- Primary Light -->
                                        <div>
                                            <label class="mb-1 block text-start text-[10px] font-bold text-slate-500 dark:text-slate-400">{{
                                                __('Primary Light (soft bg)')
                                            }}</label>
                                            <div class="flex items-center gap-3">
                                                <input
                                                    v-model="form.primary_light"
                                                    type="color"
                                                    class="h-8 w-14 cursor-pointer rounded border-0 bg-transparent p-0"
                                                />
                                                <input
                                                    v-model="form.primary_light"
                                                    type="text"
                                                    class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1.5 font-mono text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <!-- Primary Dark Text -->
                                        <div>
                                            <label class="mb-1 block text-start text-[10px] font-bold text-slate-500 dark:text-slate-400">{{
                                                __('Primary Dark Text (for dark mode)')
                                            }}</label>
                                            <div class="flex items-center gap-3">
                                                <input
                                                    v-model="form.primary_dark_text"
                                                    type="color"
                                                    class="h-8 w-14 cursor-pointer rounded border-0 bg-transparent p-0"
                                                />
                                                <input
                                                    v-model="form.primary_dark_text"
                                                    type="text"
                                                    class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1.5 font-mono text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Secondary & Sidebar -->
                                <div class="space-y-4">
                                    <h5
                                        class="border-b border-slate-100 pb-2 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:border-slate-800"
                                    >
                                        {{ __('Secondary & Sidebar') }}
                                    </h5>

                                    <div class="space-y-3">
                                        <!-- Secondary -->
                                        <div>
                                            <label class="mb-1 block text-start text-[10px] font-bold text-slate-500 dark:text-slate-400">{{
                                                __('Secondary Color')
                                            }}</label>
                                            <div class="flex items-center gap-3">
                                                <input
                                                    v-model="form.secondary"
                                                    type="color"
                                                    class="h-8 w-14 cursor-pointer rounded border-0 bg-transparent p-0"
                                                />
                                                <input
                                                    v-model="form.secondary"
                                                    type="text"
                                                    class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1.5 font-mono text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                />
                                            </div>
                                        </div>

                                        <!-- Sidebar Rail -->
                                        <div class="grid grid-cols-2 gap-3">
                                            <div>
                                                <label class="mb-1 block text-start text-[9px] font-bold text-slate-500 dark:text-slate-400">{{
                                                    __('Sidebar Rail BG')
                                                }}</label>
                                                <div class="flex items-center gap-2">
                                                    <input
                                                        v-model="form.sidebar_rail_bg"
                                                        type="color"
                                                        class="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                                                    />
                                                    <input
                                                        v-model="form.sidebar_rail_bg"
                                                        type="text"
                                                        class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label class="mb-1 block text-start text-[9px] font-bold text-slate-500 dark:text-slate-400">{{
                                                    __('Rail BG (Dark)')
                                                }}</label>
                                                <div class="flex items-center gap-2">
                                                    <input
                                                        v-model="form.sidebar_rail_bg_dark"
                                                        type="color"
                                                        class="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                                                    />
                                                    <input
                                                        v-model="form.sidebar_rail_bg_dark"
                                                        type="text"
                                                        class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Sidebar Icons -->
                                        <div class="grid grid-cols-2 gap-3">
                                            <div>
                                                <label class="mb-1 block text-start text-[9px] font-bold text-slate-500 dark:text-slate-400">{{
                                                    __('Sidebar Icon')
                                                }}</label>
                                                <div class="flex items-center gap-2">
                                                    <input
                                                        v-model="form.sidebar_icon_color"
                                                        type="color"
                                                        class="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                                                    />
                                                    <input
                                                        v-model="form.sidebar_icon_color"
                                                        type="text"
                                                        class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label class="mb-1 block text-start text-[9px] font-bold text-slate-500 dark:text-slate-400">{{
                                                    __('Icon (Dark)')
                                                }}</label>
                                                <div class="flex items-center gap-2">
                                                    <input
                                                        v-model="form.sidebar_icon_color_dark"
                                                        type="color"
                                                        class="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                                                    />
                                                    <input
                                                        v-model="form.sidebar_icon_color_dark"
                                                        type="text"
                                                        class="w-full rounded border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. CONTACT & SOCIAL -->
                <div
                    class="rounded-4xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
                >
                    <h4 class="mb-8 flex items-center text-start text-base font-black text-slate-800 dark:text-white">
                        <Briefcase class="me-4" :size="20" :style="{ color: 'var(--brand-primary)' }" />
                        <span>{{ __('Contact & Connectivity') }}</span>
                    </h4>

                    <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div class="space-y-6">
                            <h5
                                class="border-b border-slate-100 pb-2 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:border-slate-800"
                            >
                                {{ __('Business Details') }}
                            </h5>
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                                        <Mail :size="16" />
                                    </div>
                                    <input
                                        v-model="form.contact_email"
                                        type="email"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                    />
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                                        <Phone :size="16" />
                                    </div>
                                    <input
                                        v-model="form.contact_phone"
                                        type="text"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                    />
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                                        <MapPin :size="16" />
                                    </div>
                                    <input
                                        v-model="form.contact_address"
                                        type="text"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <h5
                                class="border-b border-slate-100 pb-2 text-start text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:border-slate-800"
                            >
                                {{ __('Social Presence') }}
                            </h5>
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20"
                                        :style="{
                                            color: 'var(--brand-primary)',
                                            backgroundColor: 'color-mix(in srgb, var(--brand-primary), transparent 90%)',
                                        }"
                                    >
                                        <Facebook :size="16" />
                                    </div>
                                    <input
                                        v-model="form.social_facebook"
                                        type="text"
                                        :placeholder="__('Facebook Profile URL')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                    />
                                </div>
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/20"
                                        :style="{
                                            color: 'var(--brand-primary)',
                                            backgroundColor: 'color-mix(in srgb, var(--brand-primary), transparent 90%)',
                                        }"
                                    >
                                        <Twitter :size="16" />
                                    </div>
                                    <input
                                        v-model="form.social_twitter"
                                        type="text"
                                        :placeholder="__('Twitter Profile URL')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                    />
                                </div>
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-900/20"
                                        :style="{
                                            color: 'var(--brand-primary)',
                                            backgroundColor: 'color-mix(in srgb, var(--brand-primary), transparent 90%)',
                                        }"
                                    >
                                        <Instagram :size="16" />
                                    </div>
                                    <input
                                        v-model="form.social_instagram"
                                        type="text"
                                        :placeholder="__('Instagram Profile URL')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 transition-all outline-none focus:opacity-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :style="{ '--tw-ring-color': 'var(--brand-primary)' }"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
