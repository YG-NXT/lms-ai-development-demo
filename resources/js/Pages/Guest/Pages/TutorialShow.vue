<script setup lang="ts">
import PublicLayout from '@/Layouts/PublicLayout.vue';
import * as baseRoutes from '@/routes';
import tutorialsRoutes from '@/routes/tutorials';
import studentTutorialsRoutes from '@/routes/student/tutorials';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Clock, Globe, Lock, PlayCircle, Users, BarChart3, ChevronRight, LogIn, BookOpen } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import CodeRunner from '@/Components/CodeRunner.vue';

const props = defineProps<{
    tutorial: {
        id: number;
        title: string;
        slug: string;
        description: string;
        price: number;
        discount_price: number | null;
        is_free: boolean;
        thumbnail: string | null;
        duration: string | null;
        level: string;
        language: string;
        instructor_name: string | null;
        category: { name: string };
        instructor: { name: string } | null;
        sections: Array<{
            id: number;
            title: string;
            description: string;
            order: number;
            lessons: Array<{
                id: number;
                title: string;
                slug: string;
                description: string;
                content: string;
                video_url: string | null;
                content_type: string;
                order: number;
                duration: string | null;
                is_free: boolean;
            }>;
        }>;
        effective_price: number;
    };
    enrollment: {
        id: number;
        status: string;
        progress: number;
    } | null;
    canAccess: boolean;
}>();

// SEO: Dynamic meta title
const seoTitle = computed(() => {
    const parts = [props.tutorial.title];
    if (props.tutorial.category) parts.push(props.tutorial.category.name);
    if (props.tutorial.is_free) parts.push('Free Tutorial');
    return `${parts.join(' - ')} | Video Tutorial`;
});

// SEO: Dynamic meta description
const seoDescription = computed(() => {
    let desc = props.tutorial.description || `Watch ${props.tutorial.title} tutorial`;
    // Remove HTML tags for clean description
    desc = desc.replace(/<[^>]*>/g, '').substring(0, 157);
    if (desc.length >= 157) desc += '...';
    if (props.tutorial.is_free) desc += ' Free access, no registration required.';
    return desc;
});

// SEO: Canonical URL
const canonicalUrl = computed(() => {
    return `${window.location.origin}/tutorials/${props.tutorial.slug}`;
});

// SEO: Tutorial structured data (JSON-LD)
const tutorialStructuredData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: props.tutorial.title,
    description: props.tutorial.description?.replace(/<[^>]*>/g, ''),
    url: canonicalUrl.value,
    image: props.tutorial.thumbnail 
        ? (props.tutorial.thumbnail.startsWith('http') ? props.tutorial.thumbnail : `${window.location.origin}/storage/${props.tutorial.thumbnail}`)
        : undefined,
    educationalLevel: props.tutorial.level,
    teaches: props.tutorial.category?.name,
    inLanguage: props.tutorial.language,
    provider: {
        '@type': 'Organization',
        name: 'Learning Management System',
        sameAs: window.location.origin,
    },
    offers: {
        '@type': 'Offer',
        price: props.tutorial.is_free ? '0' : props.tutorial.effective_price.toFixed(2),
        priceCurrency: 'USD',
        availability: props.tutorial.is_free ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    },
    hasPart: props.tutorial.sections?.flatMap(section => 
        section.lessons.map(lesson => ({
            '@type': 'ListItem',
            position: lesson.order,
            item: {
                '@type': 'VideoObject',
                name: lesson.title,
                description: lesson.description,
                duration: lesson.duration ? `PT${lesson.duration}M` : undefined,
                embedUrl: lesson.video_url,
            },
        }))
    ),
}));

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
            name: 'Tutorials',
            item: `${window.location.origin}/tutorials`,
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: props.tutorial.title,
            item: canonicalUrl.value,
        },
    ],
}));

