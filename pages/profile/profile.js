import ProfilePage from '~/components/ProfilePage/ProfilePage.vue'

export default {
  components: {
    ProfilePage,
  },

  layout: 'profileLayout',

  middleware: 'auth',

  async asyncData({ params, $axios, $cookies }) {
    const userId = +params.id || +$cookies.get('USER_ID')
    const data = await Promise.all([
      $axios.$get(`user/details/${userId}`),
      $axios.$get(`chinchilla/get/${userId}`),
      $axios.$get(`chinchilla/sold/${userId}`),
    ])
    const user = data[0]
    const soldChinchillas = data[2]
    const chinchillas = data[1].reduce((arr, el) => {
      if (data[2].some((f) => f.id === el.id)) return arr
      if (!el.status || el.status.name === 'breeding')
        arr[el.sex] = [el, ...(arr[el.sex] || [])]
      else arr[el.status.name] = [el, ...(arr[el.status.name] || [])]
      return arr
    }, {})
    return { userId, user, soldChinchillas, chinchillas }
  },
}
