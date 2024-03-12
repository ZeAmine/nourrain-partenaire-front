import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore())
  const token = useCookie('token')

  if (token.value) {
    authenticated.value = true
  }

  if (to?.name === 'index') {
    return navigateTo('/dashboard')
  }

  if (token.value && to?.name === 'login') {
    return navigateTo('/dashboard')
  }

  if (token.value && to?.name === 'register') {
    return navigateTo('/dashboard')
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation()
    return navigateTo('/login')
  }
})
