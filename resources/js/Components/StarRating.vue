<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    rating: number;
    size?: number;
    showNumber?: boolean;
}>();

const starSize = computed(() => props.size || 16);
const fullStars = computed(() => Math.floor(props.rating));
const hasHalfStar = computed(() => props.rating % 1 >= 0.5);
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));
</script>

<template>
    <div class="flex items-center gap-1">
        <!-- Full Stars -->
        <span v-for="i in fullStars" :key="`full-${i}`" class="text-amber-400" :style="{ fontSize: `${starSize}px` }"> ★ </span>

        <!-- Half Star -->
        <span v-if="hasHalfStar" class="relative inline-block" :style="{ fontSize: `${starSize}px` }">
            <span class="text-gray-300 dark:text-gray-600">★</span>
            <span class="absolute inset-0 overflow-hidden text-amber-400" style="width: 50%">★</span>
        </span>

        <!-- Empty Stars -->
        <span v-for="i in emptyStars" :key="`empty-${i}`" class="text-gray-300 dark:text-gray-600" :style="{ fontSize: `${starSize}px` }"> ★ </span>

        <!-- Rating Number -->
        <span v-if="showNumber" class="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ rating.toFixed(1) }}
        </span>
    </div>
</template>
