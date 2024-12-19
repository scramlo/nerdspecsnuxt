<script setup lang="ts">
const colorMode = useColorMode()

const darkMode = ref(true);

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
  to: '#about-me'
}, {
  label: 'Work Experience',
  icon: 'i-heroicons-briefcase',
  to: '#work-experience'
}, {
  label: 'Blog',
  icon: 'i-heroicons-book-open',
  to: '#blog'
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

</script>
<template>
<div class="flex flex-col lg:flex-row">
  <!-- Sidebar -->
  <aside class="flex flex-col w-full lg:w-1/6 p-5 gap-4 bg-secondary">
    <section class="h-full flex flex-col justify-between">
      <!-- Top portion of sidebar -->
      <div>
        <header class="mb-4">
          <img src="./static/logo-circle-bg.svg" alt="Nerd Specs Creative Logo" class="w-24 mx-auto" />
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
  <main class="flex flex-col w-full px-10">
    <!-- About Me -->
    <section class="flex gap-4 justify-center items-center">
      <div class="w-1/2 flex justify-center">
        <div>
          <span class="text-2xl font-bold">Hello!</span>
          <p class="text-lg">
            Hi, I'm Brian, and I am an enterprise-experienced engineer with over
            10+ years of experience. I have a passion for mentoring others and
            creating products that people love. I believe great software comes
            from strong teams, clear communication, accessible UX, scalable code,
            and solid testing. I am a flexible developer and strong leader, ready to help you accomplish your goals.
          </p>
          <div class="flex gap-4">
            <UButton to="/about" class="mt-4" color="gray">Learn More</UButton>
            <UButton to="/about" class="mt-4">Contact Me</UButton>
          </div>
        </div>
      </div>
      <div class="w-1/2 flex justify-center items-center">
        <img src="./static/brian-landscape.jpg" alt="Brian Scramlin" class="w-full shadow-lg" />
      </div>
    </section>

    <!-- Blog -->
    <section class="bg-gray-100 dark:bg-gray-800">
      <header>
        <h2 class="text-3xl font-bold mb-10">Latest Blog Posts</h2>
      </header>
      <div class="flex gap-4">
        <!-- featured post -->
         <article class="flex flex-col gap-2">
            <a :href="blogPosts[0]?.url">
              <img 
                :src="blogPosts[0]?.coverImage.url"
                :alt="blogPosts[0]?.title"
              />
            </a>
            <h3 class="text-3xl">{{ blogPosts[0]?.title }}</h3>
            <p class="text-xl">{{ blogPosts[0]?.subtitle }}</p>
            <p class="flex items-center gap-1"><UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read</p>
         </article>
         <!-- next two articles -->
         <div class="flex flex-col gap-4">
          <article class="flex flex-col gap-2">
              <a :href="blogPosts[1]?.url">
              <img 
                :src="blogPosts[1]?.coverImage.url"
                :alt="blogPosts[1]?.title"
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
              />
            </a>
            <h3 class="text-3xl">{{ blogPosts[2]?.title }}</h3>
            <p class="text-xl">{{ blogPosts[2]?.subtitle }}</p>
            <p class="flex items-center gap-1"><UIcon name="i-heroicons-book-open" /> {{ blogPosts[0]?.readTimeInMinutes }} min read</p>
         </article>
         </div>
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
</style>