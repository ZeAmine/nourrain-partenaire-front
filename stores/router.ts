import { defineStore } from 'pinia'

interface IRouter {
  currentRoute: string
  previousRoute: string
}

export const useRouterStore = defineStore({
  id: 'router',

  state: (): IRouter => ({
    previousRoute: '', // from
    currentRoute: '' // to
  }),

  getters: {
    getPreviousRoute(): string {
      return this.previousRoute
    },
    getCurrentRoute(): string {
      return this.currentRoute
    },

  },

  actions: {
    setPreviousRoute(route: string): void {
      this.previousRoute = route
    },
    setCurrentRoute(route: string): void {
      this.currentRoute = route;
    },
  }
})
