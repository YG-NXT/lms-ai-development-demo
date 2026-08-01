<script setup lang="ts">
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import { ArrowRight, BookOpen, Clock, GraduationCap, PlayCircle, RotateCcw, Search, SlidersHorizontal, Star } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import tutorialsRoutes from '@/routes/tutorials';

const props = defineProps<{
    courses: Array<{
        id: number;
        title: string;
        slug: string;
        description: string;
        price: number;
        discount_price: number | null;
        is_free: boolean;
        thumbnail: string;
        category: { name: string };
        instructor_name: string;
        has_timeline: boolean;
        start_date: string;
        last_enrollment_date: string;
        all_lessons_count: number;
        reviews_avg_rating: string | number | null;
    }>;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    filters: {
        search?: string;
        category_id?: string | number;
        level?: string;
        price_type?: string;
        sort?: string;
    };
    heroBranding: {
        title: string;
        subtitle: string;
        heroImage: string;
        studentsCount: string;
        coursesCount: string;
        mentorsCount: string;
        successRate: string;
    };
    featuredTutorials: Array<{
        id: number;
        title: string;
        slug: string;
        description: string;
        is_free: boolean;
        thumbnail: string | null;
        duration: string | null;
        level: string;
        sections_count: number;
    }>;
}>();

// SEO: Dynamic meta title based on filters
const seoTitle = computed(() => {
    if (search.value) {
        return `Search "${search.value}" - Online Courses & Tutorials`;
    }
    if (categoryId.value) {
        const category = props.categories.find(c => c.id === Number(categoryId.value));
        if (category) return `${category.name} Courses - Learn Online`;
    }
    return 'Online Learning Platform - Courses & Video Tutorials | Get Certified';
});

// SEO: Dynamic meta description
const seoDescription = computed(() => {
    if (search.value) {
        return `Find courses and tutorials about "${search.value}". Expert-led instruction with hands-on projects and certificates.`;
    }
    if (categoryId.value) {
        const category = props.categories.find(c => c.id === Number(categoryId.value));
        if (category) {
            return `Browse professional ${category.name} courses. Learn from expert instructors with hands-on projects, real-world applications, and industry-recognized certificates.`;
        }
    }
    return `Join ${props.heroBranding.studentsCount || 'thousands'} of learners. Access ${props.heroBranding.coursesCount || 'hundreds'} of expert-led courses and free video tutorials. Start learning today and get certified!`;
});

// SEO: Canonical URL
const canonicalUrl = computed(() => {
    const params = new URLSearchParams();
    if (search.value) params.set('search', search.value);
    if (categoryId.value) params.set('category_id', String(categoryId.value));
    if (level.value) params.set('level', level.value);
    if (priceType.value) params.set('price_type', priceType.value);
    if (sort.value && sort.value !== 'latest') params.set('sort', sort.value);
    const queryString = params.toString();
    return `${window.location.origin}${queryString ? `?${queryString}` : ''}`;
});

// SEO: Organization structured data
const organizationData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Learning Management System',
    url: window.location.origin,
    logo: `${window.location.origin}/images/logo.png`,
    description: props.heroBranding.subtitle,
    numberOfEmployees: props.heroBranding.mentorsCount,
    knowsAbout: props.categories.map(c => c.name),
    sameAs: [
        'https://facebook.com/lms',
        'https://twitter.com/lms',
        'https://linkedin.com/company/lms',
    ],
}));

// SEO: WebSite structured data
const websiteData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Learning Management System',
    url: window.location.origin,
    description: props.heroBranding.subtitle,
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${window.location.origin}/?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
}));

// SEO: ItemList for courses
const coursesStructuredData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Online Courses',
    description: 'Browse our selection of professional online courses',
    numberOfItems: props.courses.length,
    itemListElement: props.courses.slice(0, 10).map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Course',
            name: course.title,
            description: course.description,
            url: `${window.location.origin}/courses/${course.slug}`,
            image: course.thumbnail.startsWith('http') ? course.thumbnail : `${window.location.origin}/storage/${course.thumbnail}`,
            educationalLevel: course.level,
            teaches: course.category?.name,
            offers: {
                '@type': 'Offer',
                price: course.is_free ? '0' : (course.discount_price || course.price).toFixed(2),
                priceCurrency: 'USD',
                availability: course.is_free ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
            },
            aggregateRating: course.reviews_avg_rating ? {
                '@type': 'AggregateRating',
                ratingValue: parseFloat(course.reviews_avg_rating).toFixed(1),
                bestRating: '5',
                worstRating: '0',
            } : undefined,
        },
    })),
}));

