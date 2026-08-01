<script setup lang="ts">
import { index } from '@/actions/App/Http/Controllers/Public/VerificationController';
import { Head, Link, router } from '@inertiajs/vue3';
import { ArrowLeft, Award, Calendar, CheckCircle, Hash, Search, ShieldCheck, XCircle } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps({
    certificate: Object,
    code: String,
    businessName: String,
    businessLogo: String,
});

// SEO: Dynamic meta title based on verification result
const seoTitle = computed(() => {
    if (props.certificate) {
        return `Certificate Verified - ${props.certificate.user?.name} - ${props.certificate.course?.title}`;
    }
    return props.code ? 'Invalid Certificate Code - Verification Failed' : 'Verify Certificate - Learning Management System';
});

// SEO: Dynamic meta description
const seoDescription = computed(() => {
    if (props.certificate) {
        return `Verified certificate for ${props.certificate.user?.name} who completed ${props.certificate.course?.title}. Issued on ${new Date(props.certificate.issued_at).toLocaleDateString()}.`;
    }
    return props.code 
        ? 'This certificate code could not be verified. Please check the code and try again.'
        : 'Verify the authenticity of certificates issued by our Learning Management System. Enter your certificate verification code.';
});

// SEO: Canonical URL
const canonicalUrl = computed(() => {
    const params = props.code ? `?code=${props.code}` : '';
    return `${window.location.origin}/verify-certificate${params}`;
});

// SEO: Certificate structured data (when valid)
const certificateData = computed(() => {
    if (!props.certificate) return null;
    
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOccupationalCredential',
        name: `Certificate of Completion - ${props.certificate.course?.title}`,
        description: `Certificate awarded to ${props.certificate.user?.name} for completing ${props.certificate.course?.title}`,
        credentialCategory: 'Course Completion Certificate',
        recognizedBy: {
            '@type': 'Organization',
            name: props.businessName || 'Learning Management System',
            url: window.location.origin,
        },
        awardedTo: {
            '@type': 'Person',
            name: props.certificate.user?.name,
        },
        datePublished: props.certificate.issued_at,
        identifier: {
            '@type': 'PropertyValue',
            name: 'Certificate ID',
            value: props.certificate.certificate_id,
        },
        about: {
            '@type': 'Course',
            name: props.certificate.course?.title,
            provider: {
                '@type': 'Organization',
                name: props.businessName || 'Learning Management System',
            },
        },
    };
});

// SEO: BreadcrumbList structured data
const breadcrumbData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: window.location.origin,
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Verify Certificate',
            item: `${window.location.origin}/verify-certificate`,
        },
    ],
}));

const searchCode = ref(props.code || '');

const verify = () => {
    if (!searchCode.value) return;
    router.get(
        index.url({
            query: { code: searchCode.value },
        }),
        {},
        {
            preserveState: true,
        },
    );
};
</script>

