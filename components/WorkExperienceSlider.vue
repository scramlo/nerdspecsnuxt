<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';

const workExperienceItems = [
    {
        title: 'GradeCam',
        position: 'Senior Full-Stack Engineer',
        logos: ['./img/work-experience/gradecam/gradecam.svg'],
        teamImage: './img/work-experience/gradecam/gradecam-team.jpeg',
        description: `I became a Senior Frontend Engineer at GradeCam to help develop
      their K-12 product. While on staff, I worked closely with the Product Team,
      mentored other developers, and launched a new business-focused product.
      I had the opportunity to take on backend responsibilities as well. After 20+
      years, GradeCam’s investors decided to kill Gradient and focus on selling
      their camera technology as a service`,
    },
    {
        title: 'ArborXR',
        position: 'Frontend Engineer II',
        logos: ['./img/work-experience/arborxr/arborxr.svg'],
        teamImage: './img/work-experience/arborxr/arborxr-team.jpeg',
        description: `In 2020 I had the privilege to develop enterprise-level Vue 2 and Vue 3
applications for the Ed Tech companies Slingshot Edu and Campus Edu. In
this position, I wrote features, helped develop a component library, created
a greenfield product to bridge registrar offices with our software, and
participated in product development. In addition to our modern stack, I was
the sole Full-Stack Moodle developer.`,
    },
    {
        title: 'Slingshot Edu',
        position: 'Full-Stack Engineer',
        logos: ['./img/work-experience/slingshot/slingshot.webp', './img/work-experience/slingshot/campus.svg'],
        teamImage: './img/work-experience/slingshot/slingshot-team.jpeg',
        description: `In 2020 I had the privilege to develop enterprise-level Vue 2 and Vue 3
applications for the Ed Tech companies Slingshot Edu and Campus Edu. In
this position, I wrote features, helped develop a component library, created
a greenfield product to bridge registrar offices with our software, and
participated in product development. In addition to our modern stack, I was
the sole Full-Stack Moodle developer.`,
    },
    {
        title: 'Nerd Specs Creative',
        position: 'Full-Stack Engineer',
        logos: ['./img/work-experience/nerdspecs/logo-hor-plain2.svg'],
        teamImage: './img/work-experience/nerdspecs/nerdspecs-team.jpeg',
        description: `In 2014, I began developing web applications with Ruby on Rails and
launched my own company. As I work with clients, I have been able to
touch several languages, frameworks, and stacks.`,
    },
];

const modalData: Ref<{ workExperienceItem: typeof workExperienceItems[0] | null, markdown: ParsedContent | null, isModalOpen: boolean }> = ref({
    workExperienceItem: null,
    markdown: null,
    isModalOpen: false,
});

async function openDetails(item: typeof workExperienceItems[0]) {
    let markdown: ParsedContent | null = null;

    // to do: use programmatic map
    if (item.title === 'GradeCam') {
        try {
            const { data } = await useAsyncData('workExperience', () => queryContent('work-experience/gradecam').findOne());
            markdown = data.value;
        } catch (e) {
            console.error(e);
        }
    };

    if (item.title === 'ArborXR') {
        try {
            const { data } = await useAsyncData('workExperience', () => queryContent('work-experience/arborxr').findOne());
            markdown = data.value;
        } catch (e) {
            console.error(e);
        }
    };

    if (item.title === 'Slingshot Edu') {
        try {
            const { data } = await useAsyncData('workExperience', () => queryContent('work-experience/slingshot').findOne());
            markdown = data.value;
        } catch (e) {
            console.error(e);
        }
    };

    if (item.title === 'Nerd Specs Creative') {
        try {
            const { data } = await useAsyncData('workExperience', () => queryContent('work-experience/nerdspecs').findOne());
            markdown = data.value;
        } catch (e) {
            console.error(e);
        }
    };


    modalData.value = {
        workExperienceItem: item,
        markdown,
        isModalOpen: true,
    };
}
</script>

<template>
    <header>
        <h2 class="text-3xl font-bold mb-10">Work Experience</h2>
    </header>
    <UCarousel :items="workExperienceItems" :ui="{ item: 'w-full' }" arrows>

        <template #default="{ item }">
            <article class="grid grid-cols-2 mx-2 gap-12 justify-center items-center">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-2">
                        <img v-for="logoUrl in item.logos" :src="logoUrl" :alt="`${item.title} Logo`"
                            class="max-w-48 max-h-fit-content" />
                    </div>
                    <!-- <h3 class="text-3xl">{{ item.title }}</h3> -->
                    <p class="flex flex-col gap-2">
                        <span>{{ item.description }}</span>
                        <span class="flex flex-row-reverse">
                            <UButton label="Details" @click="openDetails(item)" />
                        </span>
                    </p>
                </div>
                <img :src="item.teamImage" alt="" class="frame max-h-[50vh] m-auto" />
            </article>
        </template>

        <template #prev="{ onClick, disabled }">
            <UButton class="mt-10" :disabled="disabled" @click="onClick">
                Prev
            </UButton>
        </template>

        <template #next="{ onClick, disabled }">
            <UButton class="mt-10" :disabled="disabled" @click="onClick">
                Next
            </UButton>
        </template>
    </UCarousel>
    <UModal v-model="modalData.isModalOpen"
        :ui="{ height: 'h-[80vh] overflow-scroll', width: 'sm:max-w-1/2 sm:w-1/2' }">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex justify-between items-center">
                    <span><strong>{{ modalData.workExperienceItem?.title }}</strong> &bull; {{
                        modalData.workExperienceItem?.position }}</span>
                    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                        @click="modalData.isModalOpen = false" />
                </div>
            </template>

            <div class="flex flex-col">
                <ContentRendererMarkdown v-if="modalData.markdown" :value="modalData.markdown" />
                <div v-else class="flex flex-col gap-4">
                    <USkeleton class="h-4" />
                    <USkeleton class="h-4" />
                    <USkeleton class="h-48" />
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