<script setup lang="ts">
import { $root, onMount } from '@/composables/useRoot';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute()

watch(
  () => router.name,
  (to: string, from: string) => {
    if (from && $root.pages) {
      $root.pages.props.from = from as string | null
    }
    if (to && $root.pages) {
      $root.pages.props.to = to as string | null
    }
  },
  { immediate: true }
)

onMounted(() => {
  onMount()
})
</script>

<template>
  <Header />
  <Preloader />

  <main class="main">
    <slot />
  </main>

  <Sketch />
</template>
