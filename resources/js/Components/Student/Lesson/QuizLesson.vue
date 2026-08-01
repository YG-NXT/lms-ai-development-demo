<script setup lang="ts">
import student from '@/routes/student';
import { router } from '@inertiajs/vue3';
import { computed, onUnmounted, PropType, ref, watch } from 'vue';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct: number;
}

interface QuizContent {
    questions: Question[];
    duration: number;
}

const props = defineProps({
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

const isStarted = ref(false);
const isFinished = ref(false);
const currentQuestionIndex = ref(0);
const answers = ref<Record<number, number>>({});
const score = ref(0);
const remainingTime = ref(0);
let timerInterval: any = null;

// Parse Quiz Content
const quizData = computed<QuizContent>(() => {
    let parsedContent: any = {};
    try {
        let content = props.lesson.content;
        if (typeof content === 'string') {
            try {
                content = JSON.parse(content);
            } catch (e) {
                console.warn('Quiz content is not valid JSON string', e);
            }
        }

        if (content && (content.questions || Array.isArray(content))) {
            // Handle if content is just the array of questions
            if (Array.isArray(content)) {
                parsedContent = { questions: content };
            } else {
                parsedContent = content;
            }
        }
    } catch (e) {
        console.error('Failed to parse quiz content', e);
    }

    // Default Mock Data for Demo/Fallback if no questions found
    if (!parsedContent.questions || !Array.isArray(parsedContent.questions) || parsedContent.questions.length === 0) {
        return {
            questions: [
                {
                    id: 1,
                    text: 'What is Laravel?',
                    options: ['A JS Framework', 'A PHP Framework', 'A Database', 'An OS'],
                    correct: 1,
                },
                {
                    id: 2,
                    text: 'Which command creates a controller?',
                    options: ['php artisan make:controller', 'php artisan create:controller', 'make controller', 'new controller'],
                    correct: 0,
                },
            ],
            duration: props.lesson.duration || 10,
        };
    }

    // Ensure duration is set. Prioritize content.duration, then lesson.duration, then default 10.
    // The user said "set in course builder", presumably that maps to lesson.duration column.
    // If content.duration is undefined, use props.lesson.duration.
    if (parsedContent.duration === undefined || parsedContent.duration === null) {
        parsedContent.duration = props.lesson.duration || 10;
    }

    return parsedContent as QuizContent;
});

// Initialize state from completion if exists
const initializeFromCompletion = () => {
    if (props.lesson.completion && props.lesson.completion.meta) {
        const meta = props.lesson.completion.meta;
        // Check if meta is a string (some DB drivers might return json as string)
        const parsedMeta = typeof meta === 'string' ? JSON.parse(meta) : meta;

        if (parsedMeta.score !== undefined) {
            score.value = parsedMeta.score;
            isFinished.value = true;
            if (parsedMeta.answers) {
                answers.value = parsedMeta.answers;
            }
        }
    }
};

// Watch for lesson changes to re-initialize
watch(
    () => props.lesson,
    () => {
        isStarted.value = false;
        isFinished.value = false;
        currentQuestionIndex.value = 0;
        answers.value = {};
        if (timerInterval) clearInterval(timerInterval);
        initializeFromCompletion();
    },
    { immediate: true },
);

const currentQuestion = computed(() => {
    const q = quizData.value.questions[currentQuestionIndex.value];
    // Normalize question text key
    if (q && !q.text && (q as any).question) {
        q.text = (q as any).question;
    }
    if (q && !q.text && (q as any).title) {
        q.text = (q as any).title;
    }
    return q;
});
const totalQuestions = computed(() => quizData.value.questions?.length || 0);
const progress = computed(() => ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100);

const formattedTime = computed(() => {
    const m = Math.floor(remainingTime.value / 60);
    const s = remainingTime.value % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
});

const startQuiz = () => {
    if (props.isCourseEnded) return;

    isStarted.value = true;
    isFinished.value = false;
    remainingTime.value = (quizData.value.duration || 10) * 60;
    currentQuestionIndex.value = 0;
    answers.value = {};

    timerInterval = setInterval(() => {
        if (remainingTime.value > 0) {
            remainingTime.value--;
        } else {
            finishQuiz();
        }
    }, 1000);
};

const selectAnswer = (optionIndex: number) => {
    if (currentQuestion.value) {
        // Use ID if available, otherwise use question index as key for stability if IDs are missing
        const key = currentQuestion.value.id !== undefined ? Number(currentQuestion.value.id) : currentQuestionIndex.value;
        answers.value[key] = optionIndex;
    }
};

const nextQuestion = () => {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
        currentQuestionIndex.value++;
    } else {
        finishQuiz();
    }
};

const finishQuiz = () => {
    clearInterval(timerInterval);
    isFinished.value = true;

    // Calculate Score
    let correctCount = 0;
    quizData.value.questions.forEach((q: any) => {
        if (answers.value[Number(q.id)] === q.correct) {
            correctCount++;
        }
    });
    score.value = correctCount;

    // Send result to backend
    markAsComplete();
};

const markAsComplete = () => {
    // @ts-ignore
    router.post(
        student.courses.lessons.complete.url({ course: props.courseId, lesson: props.lesson.id }),
        {
            score: score.value,
            total_questions: totalQuestions.value,
            answers: answers.value,
        },
        {
            preserveScroll: true,
        },
    );
};

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
});
</script>

