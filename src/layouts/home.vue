<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <main class="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
    <!-- Simple Header -->
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
      <div class="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="text-2xl text-green-500">
            <div i-carbon-code />
          </div>
          <h1 class="from-green-500 to-blue-500 bg-gradient-to-r bg-clip-text text-xl text-transparent font-bold">
            Vue Challenges
          </h1>
        </RouterLink>

        <button
          class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Toggle dark mode"
          @click="toggleDark()"
        >
          <div v-if="isDark" i-carbon-moon class="text-xl" />
          <div v-else i-carbon-sun class="text-xl" />
        </button>
      </div>
    </header>

    <!-- Content -->
    <div class="mx-auto max-w-4xl px-4 py-12">
      <RouterView />
    </div>

    <!-- Footer -->
    <footer class="mt-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 Vue Challenges. Built with ❤️ for frontend developers.</p>
      </div>
    </footer>
  </main>
</template>
