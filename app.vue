<script setup lang="ts">
const colorMode = useColorMode()

const darkMode = ref(false);

watch(darkMode, (darkModeValue) => {
  if (darkModeValue === true) {
    colorMode.preference = 'dark';
  } else {
    colorMode.preference = 'light';
  }
}, { immediate: true });

const links = [{
  label: 'About Me',
  icon: 'i-heroicons-user',
  to: '/#about-me'
}, {
  label: 'Work Experience',
  icon: 'i-heroicons-briefcase',
  to: '/#work-experience'
}, {
  label: 'Blog',
  icon: 'i-heroicons-book-open',
  to: '/#blog'
}, {
  label: 'Portfolio',
  icon: 'i-heroicons-squares-2x2',
  to: '#portfolio'
}];

const query = gql`
query {
  publication(host: "blog.nerdspecs.com") {
    title
    posts(first: 3) {
      edges {
        node {
          title
          subtitle
          coverImage {
            url
          }
          url,
          readTimeInMinutes
        }
      }
    }
  }
}`;

type BlogPost = {
  title: string;
  subtitle: string;
  coverImage: {
    url: string;
  };
  url: string;
  readTimeInMinutes: number;
};

const { data } = await useAsyncQuery<{ publication: { posts: { edges: { node: BlogPost }[] } } }>(query);

const blogPosts = computed(() => {
  if (!data?.value) return [];
  return data.value.publication.posts.edges.map((edge) => edge.node);
});

const sidebarWidthClass = 'lg:w-[300px]';
const mainLeftMarginClass = 'lg:ml-[300px]';

