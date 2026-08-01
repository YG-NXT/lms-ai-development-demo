<script setup lang="ts">
import { download } from '@/actions/App/Http/Controllers/Student/CertificateController';
import CodeLesson from '@/Components/Student/Lesson/CodeLesson.vue';
import FileLesson from '@/Components/Student/Lesson/FileLesson.vue';
import QuizLesson from '@/Components/Student/Lesson/QuizLesson.vue';
import TaskLesson from '@/Components/Student/Lesson/TaskLesson.vue';
import TextLesson from '@/Components/Student/Lesson/TextLesson.vue';
import VideoLesson from '@/Components/Student/Lesson/VideoLesson.vue';
import student from '@/routes/student';
import { Head, Link, router } from '@inertiajs/vue3';
import {
    BookOpen,
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    FileText,
    HelpCircle,
    LayoutDashboard,
    Lock,
    Menu,
    MonitorPlay,
    PlayCircle,
    Upload,
    X,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps<{
    course: any;
    enrollment: any;
    completed_lesson_ids: number[];
    progress_percentage: number;
    resume_lesson_id: number | null;
    is_course_ended: boolean;
    is_course_locked: boolean;
    course_unlock_date: string | null;
}>();

const isSidebarOpen = ref(true);
const activeLesson = ref<any>(null);
const activeLiveClass = ref<any>(null);

// Flatten lessons for navigation
const allLessons = computed(() => {
    return props.course.sections.flatMap((s: any) => s.lessons);
});

// Set initial active lesson
if (props.resume_lesson_id) {
    activeLesson.value = allLessons.value.find((l: any) => l.id === props.resume_lesson_id) || allLessons.value[0];
} else if (allLessons.value.length > 0) {
    activeLesson.value = allLessons.value[0];
}

const currentIndex = computed(() => {
    if (!activeLesson.value) return -1;
    return allLessons.value.findIndex((l: any) => l.id === activeLesson.value.id);
});

const prevLesson = computed(() => {
    if (currentIndex.value > 0) return allLessons.value[currentIndex.value - 1];
    return null;
});

const nextLesson = computed(() => {
    if (currentIndex.value < allLessons.value.length - 1) return allLessons.value[currentIndex.value + 1];
    return null;
});

const selectLesson = (lesson: any) => {
    if (lesson.is_locked) return;

    activeLiveClass.value = null;
    activeLesson.value = lesson;
    if (window.innerWidth < 1024) {
        isSidebarOpen.value = false;
    }
};

const selectLiveClass = (liveClass: any) => {
    activeLesson.value = null;
    activeLiveClass.value = liveClass;
    if (window.innerWidth < 1024) {
        isSidebarOpen.value = false;
    }
};

const markAsComplete = (lesson: any) => {
    if (props.completed_lesson_ids.includes(lesson.id)) return;

    // Prevent completion if course ended, unless backend allows "read-only" completion (which we blocked for submissions)
    // For simple viewing (text/video), we might allow local "mark as read", but for now let's respect the backend restriction if strict.
    // However, the constraint says "Student CANNOT submit assignments/tasks" but "can still view learning materials".
    // "Mark as Complete" for text/video is ambiguous. Let's allowing trying, backend will inject error if needed,
    // but our backend logic only blocked submission_text/files/quiz scores. Simple completion might pass?
    // Actually, backend marks completion. If it's just a view, maybe we should allow it?
    // But the requirement says "Student can participate in quizzes... during active course period".
    // Let's assume manual "Mark Complete" is a submission action for simple lessons too?
    // Re-reading: "After course end date... Student can still view... CANNOT submit... CANNOT start quiz".
    // We'll trust the backend response.

    router.post(
        student.courses.lessons.complete.url({ course: props.course.id, lesson: lesson.id }),
        {},
        {
            preserveScroll: true,
            only: ['course', 'completed_lesson_ids', 'progress_percentage', 'resume_lesson_id', 'enrollment'],
            onSuccess: () => {
                // If this was the last lesson of a section, the section might complete and unlock next.
                // Inertia reload (props update) handles the state update.
            },
        },
    );
};

const finishCourse = () => {
    router.post(
        student.courses.complete.url(props.course.id),
        {},
        {
            preserveScroll: true,
        },
    );
};

const downloadCertificate = (certificateId: number) => {
    window.open(download.url(certificateId), '_blank');
};

const getLessonIcon = (type: string) => {
    switch (type) {
        case 'VIDEO':
            return PlayCircle;
        case 'TEXT':
            return FileText;
        case 'FILE':
            return FileText;
        case 'QUIZ':
            return HelpCircle;
        case 'ASSIGNMENT':
            return Upload;
        default:
            return BookOpen;
    }
};

const getLessonComponent = (type: string) => {
    switch (type) {
        case 'VIDEO':
            return VideoLesson;
        case 'TEXT':
            return TextLesson;
        case 'FILE':
            return FileLesson;
        case 'QUIZ':
            return QuizLesson;
        case 'ASSIGNMENT':
            return TaskLesson;
        case 'PROGRAMMING':
            return CodeLesson;
        default:
            return TextLesson;
    }
};
</script>

<template>
    <Head :title="course.title" />

    <div class="flex h-screen flex-col overflow-hidden bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <!-- Header -->
        <header
            class="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 dark:border-gray-800 dark:bg-gray-900"
        >
            <div class="flex items-center gap-4">
                <Link
                    :href="student.dashboard.url()"
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <LayoutDashboard :size="20" />
                </Link>
                <div class="hidden sm:block">
                    <h1 class="max-w-xs truncate text-sm font-bold lg:max-w-md">{{ course.title }}</h1>
                    <div class="mt-1 flex items-center gap-3">
                        <div class="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                class="h-full bg-indigo-600 transition-all duration-500 dark:bg-indigo-500"
                                :style="{ width: progress_percentage + '%' }"
                            ></div>
                        </div>
                        <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400">{{ progress_percentage }}% Complete</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <!-- Certificate -->
                <div v-if="enrollment && (enrollment.status === 'completed' || enrollment.status === 'COMPLETED')" class="hidden md:block">
                    <button
                        v-if="enrollment.certificate"
                        @click="downloadCertificate(enrollment.certificate.id)"
                        class="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-500"
                    >
                        Download Certificate
                    </button>
                    <div
                        v-else
                        class="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                        <CheckCircle :size="14" />
                        Course Completed
                    </div>
                </div>

                <div v-else-if="is_course_ended" class="hidden md:block">
                    <div
                        class="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    >
                        <Lock :size="14" />
                        Course Ended
                    </div>
                </div>

                <button
                    @click="isSidebarOpen = !isSidebarOpen"
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 lg:hidden dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    <Menu v-if="!isSidebarOpen" :size="20" />
                    <X v-else :size="20" />
                </button>
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <aside
                class="fixed inset-y-0 right-0 z-40 w-80 transform border-l border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 dark:border-gray-800 dark:bg-gray-900"
                :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
            >
                <div class="flex h-full flex-col">
                    <div class="flex items-center justify-between border-b border-gray-200 p-4 lg:hidden dark:border-gray-800">
                        <h2 class="font-bold">Course Content</h2>
                        <button @click="isSidebarOpen = false" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <X :size="20" />
                        </button>
                    </div>

                    <div class="flex-1 space-y-6 overflow-y-auto p-4">
                        <!-- Live Classes -->
                        <div v-if="course.live_classes && course.live_classes.length > 0">
                            <h3 class="mb-2 px-2 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">Live Sessions</h3>
                            <div class="space-y-1">
                                <button
                                    v-for="liveClass in course.live_classes"
                                    :key="liveClass.id"
                                    @click="selectLiveClass(liveClass)"
                                    class="flex w-full items-start gap-3 rounded-lg p-2 text-start transition-colors"
                                    :class="
                                        activeLiveClass?.id === liveClass.id
                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                                    "
                                >
                                    <MonitorPlay :size="18" class="mt-0.5 shrink-0" />
                                    <div class="flex flex-col text-start">
                                        <span class="text-sm font-medium">{{ liveClass.title }}</span>
                                        <span v-if="liveClass.status_label === 'live'" class="animate-pulse text-[10px] font-bold text-emerald-500"
                                            >● LIVE</span
                                        >
                                        <span v-else-if="liveClass.status_label === 'upcoming'" class="text-[10px] text-gray-400">
                                            {{ new Date(liveClass.class_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }} •
                                            {{ liveClass.start_time.slice(0, 5) }}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Sections -->
                        <div v-for="(section, index) in course.sections" :key="section.id" class="space-y-2">
                            <div class="flex items-center justify-between px-2">
                                <div class="flex flex-col">
                                    <h3 class="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                        Section {{ Number(index) + 1 }}: {{ section.title }}
                                    </h3>
                                    <span v-if="section.is_locked && section.lock_reason" class="mt-0.5 text-[10px] leading-tight text-gray-400">
                                        {{ section.lock_reason }}
                                    </span>
                                </div>
                                <Lock v-if="section.is_locked" :size="12" class="shrink-0 text-gray-400" />
                            </div>

                            <div class="space-y-1">
                                <button
                                    v-for="lesson in section.lessons"
                                    :key="lesson.id"
                                    @click="selectLesson(lesson)"
                                    :disabled="lesson.is_locked"
                                    class="group flex w-full items-start gap-3 rounded-lg p-2 text-start transition-colors"
                                    :class="[
                                        activeLesson?.id === lesson.id
                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                            : 'text-gray-600 dark:text-gray-400',
                                        lesson.is_locked ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50 dark:hover:bg-gray-800',
                                    ]"
                                >
                                    <div class="mt-0.5 shrink-0">
                                        <CheckCircle
                                            v-if="completed_lesson_ids.includes(lesson.id)"
                                            :size="18"
                                            class="text-green-500 dark:text-green-400"
                                        />
                                        <Lock v-else-if="lesson.is_locked" :size="18" class="text-gray-400" />
                                        <component
                                            v-else
                                            :is="getLessonIcon(lesson.type)"
                                            :size="18"
                                            :class="
                                                activeLesson?.id === lesson.id
                                                    ? 'text-indigo-600 dark:text-indigo-400'
                                                    : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                                            "
                                        />
                                    </div>
                                    <span class="text-sm font-medium">{{ lesson.title }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-8 dark:bg-gray-950">
                <div class="mx-auto max-w-4xl">
                    <!-- Live Class View -->
                    <div v-if="activeLiveClass" class="animate-fade-in space-y-6">
                        <div class="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-gray-800">
                            <div
                                class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                            >
                                <MonitorPlay :size="40" />
                            </div>
                            <!-- Status Badge -->
                            <div class="mb-4 flex justify-center">
                                <span
                                    v-if="activeLiveClass.status_label === 'live'"
                                    class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                >
                                    <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                                    LIVE NOW
                                </span>
                                <span
                                    v-else-if="activeLiveClass.status_label === 'upcoming'"
                                    class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                >
                                    UPCOMING
                                </span>
                                <span
                                    v-else-if="activeLiveClass.status_label === 'finished'"
                                    class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                >
                                    FINISHED
                                </span>
                                <span
                                    v-else-if="activeLiveClass.status_label === 'cancelled'"
                                    class="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                >
                                    CANCELLED
                                </span>
                            </div>

                            <h2 class="mb-2 text-2xl font-bold">{{ activeLiveClass.title }}</h2>
                            <p class="mb-6 text-gray-500 dark:text-gray-400">{{ activeLiveClass.description }}</p>

                            <!-- Schedule Details -->
                            <div class="mb-8 flex flex-col items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <div class="flex items-center gap-2">
                                    <Calendar :size="16" class="text-indigo-500" />
                                    <span v-if="activeLiveClass.type === 'daily'" class="font-bold">Daily Recurring</span>
                                    <span v-else>{{
                                        new Date(activeLiveClass.class_date).toLocaleDateString(undefined, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                    }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Clock :size="16" class="text-indigo-500" />
                                    <span> {{ activeLiveClass.start_time.slice(0, 5) }} - {{ activeLiveClass.end_time.slice(0, 5) }} </span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-col items-center gap-4">
                                <a
                                    v-if="activeLiveClass.status_label === 'live'"
                                    :href="student.liveClasses.join.url(activeLiveClass.id)"
                                    target="_blank"
                                    class="rounded-lg bg-indigo-600 px-8 py-3 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 hover:bg-indigo-500"
                                >
                                    Join Live Session
                                </a>

                                <div
                                    v-else-if="activeLiveClass.status_label === 'upcoming'"
                                    class="rounded-xl bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-900/50"
                                >
                                    <p>The join button will appear when the class starts.</p>
                                </div>

                                <div v-else-if="activeLiveClass.status_label === 'finished'">
                                    <a
                                        v-if="activeLiveClass.recording_url"
                                        :href="activeLiveClass.recording_url"
                                        target="_blank"
                                        class="flex items-center gap-2 rounded-lg border-2 border-indigo-600 px-6 py-2 font-bold text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                                    >
                                        <PlayCircle :size="18" /> Watch Recording
                                    </a>
                                    <p v-else class="text-sm text-gray-500 italic">Class ended. No recording available.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Lock Screen -->
                    <div v-else-if="activeLesson && activeLesson.is_locked" class="flex h-[60vh] flex-col items-center justify-center text-center">
                        <div class="mb-6 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                            <Lock :size="48" class="text-gray-400" />
                        </div>
                        <h2 class="text-xl font-bold">This content is locked</h2>
                        <p class="mt-2 text-gray-500 dark:text-gray-400">
                            {{
                                course.sections.find((s: any) => s.lessons.some((l: any) => l.id === activeLesson.id))?.lock_reason ||
                                'Please complete the previous section to unlock this lesson.'
                            }}
                        </p>
                    </div>

                    <!-- Lesson View -->
                    <div v-else-if="activeLesson" class="space-y-6">
                        <!-- Navigation Header -->
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ activeLesson.title }}</h2>
                            <div class="flex items-center gap-2">
                                <button
                                    v-if="!completed_lesson_ids.includes(activeLesson.id)"
                                    @click="markAsComplete(activeLesson)"
                                    class="dark:hover:bg-gray-750 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700"
                                >
                                    Mark Complete
                                </button>
                                <span v-else class="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                                    <CheckCircle :size="16" /> Completed
                                </span>
                            </div>
                        </div>

                        <!-- Course Ended Banner if needed inside lesson -->
                        <div
                            v-if="is_course_ended"
                            class="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        >
                            <strong>Note:</strong> This course has ended. You can view content, but quizzes and assignments can no longer be
                            submitted.
                        </div>

                        <!-- Dynamic Component -->
                        <component
                            :is="getLessonComponent(activeLesson.type)"
                            :lesson="activeLesson"
                            :course-id="course.id"
                            :is-course-ended="is_course_ended"
                        />

                        <!-- Footer Navigation -->
                        <div class="mt-8 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
                            <button
                                v-if="prevLesson"
                                @click="selectLesson(prevLesson)"
                                class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                <ChevronLeft :size="16" />
                                Previous
                            </button>
                            <div v-else></div>

                            <button
                                v-if="nextLesson"
                                @click="selectLesson(nextLesson)"
                                class="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="nextLesson.is_locked && !completed_lesson_ids.includes(activeLesson.id)"
                            >
                                {{ nextLesson.is_locked ? 'Locked' : 'Next Lesson' }}
                                <ChevronRight :size="16" />
                            </button>

                            <button
                                v-else-if="enrollment.status !== 'completed' && enrollment.status !== 'COMPLETED'"
                                @click="finishCourse"
                                class="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                            >
                                Finish Course
                            </button>
                        </div>
                    </div>

                    <!-- Welcome/Empty State -->
                    <div v-else class="flex h-[60vh] flex-col items-center justify-center text-center">
                        <BookOpen class="mb-6 h-16 w-16 text-gray-300 dark:text-gray-700" />
                        <h2 class="text-xl font-bold">Welcome to {{ course.title }}</h2>
                        <p class="mt-2 text-gray-500 dark:text-gray-400">Select a lesson from the sidebar to start learning.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
