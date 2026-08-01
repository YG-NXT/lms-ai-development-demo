<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import * as baseRoutes from '@/routes';
import student from '@/routes/student';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Clock, Globe, Lock, PlayCircle, Users, BarChart3 } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import CodeRunner from '@/Components/CodeRunner.vue';

defineProps<{
    tutorial: any;
    enrollment?: any;
}>();

defineProps<{
    tutorial: any;
    enrollment?: any;
}>();

const isEnrolled = !!props.enrollment;
const activeSection = ref(0);
const activeLesson = ref(0);

const enrollForm = useForm({});

const codeBlocks = computed(() => {
    const blocks: any[] = [];
    let id = 0;
    const content = props.tutorial.description || '';
    const regex = /<pre><code[^>]*class="[^"]*language-([^"]+)[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        blocks.push({
            id: id++,
            language: match[1],
            code: match[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
        });
    }
    return blocks;
});

const descriptionWithoutCode = computed(() => {
    return (props.tutorial.description || '').replace(/<pre><code[^>]*class="[^"]*language-[^"]+"[^>]*>[\s\S]*?<\/code><\/pre>/gi, '');
});

const enroll = () => {
    enrollForm.post(student.tutorials.enroll.url(props.tutorial.id), {
        onSuccess: () => {
            isEnrolled.value = true;
        },
    });
};
</script>

<template>
    <Head :title="tutorial.title" />

    <StudentLayout>
        <div class="space-y-6">
            <!-- Header -->
            <div>
                <Link :href="student.tutorials.index.url()" class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                    <ArrowLeft :size="16" />
                    Back to Tutorials
                </Link>
            </div>

            <!-- Hero -->
            <div class="relative rounded-2xl overflow-hidden bg-slate-900">
                <img
                    v-if="tutorial.thumbnail"
                    :src="tutorial.thumbnail"
                    :alt="tutorial.title"
                    class="w-full h-64 object-cover opacity-60"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div class="absolute bottom-6 left-6 right-6">
                    <h1 class="text-3xl font-bold text-white">{{ tutorial.title }}</h1>
                    <div class="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <span class="flex items-center gap-1"><Clock :size="14" /> {{ tutorial.duration ?? 'N/A' }}</span>
                        <span class="flex items-center gap-1"><Globe :size="14" /> {{ tutorial.language }}</span>
                        <span class="flex items-center gap-1"><Users :size="14" /> {{ tutorial.level }}</span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4">
                <template v-if="!isEnrolled">
                    <button
                        @click="enroll"
                        :disabled="enrollForm.processing"
                        class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-50"
                    >
                        <PlayCircle :size="16" />
                        {{ enrollForm.processing ? 'Enrolling...' : 'Enroll Now' }}
                    </button>
                    <span v-if="!tutorial.is_free" class="text-sm text-slate-500">${{ tutorial.effective_price }}</span>
                </template>
                <span v-else class="inline-flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <BarChart3 :size="14" />
                    Enrolled
                </span>
            </div>

            <!-- Description -->
            <div v-if="tutorial.description" class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-admin-card-dark">
                <h2 class="text-lg font-bold text-slate-900 dark:text-white">About This Tutorial</h2>
                <div class="mt-2 prose max-w-none prose-slate dark:prose-invert text-sm text-slate-600 dark:text-slate-400">
                    <div v-html="descriptionWithoutCode"></div>
                </div>
                <div v-for="block in codeBlocks" :key="block.id" class="mt-4">
                    <CodeRunner :language="block.language" :code="block.code" :title="block.language" />
                </div>
            </div>

            <!-- Curriculum -->
            <div v-if="tutorial.sections && tutorial.sections.length > 0" class="space-y-4">
                <h2 class="text-lg font-bold text-slate-900 dark:text-white">Curriculum</h2>

                <div v-for="(section, sIdx) in tutorial.sections" :key="section.id" class="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-slate-800 dark:bg-admin-card-dark">
                    <button
                        @click="activeSection = activeSection === sIdx ? -1 : sIdx"
                        class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800"
                    >
                        <span>
                            {{ section.title }}
                            <span class="ml-2 text-xs font-normal text-slate-400">
                                ({{ section.lessons.length }} lessons)
                            </span>
                        </span>
                        <ChevronRight
                            :size="16"
                            class="transition-transform"
                            :class="activeSection === sIdx ? 'rotate-90' : ''"
                        />
                    </button>

                    <div v-show="activeSection === sIdx" class="border-t border-slate-100 dark:border-slate-700">
                        <div
                            v-for="(lesson, lIdx) in section.lessons"
                            :key="lesson.id"
                            class="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            :class="lIdx !== section.lessons.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''"
                        >
                            <Lock v-if="lesson.is_free" :size="14" class="text-slate-400" />
                            <PlayCircle v-else :size="14" class="text-primary-500" />
                            <span class="flex-1 text-slate-700 dark:text-slate-300">{{ lesson.title }}</span>
                            <span v-if="lesson.duration" class="text-xs text-slate-400">{{ lesson.duration }} min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>