import { getClientIp } from 'request-ip'
import Mutations from '~/store/mutations.type'

export default async ({ $cookies, $axios, store, req }) => {
  if (process.server && !$cookies.get('location')) {
    if (process.env.NODE_ENV === 'development') $cookies.set('location', 'RU')
    else {
      const ip = getClientIp(req)
      const data = await $axios.$get(
        `https://ip-info.admire.social/api/location/${ip}`
      )
      $cookies.set('location', data.code)
    }
  }

  store.commit('UserModule/' + Mutations.SET_COUNTRY, $cookies.get('location'))
}
