<script setup lang="ts">
import StarRating from '@/Components/StarRating.vue';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import enrollRoutes from '@/routes/enroll';
import studentRoutes from '@/routes/student';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { ArrowRight, BadgeCheck, Bookmark, BookOpen, Calendar, ChevronRight, Clock, Globe, Home, Layers, MessageSquare, Play } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps<{
    course: any;
    enrollment?: { status: string } | null;
    reviews?: any[];
    averageRating?: number;
    totalReviews?: number;
    canReview?: boolean;
    hasReviewed?: boolean;
    prerequisitesMet?: boolean;
    unmetPrerequisites?: string[];
    isBookmarked?: boolean;
}>();

const page = usePage();
const user = computed(() => page.props.auth.user);
const isAdmin = computed(() => user.value?.type === 'admin' || user.value?.type === 'super-admin');

// SEO: Dynamic meta title
const seoTitle = computed(() => {
    const parts = [props.course.title];
    if (props.course.category) parts.push(props.course.category.name);
    if (props.course.level) parts.push(`${props.course.level} Level`);
    return `${parts.join(' - ')} | Online Course`;
});

// SEO: Dynamic meta description
const seoDescription = computed(() => {
    let desc = props.course.description || `Learn ${props.course.title}`;
    if (desc.length > 160) desc = desc.substring(0, 157) + '...';
    if (props.averageRating && props.totalReviews) {
        desc += ` Rated ${props.averageRating.toFixed(1)}/5 by ${props.totalReviews} students.`;
    }
    return desc;
});

// SEO: Canonical URL
const canonicalUrl = computed(() => {
    return `${window.location.origin}/courses/${props.course.slug}`;
});

// SEO: Course structured data (JSON-LD)
const courseStructuredData = computed(() => {
    const price = props.course.discount_price && parseFloat(props.course.discount_price) > 0
        ? parseFloat(props.course.discount_price)
        : parseFloat(props.course.price);
    
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: props.course.title,
        description: props.course.description,
        url: canonicalUrl.value,
        image: props.course.thumbnail 
            ? (props.course.thumbnail.startsWith('http') ? props.course.thumbnail : `${window.location.origin}/storage/${props.course.thumbnail}`)
            : undefined,
        educationalLevel: props.course.level,
        teaches: props.course.category?.name,
        provider: {
            '@type': 'Organization',
            name: 'Learning Management System',
            sameAs: window.location.origin,
        },
        hasCourseInstance: props.course.start_date && props.course.end_date ? {
            '@type': 'CourseInstance',
            courseMode: 'online',
            startDate: props.course.start_date,
            endDate: props.course.end_date,
        } : undefined,
        offers: {
            '@type': 'Offer',
            price: props.course.is_free ? '0' : price.toFixed(2),
            priceCurrency: 'USD',
            availability: props.course.is_free ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
            validFrom: new Date().toISOString(),
        },
        aggregateRating: props.averageRating && props.totalReviews ? {
            '@type': 'AggregateRating',
            ratingValue: props.averageRating.toFixed(1),
            reviewCount: props.totalReviews,
            bestRating: '5',
            worstRating: '0',
        } : undefined,
        review: props.reviews?.slice(0, 3).map(review => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: review.user?.name || 'Anonymous',
            },
            datePublished: review.created_at,
            reviewBody: review.comment,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating,
                bestRating: '5',
                worstRating: '0',
            },
        })),
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
        {
            '@type': 'ListItem',
            position: 3,
            name: props.course.title,
            item: canonicalUrl.value,
        },
    ],
}));

// SEO: OG Image URL
const ogImageUrl = computed(() => {
    if (!props.course.thumbnail) return `${window.location.origin}/images/og-course.jpg`;
    return props.course.thumbnail.startsWith('http') 
        ? props.course.thumbnail 
        : `${window.location.origin}/storage/${props.course.thumbnail}`;
});

const enrollForm = useForm({});

const bookmarkForm = useForm({});

const isBookmarked = ref(props.isBookmarked ?? false);

const enroll = () => {
    enrollForm.post(enrollRoutes.store.url(props.course.slug));
};

const toggleBookmark = () => {
    bookmarkForm.post(studentRoutes.bookmark.toggle.url(props.course.slug), {
        onSuccess: (response) => {
            isBookmarked.value = !isBookmarked.value;
        },
    });
};

