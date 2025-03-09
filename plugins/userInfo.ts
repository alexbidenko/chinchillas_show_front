import { getRequestIP } from 'h3';

export default defineNuxtPlugin(async ({ ssrContext }) => {
  const userStore = useUserStore();
  const location = useCookie<string>('location', { path: '/' });

  if (ssrContext && !location.value) {
    if (process.env.NODE_ENV === 'development') location.value = 'RU';
    else {
      const ip = getRequestIP(ssrContext.event, { xForwardedFor: true });
      const data = await $request<{ code: string }>(
        `https://ip-info.asmy.pro/api/location/${ip}`
      )
      location.value = data.code;
    }
  }

  userStore.country = location.value;
});
