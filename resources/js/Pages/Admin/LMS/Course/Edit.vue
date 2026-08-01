```vue
<script setup lang="ts">
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ChevronLeft, Image as ImageIcon, Info, ListTree, Pencil, Save, Search, Settings } from 'lucide-vue-next';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
    course: Object as PropType<any>,
    categories: Array as PropType<any[]>,
});

const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
};

const form = useForm({
    category_id: props.course.category_id,
    title: props.course.title,
    instructor_name: props.course.instructor_name || '',
    description: props.course.description || '',
    level: props.course.level,
    language: props.course.language,
    price: props.course.price,
    discount_price: props.course.discount_price,
    is_free: props.course.is_free,
    status: props.course.status,
    meta_title: props.course.meta_title || '',
    meta_description: props.course.meta_description || '',
    start_date: formatDate(props.course.start_date),
    end_date: formatDate(props.course.end_date),
    last_enrollment_date: formatDate(props.course.last_enrollment_date),
    has_timeline: props.course.has_timeline,
    thumbnail: null as File | string | null,
});

const thumbnailPreview = ref<string | null>(
    props.course.thumbnail ? (props.course.thumbnail.startsWith('http') ? props.course.thumbnail : '/storage/' + props.course.thumbnail) : null,
);

const handleThumbnailChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
        form.thumbnail = file;
        thumbnailPreview.value = URL.createObjectURL(file);
    }
};

const submit = () => {
    // We use POST with _method PUT because PUT doesn't support file uploads in PHP/Multipart
    form.transform((data) => ({
        ...data,
        _method: 'PUT',
    })).post(admin.courses.update.url(props.course.id), {
        onSuccess: () => {
            // Handled by controller redirect
        },
    });
};

const processedCategories = computed(() => {
    return (
        props.categories?.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
        })) || []
    );
});
</script>

<template>
    <Head :title="__('Edit Course')" />

    <AdminLayout>
        <div class="animate-fade-in mx-auto max-w-5xl space-y-8 text-start">
            <!-- Breadcrumbs / Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <div class="mb-2 flex items-center gap-2">
                        <Link :href="admin.courses.index.url()" class="text-slate-400 transition-colors hover:text-brand-600">
                            <ChevronLeft :size="18" />
                        </Link>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Course Management') }}</span>
                    </div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Edit Course') }}</h2>
                    <p class="mt-1 text-start text-sm text-slate-500 dark:text-slate-400">
                        {{ __('Update details for :title', { title: course.title }) }}
                    </p>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <Link
                        :href="admin.courses.curriculum.url(course.id)"
                        class="flex items-center rounded-xl bg-brand-50 px-5 py-2.5 text-sm font-bold text-brand-600 transition-all hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-900/40"
                    >
                        <ListTree :size="18" class="me-2" /> {{ __('Manage Curriculum') }}
                    </Link>

                    <button
                        @click="submit"
                        :disabled="form.processing"
                        class="group flex items-center justify-center rounded-4xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                    >
                        <Save v-if="!form.processing" :size="20" class="me-2 transition-transform group-hover:rotate-12" />
                        <span v-else class="me-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        {{ __('Update Course') }}
                    </button>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid grid-cols-1 gap-8 text-start lg:grid-cols-3">
                    <!-- Left Strip: Core Content -->
                    <div class="space-y-6 lg:col-span-2">
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div class="mb-2 flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-start text-brand-600 dark:bg-brand-900/20"
                                >
                                    <Pencil :size="20" />
                                </div>
                                <h3 class="text-start text-lg font-bold text-slate-900 dark:text-white">{{ __('Course Essentials') }}</h3>
                            </div>

                            <div class="space-y-5">
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Course Title') }}</label>
                                    <input
                                        v-model="form.title"
                                        type="text"
                                        :placeholder="__('e.g. Master Laravel from Scratch')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.title }"
                                    />
                                    <p v-if="form.errors.title" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.title }}</p>
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Instructor Name') }}</label>
                                    <input
                                        v-model="form.instructor_name"
                                        type="text"
                                        :placeholder="__('e.g. John Doe')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.instructor_name }"
                                    />
                                    <p v-if="form.errors.instructor_name" class="mt-2 text-xs font-medium text-rose-500">
                                        {{ form.errors.instructor_name }}
                                    </p>
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Description') }}</label>
                                    <textarea
                                        v-model="form.description"
                                        rows="6"
                                        :placeholder="__('Describe what students will learn...')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    ></textarea>
                                </div>

                                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <SearchableSelect
                                            v-model="form.category_id"
                                            :options="processedCategories"
                                            :label="__('Category')"
                                            :placeholder="__('Select Category')"
                                            :error="form.errors.category_id"
                                        />
                                    </div>
                                    <div>
                                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                            __('Course Level')
                                        }}</label>
                                        <select
                                            v-model="form.level"
                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        >
                                            <option value="beginner">{{ __('Beginner') }}</option>
                                            <option value="intermediate">{{ __('Intermediate') }}</option>
                                            <option value="advanced">{{ __('Advanced') }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Timeline Section -->
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Info :size="16" class="text-brand-600" />
                                {{ __('Course Timeline') }}
                            </h3>

                            <div
                                class="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50 dark:bg-slate-900/50"
                            >
                                <div>
                                    <p class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Has Timeline?') }}</p>
                                    <p class="text-[10px] text-slate-500">{{ __('Enable if the course has specific start/end dates.') }}</p>
                                </div>
                                <label class="relative inline-flex cursor-pointer items-center">
                                    <input type="checkbox" v-model="form.has_timeline" class="peer sr-only" />
                                    <div
                                        class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                    ></div>
                                </label>
                            </div>

                            <div v-if="form.has_timeline" class="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Start Date') }}</label>
                                    <input
                                        v-model="form.start_date"
                                        type="date"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.start_date }"
                                    />
                                    <p v-if="form.errors.start_date" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.start_date }}</p>
                                </div>
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('End Date') }}</label>
                                    <input
                                        v-model="form.end_date"
                                        type="date"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.end_date }"
                                    />
                                    <p v-if="form.errors.end_date" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.end_date }}</p>
                                </div>
                                <div class="text-start md:col-span-2">
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                        __('Last Enrollment Date')
                                    }}</label>
                                    <input
                                        v-model="form.last_enrollment_date"
                                        type="date"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.last_enrollment_date }"
                                    />
                                    <p v-if="form.errors.last_enrollment_date" class="mt-2 text-xs font-medium text-rose-500">
                                        {{ form.errors.last_enrollment_date }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-else
                                class="rounded-2xl border border-brand-100 bg-brand-50/50 p-4 text-start dark:border-brand-900/20 dark:bg-brand-900/10"
                            >
                                <p class="text-sm text-brand-600 dark:text-brand-400">
                                    {{ __('This course is "Always Open" and has no specific start or end dates.') }}
                                </p>
                            </div>
                        </div>

                        <!-- Pricing Section -->
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Settings :size="16" class="text-brand-600" />
                                {{ __('Pricing & Access') }}
                            </h3>

                            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div
                                    class="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50 dark:bg-slate-900/50"
                                >
                                    <div>
                                        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Free Course') }}</p>
                                        <p class="text-[10px] text-slate-500">{{ __('No charge for access.') }}</p>
                                    </div>
                                    <label class="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" v-model="form.is_free" class="peer sr-only" />
                                        <div
                                            class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                        ></div>
                                    </label>
                                </div>

                                <div v-if="!form.is_free" class="flex gap-4">
                                    <div class="flex-1 text-start">
                                        <label class="mb-1 block text-[10px] font-bold text-slate-400 uppercase">{{ __('Regular Price') }}</label>
                                        <input
                                            v-model="form.price"
                                            type="number"
                                            step="0.01"
                                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        />
                                    </div>
                                    <div class="flex-1 text-start">
                                        <label class="mb-1 block text-[10px] font-bold text-slate-400 uppercase">{{ __('Discount Price') }}</label>
                                        <input
                                            v-model="form.discount_price"
                                            type="number"
                                            step="0.01"
                                            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Strip: Publishing & SEO -->
                    <div class="space-y-6">
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Info :size="16" class="text-brand-600" />
                                {{ __('Publication') }}
                            </h3>

                            <div>
                                <label class="mb-2 block text-xs font-medium text-slate-500">{{ __('Course Status') }}</label>
                                <div class="grid grid-cols-2 gap-2 text-start">
                                    <button
                                        type="button"
                                        @click="form.status = 'draft'"
                                        :class="
                                            form.status === 'draft'
                                                ? 'border-brand-200 bg-brand-50 text-brand-600 dark:bg-brand-900/20'
                                                : 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-900/50'
                                        "
                                        class="rounded-xl border px-4 py-2 text-xs font-bold transition-all"
                                    >
                                        {{ __('Draft') }}
                                    </button>
                                    <button
                                        type="button"
                                        @click="form.status = 'published'"
                                        :class="
                                            form.status === 'published'
                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                                                : 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-900/50'
                                        "
                                        class="rounded-xl border px-4 py-2 text-xs font-bold transition-all"
                                    >
                                        {{ __('Publish') }}
                                    </button>
                                </div>
                            </div>

                            <div class="border-t border-slate-100 pt-4 text-start dark:border-slate-700">
                                <label class="mb-3 block text-xs font-medium text-slate-500">{{ __('Course Thumbnail') }}</label>
                                <div
                                    class="relative flex h-32 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-all hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900/50"
                                >
                                    <template v-if="thumbnailPreview">
                                        <img :src="thumbnailPreview" class="h-full w-full object-cover" />
                                        <div
                                            class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                                        >
                                            <ImageIcon :size="24" class="text-white" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        <ImageIcon :size="24" class="text-slate-300" />
                                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Upload Image') }}</span>
                                    </template>
                                    <input
                                        type="file"
                                        @change="handleThumbnailChange"
                                        accept="image/*"
                                        class="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                </div>
                                <p v-if="form.errors.thumbnail" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.thumbnail }}</p>
                            </div>
                        </div>

                        <!-- SEO Settings -->
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-start text-sm font-bold text-slate-900 dark:text-white">
                                <Search :size="16" class="text-brand-600" />
                                {{ __('SEO Settings') }}
                            </h3>

                            <div class="space-y-4 text-start">
                                <div>
                                    <label class="mb-1 block text-[10px] font-bold text-slate-400 uppercase">{{ __('Meta Title') }}</label>
                                    <input
                                        v-model="form.meta_title"
                                        type="text"
                                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    />
                                </div>
                                <div>
                                    <label class="mb-1 block text-[10px] font-bold text-slate-400 uppercase">{{ __('Meta Description') }}</label>
                                    <textarea
                                        v-model="form.meta_description"
                                        rows="3"
                                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>
