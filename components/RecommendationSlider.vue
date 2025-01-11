<script setup lang="ts">
// teamImage: './img/work-experience/gradecam/gradecam-team.jpeg',

const recommendations = [{
    name: 'Jared Butterfield',
    relationship: 'Head of Engineering',
    description: 'He is not only a highly skilled engineer but also an invaluable team player and leader who elevates those around him.',
    image: './img/recommendations/jared.png',
}, {
    name: 'Rick Gigger',
    relationship: 'Principal Backend Engineer',
    description: 'He has a strong desire to really understand problems in-depth and deal with root causes rather than just patching things up. ',
    image: './img/recommendations/rick.jpg',
}, {
    name: 'Tasi Cluff',
    relationship: 'Lead Backend Engineer',
    description: 'Brian’s contributions to our projects have been invaluable, and I can’t recommend him highly enough for any role or opportunity. ',
    image: './img/recommendations/tasi.jpg',
}, {
    name: 'Amanda Barber',
    relationship: 'Product Manager',
    description: 'Brian is an amazing colleague who integrates his development skills with his sharp critical thinking abilities.',
    image: './img/recommendations/amanda.jpg',
}
]
</script>

<template>
    <div class="relative">
        <UCarousel :items="recommendations" :ui="{ item: 'w-full' }" arrows class="carousel">
            <template #default="{ item }">
                <article class="w-full flex flex-col gap-4 justify-center items-center">
                    <img :src="item.image" class="w-32 h-32 rounded-full object-cover" />
                    <div class="flex flex-col gap-2 w-1/2 text-center">
                        <h3 class="flex flex-col gap-[0]">
                            <span class="font-bold">{{ item.name }}</span>
                            <small>{{ item.relationship }}</small>
                        </h3>
                        <p class="text-xl">{{ item.description }}</p>
                    </div>
                </article>
            </template>
        </UCarousel>
        <UIcon name="i-mingcute-quote-left-fill" class="absolute opacity-50 top-2 left-12 w-16 h-16" />
    </div>
</template>

<style scoped></style>