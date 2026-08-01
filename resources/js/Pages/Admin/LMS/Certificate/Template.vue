<script setup lang="ts">
import { update } from '@/actions/App/Http/Controllers/Admin/CertificateTemplateController';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { AlignLeft, Building, Camera, FileBadge, Info, Save, Type, Upload, User } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps({
    template: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.template.title || '',
    body_text: props.template.body_text || '',
    instructor_name_label: props.template.instructor_name_label || '',
    organization_name: props.template.organization_name || '',
    logo: null,
    background: null,
    signature: null,
    is_active: props.template.is_active ?? true,
});

const previews = ref({
    logo_url: props.template.logo_url ? `/storage/${props.template.logo_url}` : null,
    background_url: props.template.background_url ? `/storage/${props.template.background_url}` : null,
    signature_url: props.template.signature_url ? `/storage/${props.template.signature_url}` : null,
});

const handleFileChange = (event: Event, key: 'logo' | 'background' | 'signature') => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        (form as any)[key] = file;
        previews.value[`${key}_url` as keyof typeof previews.value] = URL.createObjectURL(file) as any;
    }
};

const submit = () => {
    form.post(update.url(), {
        preserveScroll: true,
    });
};

const triggerFileInput = (id: string) => {
    document.getElementById(id)?.click();
};
</script>