// SEO: BreadcrumbList
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
    ],
}));

// SEO: OG Image URL
const ogImageUrl = computed(() => {
    return `${window.location.origin}/images/og-home.jpg`;
});

// SEO: Twitter Image URL
const twitterImageUrl = computed(() => {
    return `${window.location.origin}/images/twitter-home.jpg`;
});

const getThumbnail = (path: string | null) => {
    if (!path) return 'https://images.unsplash.com/photo-1497493234204-5003666579cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
    return path.startsWith('http') ? path : `/storage/${path}`;
};

// Filter states
const search = ref(props.filters.search || '');
const categoryId = ref(props.filters.category_id || '');
const level = ref(props.filters.level || '');
const priceType = ref(props.filters.price_type || '');
const sort = ref(props.filters.sort || 'latest');
const showFilters = ref(false);

const activeFiltersCount = computed(() => {
    let count = 0;
    if (categoryId.value) count++;
    if (level.value) count++;
    if (priceType.value) count++;
    if (sort.value && sort.value !== 'latest') count++;
    return count;
});

// Apply filters
const applyFilters = () => {
    router.get(
        '/',
        {
            search: search.value || undefined,
            category_id: categoryId.value || undefined,
            level: level.value || undefined,
            price_type: priceType.value || undefined,
            sort: sort.value || undefined,
        },
        {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        },
    );
};

// Watch for filter changes with debounce for search
watch(
    search,
    debounce(() => applyFilters(), 500),
);
watch([categoryId, level, priceType, sort], () => applyFilters());

// Reset all filters
const resetFilters = () => {
    search.value = '';
    categoryId.value = '';
    level.value = '';
    priceType.value = '';
    sort.value = 'latest';
    router.get('/', {}, { preserveState: true, preserveScroll: true, replace: true });
};

// Declare translation function type
declare const __: (key: string, replacements?: Record<string, any>) => string;
</script>

