<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: () => t('not-found'),
})
</script>

<template>
  <main class="min-h-screen flex items-center justify-center">
    <RouterView />
  </main>
</template>
