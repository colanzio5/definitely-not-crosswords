import { hostname } from "os";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@sidebase/core'],
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    '@huntersofbook/naive-ui-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  runtimeConfig: {
    apiSecret: 'supersecret', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      version: '0.0.1',
    }
  },
  typescript: {
    shim: false
  },
  build: {
    transpile: ['trpc-nuxt']
  },
  nitro: {
    plugins: ['~/nitro/ws']
  }
})
