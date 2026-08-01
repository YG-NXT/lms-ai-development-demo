<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
    lesson: {
        type: Object as PropType<any>,
        required: true,
    },
});

const videoUrl = computed(() => {
    // Check for explicit provider first
    if (props.lesson.video_provider === 'VIMEO' && props.lesson.video_id) {
        return `https://player.vimeo.com/video/${props.lesson.video_id}`;
    }

    const url = props.lesson.video_url;
    if (!url) return null;

    // Vimeo (explicit provider check failed or missing, try URL)
    if (props.lesson.video_provider === 'VIMEO') {
        // Fallback to regex if video_id missing but url exists, or if legacy data
        const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }
    }

    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Vimeo (Regex Only fallback)
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return url;
});

const isDirectFile = computed(() => {
    const url = props.lesson.video_url;
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg');
});
</script>

<template>
    <div class="space-y-6">
        <div class="aspect-video w-full overflow-hidden rounded-xl bg-gray-900 shadow-lg">
            <template v-if="videoUrl">
                <video v-if="isDirectFile" :src="videoUrl" class="h-full w-full" controls controlsList="nodownload"></video>
                <iframe
                    v-else
                    :src="videoUrl"
                    class="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </template>
            <div v-else class="flex h-full w-full items-center justify-center text-gray-500">
                <span class="text-lg">Video content unavailable</span>
            </div>
        </div>

        <div v-if="lesson.content" class="prose max-w-none prose-slate dark:prose-invert">
            <div v-html="lesson.content"></div>
        </div>
    </div>
</template>
