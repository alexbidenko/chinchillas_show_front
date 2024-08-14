export default defineNuxtPlugin(async ({ $cookies, ssrContext }) => {
  const userStore = useUserStore();

  if (process.server && !$cookies.get('location')) {
    if (process.env.NODE_ENV === 'development') $cookies.set('location', 'RU')
    else {
      const ip = getRequestIP(ssrContext.event, { xForwardedFor: true });
      const data = await $request(
        `https://ip-info.admire.social/api/location/${ip}`
      )
      $cookies.set('location', data.code)
    }
  }

  userStore.country = $cookies.get('location');
});
