<script setup lang="ts">
const colorMode = useColorMode();
colorMode.preference = 'light';

const darkMode = ref(false);

const isLargeScreen = ref(true);

watch(darkMode, (darkModeValue) => {
  if (darkModeValue === true) {
    colorMode.preference = 'dark';
  } else {
    colorMode.preference = 'light';
  }
}, { immediate: true });

// BRIAN LEAVING OFF WHY DON'T THE LINKS ACTIVE WORK
const links = computed(() => {
  return [{
    label: 'About Me',
    icon: 'i-heroicons-user',
    to: '#about-me',
    active: window?.location?.hash === '#about-me' || window?.location?.hash === ''
  }, {
    label: 'Experience',
    icon: 'i-heroicons-briefcase',
    to: '#experience',
    active: window?.location?.hash === '#experience'
  }, {
    label: 'Blog',
    icon: 'i-heroicons-book-open',
    to: '#blog',
    active: window?.location?.hash === '#blog'
  }, {
    label: 'Portfolio',
    icon: 'i-heroicons-squares-2x2',
    to: '#portfolio',
    active: window?.location?.hash === '#portfolio'
  }, {
    label: 'Contact Me',
    icon: 'i-heroicons-envelope',
    to: '#contact',
    active: window?.location?.hash === '#contact'
  }];
});

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

const sidebarOpen = ref();

const sidebarOpenWidthClass = 'w-[300px]';
const sidebarClosedWidthClass = 'w-0';

const sidebarOpenLeftMarginClass = 'ml-[300px]';
const sidebarClosedLeftMarginClass = 'ml-0';

const currentSidebarWidthClass = ref(sidebarOpenWidthClass);
const currentMainLeftMarginClass = ref(sidebarOpenLeftMarginClass);

watch(sidebarOpen, (val) => {
  if (val === true) {
    currentSidebarWidthClass.value = sidebarOpenWidthClass;
    currentMainLeftMarginClass.value = sidebarOpenLeftMarginClass;
  } else {
    currentSidebarWidthClass.value = sidebarClosedWidthClass;
    currentMainLeftMarginClass.value = sidebarClosedLeftMarginClass;
  }
});

onMounted(() => {
  isLargeScreen.value = window.innerWidth >= 1024;

  // close sidebar on small screens
  if (!isLargeScreen.value) {
    sidebarOpen.value = false;
  } else {
    sidebarOpen.value = true;
  }
});

