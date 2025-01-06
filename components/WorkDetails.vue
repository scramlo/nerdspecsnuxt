<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';

const isOpen = ref(false);
defineProps<{
    title: string;
    markdown: ParsedContent | null;
}>();
</script>

<template>
    <div>
        <UButton label="Details" @click="isOpen = true" />


    </div>
</template>