<script setup lang="ts">
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { CheckCircle, ChevronLeft, Info, MonitorPlay, Save, Video } from 'lucide-vue-next';
import { computed, PropType } from 'vue';

const props = defineProps({
    liveClass: Object as PropType<any>,
    courses: Array as PropType<any[]>,
});

const form = useForm({
    course_id: props.liveClass.course_id,
    title: props.liveClass.title,
    description: props.liveClass.description || '',
    provider: props.liveClass.provider,
    meeting_url: props.liveClass.meeting_url,
    type: props.liveClass.type || 'specific',
    class_date: props.liveClass.class_date || '',
    start_time: props.liveClass.start_time ? props.liveClass.start_time.slice(0, 5) : '',
    end_time: props.liveClass.end_time ? props.liveClass.end_time.slice(0, 5) : '',
    timezone: props.liveClass.timezone,
    reminder_minutes_before: props.liveClass.reminder_minutes_before,
    recording_url: props.liveClass.recording_url || '',
    status: props.liveClass.status,
});

const submit = () => {
    form.put(admin.liveClasses.update.url(props.liveClass.id));
};

const processedCourses = computed(() => {
    return (
        props.courses?.map((course: any) => ({
            id: course.id,
            name: course.title,
        })) || []
    );
});
</script>