const workExperienceItems = [
  {
    title: 'GradeCam',
    logo: './work-experience/gradecam.svg',
    teamImage: './work-experience/gradecam-team.jpeg',
    description: `I became a Senior Frontend Engineer at GradeCam to help develop
      their K-12 product. While on staff, I worked closely with the Product Team,
      mentored other developers, and launched a new business-focused product.
      I had the opportunity to take on backend responsibilities as well. After 20+
      years, GradeCam’s investors decided to kill Gradient and focus on selling
      their camera technology as a service`,
  },
  {
    title: 'ArborXR',
    logo: './work-experience/arborxr.svg',
    teamImage: './work-experience/arborxr-team.jpeg',
    description: `In 2020 I had the privilege to develop enterprise-level Vue 2 and Vue 3
applications for the Ed Tech companies Slingshot Edu and Campus Edu. In
this position, I wrote features, helped develop a component library, created
a greenfield product to bridge registrar offices with our software, and
participated in product development. In addition to our modern stack, I was
the sole Full-Stack Moodle developer.`,
  },
  {
    title: 'Slingshot',
    logo: './work-experience/slingshot.webp',
    teamImage: './work-experience/slingshot-team.jpeg',
    description: `In 2022 I took a leap of faith to join a fast-growing XR management
SaaS serving many Fortune 500s. Using the latest Vue 3 paradigms,
including HOCs and stateful compositions, we created the most in-demand
XR management software in the world. In my role, I was involved in many
aspects of design and architectural considerations while continuing to write
features. Unfortunately, ArborXR grew too quickly and made mass layoffs.`,
  },
];
</script>
<template>
<div class="flex flex-col lg:flex-row">
  <!-- Sidebar -->
  <aside class="flex flex-col w-full p-5 gap-4 bg-secondary fixed h-screen shadow-lg" :class="sidebarWidthClass">
    <section class="h-full flex flex-col justify-between">
      <!-- Top portion of sidebar -->
      <div>
        <header class="mb-4">
          <img src="./static/logo-circle-bg.svg" alt="Nerd Specs Creative Logo" class="w-full mx-auto" />
        </header>
        <!-- Has semantic nav built in -->
        <UVerticalNavigation :links="links" />
      </div>
      <footer class="flex flex-col justify-center items-center">
        <ColorScheme>
            <UButton 
              :icon="darkMode ? 'i-heroicons-moon' : 'i-heroicons-sun'" 
              class="text-white dark:text-white" 
              @click="darkMode = !darkMode" 
              :ui="{ rounded: 'rounded-full' }"
            />
        </ColorScheme>
      </footer>
    </section>
    <div>

    </div>
  </aside>

  <main class="flex flex-col w-full" :class="mainLeftMarginClass">

    <!-- About Me -->
    <section id="about-me" class="flex gap-4 justify-center items-center h-screen">
      <div class="w-1/2 flex justify-center">
        <div class="flex flex-col gap-2">
          <header>
            <h2 class="text-3xl font-bold">Hello!</h2>
          </header>
          <p class="text-lg">
            I'm Brian, and I am an enterprise-experienced software engineer with over
            10+ years of experience. I have a passion for mentoring others and
            creating products that people love. I believe great software comes
            from strong teams, clear communication, accessible UX, scalable code,
            and solid testing. I am a flexible developer and strong leader, ready to help you accomplish your goals.
          </p>
          <div class="flex gap-4">
            <UButton to="#work-experience" color="gray">Work Experience</UButton>
            <UButton to="#blog">Contact Me</UButton>
          </div>
        </div>
      </div>
      <div class="w-1/2 flex justify-center items-center">
        <img src="./static/brian-main-image.webp" alt="Brian Scramlin" class="max-h-[80vh] frame" />
      </div>
    </section>

    <!-- work experience -->
    <section id="work-experience" class="flex justify-center items-center">
      <div>
        <header>
        <h2 class="text-3xl font-bold mb-10">Work Experience</h2>
      </header>
      <UCarousel
        v-slot="{ item, index }" 
        :items="workExperienceItems" 
        :ui="{ item: 'w-full' }"
        :prev-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-left-20-solid',
        }"
        :next-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-right-20-solid',
        }"
        arrows
        >
          <article class="grid grid-cols-2 mx-2 gap-12 justify-center items-center">
              <div class="flex flex-col gap-4">
                <img :src="item.logo" alt="" class="max-w-48"/>
                <p>{{ item.description }}</p>
              </div>
              <img 
                :src="item.teamImage"
                alt=""
                class="frame max-h-[50vh] m-auto"
              />
          </article>
        </UCarousel>
      </div>
    </section>

    <!-- Blog -->
    <section id="blog">
        <header>
        <h2 class="text-3xl font-bold mb-10">Latest Blog Posts</h2>
      </header>
      <div class="flex gap-4">
         <article class="flex flex-col gap-2">
            <a :href="blogPosts[0]?.url">
              <img 
                :src="blogPosts[0]?.coverImage.url"
                :alt="blogPosts[0]?.title"
                class="frame"
              />
            </a>
            <h3 class="text-3xl">{{ blogPosts[0]?.title }}</h3>
            <p class="text-xl">{{ blogPosts[0]?.subtitle }}</p>
            <p class="flex items-center gap-1"><UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read</p>
         </article>
          <article class="flex flex-col gap-2">
              <a :href="blogPosts[1]?.url">
              <img 
                :src="blogPosts[1]?.coverImage.url"
                :alt="blogPosts[1]?.title"
                class="w-full frame"
              />
              </a>
            <h3 class="text-3xl">{{ blogPosts[1]?.title }}</h3>
            <p class="text-xl">{{ blogPosts[1]?.subtitle }}</p>
            <p class="flex items-center gap-1"><UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read</p>
         </article>
         <article class="flex flex-col gap-2">
            <a :href="blogPosts[2]?.url">
              <img 
                :src="blogPosts[2]?.coverImage.url"
                :alt="blogPosts[2]?.title"
                class="w-full frame"
              />
            </a>
            <h3 class="text-3xl">{{ blogPosts[2]?.title }}</h3>
            <p class="text-xl">{{ blogPosts[2]?.subtitle }}</p>
            <p class="flex items-center gap-1"><UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read</p>
         </article>
        </div>
    </section>

    <!-- Portfolio -->
    <section></section>
  </main>
</div>
</template>

<style scoped>

section {
  @apply p-10;
}

main section:nth-child(even) {
  @apply bg-gray-100;
}

.frame {
  @apply border-white border-8 rounded shadow-lg;
}
</style>

<style>
/* smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>