<template>
    <Head :title="__('Certificate Template')" />

    <AdminLayout>
        <div class="h-full">
            <div class="animate-fade-in mx-auto max-w-6xl space-y-6 pb-12">
                <!-- Header -->
                <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <h1 class="flex items-center gap-3 text-xl font-extrabold text-slate-900 dark:text-white">
                            <FileBadge class="text-primary-500" :size="28" />
                            {{ __('Certificate Template') }}
                        </h1>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {{ __('Design and configure the global certificate template issued to students.') }}
                        </p>
                    </div>
                    <div class="flex gap-3">
                        <button
                            @click="submit"
                            :disabled="form.processing"
                            class="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-70"
                        >
                            <Save v-if="!form.processing" :size="18" />
                            <span v-if="form.processing">{{ __('Saving...') }}</span>
                            <span v-else>{{ __('Save Changes') }}</span>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <!-- Basic Information -->
                    <div class="space-y-8 lg:col-span-2">
                        <div class="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 class="mb-6 flex items-center gap-3 text-base font-black text-slate-800 dark:text-white">
                                <AlignLeft class="text-primary-500" :size="20" />
                                {{ __('Content Configuration') }}
                            </h3>

                            <div class="grid grid-cols-1 gap-6">
                                <div class="space-y-2">
                                    <label class="block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                        __('Main Title')
                                    }}</label>
                                    <div class="group relative">
                                        <div
                                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary-500"
                                        >
                                            <Type :size="18" />
                                        </div>
                                        <input
                                            v-model="form.title"
                                            type="text"
                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 font-medium text-slate-900 transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            :placeholder="__('Certificate of Completion')"
                                        />
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                        __('Body Text')
                                    }}</label>
                                    <textarea
                                        v-model="form.body_text"
                                        rows="4"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900 transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        :placeholder="__('has successfully completed the course')"
                                    ></textarea>
                                    <p class="mt-1 text-[10px] text-slate-400 italic">
                                        {{ __('Note: Student name and course title are automatically interpolated.') }}
                                    </p>
                                </div>

                                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div class="space-y-2">
                                        <label class="block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                            __('Instructor/Signatory Label')
                                        }}</label>
                                        <div class="group relative">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary-500"
                                            >
                                                <User :size="18" />
                                            </div>
                                            <input
                                                v-model="form.instructor_name_label"
                                                type="text"
                                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 font-medium text-slate-900 transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                :placeholder="__('Course Instructor')"
                                            />
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <label class="block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                            __('Organization Name')
                                        }}</label>
                                        <div class="group relative">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary-500"
                                            >
                                                <Building :size="18" />
                                            </div>
                                            <input
                                                v-model="form.organization_name"
                                                type="text"
                                                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 font-medium text-slate-900 transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                :placeholder="__('Nexus Global Academy')"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Asset Configuration -->
                        <div class="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h3 class="mb-6 flex items-center gap-3 text-base font-black text-slate-800 dark:text-white">
                                <Upload class="text-primary-500" :size="20" />
                                {{ __('Visual Assets') }}
                            </h3>

                            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <!-- Logo -->
                                <div class="space-y-4">
                                    <label class="block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                        __('Certificate Logo')
                                    }}</label>
                                    <div
                                        @click="triggerFileInput('logo-input')"
                                        class="group relative flex h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition-all hover:border-primary-500 dark:border-slate-700 dark:bg-slate-800"
                                    >
                                        <template v-if="previews.logo_url">
                                            <img :src="previews.logo_url" class="h-full object-contain" />
                                            <div
                                                class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100"
                                            >
                                                <Camera class="text-white" :size="24" />
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Upload class="mb-2 text-slate-300" :size="32" />
                                            <span class="text-xs font-bold text-slate-400">{{ __('Upload Logo') }}</span>
                                        </template>
                                        <input
                                            type="file"
                                            id="logo-input"
                                            class="hidden"
                                            accept="image/*"
                                            @change="(e) => handleFileChange(e, 'logo')"
                                        />
                                    </div>
                                </div>

                                <!-- Signature -->
                                <div class="space-y-4">
                                    <label class="block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                        __('Authorized Signature')
                                    }}</label>
                                    <div
                                        @click="triggerFileInput('signature-input')"
                                        class="group relative flex h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition-all hover:border-primary-500 dark:border-slate-700 dark:bg-slate-800"
                                    >
                                        <template v-if="previews.signature_url">
                                            <img :src="previews.signature_url" class="h-full object-contain" />
                                            <div
                                                class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100"
                                            >
                                                <Camera class="text-white" :size="24" />
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Upload class="mb-2 text-slate-300" :size="32" />
                                            <span class="text-xs font-bold text-slate-400">{{ __('Upload Signature') }}</span>
                                        </template>
                                        <input
                                            type="file"
                                            id="signature-input"
                                            class="hidden"
                                            accept="image/*"
                                            @change="(e) => handleFileChange(e, 'signature')"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar / Help -->
                    <div class="space-y-8">
                        <!-- Preview Card -->
                        <div class="rounded-[2.5rem] bg-primary-600 p-8 text-white shadow-xl shadow-primary-500/20">
                            <h4 class="mb-4 flex items-center gap-2 font-bold">
                                <Info :size="20" />
                                {{ __('Design Tips') }}
                            </h4>
                            <ul class="space-y-4 text-sm opacity-90">
                                <li class="flex items-start gap-3">
                                    <div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white"></div>
                                    <span>{{ __('Use a high-resolution PNG for logo and signature with transparent backgrounds.') }}</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white"></div>
                                    <span>{{ __('Keep the body text concise for better layout on PDF.') }}</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white"></div>
                                    <span>{{ __('Verification URLs are automatically added to the footer.') }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Background Overlay Upload -->
                        <div class="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <label class="mb-4 block ps-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                __('Background Frame')
                            }}</label>
                            <div
                                @click="triggerFileInput('bg-input')"
                                class="group relative flex h-60 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition-all hover:border-primary-500 dark:border-slate-700 dark:bg-slate-800"
                            >
                                <template v-if="previews.background_url">
                                    <img :src="previews.background_url" class="h-full w-full object-cover" />
                                    <div
                                        class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100"
                                    >
                                        <Camera class="text-white" :size="24" />
                                    </div>
                                </template>
                                <template v-else>
                                    <Upload class="mb-2 text-slate-300" :size="32" />
                                    <span class="text-xs font-bold text-slate-400">{{ __('Upload BG Frame') }}</span>
                                </template>
                                <input type="file" id="bg-input" class="hidden" accept="image/*" @change="(e) => handleFileChange(e, 'background')" />
                            </div>
                        </div>
                    </div>
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
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