// SEO: OG Image URL
const ogImageUrl = computed(() => {
    if (!props.tutorial.thumbnail) return `${window.location.origin}/images/og-tutorial.jpg`;
    return props.tutorial.thumbnail.startsWith('http') 
        ? props.tutorial.thumbnail 
        : `${window.location.origin}/storage/${props.tutorial.thumbnail}`;
});

const activeSection = ref(-1);
const enrollForm = useForm({});

const getThumbnail = (path: string | null) => {
    if (!path) return 'https://images.unsplash.com/photo-1497493234204-5003666579cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
    return path.startsWith('http') ? path : `/storage/${path}`;
};

const codeBlocks = computed(() => {
    const blocks: any[] = [];
    let id = 0;
    const content = props.tutorial.description || '';
    const regex = /<pre><code[^>]*class="[^"]*language-([^"]+)[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        blocks.push({
            id: id++,
            language: match[1],
            code: match[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
        });
    }
    return blocks;
});

const descriptionWithoutCode = computed(() => {
    return (props.tutorial.description || '').replace(/<pre><code[^>]*class="[^"]*language-[^"]+"[^>]*>[\s\S]*?<\/code><\/pre>/gi, '');
});

const enroll = () => {
    enrollForm.post(studentTutorialsRoutes.enroll.url(props.tutorial.id), {
        onSuccess: () => {
            props.enrollment = { id: 0, status: 'active', progress: 0 };
        },
    });
};
</script>

