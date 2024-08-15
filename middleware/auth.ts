export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();

  if (!userStore.user) {
    return navigateTo('/auth');
  }

  if (to.path.startsWith('/admin') && !userStore.isModerator) {
    return navigateTo('/')
  }

  if (to.path.startsWith('/profile') && !userStore.user.admitted) {
    return navigateTo('/await')
  }
});
