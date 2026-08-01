<script setup lang="ts">
import { PropType, computed } from 'vue';

const props = defineProps({
    lesson: {
        type: Object as PropType<any>,
        required: true,
    },
});

const isImage = computed(() => {
    const ext = props.lesson.file_path?.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
});

const isPdf = computed(() => {
    const ext = props.lesson.file_path?.split('.').pop()?.toLowerCase();
    return ext === 'pdf';
});

const downloadUrl = computed(() => props.lesson.file_path); // Adjust if using storage URL helper
</script>

<template>
    <div class="rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <h2 class="mb-4 text-2xl font-bold dark:text-white">{{ lesson.title }}</h2>
        <div class="prose mb-8 max-w-none prose-slate dark:prose-invert" v-html="lesson.content"></div>

        <div
            class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-10 dark:border-gray-700 dark:bg-gray-900/50"
        >
            <div class="mb-4 text-gray-400 dark:text-gray-500">
                <svg v-if="isImage" class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                </svg>
                <svg v-else-if="isPdf" class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    ></path>
                </svg>
                <svg v-else class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                </svg>
            </div>

            <p class="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {{ lesson.file_path ? lesson.file_path.split('/').pop() : 'Attached File' }}
            </p>

            <div class="flex gap-4">
                <a
                    v-if="lesson.file_path"
                    :href="downloadUrl"
                    download
                    class="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                >
                    Download File
                </a>
                <a
                    v-if="isPdf && lesson.file_path"
                    :href="downloadUrl"
                    target="_blank"
                    class="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    Preview
                </a>
            </div>
        </div>

        <div v-if="isImage && lesson.file_path" class="mt-8 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
            <img :src="downloadUrl" alt="File Preview" class="h-auto w-full object-contain" />
        </div>
    </div>
</template>
