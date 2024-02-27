import Mutations from '~/store/mutations.type'

export default defineNuxtPlugin(async ({ $store, store, route, redirect }) => {
  const location = useCookie('location');
  console.log($store, route, redirect);

  if (process.server) {
    if (!location.value && route.path !== '/loading') {
      redirect(302, `/loading?path=${encodeURIComponent(route.path)}`)
    } else if (location.value) {
      store.commit(
        'UserModule/' + Mutations.SET_COUNTRY,
        location.value
      )
    }
  } else if (route.path === '/loading') {
    const response = await fetch('https://ipinfo.io/json')
    const data = await response.json()
    location.value = data.country
    window.location.href = route.query.path || '/'
  }
});
