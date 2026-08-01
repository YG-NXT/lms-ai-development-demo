<script setup lang="ts">
import PublicLayout from '@/Layouts/PublicLayout.vue';
import AdZone from '@/Components/AdZone.vue';
import coursesRoutes from '@/routes/courses';
import { Head, Link, router } from '@inertiajs/vue3';
import {
    BookOpen, Clock, GraduationCap, RotateCcw, Search, SlidersHorizontal, Star, Users,
} from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    courses: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            description: string;
            price: string | number;
            discount_price: string | number | null;
            is_free: boolean;
            thumbnail: string;
            category: { name: string } | null;
            instructor: { name: string; avatar: string | null } | null;
            instructor_name: string;
            level: string;
            duration: string | null;
            all_lessons_count: number;
            reviews_avg_rating: string | number | null;
            has_timeline: boolean;
            start_date: string | null;
        }>;
        total: number;
        current_page: number;
        last_page: number;
    };
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
    ads?: {
        header?: Array<{
            id: number;
            zone_id: string;
            position: string;
            ad_code: string;
            width: number | null;
            height: number | null;
        }>;
        sidebar?: Array<any>;
        between_courses?: Array<any>;
    };
}>();

const search = ref(props.filters?.search ?? '');
const categoryId = ref(props.filters?.category_id ?? '');
const level = ref(props.filters?.level ?? '');
const priceType = ref(props.filters?.price_type ?? '');
const sort = ref(props.filters?.sort ?? 'latest');
const showFilters = ref(false);

const activeFiltersCount = computed(() => {
    let count = 0;
    if (search.value) count++;
    if (categoryId.value) count++;
    if (level.value) count++;
    if (priceType.value) count++;
    if (sort.value !== 'latest') count++;
    return count;
});

// SEO: Dynamic meta title based on filters
const seoTitle = computed(() => {
    const parts = ['Online Courses'];
    if (search.value) parts.push(`"${search.value}"`);
    if (categoryId.value) {
        const category = props.categories.find(c => c.id === Number(categoryId.value));
        if (category) parts.push(category.name);
    }
    if (level.value) parts.push(level.value.charAt(0).toUpperCase() + level.value.slice(1));
    if (priceType.value === 'free') parts.push('Free');
    return `${parts.join(' - ')} | Learn & Get Certified`;
});

// SEO: Dynamic meta description based on filters
const seoDescription = computed(() => {
    let desc = `Explore ${props.courses.total} professional online courses`;
    if (search.value) desc += ` about "${search.value}"`;
    if (categoryId.value) {
        const category = props.categories.find(c => c.id === Number(categoryId.value));
        if (category) desc += ` in ${category.name}`;
    }
    if (level.value) desc += ` at ${level.value} level`;
    if (priceType.value === 'free') desc += ' available for free';
    desc += '. Expert instructors, hands-on projects, and certificates. Enroll now!';
    return desc;
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
    return `${window.location.origin}/courses${queryString ? `?${queryString}` : ''}`;
});

// SEO: Structured data for ItemList (Google Rich Results)
const structuredData = computed(() => {
    const items = props.courses.data.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Course',
            name: course.title,
            description: course.description,
            url: `${window.location.origin}/courses/${course.slug}`,
            image: course.thumbnail ? getCourseImageUrl(course.thumbnail) : undefined,
            educationalLevel: course.level,
            teaches: course.category?.name,
            provider: {
                '@type': 'Organization',
                name: 'Learning Management System',
            },
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: course.has_timeline ? 'scheduled' : 'online',
                startDate: course.start_date || undefined,
            },
            offers: {
                '@type': 'Offer',
                price: course.is_free ? '0' : (course.discount_price && parseFloat(String(course.discount_price)) > 0 ? parseFloat(String(course.discount_price)) : parseFloat(String(course.price))).toFixed(2),
                priceCurrency: 'USD',
                availability: course.is_free ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
            },
            aggregateRating: course.reviews_avg_rating ? {
                '@type': 'AggregateRating',
                ratingValue: parseFloat(String(course.reviews_avg_rating)).toFixed(1),
                bestRating: '5',
                worstRating: '0',
            } : undefined,
        },
    }));

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: seoTitle.value,
        description: seoDescription.value,
        numberOfItems: props.courses.total,
        itemListElement: items,
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
            name: 'Courses',
            item: `${window.location.origin}/courses`,
        },
    ],
}));

