<script setup lang="ts">
import { computed } from 'vue';
import CodeRunner from '@/Components/CodeRunner.vue';

defineProps<{
    lesson: any;
}>();

interface CodeBlock {
    id: number;
    language: string;
    code: string;
}

const codeBlocks = computed<CodeBlock[]>(() => {
    const blocks: CodeBlock[] = [];
    let id = 0;
    const content = props.lesson.content || '';
    const regex = /<pre><code[^>]*class="[^"]*language-([^"]+)[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        blocks.push({
            id: id++,
            language: match[1],
            code: match[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#\d+;/g, (m) => String.fromCharCode(parseInt(m.slice(2, -1)))),
        });
    }
    return blocks;
});

const contentWithoutCodeBlocks = computed(() => {
    return (props.lesson.content || '').replace(/<pre><code[^>]*class="[^"]*language-[^"]+"[^>]*>[\s\S]*?<\/code><\/pre>/gi, '');
});
</script>

<template>
    <div class="rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
        <div class="prose max-w-none prose-slate dark:prose-invert">
            <h1 class="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{{ lesson.title }}</h1>
            <div v-html="contentWithoutCodeBlocks"></div>
        </div>

        <div v-for="block in codeBlocks" :key="block.id" class="mt-6">
            <CodeRunner :language="block.language" :code="block.code" :title="block.language" />
        </div>
    </div>
</template>