<template>
    <Head>
        <!-- Primary Meta Tags -->
        <title>{{ seoTitle }}</title>
        <meta name="description" :content="seoDescription" />
        <meta name="keywords" :content="`${props.tutorial.title}, ${props.tutorial.category?.name || ''}, video tutorial, ${props.tutorial.is_free ? 'free tutorial' : ''}, ${props.tutorial.level}`" />
        <link rel="canonical" :href="canonicalUrl" />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" :content="canonicalUrl" />
        <meta property="og:title" :content="seoTitle" />
        <meta property="og:description" :content="seoDescription" />
        <meta property="og:image" :content="ogImageUrl" />
        <meta property="og:site_name" content="Learning Management System" />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" :content="canonicalUrl" />
        <meta name="twitter:title" :content="seoTitle" />
        <meta name="twitter:description" :content="seoDescription" />
        <meta name="twitter:image" :content="ogImageUrl" />
        
        <!-- AI/GSEO: Structured Data via meta tags -->
        <meta name="application/ld+json" :content="JSON.stringify(tutorialStructuredData)" />
        <meta name="application/ld+json" :content="JSON.stringify(breadcrumbData)" />
        
        <!-- AI/GSEO: Additional semantic markup -->
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Learning Management System" />
        <meta property="article:published_time" :content="new Date().toISOString()" />
        <meta property="article:modified_time" :content="new Date().toISOString()" />
    </Head>

    <PublicLayout>
        <Head :title="tutorial.title" />

        <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div class="mb-6">
                <Link
                    :href="tutorialsRoutes.index.url()"
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                    <ArrowLeft :size="16" />
                    Back to Tutorials
                </Link>
            </div>

            <div class="relative mb-8 overflow-hidden rounded-2xl bg-slate-900">
                <img
                    v-if="tutorial.thumbnail"
                    :src="getThumbnail(tutorial.thumbnail)"
                    :alt="tutorial.title"
                    class="h-64 w-full object-cover opacity-60"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div class="absolute bottom-6 left-6 right-6">
                    <h1 class="text-3xl font-bold text-white">{{ tutorial.title }}</h1>
                    <div class="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <span class="flex items-center gap-1"><Clock :size="14" /> {{ tutorial.duration ?? 'N/A' }}</span>
                        <span class="flex items-center gap-1"><Globe :size="14" /> {{ tutorial.language }}</span>
                        <span class="flex items-center gap-1"><Users :size="14" /> {{ tutorial.level }}</span>
                        <span class="flex items-center gap-1"><BookOpen :size="14" /> {{ tutorial.category?.name }}</span>
                    </div>
                </div>
            </div>

            <div v-if="tutorial.is_free" class="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <PlayCircle :size="16" />
                Free Tutorial — No registration required
            </div>

            <div v-if="!tutorial.is_free && !canAccess" class="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <Lock :size="48" class="mx-auto mb-4 text-gray-400" />
                <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">This is a paid tutorial</h2>
                <p class="mb-6 text-gray-600 dark:text-gray-400">
                    Enroll to access the full curriculum, lessons, and downloadable resources.
                </p>
                <div class="mb-4 text-3xl font-black text-primary-600">
                    ${{ Number(tutorial.effective_price).toFixed(2) }}
                </div>
                <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        :href="baseRoutes.login.url()"
                        class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700"
                    >
                        <LogIn :size="16" />
                        Login to Enroll
                    </Link>
                    <Link
                        v-if="!tutorial.is_free"
                        :href="baseRoutes.register.url()"
                        class="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-600 px-6 py-3 text-sm font-bold text-primary-600 transition-all hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400"
                    >
                        Create Account
                    </Link>
                </div>
            </div>

            <div v-if="canAccess" class="space-y-8">
                <div class="flex items-center gap-4">
                    <template v-if="!enrollment && !tutorial.is_free">
                        <button
                            @click="enroll"
                            :disabled="enrollForm.processing"
                            class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-50"
                        >
                            <PlayCircle :size="16" />
                            {{ enrollForm.processing ? 'Enrolling...' : 'Enroll Now' }}
                        </button>
                    </template>
                    <span v-else-if="enrollment" class="inline-flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <BarChart3 :size="14" />
                        Enrolled
                    </span>
                    <span v-if="!tutorial.is_free" class="text-sm text-gray-500 dark:text-gray-400">
                        ${{ Number(tutorial.effective_price).toFixed(2) }}
                    </span>
                </div>

                <div v-if="tutorial.description" class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">About This Tutorial</h2>
                    <div class="mt-2 prose max-w-none dark:prose-invert text-sm text-gray-600 dark:text-gray-300">
                        <div v-html="descriptionWithoutCode"></div>
                    </div>
                    <div v-for="block in codeBlocks" :key="block.id" class="mt-4">
                        <CodeRunner :language="block.language" :code="block.code" :title="block.language" />
                    </div>
                </div>

                <div v-if="tutorial.sections && tutorial.sections.length > 0" class="space-y-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">Curriculum</h2>

                    <div v-for="(section, sIdx) in tutorial.sections" :key="section.id" class="rounded-xl border border-gray-200 bg-white overflow-hidden dark:border-gray-700 dark:bg-gray-800">
                        <button
                            @click="activeSection = activeSection === sIdx ? -1 : sIdx"
                            class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                        >
                            <span>
                                {{ section.title }}
                                <span class="ml-2 text-xs font-normal text-gray-400">
                                    ({{ section.lessons.length }} lessons)
                                </span>
                            </span>
                            <ChevronRight
                                :size="16"
                                class="transition-transform"
                                :class="activeSection === sIdx ? 'rotate-90' : ''"
                            />
                        </button>

                        <div v-show="activeSection === sIdx" class="border-t border-gray-100 dark:border-gray-700">
                            <div
                                v-for="(lesson, lIdx) in section.lessons"
                                :key="lesson.id"
                                class="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                :class="lIdx !== section.lessons.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''"
                            >
                                <Lock v-if="lesson.is_free" :size="14" class="text-gray-400" />
                                <PlayCircle v-else :size="14" class="text-primary-500" />
                                <span class="flex-1 text-gray-700 dark:text-gray-300">{{ lesson.title }}</span>
                                <span v-if="lesson.duration" class="text-xs text-gray-400">{{ lesson.duration }} min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
</template>