<template>
    <Head>
        <!-- Primary Meta Tags -->
        <title>{{ seoTitle }}</title>
        <meta name="description" :content="seoDescription" />
        <meta name="keywords" content="certificate verification, verify certificate, authentic certificate, course completion" />
        <link rel="canonical" :href="canonicalUrl" />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" :content="canonicalUrl" />
        <meta property="og:title" :content="seoTitle" />
        <meta property="og:description" :content="seoDescription" />
        <meta property="og:site_name" content="Learning Management System" />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" :content="canonicalUrl" />
        <meta name="twitter:title" :content="seoTitle" />
        <meta name="twitter:description" :content="seoDescription" />
        
        <!-- AI/GSEO: Structured Data via meta tags -->
        <meta v-if="certificateData" name="application/ld+json" :content="JSON.stringify(certificateData)" />
        <meta name="application/ld+json" :content="JSON.stringify(breadcrumbData)" />
        
        <!-- AI/GSEO: Additional semantic markup -->
        <meta name="robots" content="index, follow, noarchive" />
        <meta name="author" content="Learning Management System" />
    </Head>

    <div
        class="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 p-6 selection:bg-primary-500 selection:text-white sm:p-12 dark:bg-slate-950"
    >
        <!-- Decoration Blur -->
        <div class="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
            <div class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary-500/10 blur-[120px]"></div>
            <div class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        </div>

        <div class="animate-fade-in w-full max-w-2xl">
            <!-- Logo area -->
            <div class="mb-12 flex flex-col items-center">
                <Link href="/" class="mb-4 flex items-center gap-3">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-xl shadow-primary-500/20">
                        <Award :size="28" />
                    </div>
                    <span class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{{ businessName }}</span>
                </Link>
                <div class="h-1 w-12 rounded-full bg-primary-600/30"></div>
            </div>

            <div
                class="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 shadow-2xl sm:p-12 dark:border-slate-800 dark:bg-slate-900"
            >
                <h1 class="mb-2 text-center text-2xl font-black text-slate-900 dark:text-white">{{ __('Certificate Verification') }}</h1>
                <p class="mb-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    {{ __('Enter the unique verification code to validate authenticity.') }}
                </p>

                <div class="group relative mx-auto mb-12 max-w-md">
                    <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary-500"
                    >
                        <Hash :size="20" />
                    </div>
                    <input
                        v-model="searchCode"
                        type="text"
                        @keyup.enter="verify"
                        class="w-full rounded-3xl border border-slate-200 bg-slate-50 py-4 pr-4 pl-12 font-mono text-lg tracking-widest text-slate-900 transition-all outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                        placeholder="XXXXXXXXXX"
                    />
                    <button
                        @click="verify"
                        class="absolute top-2 right-2 bottom-2 flex items-center gap-2 rounded-2xl bg-primary-600 px-6 font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700"
                    >
                        <Search :size="18" />
                        <span class="hidden sm:inline">{{ __('Verify') }}</span>
                    </button>
                </div>

                <!-- Result Section -->
                <div v-if="props.code" class="animate-fade-in-up">
                    <div
                        v-if="certificate"
                        class="relative rounded-[2.5rem] border border-emerald-100 bg-emerald-50 p-8 sm:p-10 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                    >
                        <div class="absolute top-6 right-6 text-emerald-500">
                            <CheckCircle :size="48" />
                        </div>

                        <div class="mb-6 flex items-center gap-3 text-xs font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                            <ShieldCheck :size="16" />
                            {{ __('Authentic Certificate Found') }}
                        </div>

                        <div class="space-y-6">
                            <div>
                                <label class="mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Certified Student')
                                }}</label>
                                <div class="text-2xl font-black text-slate-900 dark:text-white">{{ certificate.user.name }}</div>
                            </div>

                            <div>
                                <label class="mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                    __('Course Completed')
                                }}</label>
                                <div class="text-lg font-bold text-slate-700 dark:text-slate-300">{{ certificate.course.title }}</div>
                            </div>

                            <div class="flex flex-wrap gap-8 border-t border-emerald-200 pt-6 dark:border-emerald-500/20">
                                <div>
                                    <label class="mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                        __('Issue Date')
                                    }}</label>
                                    <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        <Calendar :size="14" class="text-slate-400" />
                                        {{ new Date(certificate.issued_at).toLocaleDateString() }}
                                    </div>
                                </div>
                                <div>
                                    <label class="mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                        __('Certificate ID')
                                    }}</label>
                                    <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                        <Hash :size="14" class="text-slate-400" />
                                        {{ certificate.certificate_id }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-else
                        class="rounded-[2.5rem] border border-rose-100 bg-rose-50 p-12 text-center dark:border-rose-500/20 dark:bg-rose-500/10"
                    >
                        <XCircle class="mx-auto mb-4 text-rose-500" :size="64" />
                        <h3 class="text-lg font-bold text-rose-900 dark:text-rose-400">{{ __('Invalid Certificate Code') }}</h3>
                        <p class="mx-auto mt-2 max-w-xs text-sm text-rose-600/70 dark:text-rose-400/60">
                            {{ __('We could not find any certificate associated with this code. Please check for errors.') }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-12 text-center">
                <Link href="/" class="inline-flex items-center gap-2 font-bold text-slate-500 transition-all hover:text-primary-600">
                    <ArrowLeft :size="18" />
                    {{ __('Back to Academy') }}
                </Link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-up {
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
