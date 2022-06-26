import Mutations from '~/store/mutations.type'

export default async ({ $cookies, store, route, redirect, app }) => {
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
    const response = await fetch('http://www.geoplugin.net/json.gp')
    const data = await response.json()
    $cookies.set('location', data.geoplugin_countryCode)
    location.href = route.query.path || '/'
  }
}
