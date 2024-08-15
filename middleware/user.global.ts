export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();

  if (userStore.token && !userStore.authorized) {
    await userStore.checkUser().catch(() => userStore.logout())
  }
});
