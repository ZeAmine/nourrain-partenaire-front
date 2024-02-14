<script setup lang="ts">
import { $root } from '@/composables/useRoot';
import { useRouterStore } from '@/stores/router';

const { currentRoute, previousRoute } = useRouterStore()

const props = {
  from: previousRoute,
  to: currentRoute
}

definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    onLeave: async (el: HTMLElement, done: () => void) => {
      await $root.pages?.transitionOut(el)
      done()
    },
    onEnter: async (el: HTMLElement, done: () => void) => {
      await $root.pages?.transitionIn(el)
      done()
    }
  }
})
</script>

<template>
  <section class="section">
    <span data-a="word">ABOUT</span>
    <span data-a="word">ABOUT</span>
    <span data-a="word">ABOUT</span>
    <span data-a="word">ABOUT</span>
  </section>
</template>