<template>
    <div class="rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <!-- Start Screen -->
        <div v-if="!isStarted && !isFinished" class="text-center">
            <h2 class="mb-4 text-2xl font-bold dark:text-white">{{ lesson.title }}</h2>
            <p class="mb-6 text-gray-600 dark:text-gray-300">
                This quiz contains {{ totalQuestions }} questions. You have {{ quizData.duration }} minutes to complete it.
            </p>

            <div v-if="isCourseEnded" class="mb-4 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                Quiz unavailable after course end date.
            </div>

            <button
                v-else
                @click="startQuiz"
                class="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700"
            >
                Start Quiz
            </button>
        </div>

        <!-- Quiz Interface -->
        <div v-else-if="isStarted && !isFinished">
            <!-- Header -->
            <div class="mb-6 flex items-center justify-between border-b pb-4 dark:border-gray-700">
                <span class="font-medium text-gray-500 dark:text-gray-400"> Question {{ currentQuestionIndex + 1 }} / {{ totalQuestions }} </span>
                <span class="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {{ formattedTime }}
                </span>
            </div>

            <!-- Progress Bar -->
            <div class="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div class="h-full bg-indigo-500 transition-all duration-300" :style="{ width: progress + '%' }"></div>
            </div>

            <!-- Question -->
            <div v-if="currentQuestion">
                <h3 class="mb-6 text-xl font-semibold dark:text-white">{{ currentQuestion.text }}</h3>

                <!-- Options -->
                <div class="space-y-3">
                    <button
                        v-for="(option, index) in currentQuestion.options"
                        :key="index"
                        @click="selectAnswer(index)"
                        class="w-full rounded-lg border p-4 text-left transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        :class="{
                            'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-300':
                                answers[currentQuestion.id !== undefined ? Number(currentQuestion.id) : currentQuestionIndex] === index,
                        }"
                    >
                        <span
                            class="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm"
                            :class="
                                answers[currentQuestion.id !== undefined ? Number(currentQuestion.id) : currentQuestionIndex] === index
                                    ? 'border-indigo-500 bg-indigo-500 text-white'
                                    : 'border-gray-300 text-gray-500'
                            "
                        >
                            {{ String.fromCharCode(65 + index) }}
                        </span>
                        {{ option }}
                    </button>
                </div>
            </div>
            <div v-else class="text-red-500">Error: Question data not found.</div>

            <!-- Navigation -->
            <div class="mt-8 flex justify-end">
                <button
                    @click="nextQuestion"
                    class="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                    :disabled="answers[currentQuestion.id !== undefined ? Number(currentQuestion.id) : currentQuestionIndex] === undefined"
                >
                    {{ currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next Question' }}
                </button>
            </div>
        </div>

        <!-- Result Screen -->
        <div v-else class="text-center">
            <div
                class="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
            >
                🏆
            </div>
            <h2 class="mb-2 text-2xl font-bold dark:text-white">Quiz Completed!</h2>
            <p class="mb-6 text-gray-600 dark:text-gray-300">
                You scored <strong class="text-indigo-600 dark:text-indigo-400">{{ score }}</strong> out of {{ totalQuestions }}.
            </p>

            <div class="mt-6 flex justify-center gap-4">
                <button
                    @click="
                        isFinished = false;
                        isStarted = false;
                        currentQuestionIndex = 0;
                        answers = {};
                    "
                    class="rounded-lg border border-gray-300 px-6 py-2 font-medium hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    Retry
                </button>
                <div v-if="score / totalQuestions >= 0.5" class="flex items-center text-green-600 dark:text-green-400">
                    <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Marked as Complete
                </div>
            </div>
        </div>
    </div>
</template>
