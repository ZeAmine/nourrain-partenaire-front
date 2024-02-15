<template>
  <div
    :class="[
      'toaster-container',
      { valid: name === 'valid' },
      { caution: name === 'caution' },
      { error: name === 'error' },
      { clue: name === 'clue' }
    ]"
  >
    <img class="svg" :src="iconUrl" :alt="iconAlt" />
    <p>
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name?: keyof typeof toasterIcon
}

const props = withDefaults(defineProps<Props>(), {
  name: 'valid'
})

const iconPath = '/icons'

const toasterIcon = {
  valid: {
    url: iconPath + '/check.svg',
    alt: 'icons check icon'
  },
  caution: {
    url: iconPath + '/attention.svg',
    alt: 'warning icon'
  },
  error: {
    url: iconPath + '/cross.svg',
    alt: 'cross icon'
  },
  clue: {
    url: iconPath + '/clue.svg',
    alt: 'clue icon'
  }
}
const iconUrl = `${toasterIcon[props.name].url}`
const iconAlt = `${toasterIcon[props.name].alt}`
</script>
