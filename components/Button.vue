<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  }
})
</script>

<template>
  <button :type="type">
    <slot />
  </button>
</template>
