export default defineNuxtConfig({
  // ssr: false,
  devtools: { enabled: true },

  // CSS configuration
  css: ['@/assets/styles/index.scss'],

  // Module configuration
  modules: ['@vite-pwa/nuxt', '@pinia/nuxt', '@nuxt/ui'],

  // Tailwind CSS configuration
  colorMode: {
    preference: 'light'
  }
})
