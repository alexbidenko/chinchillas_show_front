import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: [
    // '@nuxtjs/pwa',
    // '@nuxtjs/style-resources',
    // 'cookie-universal-nuxt',
    // [
    //   'nuxt-compress',
    //   {
    //     gzip: {
    //       cache: true,
    //     },
    //     brotli: {
    //       threshold: 10240,
    //     },
    //   },
    // ],
    '@nuxt/image',
    // '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module',
    // '@nuxtjs/vuetify',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  runtimeConfig: {
    public: {
      // baseApi: process.env.BASE_API || 'http://localhost:8000/api/',
      baseApi: process.env.BASE_API || 'https://api.chinchillas-show.com/api/',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'Chinchillas Show',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Noto+Sans&family=Roboto&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
        },
      ],
    },
  },
  css: [
    '~/assets/styles/styles.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@import "@/assets/styles/settings.scss";' },
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  plugins: [
    { src: '~/plugins/userInfo', mode: 'all' },
    { src: '~/plugins/Vuetify', mode: 'all' },
    { src: '~/plugins/axios', mode: 'all' },
    { src: '~/plugins/Vuelidate', mode: 'all' },
  ],
  nitro: {
    compressPublicAssets: true,
  },
  image: {
    domains: ['api.chinchillas-show.com'],
  },
  // serverMiddleware: [{ path: '/api', handler: '~/api/chinchillasAPI.js' }],
})
