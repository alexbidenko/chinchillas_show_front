import Mutations from '~/store/mutations.type'

export default async ({ $cookies, $axios, store, route, redirect }) => {
  if (process.server) {
    if (!$cookies.get('location') && route.path !== '/loading') {
      redirect(302, `/loading?path=${encodeURIComponent(route.path)}`)
    } else if ($cookies.get('location')) {
      store.commit(
        'UserModule/' + Mutations.SET_COUNTRY,
        $cookies.get('location')
      )
    }
  } else if (route.path === '/loading') {
    const data = await $axios.$get('user/check')
    $cookies.set('location', data.country)
    location.href = route.query.path || '/'
  }
}
