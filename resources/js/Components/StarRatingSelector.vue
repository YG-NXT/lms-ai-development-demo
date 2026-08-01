<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: number;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: number];
}>();

const hoverRating = ref(0);
const selectedRating = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
        selectedRating.value = newVal;
    },
);

const selectRating = (rating: number) => {
    selectedRating.value = rating;
    emit('update:modelValue', rating);
};

const getStarClass = (index: number) => {
    const rating = hoverRating.value || selectedRating.value;
    return index <= rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600';
};
</script>

<template>
    <div class="flex items-center gap-1">
        <button
            v-for="i in 5"
            :key="i"
            type="button"
            @click="selectRating(i)"
            @mouseenter="hoverRating = i"
            @mouseleave="hoverRating = 0"
            class="cursor-pointer text-3xl transition-all hover:scale-110"
            :class="getStarClass(i)"
        >
            ★
        </button>
    </div>
</template>
