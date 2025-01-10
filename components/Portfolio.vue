<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';

function buildImgUrls(slug: string, count: number, hasVideo = false) {
    const images = [];
    for (let i = 1; i <= count; i++) {
        images.push(`./img/portfolio/${slug}/${i}.png`);
    }
    if (hasVideo) {
        images.push(`./img/portfolio/${slug}/video.mp4`);
    }
    return images;
}

const portfolioItems = [
    {
        title: 'DrydenWire',
        subtitle: 'A Huge Grassroots News Site',
        slug: 'drydenwire',
        images: buildImgUrls('drydenwire', 5),
    },
    {
        title: 'NEI District',
        subtitle: 'A Large Denominational District',
        slug: 'neidistrict',
        images: buildImgUrls('neidistrict', 5, true),
    },
    {
        title: 'Hidden Diamond Homes',
        subtitle: 'High-Performance House Flippers',
        slug: 'hiddendiamondhomes',
        images: buildImgUrls('hiddendiamondhomes', 4),
    },
    {
        title: 'Pray Wabash',
        subtitle: 'A City-Wide Prayer House',
        slug: 'praywabash',
        images: buildImgUrls('praywabash', 8),
    },
    {
        title: 'Trustease',
        subtitle: 'A Work Order App for Churches',
        slug: 'trustease',
        images: buildImgUrls('trustease', 1, true),
    },
    {
        title: 'The Look',
        subtitle: 'A Thriving New Salon',
        slug: 'thelook',
        images: buildImgUrls('thelook', 7),
    },
    {
        title: 'New Journey Community Church',
        subtitle: 'A Modern Church',
        slug: 'njcc',
        images: buildImgUrls('njcc', 4),
    },
    {
        title: 'Jack Pine Creations',
        subtitle: 'An Artist with Big Dreams!',
        slug: 'jackpine',
        images: buildImgUrls('jackpine', 5),
    },
    {
        title: 'Harris and Willow',
        subtitle: 'A Chic Blog and Store',
        slug: 'harrisandwillow',
        images: buildImgUrls('harrisandwillow', 4),
    },
];

const modalData: Ref<{ portfolioItem: typeof portfolioItems[0] | null, markdown: ParsedContent | null, isModalOpen: boolean }> = ref({
    portfolioItem: null,
    markdown: null,
    isModalOpen: false,
});

async function openDetails(item: typeof portfolioItems[0]) {
    let markdown: ParsedContent | null = null;
    try {
        const { data } = await useAsyncData('portfolio', () => queryContent(`portfolio/${item.slug}`).findOne());
        markdown = data.value;
    } catch (e) {
        console.error(e);
    }

    modalData.value = {
        portfolioItem: item,
        markdown,
        isModalOpen: true,
    };
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in portfolioItems">
            <button @click="openDetails(item)" aria-label="View Details">
                <img :src="item.images[0]" :alt="item.title" class="frame hover-up" />
            </button>
            <h3 class="text-2xl">{{ item.title }}</h3>
        </div>
    </div>
    <UModal v-model="modalData.isModalOpen"
        :ui="{ height: 'h-[80vh] overflow-scroll', width: 'sm:max-w-1/2 sm:w-1/2' }">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <span><strong>{{ modalData.portfolioItem?.title }}</strong> &bull; {{
                        modalData.portfolioItem?.subtitle }}</span>
                    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                        @click="modalData.isModalOpen = false" aria-label="Close portfolio details" />
                </div>
            </template>

            <div class="flex flex-col gap-5">
                <UCarousel v-slot="{ item }" :items="modalData.portfolioItem?.images" :ui="{ item: 'basis-full' }"
                    class="rounded-lg overflow-hidden carousel" arrows>
                    <template v-if="item.endsWith('.png')">
                        <img :src="item" class="w-full" draggable="false">
                    </template>
                    <template v-else>
                        <video :src="item" class="w-full" controls></video>
                    </template>
                </UCarousel>
                <ContentRendererMarkdown v-if="modalData.markdown" :value="modalData.markdown" />
                <div v-else class="flex flex-col gap-4">
                    <USkeleton class="h-48" />
                    <USkeleton class="h-4" />
                    <USkeleton class="h-4" />
                    <USkeleton class="h-4" />
                    <USkeleton class="h-4" />
                    <USkeleton class="h-4" />
                </div>
            </div>
        </UCard>
    </UModal>
</template>

<style scoped>
/* markdown styles */
:deep(div[data-content-id*="content:"]) {

    /* links */
    a {
        @apply text-blue-500 underline;
    }

    a:visited {
        @apply text-purple-500 underline;
    }

    a:hover {
        @apply text-blue-700 underline;
    }

    p:not(:first-child) {
        @apply my-3;
    }

    ul {
        @apply ml-5 list-disc;
    }

    li {
        @apply my-2;
    }

    img {
        @apply border-white border-8 rounded shadow-lg;
    }

    table {
        @apply w-full;
    }

    tr {
        @apply grid grid-cols-2;
    }
}
</style>