import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#d79b00',
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