<template>
    <PublicLayout :w-full="true">
        <Head>
            <!-- Primary Meta Tags -->
            <title>{{ seoTitle }}</title>
            <meta name="description" :content="seoDescription" />
            <meta name="keywords" :content="`online courses, e-learning, video tutorials, ${props.categories.map(c => c.name).join(', ')}, certification, professional development`" />
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
            <meta name="twitter:image" :content="twitterImageUrl" />
            
            <!-- AI/GSEO: Structured Data via meta tags -->
            <meta name="application/ld+json" :content="JSON.stringify(organizationData)" />
            <meta name="application/ld+json" :content="JSON.stringify(websiteData)" />
            <meta name="application/ld+json" :content="JSON.stringify(coursesStructuredData)" />
            <meta name="application/ld+json" :content="JSON.stringify(breadcrumbData)" />
            
            <!-- AI/GSEO: Additional semantic markup -->
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="author" content="Learning Management System" />
        </Head>

        <!-- Hero Section (More Compact) -->
        <div class="relative overflow-hidden bg-white dark:bg-gray-800">
            <div class="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div class="items-center lg:grid lg:grid-cols-2 lg:gap-12">
                    <div class="text-start">
                        <span
                            class="mb-6 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                        >
                            🚀 {{ __('New Courses Available') }}
                        </span>
                        <h1 class="mb-6 text-4xl leading-[1.1] font-black text-gray-900 lg:text-6xl dark:text-white">
                            {{ props.heroBranding.title }}
                        </h1>
                        <p class="mb-10 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                            {{ props.heroBranding.subtitle }}
                        </p>
                        <div class="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/register"
                                class="group inline-flex items-center justify-center rounded-2xl bg-primary-600 px-8 py-3.5 text-base font-black text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-700 active:scale-95"
                            >
                                {{ __('Start Learning Now') }}
                                <ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                                <a
                                    :href="route('courses.index')"
                                    class="inline-flex items-center justify-center rounded-2xl bg-gray-100 px-8 py-3.5 text-base font-bold text-gray-900 transition-all hover:bg-gray-200 active:scale-95 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                >
                                    {{ __('Browse All Courses') }}
                                </a>
                        </div>
                    </div>
                    <div class="relative mt-12 hidden lg:mt-0 lg:block">
                        <div
                            class="animate-blob absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary-200 opacity-30 mix-blend-multiply blur-3xl filter"
                        ></div>
                        <div
                            class="animate-blob animation-delay-2000 absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-200 opacity-30 mix-blend-multiply blur-3xl filter"
                        ></div>
                        <div
                            class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                        >
                            <img
                                :src="
                                    props.heroBranding.heroImage.startsWith('http')
                                        ? props.heroBranding.heroImage
                                        : `/storage/${props.heroBranding.heroImage}`
                                "
                                alt="Students learning"
                                class="aspect-4/3 h-full w-full object-cover opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Course List Section -->
        <main id="courses" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div class="mb-12 text-start">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="mb-3 text-3xl font-black tracking-tight text-gray-900 dark:text-white">{{ __('Featured Courses') }}</h2>
                        <p class="text-base text-gray-600 dark:text-gray-400">{{ __('Hand-picked courses by our industry experts.') }}</p>
                    </div>
                    <Link
                        :href="route('courses.index')"
                        class="text-sm font-bold text-primary-600 hover:text-primary-700"
                    >
                        View All →
                    </Link>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="sticky top-4 z-40 mb-10 transition-all duration-300">
                <div
                    class="rounded-3xl border border-gray-100 bg-white/90 p-2 shadow-xl shadow-gray-200/40 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/90 dark:shadow-gray-900/40"
                >
                    <div class="flex flex-col gap-3 p-2 md:flex-row md:items-center">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                                <Search :size="20" class="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                v-model="search"
                                type="text"
                                :placeholder="__('Search specific courses, topics, or mentors...')"
                                class="w-full rounded-2xl border-none bg-gray-50/50 py-4 pr-5 pl-12 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-900/50 dark:text-white dark:placeholder:text-gray-500"
                            />
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3">
                            <button
                                @click="showFilters = !showFilters"
                                class="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-95 md:flex-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                :class="{
                                    'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-400':
                                        showFilters,
                                }"
                            >
                                <SlidersHorizontal :size="18" />
                                <span>{{ __('Filters') }}</span>
                                <div
                                    v-if="activeFiltersCount > 0"
                                    class="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-black text-white"
                                >
                                    {{ activeFiltersCount }}
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Expandable Filters -->
                    <div
                        v-show="showFilters"
                        class="overflow-hidden rounded-b-3xl border-t border-gray-100 bg-gray-50/50 transition-all dark:border-gray-700/50 dark:bg-gray-800/50"
                    >
                        <div class="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
                            <!-- Category Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <BookOpen :size="12" />
                                    {{ __('Topic') }}
                                </label>
                                <select
                                    v-model="categoryId"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{{ __('All Topics') }}</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                        {{ cat.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Level Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <GraduationCap :size="12" />
                                    {{ __('Difficulty') }}
                                </label>
                                <select
                                    v-model="level"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{{ __('Any Level') }}</option>
                                    <option value="beginner">{{ __('Beginner') }}</option>
                                    <option value="intermediate">{{ __('Intermediate') }}</option>
                                    <option value="advanced">{{ __('Advanced') }}</option>
                                </select>
                            </div>

                            <!-- Price Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <span class="text-xs leading-none font-bold">$</span>
                                    {{ __('Price') }}
                                </label>
                                <select
                                    v-model="priceType"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{{ __('Any Price') }}</option>
                                    <option value="free">{{ __('Free') }}</option>
                                    <option value="paid">{{ __('Paid') }}</option>
                                </select>
                            </div>

                            <!-- Sort Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <SlidersHorizontal :size="12" />
                                    {{ __('Sort By') }}
                                </label>
                                <select
                                    v-model="sort"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="latest">{{ __('Newest First') }}</option>
                                    <option value="popular">{{ __('Most Popular') }}</option>
                                </select>
                            </div>
                        </div>

                        <!-- Reset Toolbar -->
                        <div class="border-t border-gray-100 bg-white/50 px-6 py-4 dark:border-gray-700/50 dark:bg-gray-900/50">
                            <button
                                @click="resetFilters"
                                class="flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                            >
                                <RotateCcw :size="14" />
                                {{ __('Reset All Filters') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Compact Courses Grid -->
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div
                    v-for="course in courses"
                    :key="course.id"
                    class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                >
                    <Link :href="`/courses/${course.slug}`" class="flex h-full flex-col">
                        <div class="relative aspect-video overflow-hidden">
                            <img
                                :src="getThumbnail(course.thumbnail)"
                                :alt="course.title"
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div
                                class="absolute top-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-black tracking-widest text-primary-600 uppercase backdrop-blur dark:bg-gray-800/90"
                            >
                                {{ course.category?.name }}
                            </div>
                            <!-- Timeline Info if upcoming -->
                            <div
                                v-if="course.has_timeline && course.last_enrollment_date"
                                class="absolute right-3 bottom-3 rounded-lg bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg"
                            >
                                <span class="flex items-center gap-1">
                                    <Clock :size="10" />
                                    {{ __('Enrolling till :date', { date: new Date(course.last_enrollment_date).toLocaleDateString() }) }}
                                </span>
                            </div>
                            <div
                                v-else-if="!course.has_timeline"
                                class="absolute right-3 bottom-3 rounded-lg bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg"
                            >
                                <span class="flex items-center gap-1">
                                    <GraduationCap :size="10" />
                                    {{ __('Always Open') }}
                                </span>
                            </div>
                        </div>

                        <div class="flex flex-1 flex-col p-5 text-start">
                            <h3
                                class="mb-2 line-clamp-1 text-lg font-bold tracking-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white"
                            >
                                {{ course.title }}
                            </h3>
                            <p class="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                                {{ course.description }}
                            </p>

                            <div class="mt-auto items-center space-y-4 pt-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <div
                                            class="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-primary-400 to-indigo-400 text-[10px] font-black text-white"
                                        >
                                            {{ course.instructor_name?.charAt(0) }}
                                        </div>
                                        <p class="text-[11px] font-bold text-gray-700 dark:text-gray-300">{{ course.instructor_name }}</p>
                                    </div>
                                    <div
                                        v-if="course.reviews_avg_rating && Number(course.reviews_avg_rating) > 0"
                                        class="flex items-center gap-1 rounded bg-yellow-400/10 px-1.5 py-0.5"
                                        title="Average Rating"
                                    >
                                        <Star class="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                        <span class="text-[10px] font-black text-yellow-700 dark:text-yellow-500">{{
                                            Number(course.reviews_avg_rating).toFixed(1)
                                        }}</span>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between border-t border-gray-50 pt-4 dark:border-gray-700">
                                    <div class="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                        <BookOpen :size="14" class="opacity-40" />
                                        <span>{{ course.all_lessons_count }} {{ __('Lessons') }}</span>
                                    </div>
                                    <div>
                                        <p v-if="course.is_free" class="text-lg font-black text-green-600">FREE</p>
                                        <div v-else class="flex items-center gap-2">
                                            <template v-if="course.discount_price && Number(course.discount_price) < Number(course.price)">
                                                <p class="text-lg font-black text-gray-900 dark:text-white">
                                                    ${{ Number(course.discount_price).toFixed(2) }}
                                                </p>
                                                <div class="flex flex-col text-[10px] leading-tight font-bold">
                                                    <span class="text-gray-400 line-through">${{ Number(course.price).toFixed(2) }}</span>
                                                    <span class="text-rose-500"
                                                        >{{ Math.round((1 - Number(course.discount_price) / Number(course.price)) * 100) }}% OFF</span
                                                    >
                                                </div>
                                            </template>
                                            <p v-else class="text-lg font-black text-gray-900 dark:text-white">
                                                ${{ Number(course.price).toFixed(2) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <!-- Empty State -->
            <div
                v-if="courses.length === 0"
                class="rounded-[2.5rem] border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
                <BookOpen class="mx-auto mb-6 h-16 w-16 text-gray-300 dark:text-gray-600" />
                <h3 class="mb-2 text-xl font-black text-gray-900 dark:text-white">{{ __('No courses found') }}</h3>
                <p class="mx-auto max-w-sm text-sm text-gray-600 dark:text-gray-400">
                    {{ __("We couldn't find any courses matching your selection. Try adjusting your filters!") }}
                </p>
                <button @click="resetFilters" class="mt-6 font-bold text-primary-600 hover:underline">
                    {{ __('Reset all filters') }}
                </button>
            </div>
        </main>

        <!-- Free Tutorials Section -->
        <div v-if="featuredTutorials && featuredTutorials.length > 0" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-12 flex items-center justify-between">
                <div>
                    <h2 class="text-3xl font-black text-gray-900 dark:text-white">Free Tutorials</h2>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">Learn from expert-led tutorials — no registration required.</p>
                </div>
                <Link
                    :href="tutorialsRoutes.index.url()"
                    class="text-sm font-bold text-primary-600 hover:text-primary-700"
                >
                    View All →
                </Link>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    v-for="tutorial in featuredTutorials"
                    :key="tutorial.id"
                    :href="tutorialsRoutes.show.url(tutorial.slug)"
                    class="group block rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                >
                    <div class="relative aspect-video overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                        <img
                            v-if="tutorial.thumbnail"
                            :src="getThumbnail(tutorial.thumbnail)"
                            :alt="tutorial.title"
                            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div v-else class="flex h-full items-center justify-center">
                            <PlayCircle :size="48" class="text-gray-300 dark:text-gray-600" />
                        </div>
                        <div class="absolute top-3 right-3 rounded-full bg-green-500 px-2.5 py-1 text-xs font-bold text-white">
                            Free
                        </div>
                    </div>
                    <div class="p-5">
                        <h3 class="mb-2 line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-primary-600 dark:text-white">
                            {{ tutorial.title }}
                        </h3>
                        <p class="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{{ tutorial.description }}</p>
                        <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span class="flex items-center gap-1"><Clock :size="12" /> {{ tutorial.duration ?? 'N/A' }}</span>
                            <span class="flex items-center gap-1"><BookOpen :size="12" /> {{ tutorial.sections_count }} sections</span>
                            <span class="flex items-center gap-1"><GraduationCap :size="12" /> {{ tutorial.level }}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="relative overflow-hidden bg-primary-600 py-16">
            <div class="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10">
                <div class="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-8 border-white"></div>
                <div class="absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 transform rounded-full border-8 border-white"></div>
            </div>
            <div class="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 md:gap-12">
                <div class="text-white">
                    <p class="mb-1 text-4xl font-black tracking-tighter">{{ props.heroBranding.studentsCount }}</p>
                    <p class="text-[10px] font-bold tracking-widest text-primary-100 uppercase">{{ __('Active Students') }}</p>
                </div>
                <div class="text-white">
                    <p class="mb-1 text-4xl font-black tracking-tighter">{{ props.heroBranding.coursesCount }}</p>
                    <p class="text-[10px] font-bold tracking-widest text-primary-100 uppercase">{{ __('Premium Courses') }}</p>
                </div>
                <div class="text-white">
                    <p class="mb-1 text-4xl font-black tracking-tighter">{{ props.heroBranding.mentorsCount }}</p>
                    <p class="text-[10px] font-bold tracking-widest text-primary-100 uppercase">{{ __('Expert Mentors') }}</p>
                </div>
                <div class="text-white">
                    <p class="mb-1 text-4xl font-black tracking-tighter">{{ props.heroBranding.successRate }}</p>
                    <p class="text-[10px] font-bold tracking-widest text-primary-100 uppercase">{{ __('Success Rate') }}</p>
                </div>
            </div>
        </div>
    </PublicLayout>
</template>

<style scoped>
@keyframes blob {
    0% {
        transform: scale(1);
    }
    33% {
        transform: scale(1.1);
    }
    66% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
}
.animate-blob {
    animation: blob 7s infinite;
}
.animation-delay-2000 {
    animation-delay: 2s;
}
</style>
