// https://nuxt.com/docs/api/configuration/nuxt-config
import type {Manifest} from "vite";

export default defineNuxtConfig({
  modules: [
    "vuetify-nuxt-module",
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-security',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
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
      ],
    },
  },
  hooks: {
    'build:manifest': (manifest: Manifest) => {
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
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Chinchillas Show',
      short_name: 'Chinchillas Show',
      lang: 'ru',
      description: "Международный сервис для регистрации шиншилл на выставках, ведения генетической базы и продажи/покупки шиншилл",
      theme_color: '#d79b00',
      background_color: '#fff',
      start_url: '/profile',
      display: 'standalone',
      prefer_related_applications: false,
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: false,
      navigateFallback: null,
      globPatterns: [],
    },
    client: { installPrompt: true },
    devOptions: {
      enabled: false,
      type: 'module',
    },
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
      icons: {
        defaultSet: 'md',
        sets: ['md']
      },
    },
  },
  security: {
    rateLimiter: false,
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", "data:", 'https://api.chinchillas-show.com'],
      },
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
