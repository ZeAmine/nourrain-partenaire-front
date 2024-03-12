import { defineStore } from 'pinia'

interface IBody {
  name?: string
  prenom?: string
  adresse?: string
  telephone?: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false
  }),
  actions: {
    async authenticateUser(url: string, body: IBody) {
      const { name, prenom, telephone, email, password } = body

      const { data, pending }: any = await useFetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name,
          prenom,
          telephone,
          email,
          password
        }
      })

      this.loading = pending

      if (data.value) {
        const token = useCookie('token')
        token.value = data?.value?.token
        this.authenticated = data?.value?.isAuth
      }
    },
    logUserOut() {
      const token = useCookie('token')
      token.value = null
      this.authenticated = false
    }
  }
})
