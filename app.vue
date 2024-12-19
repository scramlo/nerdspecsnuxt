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
  label: 'Profile',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  badge: 100
}, {
  label: 'Installation',
  icon: 'i-heroicons-home',
  to: '/getting-started/installation'
}, {
  label: 'Vertical Navigation',
  icon: 'i-heroicons-chart-bar',
  to: '/components/vertical-navigation'
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/components/command-palette'
}]

</script>
<template>
<div>
  <!-- Sidebar -->
  <aside class="flex flex-col h-screen w-1/6 p-5 gap-4 bg-secondary">
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
            <!-- <UButton v-else icon="i-heroicons-sun" class="text-white" @click="darkMode = !darkMode" /> -->
        </ColorScheme>
      </footer>
    </section>
    <div>

    </div>
  </aside>
  <main class="flex flex-col w-3/4">
    <!-- About Me -->
    <section></section>

    <!-- Blog -->
    <section></section>

    <!-- Portfolio -->
    <section></section>
  </main>
</div>
</template>
