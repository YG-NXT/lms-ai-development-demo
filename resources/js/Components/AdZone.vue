<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    zoneId: string;
    position: string;
    adCode: string;
    width?: number | null;
    height?: number | null;
}>();

const adContainer = ref<HTMLDivElement | null>(null);
const isLoaded = ref(false);

onMounted(() => {
    if (props.adCode && adContainer.value) {
        // Inject the ad code
        adContainer.value.innerHTML = props.adCode;
        
        // Execute any scripts in the ad code
        const scripts = adContainer.value.querySelectorAll('script');
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
        
        isLoaded.value = true;
        
        // Track impression
        trackImpression('impression');
    }
});

const trackImpression = async (type: 'impression' | 'click') => {
    try {
        await fetch('/api/ads/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                zone_id: props.zoneId,
                type: type,
                page_url: window.location.href,
            }),
        });
    } catch (error) {
        console.error('Failed to track ad impression:', error);
    }
};

const handleClick = () => {
    trackImpression('click');
};
</script>

<template>
    <div 
        v-if="adCode" 
        class="ad-zone-container"
        :data-position="position"
        :data-zone-id="zoneId"
        @click="handleClick"
    >
        <div 
            ref="adContainer" 
            class="ad-content"
            :style="{ 
                width: width ? `${width}px` : '100%', 
                minHeight: height ? `${height}px` : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }"
        ></div>
        
        <!-- Loading indicator -->
        <div v-if="!isLoaded" class="ad-loading">
            <div class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-24"></div>
        </div>
    </div>
</template>

<style scoped>
.ad-zone-container {
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: transparent;
}

.ad-content {
    overflow: hidden;
}

.ad-loading {
    padding: 1rem;
}
</style>
