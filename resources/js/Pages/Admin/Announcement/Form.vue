<script setup lang="ts">
import RichTextEditor from '@/Components/Common/RichTextEditor.vue';
import SearchableSelect from '@/Components/Common/SearchableSelect.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/vue3';
import axios from 'axios';
import { BookOpen, Calendar, Globe, Save, Search, Users, X } from 'lucide-vue-next';
import { computed, PropType, ref, watch } from 'vue';

const props = defineProps({
    courses: Array as PropType<any[]>,
    students: Array as PropType<any[]>,
    announcement: Object as PropType<any>,
    selected_student_ids: Array as PropType<number[]>,
});

// Declare translation function type
declare const __: (key: string) => string;

const form = useForm({
    title: props.announcement?.title || '',
    content: props.announcement?.content || '',
    scope: props.announcement?.scope || 'global',
    course_id: props.announcement?.course_id || '',
    status: props.announcement?.status || 'draft',
    scheduled_at: props.announcement?.scheduled_at || '',
    student_ids: props.selected_student_ids || [],
});

const studentSearch = ref('');
const availableStudents = ref(props.students);
const isLoadingStudents = ref(false);

const filteredStudents = computed(() => {
    if (!studentSearch.value) return availableStudents.value;
    const s = studentSearch.value.toLowerCase();
    return availableStudents.value.filter((st) => st.name.toLowerCase().includes(s) || st.email.toLowerCase().includes(s));
});

const fetchStudentsByCourse = async (courseId: any) => {
    if (!courseId) {
        availableStudents.value = props.students;
        return;
    }

    isLoadingStudents.value = true;
    try {
        const response = await axios.get(route('admin.announcements.students', courseId));
        availableStudents.value = response.data;
    } catch (e) {
        console.error('Failed to fetch students', e);
    } finally {
        isLoadingStudents.value = false;
    }
};

watch(
    () => form.course_id,
    (newVal) => {
        if (form.scope === 'course') {
            fetchStudentsByCourse(newVal);
        }
    },
);

watch(
    () => form.scope,
    (newVal) => {
        if (newVal === 'global') {
            availableStudents.value = props.students;
            form.course_id = '';
        } else if (form.course_id) {
            fetchStudentsByCourse(form.course_id);
        }
    },
);

const toggleStudent = (id: number) => {
    const index = form.student_ids.indexOf(id);
    if (index > -1) {
        form.student_ids.splice(index, 1);
    } else {
        form.student_ids.push(id);
    }
};

const selectAll = () => {
    form.student_ids = availableStudents.value.map((s) => s.id);
};

const deselectAll = () => {
    form.student_ids = [];
};

