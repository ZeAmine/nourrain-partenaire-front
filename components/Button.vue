<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  text: {
    type: String,
    default: 'Button'
  }
})
</script>

<template>
  <button :type="type">{{ text }}</button>
</template>