// Review form
const showReviewModal = ref(false);
const reviewForm = useForm({
    rating: 0,
    comment: '',
});

const submitReview = () => {
    reviewForm.post(`/courses/${props.course.slug}/reviews`, {
        onSuccess: () => {
            showReviewModal.value = false;
            reviewForm.reset();
        },
    });
};

const formatReviewDate = (date: string) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
};

const getUserInitials = (name: string) => {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(price));
};

const getThumbnail = (path: string | null) => {
    if (!path) return '/images/course-placeholder.jpg';
    return path.startsWith('http') ? path : `/storage/${path}`;
};

const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const totalDays = computed(() => {
    if (!props.course.start_date || !props.course.end_date) return 0;
    const start = new Date(props.course.start_date);
    const end = new Date(props.course.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Declare translation function type
declare const __: (key: string, replacements?: Record<string, any>) => string;
</script>

<template>
    <Head>
        <!-- Primary Meta Tags -->
        <title>{{ seoTitle }}</title>
        <meta name="description" :content="seoDescription" />
        <meta name="keywords" :content="`${props.course.title}, ${props.course.category?.name || ''}, online course, e-learning, ${props.course.level || ''}`" />
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
        <meta name="application/ld+json" :content="JSON.stringify(courseStructuredData)" />
        <meta name="application/ld+json" :content="JSON.stringify(breadcrumbData)" />
        
        <!-- AI/GSEO: Additional semantic markup -->
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Learning Management System" />
        <meta property="article:published_time" :content="props.course.created_at || new Date().toISOString()" />
        <meta property="article:modified_time" :content="props.course.updated_at || new Date().toISOString()" />
    </Head>

    <PublicLayout>
        <div class="min-h-screen bg-gray-50/50 pb-20 dark:bg-gray-900">
            <!-- Breadcrumb -->
            <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <nav class="animate-fade-in mb-6 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" class="flex items-center transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                        <Home class="mr-1 h-4 w-4" />
                        {{ __('Home') }}
                    </Link>
                    <ChevronRight class="h-4 w-4 text-gray-400" />
                    <span v-if="course.category" class="flex items-center gap-2">
                        <span class="text-gray-500 dark:text-gray-400">{{ course.category.name }}</span>
                        <ChevronRight class="h-4 w-4 text-gray-400" />
                    </span>
                    <span class="font-medium text-gray-900 dark:text-white">{{ course.title }}</span>
                </nav>
            </div>

            <!-- Course Content Grid -->
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div class="grid gap-12 lg:grid-cols-12 lg:items-start">
                    <!-- Left Column: Hero + Content -->
                    <div class="space-y-12 lg:col-span-8">
                        <!-- Hero Section -->
                        <div class="animate-fade-in-up text-start">
                            <!-- Category Badge -->
                            <div
                                class="mb-4 inline-flex items-center gap-2 rounded-xl bg-primary-100 px-3 py-1.5 text-[10px] font-black tracking-widest text-primary-600 uppercase dark:bg-primary-900/20 dark:text-primary-400"
                            >
                                <Layers :size="12" />
                                <span>{{ course.category?.name || __('Uncategorized') }}</span>
                            </div>

                            <!-- Title -->
                            <h1 class="mb-6 text-2xl leading-tight font-black tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
                                {{ course.title }}
                            </h1>

                            <p class="mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {{ course.description }}
                            </p>

                            <!-- Meta Info -->
                            <div class="flex flex-wrap items-center gap-6 border-y border-gray-100 py-8 dark:border-gray-800">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-primary-400 to-indigo-400 text-base font-black text-white shadow-lg shadow-primary-500/20"
                                    >
                                        {{ course.instructor_name?.charAt(0) || 'E' }}
                                    </div>
                                    <div>
                                        <p class="text-[9px] font-bold tracking-widest text-primary-600 uppercase dark:text-primary-400">
                                            {{ __('Instructor') }}
                                        </p>
                                        <p class="text-xs font-bold text-gray-900 dark:text-white">{{ course.instructor_name || __('Expert') }}</p>
                                    </div>
                                </div>
                                <div class="hidden h-6 w-px bg-gray-100 sm:block dark:bg-gray-800"></div>
                                <div class="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    <Globe :size="16" class="text-primary-500" />
                                    <span>{{ course.language || 'English' }}</span>
                                </div>
                                <div class="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    <BadgeCheck :size="16" class="text-emerald-500" />
                                    <span>{{ course.level || 'Intermediate' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- About Section -->
                        <section class="animate-fade-in-up">
                            <h2 class="mb-6 text-xl font-black tracking-tight text-gray-900 dark:text-white">{{ __('About this Course') }}</h2>
                            <div class="prose prose-sm max-w-none text-start text-gray-500 dark:text-gray-400 dark:prose-invert">
                                {{ course.description }}
                            </div>
                        </section>

                        <!-- Curriculum Section -->
                        <section class="animate-fade-in-up">
                            <div class="mb-8 flex items-center justify-between">
                                <h2 class="text-xl font-black tracking-tight text-gray-900 dark:text-white">{{ __('Course Content') }}</h2>
                                <span
                                    class="rounded-xl bg-gray-100 px-3 py-1 text-[10px] font-black tracking-widest text-gray-600 uppercase dark:bg-gray-800 dark:text-gray-400"
                                >
                                    {{ course.sections?.length || 0 }} {{ __('Sections') }}
                                </span>
                            </div>

                            <div
                                class="divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-800/50"
                            >
                                <div
                                    v-for="(section, index) in course.sections"
                                    :key="section.id"
                                    class="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/50"
                                >
                                    <div class="flex items-center gap-4">
                                        <div
                                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-xs font-black text-primary-600 transition-transform group-hover:scale-110 dark:bg-primary-900/30 dark:text-primary-400"
                                        >
                                            {{ String(Number(index) + 1).padStart(2, '0') }}
                                        </div>
                                        <h3 class="text-base font-bold text-gray-800 dark:text-white">{{ section.title }}</h3>
                                    </div>
                                    <Clock :size="16" class="text-gray-300 transition-colors group-hover:text-primary-500" />
                                </div>

                                <div v-if="!course.sections?.length" class="py-12 text-center text-gray-500">
                                    <BookOpen class="mx-auto mb-4 h-12 w-12 opacity-10" />
                                    <p class="text-base font-bold">{{ __('Curriculum is not available yet.') }}</p>
                                </div>
                            </div>
                        </section>

                        <!-- Reviews Section -->
                        <section v-if="(reviews && reviews.length > 0) || canReview" class="animate-fade-in-up">
                            <div class="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 class="text-xl font-black tracking-tight text-gray-900 dark:text-white">{{ __('Student Reviews') }}</h2>
                                    <div v-if="totalReviews && totalReviews > 0" class="mt-2 flex items-center gap-3">
                                        <StarRating :rating="averageRating || 0" :size="18" :show-number="true" />
                                        <span class="text-sm text-gray-500 dark:text-gray-400">
                                            ({{ totalReviews }} {{ totalReviews === 1 ? 'review' : 'reviews' }})
                                        </span>
                                    </div>
                                </div>
                                <button
                                    v-if="canReview"
                                    @click="showReviewModal = true"
                                    class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                                >
                                    <MessageSquare :size="16" />
                                    {{ __('Write a Review') }}
                                </button>
                            </div>

                            <!-- Review List -->
                            <div v-if="reviews && reviews.length > 0" class="space-y-4">
                                <div
                                    v-for="review in reviews"
                                    :key="review.id"
                                    class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50"
                                >
                                    <div class="flex items-start gap-4">
                                        <!-- Avatar -->
                                        <div
                                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                                        >
                                            {{ getUserInitials(review.user?.name || 'User') }}
                                        </div>

                                        <!-- Review Content -->
                                        <div class="flex-1">
                                            <div class="mb-2 flex items-center justify-between">
                                                <div>
                                                    <h4 class="font-bold text-gray-900 dark:text-white">{{ review.user?.name }}</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatReviewDate(review.created_at) }}</p>
                                                </div>
                                                <StarRating :rating="review.rating" :size="14" />
                                            </div>
                                            <p v-if="review.comment" class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                {{ review.comment }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div
                                v-else-if="!canReview"
                                class="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-800/50"
                            >
                                <MessageSquare class="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                                <p class="text-base font-bold text-gray-900 dark:text-white">{{ __('No reviews yet') }}</p>
                                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ __('Be the first to review this course!') }}</p>
                            </div>
                        </section>
                    </div>

                    <!-- Right Column: Enrollment Card (Sticky) -->
                    <div class="lg:col-span-4">
                        <div class="animate-fade-in-up sticky top-24">
                            <div
                                class="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/40 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none"
                            >
                                <!-- Preview Image -->
                                <div class="group relative aspect-video overflow-hidden border-b border-gray-50 dark:border-gray-700">
                                    <img
                                        :src="getThumbnail(course.thumbnail)"
                                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt="Course Preview"
                                    />
                                    <div
                                        class="absolute inset-0 flex items-center justify-center bg-gray-900/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100"
                                    >
                                        <div
                                            class="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110"
                                        >
                                            <Play :size="28" fill="currentColor" class="translate-x-0.5" />
                                        </div>
                                    </div>
                                    <div
                                        v-if="course.is_free"
                                        class="absolute top-4 left-4 rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-lg"
                                    >
                                        {{ __('FREE') }}
                                    </div>
                                </div>

                                <div class="p-6 text-start">
                                    <!-- Price / Discount (Refined UI) -->
                                    <div
                                        class="relative mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/50"
                                    >
                                        <div>
                                            <p class="mb-1.5 text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                                {{ __('Investment') }}
                                            </p>
                                            <div class="flex items-baseline gap-2.5">
                                                <span v-if="course.is_free" class="text-3xl font-black text-emerald-500">{{ __('FREE') }}</span>
                                                <template v-else>
                                                    <span class="text-3xl font-black text-gray-900 dark:text-white">{{
                                                        formatPrice(course.discount_price || course.price)
                                                    }}</span>
                                                    <div v-if="course.discount_price" class="flex items-center gap-2">
                                                        <span
                                                            class="rounded-md bg-primary-50 px-1.5 py-0.5 text-[10px] font-black text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                                        >
                                                            {{ Math.round((1 - course.discount_price / course.price) * 100) }}% {{ __('OFF') }}
                                                        </span>
                                                        <span class="text-xs text-gray-400 line-through">{{ formatPrice(course.price) }}</span>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="mb-6">
                                        <template v-if="enrollment && ['active', 'completed'].includes(enrollment.status)">
                                            <Link
                                                :href="studentRoutes.courses.show.url(course.slug)"
                                                class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95"
                                            >
                                                {{ __('Continue Learning') }}
                                                <ArrowRight :size="18" />
                                            </Link>
                                        </template>
                                        <template v-else-if="enrollment?.status === 'pending'">
                                            <div
                                                class="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-50 py-4 text-sm font-bold text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                                            >
                                                <Clock :size="18" />
                                                {{ __('Enrollment Pending') }}
                                            </div>
                                        </template>
                                        <template v-else-if="!isAdmin">
                                            <button
                                                @click="enroll"
                                                :disabled="enrollForm.processing"
                                                class="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 active:scale-95 disabled:opacity-50"
                                            >
                                                <span
                                                    v-if="enrollForm.processing"
                                                    class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                                ></span>
                                                <template v-else>
                                                    {{ course.price > 0 && !course.is_free ? __('Enroll Now') : __('Start Learning Free') }}
                                                    <ArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
                                                </template>
                                            </button>
                                        </template>
                                        <p v-if="isAdmin" class="mt-4 text-center text-[10px] font-bold text-gray-400 uppercase italic">
                                            {{ __('Admin Preview Mode') }}
                                        </p>

                                        <!-- Bookmark Toggle -->
                                        <button
                                            v-if="user && !isAdmin"
                                            @click="toggleBookmark"
                                            :disabled="bookmarkForm.processing"
                                            class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <span v-if="bookmarkForm.processing" class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></span>
                                            <template v-else>
                                                <Bookmark :size="18" :fill="isBookmarked ? 'currentColor' : 'none'" />
                                                {{ isBookmarked ? __('Remove from Bookmarks') : __('Add to Bookmarks') }}
                                            </template>
                                        </button>

                                        <!-- Prerequisites Warning -->
                                        <div v-if="!prerequisitesMet && unmetPrerequisites && unmetPrerequisites.length" class="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                                            <div class="flex items-start gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                                </svg>
                                                <div>
                                                    <h4 class="text-sm font-bold text-amber-800 dark:text-amber-200">
                                                        {{ __('Prerequisite Courses Required') }}
                                                    </h4>
                                                    <p class="mt-1 text-sm text-amber-700 dark:text-amber-300">
                                                        {{ __('Complete the following courses before enrolling:') }}
                                                    </p>
                                                    <ul class="mt-2 space-y-1">
                                                        <li v-for="(prereq, index) in unmetPrerequisites" :key="index" class="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414z" clip-rule="evenodd"/>
                                                            </svg>
                                                            {{ prereq }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Detailed Stats / Dates (Compact) -->
                                    <div
                                        class="space-y-3 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-900/20"
                                    >
                                        <div v-if="course.has_timeline" class="space-y-3">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-2 text-gray-400">
                                                    <Calendar :size="14" class="text-primary-400" />
                                                    <span class="text-[9px] font-black tracking-widest uppercase">{{ __('Start Date') }}</span>
                                                </div>
                                                <span class="text-xs font-bold text-gray-700 dark:text-gray-300">{{
                                                    formatDate(course.start_date) || 'TBA'
                                                }}</span>
                                            </div>
                                            <div
                                                v-if="course.last_enrollment_date"
                                                class="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800"
                                            >
                                                <div class="flex items-center gap-2 text-gray-400">
                                                    <Clock :size="14" class="text-rose-400" />
                                                    <span class="text-[9px] font-black tracking-widest uppercase">{{ __('Deadline') }}</span>
                                                </div>
                                                <span class="text-xs font-bold text-rose-600 dark:text-rose-400">{{
                                                    formatDate(course.last_enrollment_date)
                                                }}</span>
                                            </div>
                                        </div>
                                        <div v-else class="flex items-center justify-center gap-2 py-1">
                                            <Clock :size="14" class="text-emerald-500" />
                                            <span class="text-[10px] font-black tracking-widest text-emerald-600 uppercase dark:text-emerald-400">{{
                                                __('Always Open')
                                            }}</span>
                                        </div>

                                        <div class="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                                            <div class="flex items-center gap-2 text-gray-400">
                                                <BookOpen :size="14" />
                                                <span class="text-[9px] font-black tracking-widest uppercase">{{ __('Content') }}</span>
                                            </div>
                                            <span class="text-xs font-bold text-gray-700 dark:text-gray-300"
                                                >{{ course.sections?.length || 0 }} {{ __('Sections') }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Review Modal -->
        <div
            v-if="showReviewModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            @click.self="showReviewModal = false"
        >
            <div
                class="animate-fade-in-up w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            >
                <h3 class="mb-6 text-2xl font-black text-gray-900 dark:text-white">{{ __('Write a Review') }}</h3>

                <form @submit.prevent="submitReview" class="space-y-6">
                    <!-- Rating -->
                    <div>
                        <label class="mb-3 block text-sm font-bold text-gray-700 dark:text-gray-300">
                            {{ __('Rating') }} <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center gap-1">
                            <button
                                v-for="i in 5"
                                :key="i"
                                type="button"
                                @click="reviewForm.rating = i"
                                class="cursor-pointer text-3xl transition-all hover:scale-110"
                                :class="i <= reviewForm.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'"
                            >
                                ★
                            </button>
                        </div>
                        <p v-if="reviewForm.errors.rating" class="mt-2 text-sm text-red-600 dark:text-red-400">
                            {{ reviewForm.errors.rating }}
                        </p>
                    </div>

                    <!-- Comment -->
                    <div>
                        <label class="mb-3 block text-sm font-bold text-gray-700 dark:text-gray-300">
                            {{ __('Comment') }} <span class="text-gray-400">({{ __('Optional') }})</span>
                        </label>
                        <textarea
                            v-model="reviewForm.comment"
                            rows="4"
                            class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            :placeholder="__('Share your experience with this course...')"
                        ></textarea>
                        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {{ reviewForm.comment?.length || 0 }} / 1000 {{ __('characters') }}
                        </p>
                        <p v-if="reviewForm.errors.comment" class="mt-2 text-sm text-red-600 dark:text-red-400">
                            {{ reviewForm.errors.comment }}
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button
                            type="button"
                            @click="showReviewModal = false"
                            class="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            {{ __('Cancel') }}
                        </button>
                        <button
                            type="submit"
                            :disabled="reviewForm.processing || reviewForm.rating === 0"
                            class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            <span
                                v-if="reviewForm.processing"
                                class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            ></span>
                            <template v-else>
                                <Send :size="16" />
                                {{ __('Submit Review') }}
                            </template>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </PublicLayout>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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
