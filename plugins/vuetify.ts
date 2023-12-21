import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#d79b00',
            // secondary: colors.red.lighten4, // #FFCDD2
            // accent: colors.indigo.base // #3F51B5
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
