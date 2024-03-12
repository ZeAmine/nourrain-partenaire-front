import { defineStore } from 'pinia'

interface IAuth {
  isAuth: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuth => ({
    isAuth: false
  }),

  getters: {
    getIsAuth(): boolean {
      return this.isAuth
    }
  },

  actions: {
    setIsAuth(props: boolean): void {
      this.isAuth = props
    }
  }
})
