<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ChevronLeft, Image as ImageIcon, Save, Sparkles } from 'lucide-vue-next';
import { ref } from 'vue';

interface Settings {
    landing_title: string;
    landing_subtitle: string;
    landing_hero_image: string;
    landing_students_count: string;
    landing_courses_count: string;
    landing_mentors_count: string;
    landing_success_rate: string;
}

const props = defineProps<{
    settings: Settings;
}>();

const form = useForm({
    landing_title: props.settings.landing_title || 'Master New Skills',
    landing_subtitle:
        props.settings.landing_subtitle ||
        'Join thousands of students learning from experts around the world. High-quality courses and professional certificates.',
    landing_hero_image: null as File | null,
    landing_students_count: props.settings.landing_students_count || '15K+',
    landing_courses_count: props.settings.landing_courses_count || '120+',
    landing_mentors_count: props.settings.landing_mentors_count || '45+',
    landing_success_rate: props.settings.landing_success_rate || '98%',
});

const currentImage = ref(props.settings.landing_hero_image || '');
const imagePreview = ref<string | null>(null);

const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        form.landing_hero_image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

const submit = () => {
    form.post(admin.business.brandingSettings.update().url, {
        preserveScroll: true,
        forceFormData: true,
    });
};
</script>

<template>
    <Head title="Branding Settings" />

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
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Landing Page Branding</h2>
                    <p class="mt-1 text-start text-sm text-slate-500 dark:text-slate-400">Customize your landing page hero section and statistics.</p>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/20">
                    <Sparkles :size="24" />
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <!-- Hero Content -->
                <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div class="border-b border-slate-100 pb-6 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/20">
                                <Sparkles :size="22" />
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Hero Section</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Main headline and subtitle for your landing page.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6">
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Landing Title</label>
                            <input
                                v-model="form.landing_title"
                                type="text"
                                required
                                maxlength="255"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="Master New Skills"
                            />
                            <p v-if="form.errors.landing_title" class="text-xs text-red-500">{{ form.errors.landing_title }}</p>
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Landing Subtitle</label>
                            <textarea
                                v-model="form.landing_subtitle"
                                required
                                maxlength="500"
                                rows="3"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="Join thousands of students learning from experts..."
                            ></textarea>
                            <p v-if="form.errors.landing_subtitle" class="text-xs text-red-500">{{ form.errors.landing_subtitle }}</p>
                        </div>
                    </div>
                </div>

                <!-- Hero Image -->
                <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div class="border-b border-slate-100 pb-6 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                                <ImageIcon :size="22" />
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Hero Image</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    Upload a high-quality image for the landing page hero section.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <!-- Current/Preview Image -->
                        <div v-if="imagePreview || currentImage" class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                            <img
                                :src="imagePreview || (currentImage.startsWith('http') ? currentImage : `/storage/${currentImage}`)"
                                alt="Hero preview"
                                class="aspect-video w-full object-cover"
                            />
                        </div>

                        <!-- Upload Input -->
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Upload New Image (Optional)</label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                @change="handleImageChange"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all file:mr-4 file:rounded-xl file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-brand-700 hover:file:bg-brand-100 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                            />
                            <p class="text-xs text-slate-500">Recommended: 1471x980px or similar aspect ratio. Max 2MB. Formats: JPEG, PNG, WebP</p>
                            <p v-if="form.errors.landing_hero_image" class="text-xs text-red-500">{{ form.errors.landing_hero_image }}</p>
                        </div>
                    </div>
                </div>

                <!-- Statistics -->
                <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div class="border-b border-slate-100 pb-6 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                                <Sparkles :size="22" />
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Statistics</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Display impressive numbers to build trust and credibility.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Active Students</label>
                            <input
                                v-model="form.landing_students_count"
                                type="text"
                                required
                                maxlength="20"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="15K+"
                            />
                            <p v-if="form.errors.landing_students_count" class="text-xs text-red-500">{{ form.errors.landing_students_count }}</p>
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Premium Courses</label>
                            <input
                                v-model="form.landing_courses_count"
                                type="text"
                                required
                                maxlength="20"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="120+"
                            />
                            <p v-if="form.errors.landing_courses_count" class="text-xs text-red-500">{{ form.errors.landing_courses_count }}</p>
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Expert Mentors</label>
                            <input
                                v-model="form.landing_mentors_count"
                                type="text"
                                required
                                maxlength="20"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="45+"
                            />
                            <p v-if="form.errors.landing_mentors_count" class="text-xs text-red-500">{{ form.errors.landing_mentors_count }}</p>
                        </div>
                        <div class="space-y-2 text-left">
                            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase">Success Rate</label>
                            <input
                                v-model="form.landing_success_rate"
                                type="text"
                                required
                                maxlength="20"
                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                placeholder="98%"
                            />
                            <p v-if="form.errors.landing_success_rate" class="text-xs text-red-500">{{ form.errors.landing_success_rate }}</p>
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
                            <Sparkles :size="24" />
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-900 dark:text-white">Update Landing Page</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-400">Changes will be visible immediately on the public homepage.</p>
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