const submit = () => {
    if (props.announcement) {
        form.put(admin.announcements.update.url(props.announcement.id));
    } else {
        form.post(admin.announcements.store.url());
    }
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
    <Head :title="announcement ? __('Edit Announcement') : __('Create Announcement')" />

    <AdminLayout>
        <div class="animate-fade-in space-y-6 text-start">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {{ announcement ? __('Edit Announcement') : __('Create Announcement') }}
                    </h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {{ __('Fill in the details to broadcast your message.') }}
                    </p>
                </div>
                <Link
                    :href="admin.announcements.index.url()"
                    class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    {{ __('Back to List') }}
                </Link>
            </div>

            <form @submit.prevent="submit" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Main Content -->
                <div class="space-y-6 lg:col-span-2">
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="space-y-4">
                            <div>
                                <label class="mb-1 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Title') }}</label>
                                <input
                                    v-model="form.title"
                                    type="text"
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    :placeholder="__('Enter announcement title...')"
                                    required
                                />
                                <p v-if="form.errors.title" class="mt-1 text-xs text-rose-500">{{ form.errors.title }}</p>
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Content') }}</label>
                                <RichTextEditor v-model="form.content" />
                                <p v-if="form.errors.content" class="mt-1 text-xs text-rose-500">{{ form.errors.content }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Targeting -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div class="mb-4 flex items-center justify-between">
                            <h3 class="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                                <Users :size="18" class="text-brand-500" />
                                {{ __('Target Students') }}
                            </h3>
                            <div class="flex gap-2">
                                <button
                                    type="button"
                                    @click="selectAll"
                                    class="text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                                >
                                    {{ __('Select All') }}
                                </button>
                                <span class="text-slate-300 dark:text-slate-700">|</span>
                                <button
                                    type="button"
                                    @click="deselectAll"
                                    class="text-xs font-bold text-slate-500 hover:text-slate-600 dark:text-slate-400"
                                >
                                    {{ __('Deselect All') }}
                                </button>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="relative">
                                <Search :size="16" class="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                                <input
                                    v-model="studentSearch"
                                    type="text"
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    :placeholder="__('Search students to target...')"
                                />
                            </div>
                        </div>

                        <div class="custom-scrollbar max-h-64 space-y-2 overflow-y-auto pr-2">
                            <div v-if="isLoadingStudents" class="flex justify-center py-8">
                                <div class="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
                            </div>
                            <div
                                v-for="student in filteredStudents"
                                :key="student.id"
                                @click="toggleStudent(student.id)"
                                class="flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-900/50"
                                :class="
                                    form.student_ids.includes(student.id)
                                        ? 'border-brand-500 bg-brand-50/50 dark:border-brand-500/50 dark:bg-brand-500/10'
                                        : 'border-slate-100 bg-white dark:bg-slate-800'
                                "
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold dark:bg-slate-900"
                                    >
                                        {{ student.name.substring(0, 2).toUpperCase() }}
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-900 dark:text-white">{{ student.name }}</p>
                                        <p class="text-[10px] text-slate-500">{{ student.email }}</p>
                                    </div>
                                </div>
                                <div
                                    class="flex h-4 w-4 items-center justify-center rounded-full border transition-all"
                                    :class="form.student_ids.includes(student.id) ? 'border-brand-500 bg-brand-500' : 'border-slate-300'"
                                >
                                    <X v-if="form.student_ids.includes(student.id)" :size="10" class="text-white" />
                                </div>
                            </div>
                            <div v-if="filteredStudents.length === 0 && !isLoadingStudents" class="py-8 text-center text-xs text-slate-500">
                                {{ __('No students found.') }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Settings -->
                <div class="space-y-6">
                    <!-- Scope -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <label class="mb-4 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Announcement Scope') }}</label>
                        <div class="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                @click="form.scope = 'global'"
                                class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all"
                                :class="
                                    form.scope === 'global'
                                        ? 'border-brand-500 bg-brand-50/50 dark:border-brand-500/50 dark:bg-brand-500/10'
                                        : 'border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
                                "
                            >
                                <Globe :size="20" :class="form.scope === 'global' ? 'text-brand-600' : 'text-slate-400'" />
                                <span
                                    class="text-xs font-bold"
                                    :class="form.scope === 'global' ? 'text-brand-700 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400'"
                                    >{{ __('Global') }}</span
                                >
                            </button>
                            <button
                                type="button"
                                @click="form.scope = 'course'"
                                class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all"
                                :class="
                                    form.scope === 'course'
                                        ? 'border-brand-500 bg-brand-50/50 dark:border-brand-500/50 dark:bg-brand-500/10'
                                        : 'border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
                                "
                            >
                                <BookOpen :size="20" :class="form.scope === 'course' ? 'text-brand-600' : 'text-slate-400'" />
                                <span
                                    class="text-xs font-bold"
                                    :class="form.scope === 'course' ? 'text-brand-700 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400'"
                                    >{{ __('Course') }}</span
                                >
                            </button>
                        </div>

                        <div v-if="form.scope === 'course'" class="mt-4">
                            <SearchableSelect
                                v-model="form.course_id"
                                :options="processedCourses"
                                :label="__('Select Course')"
                                :placeholder="__('Choose course...')"
                                :error="form.errors.course_id"
                            />
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="rounded-4xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <label class="mb-4 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Publishing Status') }}</label>
                        <div class="space-y-3">
                            <label
                                class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                            >
                                <input v-model="form.status" type="radio" value="draft" class="h-4 w-4 text-brand-600 focus:ring-brand-500" />
                                <span class="text-xs font-bold text-slate-700 dark:text-white">{{ __('Draft') }}</span>
                            </label>
                            <label
                                class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                            >
                                <input v-model="form.status" type="radio" value="broadcast" class="h-4 w-4 text-brand-600 focus:ring-brand-500" />
                                <span class="text-xs font-bold text-slate-700 dark:text-white">{{ __('Broadcast Immediately') }}</span>
                            </label>
                            <label
                                class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                            >
                                <input v-model="form.status" type="radio" value="scheduled" class="h-4 w-4 text-brand-600 focus:ring-brand-500" />
                                <span class="text-xs font-bold text-slate-700 dark:text-white">{{ __('Schedule Broadcast') }}</span>
                            </label>
                        </div>

                        <div v-if="form.status === 'scheduled'" class="mt-4">
                            <label class="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">{{ __('Schedule Datetime') }}</label>
                            <div class="relative">
                                <Calendar :size="16" class="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                                <input
                                    v-model="form.scheduled_at"
                                    type="datetime-local"
                                    class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-xs focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <p v-if="form.errors.scheduled_at" class="mt-1 text-xs text-rose-500">{{ form.errors.scheduled_at }}</p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-col gap-3">
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 p-4 text-sm font-bold text-white transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                        >
                            <Save v-if="!form.processing" :size="20" />
                            <div v-else class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            {{ announcement ? __('Update Announcement') : __('Create Announcement') }}
                        </button>
                        <Link
                            :href="admin.announcements.index.url()"
                            class="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            <X :size="20" />
                            {{ __('Cancel') }}
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
}
</style>
