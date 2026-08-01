<script setup lang="ts">
import ConfirmationModal from '@/Components/Common/ConfirmationModal.vue';
import RichTextEditor from '@/Components/Common/RichTextEditor.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import {
    Check,
    ChevronLeft,
    ClipboardList,
    ExternalLink,
    File,
    FileText,
    HelpCircle,
    Link as LinkIcon,
    Package,
    Pencil,
    PlayCircle,
    Plus,
    Trash2,
    UploadCloud,
    Video,
    X,
    Youtube,
} from 'lucide-vue-next';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
    course: Object as PropType<any>,
});

// Section Management
const showSectionModal = ref(false);
const editingSection = ref<any>(null);
const sectionForm = useForm({
    title: '',
    order: 0,
    has_unlock_date: false,
    unlock_date: '',
});

const openSectionModal = (section: any = null) => {
    editingSection.value = section;
    if (section) {
        sectionForm.title = section.title;
        sectionForm.order = section.order;
        sectionForm.has_unlock_date = !!section.has_unlock_date;
        sectionForm.unlock_date = section.unlock_date ? new Date(section.unlock_date).toISOString().slice(0, 16) : '';
    } else {
        sectionForm.reset();
    }
    showSectionModal.value = true;
};

const submitSection = () => {
    if (editingSection.value) {
        sectionForm.put(admin.sections.update.url(editingSection.value.id), {
            onSuccess: () => {
                showSectionModal.value = false;
                editingSection.value = null;
            },
        });
    } else {
        sectionForm.post(admin.courses.sections.store.url(props.course.id), {
            onSuccess: () => {
                showSectionModal.value = false;
            },
        });
    }
};

const sectionToDelete = ref<any>(null);
const showSectionDeleteModal = ref(false);

const confirmDeleteSection = (section: any) => {
    sectionToDelete.value = section;
    showSectionDeleteModal.value = true;
};

const deleteSection = () => {
    router.delete(admin.sections.destroy.url(sectionToDelete.value.id), {
        onSuccess: () => {
            showSectionDeleteModal.value = false;
            sectionToDelete.value = null;
        },
    });
};

// Lesson Management
const showLessonModal = ref(false);
const editingLesson = ref<any>(null);
const activeSection = ref<any>(null);
const lessonForm = useForm({
    title: '',
    type: 'VIDEO',
    content: '',
    video_provider: 'YOUTUBE',
    video_url: '',
    file_path: null as File | string | null,
    duration: 0,
    is_preview: false,
    order: 0,
    total_marks: 100,
    deadline: '',
    quiz_data: {
        questions: [] as Array<{
            question: string;
            options: string[];
            correct_answer: number;
        }>,
    },
    assignment_data: {
        fields: {
            file_count: 0,
            file_label: 'Attachment',
            allow_text: false,
            text_label: 'Submit Link / Text',
            allow_description: false,
            description_label: 'Description',
        },
    },
});

const handleLessonFileChange = (e: any) => {
    lessonForm.file_path = e.target.files[0];
};

const openLessonModal = (section: any, lesson: any = null) => {
    activeSection.value = section;
    editingLesson.value = lesson;

    // Explicitly reset form to initial values before populating
    lessonForm.reset();
    lessonForm.clearErrors();

    // Reset complex nested objects to their defaults
    lessonForm.quiz_data = { questions: [] };
    lessonForm.assignment_data = {
        fields: {
            file_count: 0,
            file_label: 'Attachment',
            allow_text: false,
            text_label: 'Submit Link / Text',
            allow_description: false,
            description_label: 'Description',
        },
    };

    if (lesson) {
        lessonForm.title = lesson.title;
        lessonForm.type = lesson.type;
        lessonForm.content = lesson.content || '';
        lessonForm.video_provider = lesson.video_provider || 'YOUTUBE';
        lessonForm.video_url = lesson.video_url || '';
        lessonForm.file_path = lesson.file_path || null;
        lessonForm.duration = lesson.duration || 0;
        lessonForm.is_preview = !!lesson.is_preview;
        lessonForm.order = lesson.order || 0;
        lessonForm.total_marks = lesson.total_marks || 100;
        lessonForm.deadline = lesson.deadline ? new Date(lesson.deadline).toISOString().slice(0, 16) : '';

        // Parse quiz data from content if lesson type is QUIZ
        if (lesson.type === 'QUIZ' && lesson.content) {
            try {
                lessonForm.quiz_data = JSON.parse(lesson.content);
            } catch (e) {
                lessonForm.quiz_data = { questions: [] };
            }
        } else if (lesson.type === 'ASSIGNMENT' && lesson.content) {
            try {
                lessonForm.assignment_data = JSON.parse(lesson.content);
                // Ensure default labels exist if missing from old data
                if (!lessonForm.assignment_data.fields.file_label) lessonForm.assignment_data.fields.file_label = 'Attachment';
                if (!lessonForm.assignment_data.fields.text_label) lessonForm.assignment_data.fields.text_label = 'Submit Link / Text';
                if (!lessonForm.assignment_data.fields.description_label) lessonForm.assignment_data.fields.description_label = 'Description';
            } catch (e) {
                lessonForm.assignment_data = {
                    fields: {
                        file_count: 0,
                        file_label: 'Attachment',
                        allow_text: false,
                        text_label: 'Submit Link / Text',
                        allow_description: false,
                        description_label: 'Description',
                    },
                };
            }
        }
    } else {
        // Creating new lesson - set default type
        lessonForm.type = 'VIDEO';
    }
    showLessonModal.value = true;
};