</script>
<template>
  <div v-if="sidebarOpen !== undefined" class="flex flex-col lg:flex-row"
    :class="sidebarOpen && !isLargeScreen ? 'overflow-hidden' : ''">
    <!-- Sidebar -->
    <aside class="flex flex-col lg:p-5 gap-4 bg-secondary fixed h-screen bg-white d" :class="currentSidebarWidthClass">
      <!-- mobile button for toggling sidebar -->
      <UButton :icon="sidebarOpen ? 'i-heroicons-bars-3' : 'i-heroicons-bars-3'" id="menu-toggle"
        class="flex lg:hidden top-1/2 z-10 shadow-sm" @click="sidebarOpen = !sidebarOpen" />
      <Transition name="slide-sidebar">
        <section v-if="sidebarOpen"
          class="h-full flex flex-col justify-between relative bg-white dark:bg-slate-800 shadow-lg">
          <!-- Top portion of sidebar -->
          <div class="flex flex-col gap-4">
            <header>
              <a href="/">
                <img src="./static/logo-circle-bg.svg" alt="Nerd Specs Creative Logo" class="w-1/2 lg:w-full mx-auto" />
              </a>
            </header>
            <!-- Has semantic nav built in -->
            <UVerticalNavigation :links="links" :ui="{ label: 'text-lg' }" />
          </div>
          <footer class="flex flex-col gap-4 justify-center items-center">
            <a href="https://www.codementor.io/@scramlo?refer=badge" class="mx-auto"><img
                src="https://www.codementor.io/m-badges/scramlo/find-me-on-cm-b.svg" alt="Codementor badge"></a>
            <ColorScheme>
              <UButton :icon="darkMode ? 'i-heroicons-moon' : 'i-heroicons-sun'" class="text-white dark:text-white"
                @click="darkMode = !darkMode" :ui="{ rounded: 'rounded-full' }" />
            </ColorScheme>
          </footer>
        </section>
      </Transition>
    </aside>

    <main class="flex flex-col w-full mt-32 lg:mt-0 transition-all duration-300" :class="currentMainLeftMarginClass">

      <!-- About Me -->
      <section id="about-me" class="flex flex-col-reverse lg:flex-row gap-4 justify-center items-center h-screen">
        <div class="lg:w-1/2 flex justify-center">
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
              <UButton to="#experience" color="gray">Experience</UButton>
              <UButton to="#contact">Contact Me</UButton>
            </div>
          </div>
        </div>
        <div class="lg:w-1/2 lg:flex justify-center items-center">
          <img src="./static/brian-main-image.webp" alt="Brian Scramlin" class="max-h-[80vh] frame" />
        </div>
      </section>

      <!-- work experience -->
      <section id="experience" class="flex flex-col">
        <header>
          <h2 class="text-3xl font-bold mb-10">Experience</h2>
        </header>
        <WorkExperienceSlider />
      </section>

      <!-- Blog -->
      <section id="blog">
        <header>
          <h2 class="text-3xl font-bold mb-10">Latest Blog Posts</h2>
        </header>
        <div class="flex flex-col lg:flex-row gap-4">
          <article class="flex flex-col gap-2">
            <a :href="blogPosts[0]?.url" target="_blank">
              <img :src="blogPosts[0]?.coverImage.url" :alt="blogPosts[0]?.title" class="frame hover-up" />
            </a>
            <h3 class="text-2xl">
              <a :href="blogPosts[0]?.url" target="_blank">{{ blogPosts[0]?.title }}</a>
            </h3>
            <p class="text-xl">{{ blogPosts[0]?.subtitle }}</p>
            <p class="flex items-center gap-1">
              <UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read
            </p>
          </article>
          <article class="flex flex-col gap-2">
            <a :href="blogPosts[1]?.url" target="_blank">
              <img :src="blogPosts[1]?.coverImage.url" :alt="blogPosts[1]?.title" class="frame hover-up" />
            </a>
            <h3 class="text-2xl">
              <a :href="blogPosts[1]?.url" target="_blank">{{ blogPosts[1]?.title }}</a>
            </h3>
            <p class="text-xl">{{ blogPosts[1]?.subtitle }}</p>
            <p class="flex items-center gap-1">
              <UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read
            </p>
          </article>
          <article class="flex flex-col gap-2">
            <a :href="blogPosts[2]?.url" target="_blank">
              <img :src="blogPosts[2]?.coverImage.url" :alt="blogPosts[2]?.title" class="frame hover-up" />
            </a>
            <h3 class="text-2xl">
              <a :href="blogPosts[2]?.url" target="_blank">{{ blogPosts[2]?.title }}</a>
            </h3>
            <p class="text-xl">{{ blogPosts[2]?.subtitle }}</p>
            <p class="flex items-center gap-1">
              <UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read
            </p>
          </article>
        </div>
      </section>

      <!-- Portfolio -->
      <section id="portfolio">
        <header>
          <h2 class="text-3xl font-bold mb-10">Portfolio</h2>
        </header>
        <Portfolio />
      </section>

      <!-- Contact -->
      <section id="contact">
        <header>
          <h2 class="text-3xl font-bold mb-10">Contact Me</h2>
        </header>
        <Contact />
      </section>

      <!-- Footer -->
      <section class="flex flex-col items-center justify-center">
        Thanks for stopping by! &#x1F44B;
      </section>
    </main>
  </div>
  <div v-else class="h-screen w-screen flex justify-center items-center">
    <Loader />
  </div>
  <UNotifications />
</template>

<style scoped>
section {
  @apply p-5 lg:p-10;
}

main section:nth-child(even) {
  @apply bg-gray-200 dark:bg-slate-800;
}

#menu-toggle {
  padding: 0.5rem;
  width: 2rem;
  position: absolute;
  right: -2rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  justify-content: end;
}

/* Transition classes for sliding animation */
.slide-sidebar-enter-active,
.slide-sidebar-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-sidebar-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-sidebar-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

<style>
/* smooth scrolling */
html {
  scroll-behavior: smooth;
}

.frame {
  @apply border-white border-8 rounded shadow-lg;
}

/* dark mode bug */
.dark\:text-gray-900:is(.dark *) {
  @apply text-white;
}

/* useful hover */
.hover-up {
  @apply hover:transform hover:-translate-y-2 transition-transform duration-300;
}

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