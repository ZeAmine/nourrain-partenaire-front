<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()

const { logUserOut } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive

const logout = () => {
  logUserOut()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <small>Application Partenaire</small>
      <nuxt-link href="/dashboard">Le Nourrain</nuxt-link>
      <nuxt-link v-if="!authenticated" to="/login">Se connecter</nuxt-link>
      <nuxt-link v-else @click="logout">Se deconnecter</nuxt-link>
    </div>
  </header>
</template>