// SEO: Organization structured data
const organizationData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Learning Management System',
    url: window.location.origin,
    logo: `${window.location.origin}/images/logo.png`,
    sameAs: [
        'https://facebook.com/lms',
        'https://twitter.com/lms',
        'https://linkedin.com/company/lms',
    ],
}));

// SEO: OG Image URL
const getCourseImageUrl = (thumbnail: string | null | undefined): string => {
    if (!thumbnail) return 'https://images.unsplash.com/photo-1522202176988-66273c2fd555?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
    return thumbnail.startsWith('http') ? thumbnail : `/storage/${thumbnail}`;
};

const getImageUrl = (thumbnail: string | null | undefined, defaultImage: string): string => {
    if (!thumbnail) return `${window.location.origin}/${defaultImage}`;
    return thumbnail.startsWith('http') 
        ? thumbnail 
        : `${window.location.origin}/storage/${thumbnail}`;
};

// SEO: OG Image URL
const ogImageUrl = computed(() => {
    const firstCourse = props.courses.data[0];
    return getImageUrl(firstCourse?.thumbnail, 'images/og-courses.jpg');
});

// SEO: Twitter Image URL
const twitterImageUrl = computed(() => {
    const firstCourse = props.courses.data[0];
    return getImageUrl(firstCourse?.thumbnail, 'images/twitter-courses.jpg');
});

const applyFilters = () => {
    router.get(
        coursesRoutes.index.url(),
        {
            search: search.value || undefined,
            category_id: categoryId.value || undefined,
            level: level.value || undefined,
            price_type: priceType.value || undefined,
            sort: sort.value || undefined,
        },
        { preserveState: true, preserveScroll: true, replace: true },
    );
};

const resetFilters = () => {
    search.value = '';
    categoryId.value = '';
    level.value = '';
    priceType.value = '';
    sort.value = 'latest';
    applyFilters();
};

const getPriceText = (course: any) => {
    if (course.is_free) {
        return 'Free';
    }
    const price = course.discount_price && parseFloat(course.discount_price) > 0
        ? parseFloat(course.discount_price)
        : parseFloat(course.price);
    return `$${price.toFixed(2)}`;
};

// Already handled by getCourseImageUrl helper function

watch(
    search,
    () => {
        const timer = setTimeout(applyFilters, 500);
        return () => clearTimeout(timer);
    },
);

watch([categoryId, level, priceType, sort], () => {
    applyFilters();
});
</script>