<template>
    <Head :title="__('Edit Live Class')" />

    <AdminLayout>
        <div class="animate-fade-in mx-auto max-w-4xl space-y-8 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <div class="mb-2 flex items-center gap-2 text-start">
                        <Link :href="admin.liveClasses.index.url()" class="text-slate-400 transition-colors hover:text-brand-600">
                            <ChevronLeft :size="18" />
                        </Link>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Live Class') }}</span>
                    </div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Edit Session') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Update the details for your live interactive session.') }}</p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <!-- Left: Session Details -->
                    <div class="space-y-6 lg:col-span-2">
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div class="mb-2 flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/20">
                                    <MonitorPlay :size="20" />
                                </div>
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Session Essentials') }}</h3>
                            </div>

                            <div class="space-y-5">
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Session Title') }}</label>
                                    <input
                                        v-model="form.title"
                                        type="text"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.title }"
                                    />
                                    <p v-if="form.errors.title" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.title }}</p>
                                </div>

                                <div>
                                    <SearchableSelect
                                        v-model="form.course_id"
                                        :options="processedCourses"
                                        :label="__('Course')"
                                        :placeholder="__('Select Course')"
                                        :error="form.errors.course_id"
                                    />
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Description') }}</label>
                                    <textarea
                                        v-model="form.description"
                                        rows="4"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    ></textarea>
                                </div>

                                <!-- Schedule Type -->
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Schedule Type') }}</label>
                                    <div class="flex gap-4">
                                        <label class="flex cursor-pointer items-center gap-2">
                                            <input type="radio" value="specific" v-model="form.type" class="text-brand-600 focus:ring-brand-500" />
                                            <span class="text-sm text-slate-700 dark:text-slate-300">{{ __('Specific Date') }}</span>
                                        </label>
                                        <label class="flex cursor-pointer items-center gap-2">
                                            <input type="radio" value="daily" v-model="form.type" class="text-brand-600 focus:ring-brand-500" />
                                            <span class="text-sm text-slate-700 dark:text-slate-300">{{ __('Daily Recurring') }}</span>
                                        </label>
                                    </div>
                                    <p v-if="form.errors.type" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.type }}</p>
                                </div>

                                <!-- Class Date (Visible only for 'specific') -->
                                <div v-if="form.type === 'specific'">
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Class Date') }}</label>
                                    <input
                                        v-model="form.class_date"
                                        type="date"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.class_date }"
                                    />
                                    <p v-if="form.errors.class_date" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.class_date }}</p>
                                </div>

                                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Start Time') }}</label>
                                        <input
                                            v-model="form.start_time"
                                            type="time"
                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                            :class="{ 'border-rose-500': form.errors.start_time }"
                                        />
                                        <p v-if="form.errors.start_time" class="mt-2 text-xs font-medium text-rose-500">
                                            {{ form.errors.start_time }}
                                        </p>
                                    </div>
                                    <div>
                                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('End Time') }}</label>
                                        <input
                                            v-model="form.end_time"
                                            type="time"
                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                            :class="{ 'border-rose-500': form.errors.end_time }"
                                        />
                                        <p v-if="form.errors.end_time" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.end_time }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Meeting Configuration -->
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div class="mb-2 flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
                                >
                                    <Video :size="20" />
                                </div>
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Meeting Configuration') }}</h3>
                            </div>

                            <div class="space-y-5">
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Provider') }}</label>
                                    <div class="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            @click="form.provider = 'zoom'"
                                            :class="
                                                form.provider === 'zoom'
                                                    ? 'border-brand-600 bg-brand-50 text-brand-600'
                                                    : 'border-slate-200 bg-slate-50 font-bold text-slate-400'
                                            "
                                            class="flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all"
                                        >
                                            <span class="text-sm font-bold">Zoom</span>
                                        </button>
                                        <button
                                            type="button"
                                            @click="form.provider = 'google_meet'"
                                            :class="
                                                form.provider === 'google_meet'
                                                    ? 'border-brand-600 bg-brand-50 text-brand-600'
                                                    : 'border-slate-200 bg-slate-50 font-bold text-slate-400'
                                            "
                                            class="flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all"
                                        >
                                            <span class="text-sm font-bold">Google Meet</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Meeting URL') }}</label>
                                    <input
                                        v-model="form.meeting_url"
                                        type="url"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.meeting_url }"
                                    />
                                    <p v-if="form.errors.meeting_url" class="mt-2 text-xs font-medium text-rose-500">{{ form.errors.meeting_url }}</p>
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                                        >{{ __('Recording URL') }} ({{ __('Optional') }})</label
                                    >
                                    <input
                                        v-model="form.recording_url"
                                        type="url"
                                        :placeholder="__('Paste recording link after session...')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                        :class="{ 'border-rose-500': form.errors.recording_url }"
                                    />
                                    <p v-if="form.errors.recording_url" class="mt-2 text-xs font-medium text-rose-500">
                                        {{ form.errors.recording_url }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Status & Settings -->
                    <div class="space-y-6">
                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <CheckCircle :size="16" class="text-brand-600" />
                                {{ __('Session Status') }}
                            </h3>

                            <div class="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    v-for="s in ['upcoming', 'live', 'finished', 'cancelled']"
                                    :key="s"
                                    @click="form.status = s"
                                    :class="
                                        form.status === s
                                            ? 'border-brand-600 bg-brand-50 text-brand-600'
                                            : 'border-slate-100 bg-slate-50 font-bold text-slate-400'
                                    "
                                    class="rounded-xl border px-3 py-2 text-[10px] font-bold uppercase transition-all"
                                >
                                    {{ __(s) }}
                                </button>
                            </div>
                        </div>

                        <div class="space-y-6 rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Info :size="16" class="text-brand-600" />
                                {{ __('Additional Settings') }}
                            </h3>

                            <div class="space-y-4">
                                <div>
                                    <label class="mb-1 block text-[10px] font-bold text-slate-400 uppercase">{{ __('Timezone') }}</label>
                                    <input
                                        v-model="form.timezone"
                                        type="text"
                                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    />
                                </div>

                                <div>
                                    <label class="mb-1 block text-[10px] font-bold text-slate-400 uppercase">{{
                                        __('Email Reminder (Minutes Before)')
                                    }}</label>
                                    <input
                                        v-model="form.reminder_minutes_before"
                                        type="number"
                                        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none dark:border-slate-700/60 dark:bg-slate-900/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="group flex w-full items-center justify-center rounded-4xl bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                        >
                            <Save v-if="!form.processing" :size="20" class="me-2 transition-transform group-hover:rotate-12" />
                            <span v-else class="me-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                            {{ __('Update Session') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>
