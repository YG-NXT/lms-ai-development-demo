<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ArrowLeft, Send, Bot, User, Sparkles } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
    course: any;
    messages: any[];
}>();

const message = ref('');
const isLoading = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const sendMessage = async () => {
    if (!message.value.trim()) return;

    isLoading.value = true;
    const msg = message.value;
    message.value = '';

    try {
        router.post(
            route('student.courses.ai-tutor.ask', { course: props.course.slug }),
            { message: msg },
            {
                onSuccess: () => {
                    router.reload({ only: ['messages'] });
                },
            }
        );
    } catch {
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <Head :title="'AI Tutor — ' + course.title" />

    <StudentLayout>
        <div class="flex h-[calc(100vh-4rem)] flex-col">
            <!-- Header -->
            <div class="flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-admin-card-dark">
                <Link :href="`/courses/${course.slug}`" class="text-primary-600 hover:text-primary-700">
                    <ArrowLeft :size="20" />
                </Link>
                <Bot class="h-6 w-6 text-primary-600" />
                <div>
                    <h1 class="text-lg font-bold text-slate-900 dark:text-white">AI Tutor</h1>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ course.title }}</p>
                </div>
            </div>

            <!-- Messages -->
            <div ref="chatContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
                <div
                    v-for="msg in messages"
                    :key="msg.id"
                    class="flex gap-3"
                    :class="msg.user_id === $page.props.auth.user?.id ? 'justify-end' : 'justify-start'"
                >
                    <div
                        class="max-w-[80%] rounded-2xl px-4 py-3 text-sm"
                        :class="msg.user_id === $page.props.auth.user?.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'"
                    >
                        <div class="flex items-center gap-2 mb-1">
                            < component :is="msg.user_id === $page.props.auth.user?.id ? User : Bot" :size="14" />
                            <span class="text-xs font-bold uppercase opacity-75">
                                {{ msg.user_id === $page.props.auth.user?.id ? 'You' : 'Tutor' }}
                            </span>
                        </div>
                        <p class="whitespace-pre-wrap">{{ msg.message }}</p>
                        <p v-if="msg.response" class="mt-2 border-t border-white/20 pt-2 opacity-90">
                            {{ msg.response }}
                        </p>
                    </div>
                </div>

                <div v-if="messages.length === 0" class="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                    <Sparkles :size="48" class="mb-4 opacity-50" />
                    <h3 class="text-lg font-medium text-slate-500">Welcome to your AI Tutor</h3>
                    <p class="mt-1 text-sm">Ask questions about {{ course.title }} and get instant help.</p>
                </div>
            </div>

            <!-- Input -->
            <div class="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-admin-card-dark">
                <form @submit.prevent="sendMessage" class="flex gap-3">
                    <input
                        v-model="message"
                        type="text"
                        placeholder="Ask a question about this course..."
                        class="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        :disabled="isLoading"
                    />
                    <button
                        type="submit"
                        :disabled="isLoading || !message.trim()"
                        class="rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                    >
                        <Send :size="16" />
                    </button>
                </form>
            </div>
        </div>
    </StudentLayout>
</template>