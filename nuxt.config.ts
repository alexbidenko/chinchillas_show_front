// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "vuetify-nuxt-module",
    '@pinia/nuxt',
    '@nuxt/image',
  ],
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {additionalData: '@import "@/assets/styles/settings.scss";'},
      },
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.css',
  ],
  image: {
    domains: ['api.chinchillas-show.com'],
  },
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#d79b00',
            },
          },
        },
      },
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