const submitLesson = () => {
    if (editingLesson.value) {
        // Use post with _method PUT for file uploads
        lessonForm
            .transform((data) => {
                // Serialize quiz_data to content field if type is QUIZ
                if (data.type === 'QUIZ') {
                    return {
                        ...data,
                        content: JSON.stringify(data.quiz_data),
                        _method: 'PUT',
                    };
                }
                if (data.type === 'ASSIGNMENT') {
                    return {
                        ...data,
                        content: JSON.stringify(data.assignment_data),
                        _method: 'PUT',
                    };
                }
                return {
                    ...data,
                    _method: 'PUT',
                };
            })
            .post(admin.lessons.update.url(editingLesson.value.id), {
                forceFormData: true,
                onSuccess: () => {
                    showLessonModal.value = false;
                    editingLesson.value = null;
                    activeSection.value = null;
                },
            });
    } else {
        lessonForm
            .transform((data) => {
                // Serialize quiz_data to content field if type is QUIZ
                if (data.type === 'QUIZ') {
                    return {
                        ...data,
                        content: JSON.stringify(data.quiz_data),
                    };
                }
                if (data.type === 'ASSIGNMENT') {
                    return {
                        ...data,
                        content: JSON.stringify(data.assignment_data),
                    };
                }
                return data;
            })
            .post(admin.sections.lessons.store.url(activeSection.value.id), {
                onSuccess: () => {
                    showLessonModal.value = false;
                    activeSection.value = null;
                },
            });
    }
};

// Preview Management
const showPreviewModal = ref(false);
const previewLesson = ref<any>(null);

const openPreviewModal = (lesson: any) => {
    previewLesson.value = lesson;
    showPreviewModal.value = true;
};

const parsedPreviewContent = computed(() => {
    if (!previewLesson.value || !previewLesson.value.content) return null;
    try {
        return JSON.parse(previewLesson.value.content);
    } catch (e) {
        return null;
    }
});

const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

const lessonToDelete = ref<any>(null);
const showLessonDeleteModal = ref(false);

const confirmDeleteLesson = (lesson: any) => {
    lessonToDelete.value = lesson;
    showLessonDeleteModal.value = true;
};

const deleteLesson = () => {
    router.delete(admin.lessons.destroy.url(lessonToDelete.value.id), {
        onSuccess: () => {
            showLessonDeleteModal.value = false;
            lessonToDelete.value = null;
        },
    });
};

const getLessonIcon = (type: string) => {
    switch (type) {
        case 'VIDEO':
            return Video;
        case 'TEXT':
            return FileText;
        case 'FILE':
            return File;
        case 'QUIZ':
            return HelpCircle;
        case 'ASSIGNMENT':
            return ClipboardList;
        default:
            return PlayCircle;
    }
};
</script>

