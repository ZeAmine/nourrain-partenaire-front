import glsl from 'vite-plugin-glsl'

const plugins = [
  glsl({
    include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
    exclude: undefined,
    warnDuplicatedImports: true,
    defaultExtension: 'glsl',
    compress: true,
    watch: false,
    root: '/'
  })
]

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  // CSS configuration
  css: ['@/assets/styles/index.scss'],

  // Module configuration
  modules: ['@vite-pwa/nuxt', '@pinia/nuxt'],

  // Vite configuration
  vite: {
    plugins,
    assetsInclude: ['**/*.webp', '**/*.glb']
  }
})
