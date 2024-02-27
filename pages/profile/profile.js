import ProfilePage from '~/components/ProfilePage/ProfilePage.vue'

export default {
  components: {
    ProfilePage,
  },

  layout: 'profileLayout',

  middleware: 'auth',

  async asyncData({ params }) {
    const userId = +params.id || +useCookie('USER_ID').value
    const data = await Promise.all([
      $request.$get(`user/details/${userId}`),
      $request.$get(`chinchilla/get/${userId}`),
      $request.$get(`chinchilla/sold/${userId}`),
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