<template>
    <PublicLayout>
        <Head>
            <!-- Primary Meta Tags -->
            <title>{{ seoTitle }}</title>
            <meta name="description" :content="seoDescription" />
            <meta name="keywords" :content="`${search ? search + ', ' : ''}online courses, e-learning, professional development, ${categories.map(c => c.name).join(', ')}, certification`" />
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
            <meta name="application/ld+json" :content="JSON.stringify(structuredData)" />
            <meta name="application/ld+json" :content="JSON.stringify(breadcrumbData)" />
            <meta name="application/ld+json" :content="JSON.stringify(organizationData)" />
            
            <!-- AI/GSEO: Additional semantic markup -->
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="author" content="Learning Management System" />
            <meta property="article:published_time" :content="new Date().toISOString()" />
            <meta property="article:modified_time" :content="new Date().toISOString()" />
        </Head>

        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <!-- Header Ads -->
            <div v-if="ads?.header && ads.header.length > 0" class="mb-8">
                <AdZone 
                    v-for="ad in ads.header" 
                    :key="ad.id"
                    :zone-id="ad.zone_id"
                    :position="ad.position"
                    :ad-code="ad.ad_code"
                    :width="ad.width"
                    :height="ad.height"
                />
            </div>

            <div class="mb-12 text-center">
                <h1 class="mb-4 text-4xl font-black text-gray-900 dark:text-white">All Courses</h1>
                <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                    Learn from expert-led courses trusted by thousands of learners worldwide.
                </p>
                <span class="mt-3 block text-sm text-gray-500 dark:text-gray-400">{{ courses.total }} courses available</span>
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
                                :placeholder="$t('Search specific courses, topics, or mentors...')"
                                class="w-full rounded-2xl border-none bg-gray-50/50 py-4 pr-5 pl-12 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-500"
                            />
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3">
                            <button
                                @click="showFilters = !showFilters"
                                class="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-95 md:flex-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                :class="{
                                    'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-400': showFilters,
                                }"
                            >
                                <SlidersHorizontal :size="18" />
                                <span>{{ $t('Filters') }}</span>
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
                                    {{ $t('Topic') }}
                                </label>
                                <select
                                    v-model="categoryId"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{{ $t('All Topics') }}</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                        {{ cat.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Level Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <GraduationCap :size="12" />
                                    {{ $t('Difficulty') }}
                                </label>
                                <select
                                    v-model="level"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{{ $t('Any Level') }}</option>
                                    <option value="beginner">{{ $t('Beginner') }}</option>
                                    <option value="intermediate">{{ $t('Intermediate') }}</option>
                                    <option value="advanced">{{ $t('Advanced') }}</option>
                                </select>
                            </div>

                            <!-- Price Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <span class="text-xs leading-none font-bold">$</span>
                                    {{ $t('Price') }}
                                </label>
                                <select
                                    v-model="priceType"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{{ $t('Any Price') }}</option>
                                    <option value="free">{{ $t('Free') }}</option>
                                    <option value="paid">{{ $t('Paid') }}</option>
                                </select>
                            </div>

                            <!-- Sort Filter -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                                    <SlidersHorizontal :size="12" />
                                    {{ $t('Sort By') }}
                                </label>
                                <select
                                    v-model="sort"
                                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="latest">{{ $t('Newest First') }}</option>
                                    <option value="popular">{{ $t('Most Popular') }}</option>
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
                                {{ $t('Reset All Filters') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Results -->
            <div v-if="courses.data.length === 0" class="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-800">
                <BookOpen :size="48" class="mx-auto text-gray-300 dark:text-gray-600" />
                <h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">No courses found</h3>
                <p class="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>

            <!-- Courses Grid -->
            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <template v-for="(course, index) in courses.data" :key="course.id">
                    <Link
                        :href="coursesRoutes.show.url(course.slug)"
                        class="group block rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div class="relative aspect-video overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                            <img
                                :src="getCourseImageUrl(course.thumbnail)"
                                :alt="course.title"
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div class="absolute top-3 right-3 rounded-full bg-primary-600 px-2.5 py-1 text-xs font-bold text-white">
                                {{ getPriceText(course) }}
                            </div>
                        </div>

                        <div class="p-5">
                            <h3 class="mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white">
                                {{ course.title }}
                            </h3>
                            <p class="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{{ course.description }}</p>

                            <div class="mb-3 flex items-center gap-2">
                                <div class="flex items-center gap-1 text-yellow-400">
                                    <Star :size="14" />
                                    {{ course.reviews_avg_rating ? parseFloat(String(course.reviews_avg_rating)).toFixed(1) : '0.0' }}
                                </div>
                                <span class="text-xs text-gray-500 dark:text-gray-400">
                                    ({{ course.all_lessons_count }} lessons)
                                </span>
                            </div>

                            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span class="flex items-center gap-1">
                                    <Clock :size="12" />
                                    {{ course.duration ?? 'N/A' }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <GraduationCap :size="12" />
                                    {{ course.level }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <BookOpen :size="12" />
                                    {{ course.category?.name ?? 'Uncategorized' }}
                                </span>
                            </div>
                        </div>
                    </Link>
                    
                    <!-- Insert ad after every 3rd course -->
                    <div 
                        v-if="(index + 1) % 3 === 0 && ads?.between_courses && ads.between_courses.length > 0" 
                        class="col-span-full"
                    >
                        <AdZone 
                            v-for="ad in ads.between_courses" 
                            :key="'between-' + ad.id"
                            :zone-id="ad.zone_id"
                            :position="ad.position"
                            :ad-code="ad.ad_code"
                            :width="ad.width"
                            :height="ad.height"
                        />
                    </div>
                </template>
            </div>

            <!-- Pagination -->
            <div v-if="courses.last_page > 1" class="mt-12 flex justify-center gap-2">
                <Link
                    v-for="page in courses.last_page"
                    :key="page"
                    :href="`/courses?page=${page}&search=${search}&category_id=${categoryId}&level=${level}&price_type=${priceType}&sort=${sort}`"
                    class="rounded-lg px-4 py-2 text-sm font-medium"
                    :class="page === courses.current_page
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'"
                >
                    {{ page }}
                </Link>
            </div>
        </div>
    </PublicLayout>
</template>
