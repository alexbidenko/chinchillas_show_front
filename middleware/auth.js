import Actions from '~/store/actions.type'

export default async ({ store, redirect, app, route }) => {
  if (!app.$cookies.get('TOKEN') || !app.$cookies.get('USER_ID')) {
    redirect('/auth')
    return
  }

  const check = (user) => {
    if (!user) {
      app.$cookies.remove('TOKEN')
      app.$cookies.remove('USER_ID')
      store.dispatch('UserModule/' + Actions.LOGOUT, check)
      redirect('/auth')
    } else if (route.path.startsWith('/profile') && user.admitted)
      redirect('/await')
    else if (
      route.path.startsWith('/admin') &&
      !(user && ['admin', 'moderator'].includes(user.type))
    )
      redirect('/')
  }

  if (!store.state.UserModule.user) {
    await store.dispatch('UserModule/' + Actions.CHECK_USER, check)
  } else check(store.state.UserModule.user)
}
