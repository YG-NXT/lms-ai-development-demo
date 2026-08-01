<script setup lang="ts">
import { ref, computed } from 'vue';

defineProps<{
    language: string;
    code: string;
    title?: string;
}>();

const emit = defineEmits<{
    (e: 'run', code: string, language: string): void;
}>();

const output = ref('');
const error = ref('');
const isRunning = ref(false);
const isVisible = ref(false);

const runCode = () => {
    isRunning.value = true;
    output.value = '';
    error.value = '';
    emit('run', code, language);
};

const handleResult = (result: any) => {
    isRunning.value = false;
    if (result.success !== false && result.output) {
        output.value = result.output;
    }
    if (result.errors) {
        error.value = result.errors;
    }
    isVisible.value = true;
};

const languageLabel = computed(() => {
    const labels: Record<string, string> = {
        php: 'PHP',
        sql: 'SQL',
        javascript: 'JavaScript',
        html: 'HTML',
        css: 'CSS',
        typescript: 'TypeScript',
        python: 'Python',
        c: 'C',
        cpp: 'C++',
        rust: 'Rust',
        go: 'Go',
        java: 'Java',
        kotlin: 'Kotlin',
        ruby: 'Ruby',
        swift: 'Swift',
        csharp: 'C#',
    };
    return labels[language.toLowerCase()] || language;
});
</script>

<template>
    <div class="code-runner border border-slate-200 rounded-xl overflow-hidden bg-white dark:border-slate-800 dark:bg-admin-card-dark">
        <!-- Header -->
        <div class="flex items-center justify-between bg-slate-50 px-4 py-2 dark:bg-slate-800/50">
            <div class="flex items-center gap-2">
                <span v-if="title" class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ title }}</span>
                <span class="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                    {{ languageLabel }}
                </span>
            </div>
            <button
                @click="runCode"
                :disabled="isRunning"
                class="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
            >
                <span v-if="isRunning">Running...</span>
                <span v-else>▶ Run</span>
            </button>
        </div>

        <!-- Code -->
        <pre class="p-4 text-sm leading-relaxed bg-slate-900 text-slate-100 overflow-x-auto dark:bg-slate-950"><code>{{ code }}</code></pre>

        <!-- Output -->
        <div v-if="isVisible" class="border-t border-slate-200 dark:border-slate-800">
            <div v-if="output" class="p-4 bg-green-50 dark:bg-green-900/10">
                <div class="mb-1 flex items-center gap-2 text-xs font-bold text-green-700 dark:text-green-400">
                    <span>Output</span>
                </div>
                <pre class="text-sm text-green-800 dark:text-green-300 whitespace-pre-wrap">{{ output }}</pre>
            </div>
            <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/10">
                <div class="mb-1 flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400">
                    <span>Error</span>
                </div>
                <pre class="text-sm text-red-800 dark:text-red-300 whitespace-pre-wrap">{{ error }}</pre>
            </div>
        </div>
    </div>
</template>