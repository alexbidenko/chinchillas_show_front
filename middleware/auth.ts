import type {UserType} from "~/types/common";

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();

  if (!userStore.token || !userStore.userId) {
    return navigateTo('/auth')
  }

  const check = async (user?: UserType) => {
    if (!user) {
      userStore.logout();
      return navigateTo('/auth')
    } else if (to.path.startsWith('/profile') && !user.admitted)
      return navigateTo('/await')
    else if (
      to.path.startsWith('/admin') &&
      !(user && userStore.isModerator)
    )
      return navigateTo('/')
  }

  if (!userStore.user) {
    return userStore.checkUser().catch(() => check());
  } else return check(userStore.user)
});
