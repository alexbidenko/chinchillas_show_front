export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp();
  const userStore = useUserStore();

  if (!app.$cookies.get('TOKEN') || !app.$cookies.get('USER_ID')) {
    return navigateTo('/auth')
  }

  const check = async (user) => {
    if (!user) {
      app.$cookies.remove('TOKEN')
      app.$cookies.remove('USER_ID')
      userStore.logout();
      return navigateTo('/auth')
    } else if (to.path.startsWith('/profile') && !user.admitted)
      return navigateTo('/await')
    else if (
      to.path.startsWith('/admin') &&
      !(user && ['admin', 'moderator'].includes(user.type))
    )
      return navigateTo('/')
  }

  if (!userStore.user) {
    return userStore.checkUser().catch(() => check());
  } else return check(userStore.user)
});
