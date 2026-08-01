<script setup lang="ts">
import { index as verifyIndex } from '@/actions/App/Http/Controllers/Public/VerificationController';
import { download } from '@/actions/App/Http/Controllers/Student/CertificateController';
import { index as studentHome } from '@/actions/App/Http/Controllers/Student/DashboardController';
import Pagination from '@/Components/Pagination.vue';
import StudentLayout from '@/Layouts/StudentLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { Award, Calendar, ChevronRight, Download, ExternalLink, FileBadge, Hash } from 'lucide-vue-next';
import { PropType } from 'vue';

const props = defineProps({
    certificates: {
        type: Object as PropType<any>,
        default: () => ({ data: [], links: [] }),
    },
});

const downloadCertificate = (id: number | { id: number }) => {
    (window as any).open(download.url(id), '_blank');
};
</script>

<template>
    <Head :title="__('My Certificates')" />

    <StudentLayout>
        <div class="h-full">
            <div class="animate-fade-in mx-auto max-w-6xl space-y-8 pb-12">
                <!-- Header -->
                <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <h1 class="flex items-center gap-4 text-3xl font-black text-slate-900 dark:text-white">
                            <Award class="text-primary-600" :size="36" />
                            {{ __('My Certificates') }}
                        </h1>
                        <p class="mt-2 font-medium text-slate-500 dark:text-slate-400">
                            {{ __('Celebrate your achievements and download your earned certifications.') }}
                        </p>
                    </div>
                </div>

                <!-- Certificates Grid -->
                <div v-if="certificates.data.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="certificate in certificates.data"
                        :key="certificate.id"
                        class="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div class="flex h-full flex-col">
                            <div class="mb-6 flex items-start justify-between">
                                <div
                                    class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/10"
                                >
                                    <FileBadge :size="28" />
                                </div>
                                <span class="rounded-lg bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-400 dark:bg-slate-800">
                                    #{{ certificate.verification_code }}
                                </span>
                            </div>

                            <h3 class="mb-4 line-clamp-2 text-lg font-bold text-slate-900 dark:text-white">
                                {{ certificate.course.title }}
                            </h3>

                            <div class="mt-auto space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <div class="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar :size="16" />
                                    <span>{{ __('Issued on:') }} {{ new Date(certificate.issued_at).toLocaleDateString() }}</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm text-slate-500">
                                    <Hash :size="16" />
                                    <span>{{ certificate.certificate_id }}</span>
                                </div>
                            </div>

                            <div class="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    @click="downloadCertificate(certificate.id)"
                                    class="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-700"
                                >
                                    <Download :size="18" />
                                    {{ __('Download') }}
                                </button>
                                <a
                                    :href="verifyIndex.url({ query: { code: certificate.verification_code } })"
                                    target="_blank"
                                    class="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                >
                                    <ExternalLink :size="18" />
                                    {{ __('Verify') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="rounded-[3rem] border border-slate-200 bg-white p-16 text-center dark:border-slate-800 dark:bg-slate-900">
                    <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-300 dark:bg-slate-800">
                        <Award :size="48" />
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">{{ __('No certificates yet') }}</h3>
                    <p class="mx-auto mb-8 max-w-sm text-slate-500 dark:text-slate-400">
                        {{ __('Complete your courses to earn certifications and build your professional portfolio.') }}
                    </p>
                    <Link :href="studentHome.url()" class="inline-flex items-center gap-2 font-bold text-primary-600 hover:underline">
                        {{ __('Continue Learning') }}
                        <ChevronRight :size="18" />
                    </Link>
                </div>

                <div v-if="certificates.data.length > 0">
                    <Pagination :links="certificates.links" />
                </div>
            </div>
        </div>
    </StudentLayout>
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
