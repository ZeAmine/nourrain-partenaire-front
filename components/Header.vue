<script setup lang="ts">
import useAuth from '@/composables/useAuth'

const { isAuth, setIsAuth } = useAuth()

let navText = computed(() => (isAuth.value ? 'Se déconnecter' : 'Se connecter'))

watchEffect(() => {
  console.log('isAuth changed', isAuth.value)

  if (isAuth.value) {
    navText.value = 'Se déconnecter'
    const nav = document.querySelector('.header span')

    nav?.addEventListener('click', () => {
      document.cookie = 'token='
      setIsAuth(false)
    })
  }
})
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <small>Application Partenaire</small>
      <nuxt-link href="/">Le Nourrain</nuxt-link>
      <a href="/login">{{ navText }}</a>
    </div>
  </header>
</template>
