import { defineStore } from 'pinia'

interface IPreloader {
  isLoadingStarted: boolean
  isLoadingCompleted: boolean
}

export const usePreloaderStore = defineStore({
  id: 'preloader',

  state: (): IPreloader => ({
    isLoadingStarted: false,
    isLoadingCompleted: false
  }),

  getters: {
    getLoadingStarted(): boolean {
      return this.isLoadingStarted
    },
    getLoadingCompleted(): boolean {
      return this.isLoadingCompleted
    }
  },

  actions: {
    setLoadingStarted(): void {
      this.isLoadingStarted = true
    },
    setLoadingCompleted(): void {
      this.isLoadingCompleted = true
    }
  }
})
