<script setup lang="ts">
import student from '@/routes/student';
import { router, useForm } from '@inertiajs/vue3';
import { AlertCircle, CheckCircle, Clock } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, PropType, ref, watch } from 'vue';

const props = defineProps({
    // ... (omitting props for brevity in targetContent match but it replaces the whole import section)

    lesson: {
        type: Object as PropType<any>,
        required: true,
    },
    courseId: {
        type: Number,
        required: true,
    },
    isCourseEnded: {
        type: Boolean,
        default: false,
    },
});

const now = ref(new Date());
let timer: any = null;

onMounted(() => {
    timer = setInterval(() => {
        now.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const isDeadlinePassed = computed(() => {
    if (!props.lesson.deadline) return false;
    return now.value > new Date(props.lesson.deadline);
});

const timeLeft = computed(() => {
    if (!props.lesson.deadline) return null;
    const deadline = new Date(props.lesson.deadline);
    const diff = deadline.getTime() - now.value.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
});

const isSubmitted = ref(false);
const previousSubmission = ref<any>(null);

const assignmentConfig = computed(() => {
    if (!props.lesson.content) return null;
    try {
        const parsed = JSON.parse(props.lesson.content);
        if (parsed && typeof parsed === 'object' && parsed.fields) {
            return parsed.fields;
        }
    } catch (e) {
        // Not a JSON config
    }
    return null;
});

const form = useForm({
    submission_text: '',
    description: '',
    file: null as File | null,
});

const initialize = () => {
    if (props.lesson.completion && props.lesson.completion.meta) {
        const meta = props.lesson.completion.meta;
        const parsedMeta = typeof meta === 'string' ? JSON.parse(meta) : meta;

        previousSubmission.value = parsedMeta;
        isSubmitted.value = true;

        if (parsedMeta.submission_text) {
            form.submission_text = parsedMeta.submission_text;
        }
        if (parsedMeta.description) {
            form.description = parsedMeta.description;
        }
    } else {
        isSubmitted.value = false;
        previousSubmission.value = null;
        form.reset();
    }
};

watch(() => props.lesson, initialize, { immediate: true });

const submitTask = () => {
    // @ts-ignore
    form.post(student.courses.lessons.complete.url({ course: props.courseId, lesson: props.lesson.id }), {
        preserveScroll: true,
        onSuccess: () => {
            isSubmitted.value = true;
            // Update previous submission locally to show immediate feedback without full reload if props haven't updated yet
            previousSubmission.value = {
                submission_text: form.submission_text,
                description: form.description,
                file_name: form.file ? form.file.name : previousSubmission.value?.file_name,
                file_path: previousSubmission.value?.file_path, // path won't be available until reload
            };
        },
    });
};

const requestRecheck = () => {
    if (!confirm('Are you sure you want to request a recheck for this assignment?')) return;

    // @ts-ignore
    router.post(
        student.courses.lessons.recheck.url({ course: props.courseId, lesson: props.lesson.id }),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                // Success notification handled by flash message
            },
        },
    );
};

const enableEdit = () => {
    isSubmitted.value = false;
};
</script>

<template>
    <div class="rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <h2 class="mb-4 text-2xl font-bold dark:text-white">{{ lesson.title }}</h2>
        <div v-if="!assignmentConfig" class="prose mb-8 max-w-none prose-slate dark:prose-invert" v-html="lesson.content"></div>

        <!-- Deadline Countdown -->
        <div v-if="lesson.deadline && !isSubmitted && !isCourseEnded" class="mb-8">
            <div
                class="flex items-center justify-between rounded-xl border p-4"
                :class="
                    isDeadlinePassed
                        ? 'border-red-100 bg-red-50 text-red-700 dark:border-red-900/20 dark:bg-red-900/10'
                        : 'border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-900/20 dark:bg-indigo-900/10'
                "
            >
                <div class="flex items-center gap-3">
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-full"
                        :class="isDeadlinePassed ? 'bg-red-100 dark:bg-red-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'"
                    >
                        <Clock v-if="!isDeadlinePassed" :size="20" />
                        <AlertCircle v-else :size="20" />
                    </div>
                    <div>
                        <p class="text-sm font-medium opacity-80">
                            {{ isDeadlinePassed ? 'Submission closed on' : 'Submission deadline' }}
                        </p>
                        <p class="font-bold">{{ new Date(lesson.deadline).toLocaleString() }}</p>
                    </div>
                </div>
                <div class="text-right text-indigo-600 dark:text-indigo-400" :class="{ 'text-red-500': isDeadlinePassed }">
                    <p class="text-[10px] font-bold tracking-widest uppercase opacity-60">
                        {{ isDeadlinePassed ? 'Status' : 'Time Remaining' }}
                    </p>
                    <p class="text-xl font-black tabular-nums">{{ timeLeft }}</p>
                </div>
            </div>
        </div>

        <div v-if="isCourseEnded" class="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
            <h3 class="text-lg font-semibold text-red-700 dark:text-red-400">Submission Closed</h3>
            <p class="mt-2 text-red-600 dark:text-red-300">This course has ended. You can no longer submit assignments.</p>
        </div>

        <div v-else-if="!isSubmitted" class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
            <template v-if="isDeadlinePassed">
                <div class="flex flex-col items-center justify-center py-4 text-center">
                    <div
                        class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                    >
                        <AlertCircle :size="32" />
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Submission Closed</h3>
                    <p class="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                        The deadline for this assignment has passed. New submissions are no longer accepted.
                    </p>
                </div>
            </template>

            <template v-else>
                <h3 class="mb-4 text-lg font-semibold dark:text-white">Your Submission</h3>

                <div v-if="!assignmentConfig || assignmentConfig.allow_text" class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ assignmentConfig?.text_label || 'Answer Text' }}
                    </label>
                    <textarea
                        v-model="form.submission_text"
                        rows="4"
                        class="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        :placeholder="
                            assignmentConfig?.text_label
                                ? 'Type your ' + assignmentConfig.text_label.toLowerCase() + ' here...'
                                : 'Type your answer here...'
                        "
                    ></textarea>
                    <div v-if="form.errors.submission_text" class="mt-1 text-sm text-red-600">{{ form.errors.submission_text }}</div>
                </div>

                <div v-if="assignmentConfig?.allow_description" class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ assignmentConfig.description_label || 'Description' }}
                    </label>
                    <textarea
                        v-model="form.description"
                        rows="4"
                        class="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        :placeholder="
                            assignmentConfig.description_label
                                ? 'Type your ' + assignmentConfig.description_label.toLowerCase() + ' here...'
                                : 'Type your description here...'
                        "
                    ></textarea>
                    <div v-if="form.errors.description" class="mt-1 text-sm text-red-600">{{ form.errors.description }}</div>
                </div>

                <div v-if="!assignmentConfig || (assignmentConfig.file_count && assignmentConfig.file_count > 0)" class="mb-6">
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ assignmentConfig?.file_label || 'Upload File' }}
                        <span v-if="!assignmentConfig" class="text-xs font-normal text-gray-500">(Optional)</span>
                    </label>
                    <input
                        type="file"
                        @change="form.file = ($event.target as HTMLInputElement).files?.[0] || null"
                        class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-indigo-900/50 dark:file:text-indigo-300"
                    />
                    <div v-if="form.errors.file" class="mt-1 text-sm text-red-600">{{ form.errors.file }}</div>
                </div>

                <div class="flex items-center gap-4">
                    <button
                        @click="submitTask"
                        class="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                        :disabled="form.processing"
                    >
                        {{ form.processing ? 'Submitting...' : 'Submit Assignment' }}
                    </button>
                    <button
                        v-if="previousSubmission"
                        @click="isSubmitted = true"
                        class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        Cancel
                    </button>
                </div>
            </template>
        </div>

        <div v-else-if="isSubmitted" class="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
            <div
                class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400"
            >
                <CheckCircle :size="32" />
            </div>
            <h3 class="text-lg font-semibold text-green-800 dark:text-green-400">Task Submitted</h3>
            <p class="mt-2 text-green-600 dark:text-green-300">Your assignment has been submitted successfully.</p>

            <!-- Submission Details -->
            <div v-if="previousSubmission" class="mt-6 space-y-3 text-left">
                <div
                    v-if="previousSubmission.submission_text && !previousSubmission.submission_text.trim().startsWith('{&quot;fields&quot;:')"
                    class="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50"
                >
                    <h4 class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                        {{ assignmentConfig?.text_label || 'Answer Text' }}
                    </h4>
                    <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">{{ previousSubmission.submission_text }}</p>
                </div>
                <div v-if="previousSubmission.description" class="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
                    <h4 class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                        {{ assignmentConfig?.description_label || 'Description' }}
                    </h4>
                    <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">{{ previousSubmission.description }}</p>
                </div>
                <div v-if="previousSubmission.file_name" class="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
                    <h4 class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                        {{ assignmentConfig?.file_label || 'Uploaded File' }}
                    </h4>
                    <div class="mt-1 flex items-center gap-2">
                        <FileText :size="16" class="shrink-0 text-indigo-500" />
                        <a
                            v-if="previousSubmission.file_path"
                            :href="'/storage/' + previousSubmission.file_path"
                            target="_blank"
                            class="truncate text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            {{ previousSubmission.file_name }}
                        </a>
                        <span v-else class="truncate text-sm text-gray-600 dark:text-gray-400">{{ previousSubmission.file_name }}</span>
                    </div>
                </div>
            </div>

            <!-- Grading Result -->
            <div
                v-if="lesson.completion?.grading_status === 'graded' || lesson.completion?.grading_status === 'recheck_reviewed'"
                class="mt-6 border-t border-green-200 pt-6 dark:border-green-800"
            >
                <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                    <div class="flex flex-col items-center justify-center">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Obtained Mark</span>
                        <div class="mt-1 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                            {{ lesson.completion.obtained_mark }} <span class="text-lg text-gray-400">/ {{ lesson.total_marks }}</span>
                        </div>
                    </div>

                    <div v-if="lesson.completion.feedback" class="mt-4 text-left">
                        <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Instructor Feedback:</h4>
                        <div class="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {{ lesson.completion.feedback }}
                        </div>
                    </div>

                    <!-- Recheck Button -->
                    <!-- Only if graded (not already recheck_requested or reviewed) - Wait, reviewed means final?
                         Let's allow recheck if 'graded' only. -->
                    <div v-if="lesson.completion.grading_status === 'graded'" class="mt-4">
                        <button
                            v-if="!isDeadlinePassed"
                            @click="requestRecheck"
                            class="text-sm text-indigo-600 underline hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Request Recheck
                        </button>
                        <span v-else class="text-xs text-red-500">Recheck requests unavailable: Deadline has passed.</span>
                    </div>
                    <div v-if="lesson.completion.grading_status === 'recheck_requested'" class="mt-4 text-sm text-amber-600">
                        Recheck Requested - Pending Review
                    </div>
                </div>
            </div>
        </div>

        <form v-else @submit.prevent="submitTask" class="space-y-6"></form>
    </div>
</template>
