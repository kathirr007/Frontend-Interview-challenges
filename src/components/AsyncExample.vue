<script setup>
import { onMounted, ref } from 'vue'

const loadTime = ref('')

onMounted(() => {
  loadTime.value = new Date().toLocaleTimeString()
})
</script>

<template>
  <div class="async-example">
    <h4>Async Component Loaded!</h4>
    <p>This component was loaded asynchronously using defineAsyncComponent.</p>
    <p>Loaded at: {{ loadTime }}</p>
  </div>
</template>

<style scoped>
.async-example {
  padding: 15px;
  margin-top: 10px;
  background-color: #e8f5e9;
  border: 2px solid #4caf50;
  border-radius: 4px;
}

h4 {
  color: #2e7d32;
  margin-top: 0;
}
</style>