<template>
    <Head :title="__('Curriculum - :title', { title: course.title })" />

    <AdminLayout>
        <div class="animate-fade-in mx-auto max-w-4xl space-y-8 text-start">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <div class="mb-2 flex items-center gap-2">
                        <Link :href="admin.courses.index.url()" class="text-slate-400 transition-colors hover:text-brand-600">
                            <ChevronLeft :size="18" />
                        </Link>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Course Content') }}</span>
                    </div>
                    <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ __('Curriculum Builder') }}</h2>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ __('Structure your course with sections and lessons.') }}</p>
                </div>
                <button
                    @click="openSectionModal()"
                    class="flex items-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95"
                >
                    <Plus :size="18" class="me-2" /> {{ __('Add Section') }}
                </button>
            </div>

            <!-- Sections List -->
            <div class="space-y-6">
                <div
                    v-for="(section, index) in course.sections"
                    :key="section.id"
                    class="group overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                    <div
                        class="flex items-center justify-between border-b border-slate-50 bg-slate-50/30 p-5 dark:border-slate-700/50 dark:bg-slate-800/20"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[10px] font-black text-slate-400 dark:border-slate-700 dark:bg-slate-900"
                            >
                                {{ Number(index) + 1 }}
                            </div>
                            <h3 class="font-bold text-slate-900 dark:text-white">{{ section.title }}</h3>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                @click="openLessonModal(section)"
                                class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold tracking-widest text-brand-600 uppercase transition-colors hover:bg-brand-50 dark:hover:bg-brand-900/20"
                            >
                                <Plus :size="12" /> {{ __('Add Lesson') }}
                            </button>
                            <div class="h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900"></div>
                            <button @click="openSectionModal(section)" class="p-2 text-slate-400 transition-colors hover:text-brand-600">
                                <Pencil :size="14" />
                            </button>
                            <button @click="confirmDeleteSection(section)" class="p-2 text-slate-400 transition-colors hover:text-rose-500">
                                <Trash2 :size="14" />
                            </button>
                        </div>
                    </div>

                    <!-- Lessons List -->
                    <div class="divide-y divide-slate-50 dark:divide-slate-700/50">
                        <div
                            v-for="(lesson, lIndex) in section.lessons"
                            :key="lesson.id"
                            class="group/lesson flex items-center justify-between p-4 pl-12 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
                        >
                            <div class="flex items-center gap-3 text-start">
                                <component :is="getLessonIcon(lesson.type)" :size="16" class="text-slate-400" />
                                <div>
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ lesson.title }}</p>
                                    <div class="mt-0.5 flex items-center gap-2">
                                        <span class="text-[9px] font-bold tracking-widest text-slate-400 uppercase">{{ lesson.type }}</span>
                                        <span
                                            v-if="lesson.is_preview"
                                            class="flex items-center gap-1 text-[9px] font-bold tracking-widest text-emerald-500 uppercase"
                                        >
                                            <Check :size="8" /> {{ __('Preview') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-1 opacity-0 transition-opacity group-hover/lesson:opacity-100">
                                <button
                                    @click="openPreviewModal(lesson)"
                                    class="p-2 text-slate-400 transition-colors hover:text-emerald-600"
                                    :title="__('Preview')"
                                >
                                    <PlayCircle :size="14" />
                                </button>
                                <button @click="openLessonModal(section, lesson)" class="p-2 text-slate-400 transition-colors hover:text-brand-600">
                                    <Pencil :size="14" />
                                </button>
                                <button @click="confirmDeleteLesson(lesson)" class="p-2 text-slate-400 transition-colors hover:text-rose-500">
                                    <Trash2 :size="14" />
                                </button>
                            </div>
                        </div>
                        <div v-if="section.lessons.length === 0" class="p-10 text-center">
                            <p class="text-xs font-medium text-slate-400 italic">{{ __('No lessons added yet.') }}</p>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div
                    v-if="course.sections.length === 0"
                    class="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-20 text-center dark:border-slate-700 dark:bg-slate-800"
                >
                    <div class="flex flex-col items-center gap-4">
                        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300 dark:bg-slate-900">
                            <Package :size="32" />
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Empty Curriculum') }}</h3>
                            <p class="mx-auto mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                                {{ __('Start adding sections to organize your course lessons and materials.') }}
                            </p>
                        </div>
                        <button
                            @click="openSectionModal()"
                            class="mt-2 flex items-center gap-2 text-sm font-bold text-brand-600 transition-all hover:gap-3"
                        >
                            {{ __('Add your first section') }} <ChevronLeft :size="16" class="rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section Modal -->
        <div
            v-if="showSectionModal"
            class="animate-in fade-in fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm duration-200"
        >
            <div class="animate-in zoom-in-95 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl duration-200 dark:bg-slate-800">
                <div class="flex items-center justify-between border-b border-slate-50 p-6 text-start dark:border-slate-700">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                        {{ editingSection ? __('Edit Section') : __('Add New Section') }}
                    </h3>
                    <button @click="showSectionModal = false" class="text-slate-400 transition-colors hover:text-slate-600"><X :size="20" /></button>
                </div>
                <form @submit.prevent="submitSection" class="space-y-4 p-6 text-start">
                    <div>
                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Section Title') }}</label>
                        <input
                            v-model="sectionForm.title"
                            type="text"
                            :placeholder="__('e.g. Introduction')"
                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                            required
                        />
                    </div>
                    <div>
                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Display Order') }}</label>
                        <input
                            v-model="sectionForm.order"
                            type="number"
                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                        />
                    </div>

                    <!-- Unlock Date Section -->
                    <div class="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Schedule Unlock') }}</label>
                            <label class="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" v-model="sectionForm.has_unlock_date" class="peer sr-only" />
                                <div
                                    class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                ></div>
                            </label>
                        </div>

                        <div v-if="sectionForm.has_unlock_date" class="animate-in slide-in-from-top-2 duration-200">
                            <label class="mb-2 block text-xs font-bold text-slate-500 uppercase">{{ __('Unlock Date & Time') }}</label>
                            <input
                                v-model="sectionForm.unlock_date"
                                type="datetime-local"
                                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                required
                            />
                            <p v-if="sectionForm.errors.unlock_date" class="mt-2 text-xs text-rose-500">{{ sectionForm.errors.unlock_date }}</p>
                        </div>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button
                            type="button"
                            @click="showSectionModal = false"
                            class="flex-1 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                            {{ __('Cancel') }}
                        </button>
                        <button
                            type="submit"
                            :disabled="sectionForm.processing"
                            class="flex-1 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition-all active:scale-95"
                        >
                            {{ sectionForm.processing ? __('Saving...') : __('Save Section') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Lesson Modal -->
        <div
            v-if="showLessonModal"
            class="animate-in fade-in fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm duration-200"
        >
            <div
                class="animate-in zoom-in-95 w-full overflow-hidden rounded-3xl bg-white shadow-2xl duration-200 dark:bg-slate-800"
                :class="lessonForm.type === 'ASSIGNMENT' ? 'max-w-5xl' : 'max-w-2xl'"
            >
                <div class="flex items-center justify-between border-b border-slate-50 px-8 py-5 text-start dark:border-slate-700">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                            {{ editingLesson ? __('Edit Lesson') : __('Add New Lesson') }}
                        </h3>
                        <div class="mt-1 flex items-center gap-3">
                            <label class="relative inline-flex origin-left scale-75 cursor-pointer items-center">
                                <input type="checkbox" v-model="lessonForm.is_preview" class="peer sr-only" />
                                <div
                                    class="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-emerald-500 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                ></div>
                            </label>
                            <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Free Preview') }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <button
                            type="button"
                            @click="showLessonModal = false"
                            class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                        >
                            {{ __('Close') }}
                        </button>
                        <button
                            @click="submitLesson"
                            :disabled="lessonForm.processing"
                            class="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-50"
                        >
                            <span
                                v-if="lessonForm.processing"
                                class="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            ></span>
                            {{ editingLesson ? __('Update') : __('Create') }}
                        </button>
                    </div>
                </div>
                <form @submit.prevent="submitLesson" class="max-h-[75vh] space-y-8 overflow-y-auto p-10 text-start">
                    <!-- Lesson Type Selector -->
                    <div class="space-y-4">
                        <label class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{ __('Lesson Type') }}</label>
                        <div class="grid grid-cols-5 gap-2">
                            <button
                                v-for="type in [
                                    { id: 'VIDEO', label: __('Video'), icon: Video, color: 'brand' },
                                    { id: 'TEXT', label: __('Text'), icon: FileText, color: 'emerald' },
                                    { id: 'FILE', label: __('File'), icon: File, color: 'amber' },
                                    { id: 'QUIZ', label: __('Quiz'), icon: HelpCircle, color: 'purple' },
                                    { id: 'ASSIGNMENT', label: __('Task'), icon: ClipboardList, color: 'blue' },
                                ]"
                                :key="type.id"
                                type="button"
                                @click="lessonForm.type = type.id"
                                class="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-2.5 transition-all"
                                :class="
                                    lessonForm.type === type.id
                                        ? `border-${type.color}-600 bg-${type.color}-50 text-${type.color}-600 dark:bg-${type.color}-900/20`
                                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 dark:border-slate-700 dark:bg-slate-900/50'
                                "
                            >
                                <component :is="type.icon" :size="18" />
                                <span class="text-[10px] font-bold">{{ type.label }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <!-- Left Column: Settings -->
                        <div class="space-y-6">
                            <div class="space-y-5">
                                <div>
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Lesson Title') }}</label>
                                    <input
                                        v-model="lessonForm.title"
                                        type="text"
                                        :placeholder="__('e.g. Setting up the Project')"
                                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                        required
                                    />
                                    <p v-if="lessonForm.errors.title" class="mt-2 text-xs text-rose-500">{{ lessonForm.errors.title }}</p>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div v-if="lessonForm.type !== 'ASSIGNMENT'">
                                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Order') }}</label>
                                        <input
                                            v-model="lessonForm.order"
                                            type="number"
                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                        />
                                    </div>
                                    <div v-if="lessonForm.type !== 'FILE' && lessonForm.type !== 'ASSIGNMENT'">
                                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                            __('Duration (Min)')
                                        }}</label>
                                        <input
                                            v-model="lessonForm.duration"
                                            type="number"
                                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Content -->
                        <div class="space-y-6">
                            <div v-if="lessonForm.type === 'VIDEO'" class="animate-in slide-in-from-right-4 duration-300">
                                <div class="space-y-5 rounded-3xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50">
                                    <div>
                                        <label class="mb-3 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">{{
                                            __('Video Provider')
                                        }}</label>
                                        <div class="grid grid-cols-3 gap-3">
                                            <button
                                                v-for="provider in [
                                                    { id: 'YOUTUBE', label: 'YouTube', icon: Youtube, color: 'rose' },
                                                    { id: 'VIMEO', label: 'Vimeo', icon: Video, color: 'sky' },
                                                    { id: 'CUSTOM', label: 'Custom URL', icon: LinkIcon, color: 'slate' },
                                                ]"
                                                :key="provider.id"
                                                type="button"
                                                @click="lessonForm.video_provider = provider.id"
                                                class="flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-2.5 transition-all"
                                                :class="
                                                    lessonForm.video_provider === provider.id
                                                        ? `border-${provider.color}-500 bg-white text-${provider.color}-600 shadow-sm dark:border-${provider.color}-500 dark:bg-${provider.color}-900/10 dark:text-${provider.color}-400`
                                                        : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:border-slate-600'
                                                "
                                            >
                                                <component :is="provider.icon" :size="18" />
                                                <span class="text-[9px] font-bold tracking-wide uppercase">{{ provider.label }}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {{ lessonForm.video_provider === 'VIMEO' ? __('Vimeo URL or ID') : __('Video URL') }}
                                        </label>
                                        <div class="relative">
                                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                                <Video :size="16" class="text-slate-400" />
                                            </div>
                                            <input
                                                v-model="lessonForm.video_url"
                                                type="text"
                                                :placeholder="
                                                    lessonForm.video_provider === 'VIMEO'
                                                        ? 'e.g. 1165068495 or https://vimeo.com/...'
                                                        : 'YouTube or Video URL'
                                                "
                                                class="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                            />
                                        </div>
                                        <p v-if="lessonForm.errors.video_url" class="mt-2 text-xs text-rose-500">{{ lessonForm.errors.video_url }}</p>
                                    </div>
                                </div>
                            </div>

                            <div v-if="lessonForm.type === 'FILE'" class="animate-in slide-in-from-right-4 duration-300">
                                <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Attachment File') }}</label>
                                <div
                                    class="relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50"
                                >
                                    <File :size="32" :class="lessonForm.file_path ? 'text-brand-600' : 'text-slate-300'" />
                                    <span class="max-w-full truncate px-4 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                        {{
                                            lessonForm.file_path && typeof lessonForm.file_path !== 'string'
                                                ? lessonForm.file_path.name
                                                : lessonForm.file_path
                                                  ? lessonForm.file_path.split('/').pop()
                                                  : __('Click to upload file')
                                        }}
                                    </span>
                                    <input type="file" @change="handleLessonFileChange" class="absolute inset-0 cursor-pointer opacity-0" />
                                </div>
                                <p v-if="lessonForm.errors.file_path" class="mt-2 text-xs text-rose-500">{{ lessonForm.errors.file_path }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Full Width Rich Text -->
                    <div v-if="lessonForm.type === 'TEXT'" class="animate-in slide-in-from-bottom-4 space-y-2 duration-300">
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Lesson Content') }}</label>
                        <RichTextEditor v-model="lessonForm.content" />
                        <p v-if="lessonForm.errors.content" class="mt-2 text-xs text-rose-500">{{ lessonForm.errors.content }}</p>
                    </div>

                    <!-- Quiz Builder -->
                    <div v-if="lessonForm.type === 'QUIZ'" class="animate-in slide-in-from-bottom-4 space-y-4 duration-300">
                        <div class="flex items-center justify-between">
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Quiz Questions') }}</label>
                            <button
                                type="button"
                                @click="
                                    lessonForm.quiz_data.questions.push({
                                        question: '',
                                        options: ['', '', '', ''],
                                        correct_answer: 0,
                                    })
                                "
                                class="flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-600 transition-all hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
                            >
                                <Plus :size="14" /> {{ __('Add Question') }}
                            </button>
                        </div>

                        <!-- Questions List -->
                        <div v-if="lessonForm.quiz_data.questions.length > 0" class="space-y-4">
                            <div
                                v-for="(question, qIndex) in lessonForm.quiz_data.questions"
                                :key="qIndex"
                                class="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-5 dark:border-slate-700 dark:bg-slate-900/50"
                            >
                                <div class="mb-3 flex items-center justify-between">
                                    <span class="text-xs font-bold text-slate-500">{{ __('Question') }} {{ qIndex + 1 }}</span>
                                    <button
                                        type="button"
                                        @click="lessonForm.quiz_data.questions.splice(qIndex, 1)"
                                        class="p-1.5 text-slate-400 transition-colors hover:text-rose-500"
                                    >
                                        <Trash2 :size="14" />
                                    </button>
                                </div>

                                <!-- Question Text -->
                                <div class="mb-4">
                                    <input
                                        v-model="question.question"
                                        type="text"
                                        :placeholder="__('Enter question text')"
                                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                        required
                                    />
                                </div>

                                <!-- Options -->
                                <div class="space-y-2">
                                    <label class="text-xs font-bold text-slate-500">{{ __('Options (select correct answer)') }}</label>
                                    <div v-for="(option, oIndex) in question.options" :key="oIndex" class="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            :name="'question-' + qIndex"
                                            :checked="question.correct_answer === oIndex"
                                            @change="question.correct_answer = oIndex"
                                            class="h-4 w-4 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                                        />
                                        <input
                                            v-model="question.options[oIndex]"
                                            type="text"
                                            :placeholder="__('Option') + ' ' + (oIndex + 1)"
                                            class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div
                            v-else
                            class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-12 dark:border-slate-700 dark:bg-slate-900/50"
                        >
                            <HelpCircle :size="32" class="mb-3 text-slate-300" />
                            <p class="text-sm text-slate-500">{{ __('No questions added yet') }}</p>
                        </div>
                    </div>

                    <!-- Assignment Builder -->
                    <div v-if="lessonForm.type === 'ASSIGNMENT'" class="animate-in slide-in-from-bottom-4 space-y-8 duration-300">
                        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-5">
                            <!-- Left: Config -->
                            <div class="space-y-6 lg:col-span-1 xl:col-span-2">
                                <div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{ __('Total Marks') }}</label>
                                    <input
                                        v-model="lessonForm.total_marks"
                                        type="number"
                                        min="0"
                                        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                    />
                                </div>

                                <div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
                                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                        __('Submission Deadline')
                                    }}</label>
                                    <input
                                        v-model="lessonForm.deadline"
                                        type="datetime-local"
                                        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                    />
                                    <p v-if="lessonForm.errors.deadline" class="mt-2 text-xs text-rose-500">{{ lessonForm.errors.deadline }}</p>
                                </div>

                                <div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
                                    <h4 class="mb-4 text-sm font-bold text-slate-900 dark:text-white">{{ __('Submission Form Fields') }}</h4>
                                    <div class="space-y-6">
                                        <!-- File Upload -->
                                        <div
                                            class="space-y-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800"
                                        >
                                            <div class="flex items-center justify-between gap-4">
                                                <label class="relative inline-flex shrink-0 cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        :checked="lessonForm.assignment_data.fields.file_count > 0"
                                                        @change="
                                                            (e: any) => (lessonForm.assignment_data.fields.file_count = e.target.checked ? 1 : 0)
                                                        "
                                                        class="peer sr-only"
                                                    />
                                                    <div
                                                        class="peer h-6 w-11 shrink-0 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                                    ></div>
                                                    <span class="ml-3 text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                                        __('File Upload')
                                                    }}</span>
                                                </label>

                                                <div v-if="lessonForm.assignment_data.fields.file_count > 0" class="flex items-center gap-2">
                                                    <label class="text-xs font-bold text-slate-500">{{ __('Max Files:') }}</label>
                                                    <input
                                                        v-model="lessonForm.assignment_data.fields.file_count"
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        class="w-20 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                v-if="lessonForm.assignment_data.fields.file_count > 0"
                                                class="animate-in slide-in-from-top-2 duration-200"
                                            >
                                                <label class="mb-1 block text-xs font-bold text-slate-500 uppercase">{{ __('Field Label') }}</label>
                                                <input
                                                    v-model="lessonForm.assignment_data.fields.file_label"
                                                    type="text"
                                                    :placeholder="__('e.g. Upload your report')"
                                                    class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                                />
                                            </div>
                                        </div>

                                        <!-- Text Input -->
                                        <div
                                            class="space-y-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800"
                                        >
                                            <label class="relative inline-flex shrink-0 cursor-pointer items-center">
                                                <input type="checkbox" v-model="lessonForm.assignment_data.fields.allow_text" class="peer sr-only" />
                                                <div
                                                    class="peer h-6 w-11 shrink-0 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                                ></div>
                                                <span class="ml-3 text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                                    __('Short Text Input')
                                                }}</span>
                                            </label>

                                            <div
                                                v-if="lessonForm.assignment_data.fields.allow_text"
                                                class="animate-in slide-in-from-top-2 duration-200"
                                            >
                                                <label class="mb-1 block text-xs font-bold text-slate-500 uppercase">{{ __('Field Label') }}</label>
                                                <input
                                                    v-model="lessonForm.assignment_data.fields.text_label"
                                                    type="text"
                                                    :placeholder="__('e.g. Enter your Google Drive link')"
                                                    class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                                />
                                            </div>
                                        </div>

                                        <!-- Description Input -->
                                        <div
                                            class="space-y-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800"
                                        >
                                            <label class="relative inline-flex shrink-0 cursor-pointer items-center">
                                                <input
                                                    type="checkbox"
                                                    v-model="lessonForm.assignment_data.fields.allow_description"
                                                    class="peer sr-only"
                                                />
                                                <div
                                                    class="peer h-6 w-11 shrink-0 rounded-full bg-slate-200 peer-checked:bg-brand-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700"
                                                ></div>
                                                <span class="ml-3 text-sm font-bold text-slate-700 dark:text-slate-300">{{
                                                    __('Description Textarea')
                                                }}</span>
                                            </label>

                                            <div
                                                v-if="lessonForm.assignment_data.fields.allow_description"
                                                class="animate-in slide-in-from-top-2 duration-200"
                                            >
                                                <label class="mb-1 block text-xs font-bold text-slate-500 uppercase">{{ __('Field Label') }}</label>
                                                <input
                                                    v-model="lessonForm.assignment_data.fields.description_label"
                                                    type="text"
                                                    :placeholder="__('e.g. Write your reflection here')"
                                                    class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Live Preview -->
                            <div
                                class="rounded-3xl border border-slate-100 bg-slate-50/30 p-8 lg:col-span-1 xl:col-span-3 dark:border-slate-800 dark:bg-slate-900/20"
                            >
                                <div class="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                                    <div>
                                        <h4 class="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">{{ __('Form Preview') }}</h4>
                                        <p class="mt-1 text-[10px] text-slate-500">{{ __('Live view of the student submission form') }}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                                        <span class="text-[10px] font-bold text-emerald-600 uppercase">{{ __('Live') }}</span>
                                    </div>
                                </div>

                                <div class="space-y-6">
                                    <h5 class="text-lg font-bold text-slate-800 dark:text-white">{{ __('Submit Your Task') }}</h5>

                                    <!-- File Preview -->
                                    <div v-if="lessonForm.assignment_data.fields.file_count > 0" class="space-y-2">
                                        <label class="block text-xs font-bold text-slate-500 underline decoration-slate-200 underline-offset-4">
                                            {{ lessonForm.assignment_data.fields.file_label || __('Attachment') }}
                                        </label>
                                        <div
                                            class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800"
                                        >
                                            <UploadCloud :size="24" class="mb-2 text-slate-300" />
                                            <p class="text-[10px] font-bold text-slate-400 uppercase">{{ __('Upload Files') }}</p>
                                        </div>
                                    </div>

                                    <!-- Text Preview -->
                                    <div v-if="lessonForm.assignment_data.fields.allow_text" class="space-y-2">
                                        <label class="block text-xs font-bold text-slate-500 underline decoration-slate-200 underline-offset-4">
                                            {{ lessonForm.assignment_data.fields.text_label || __('Short Text') }}
                                        </label>
                                        <div
                                            class="h-12 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800"
                                        ></div>
                                    </div>

                                    <!-- Description Preview -->
                                    <div v-if="lessonForm.assignment_data.fields.allow_description" class="space-y-2">
                                        <label class="block text-xs font-bold text-slate-500 underline decoration-slate-200 underline-offset-4">
                                            {{ lessonForm.assignment_data.fields.description_label || __('Description') }}
                                        </label>
                                        <div
                                            class="h-24 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800"
                                        ></div>
                                    </div>

                                    <!-- Empty State in Preview -->
                                    <div
                                        v-if="
                                            lessonForm.assignment_data.fields.file_count === 0 &&
                                            !lessonForm.assignment_data.fields.allow_text &&
                                            !lessonForm.assignment_data.fields.allow_description
                                        "
                                        class="rounded-2xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-700"
                                    >
                                        <ClipboardList :size="32" class="mx-auto mb-3 text-slate-200" />
                                        <p class="text-xs text-slate-400 italic">{{ __('Enable fields to see preview') }}</p>
                                    </div>

                                    <div class="pt-4">
                                        <button disabled class="w-full rounded-xl bg-brand-600/50 py-3 text-xs font-bold text-white uppercase">
                                            {{ __('Submit Task') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Confirmation Modals -->
        <!-- Preview Modal -->
        <div
            v-if="showPreviewModal"
            class="animate-in fade-in fixed inset-0 z-70 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm duration-200"
        >
            <div class="animate-in zoom-in-95 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl duration-200 dark:bg-slate-800">
                <div class="flex items-center justify-between border-b border-slate-50 p-6 text-start dark:border-slate-700">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ previewLesson.title }}</h3>
                        <p class="text-xs text-slate-500">{{ previewLesson.type }}</p>
                    </div>
                    <button @click="showPreviewModal = false" class="text-slate-400 transition-colors hover:text-slate-600"><X :size="20" /></button>
                </div>
                <div class="max-h-[70vh] overflow-y-auto p-8 text-start">
                    <!-- Video Preview -->
                    <div v-if="previewLesson.type === 'VIDEO'" class="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
                        <iframe
                            v-if="getYoutubeId(previewLesson.video_url)"
                            :src="'https://www.youtube.com/embed/' + getYoutubeId(previewLesson.video_url)"
                            class="h-full w-full"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <div v-else class="flex h-full w-full items-center justify-center text-white">
                            <p>{{ __('Unsupported or invalid video URL') }}</p>
                        </div>
                    </div>

                    <!-- Text Preview -->
                    <div v-if="previewLesson.type === 'TEXT'" class="prose max-w-none dark:prose-invert" v-html="previewLesson.content"></div>

                    <!-- File Preview -->
                    <div v-if="previewLesson.type === 'FILE'" class="flex flex-col items-center justify-center gap-4 py-12">
                        <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-900/20">
                            <File :size="40" />
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-bold text-slate-900 dark:text-white">{{ __('Attachment File') }}</p>
                            <p class="text-sm text-slate-500">{{ __('This lesson contains a downloadable file.') }}</p>
                        </div>
                        <a
                            :href="'/storage/' + previewLesson.file_path"
                            target="_blank"
                            class="flex items-center gap-2 rounded-2xl bg-brand-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95"
                        >
                            <ExternalLink :size="18" /> {{ __('Open / Download File') }}
                        </a>
                    </div>

                    <!-- Assignment Preview -->
                    <div v-if="previewLesson.type === 'ASSIGNMENT'" class="animate-in slide-in-from-bottom-4 space-y-6 duration-300">
                        <div class="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-700 dark:bg-slate-900/50">
                            <h4 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">{{ __('Submit Your Task') }}</h4>

                            <template v-if="parsedPreviewContent">
                                <div v-if="parsedPreviewContent.fields" class="space-y-6">
                                    <!-- File Upload -->
                                    <div v-if="parsedPreviewContent.fields.file_count > 0" class="space-y-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {{ parsedPreviewContent.fields.file_label || __('Attachment') }}
                                        </label>
                                        <div
                                            class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 transition-colors hover:border-brand-500/50 dark:border-slate-700 dark:bg-slate-800"
                                        >
                                            <div class="mb-3 rounded-full bg-slate-100 p-4 text-slate-400 dark:bg-slate-700">
                                                <UploadCloud :size="28" />
                                            </div>
                                            <p class="text-sm font-bold text-slate-600 dark:text-slate-400">{{ __('Drag and drop files here') }}</p>
                                            <p class="mt-1 text-xs text-slate-400">
                                                {{ __('or click to browse') }} ({{
                                                    __('Max :count files', { count: parsedPreviewContent.fields.file_count })
                                                }})
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Short Text -->
                                    <div v-if="parsedPreviewContent.fields.allow_text" class="space-y-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {{ parsedPreviewContent.fields.text_label || __('Short Text') }}
                                        </label>
                                        <input
                                            type="text"
                                            class="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                            :placeholder="__('Enter your response here...')"
                                            readonly
                                        />
                                    </div>

                                    <!-- Description -->
                                    <div v-if="parsedPreviewContent.fields.allow_description" class="space-y-2">
                                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {{ parsedPreviewContent.fields.description_label || __('Description') }}
                                        </label>
                                        <textarea
                                            rows="5"
                                            class="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                                            :placeholder="__('Write your description or notes...')"
                                            readonly
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    class="mt-8 w-full rounded-2xl bg-brand-600 py-4 text-base font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:bg-brand-700"
                                >
                                    {{ __('Submit Task') }}
                                </button>
                            </template>
                            <div v-else class="py-12 text-center text-slate-500">
                                <p>{{ __('No fields configured for this task.') }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Quiz Preview -->
                    <div v-if="previewLesson.type === 'QUIZ'" class="space-y-6">
                        <template v-if="parsedPreviewContent">
                            <div
                                v-for="(question, qIndex) in parsedPreviewContent.questions"
                                :key="qIndex"
                                class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div class="mb-4 flex items-start gap-3">
                                    <div
                                        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-600 dark:bg-purple-900/20"
                                    >
                                        {{ Number(qIndex) + 1 }}
                                    </div>
                                    <p class="flex-1 text-base font-medium text-slate-900 dark:text-white">{{ question.question }}</p>
                                </div>
                                <div class="space-y-2 pl-11">
                                    <div
                                        v-for="(option, oIndex) in question.options"
                                        :key="oIndex"
                                        class="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all"
                                        :class="
                                            question.correct_answer === oIndex
                                                ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
                                                : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'
                                        "
                                    >
                                        <div
                                            class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2"
                                            :class="question.correct_answer === oIndex ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'"
                                        >
                                            <Check v-if="question.correct_answer === oIndex" :size="10" class="text-white" />
                                        </div>
                                        <span
                                            :class="
                                                question.correct_answer === oIndex
                                                    ? 'font-semibold text-emerald-700 dark:text-emerald-400'
                                                    : 'text-slate-700 dark:text-slate-300'
                                            "
                                            >{{ option }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-else class="py-12 text-center text-slate-500">{{ __('No questions in this quiz') }}</div>
                    </div>
                </div>
            </div>
        </div>

        <ConfirmationModal
            :show="showSectionDeleteModal"
            :title="__('Delete Section?')"
            :message="__('All lessons in this section will also be deleted. This action cannot be undone.')"
            :confirmText="__('Delete Section')"
            @close="showSectionDeleteModal = false"
            @confirm="deleteSection"
            type="danger"
        />

        <ConfirmationModal
            :show="showLessonDeleteModal"
            :title="__('Delete Lesson?')"
            :message="__('Are you sure you want to remove this lesson?')"
            :confirmText="__('Delete Lesson')"
            @close="showLessonDeleteModal = false"
            @confirm="deleteLesson"
            type="danger"
        />
    </AdminLayout>
</template>
