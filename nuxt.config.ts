import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  bridge: {
    nitro: false,
  },
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
  loading: { color: '#fff' },
  css: [
    '~/assets/styles/styles.scss',
    'node_modules/material-design-icons-iconfont/dist/material-design-icons.css',
  ],
  // @ts-ignore
  styleResources: {
    scss: './assets/styles/settings.scss',
  },
  plugins: [
    { src: '~/plugins/userInfo', mode: 'all' },
    { src: '~/plugins/Vuebar', mode: 'all' },
    { src: '~/plugins/Vuetify', mode: 'all' },
    { src: '~/plugins/axios', mode: 'all' },
    { src: '~/plugins/Vuelidate', mode: 'all' },
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  axios: {
    // baseURL: process.env.BASE_API || 'http://localhost:8000/api/',
    baseURL: process.env.BASE_API || 'https://api.chinchillas-show.com/api/',
  },
  image: {
    domains: ['api.chinchillas-show.com'],
  },
  serverMiddleware: [{ path: '/api', handler: '~/api/chinchillasAPI.js' }],
  server: {
    host: '0.0.0.0',
  },
})
