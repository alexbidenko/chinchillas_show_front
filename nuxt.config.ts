// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "vuetify-nuxt-module",
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-security',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
  hooks: {
    'build:manifest': (manifest: any) => {
      for (const key in manifest) {
        manifest[key].assets = manifest[key].assets?.filter(
          (asset: string) => !/(.+).(webp|png|jpe?g|svg)$/.test(asset),
        );
      }
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {additionalData: '@import "@/assets/styles/settings.scss";'},
      },
    },
  },
  image: {
    domains: ['api.chinchillas-show.com'],
  },
  vuetify: {
    vuetifyOptions: {
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
  security: {
    rateLimiter: false,
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
