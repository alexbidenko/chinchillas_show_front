export const $request = $fetch.create({
  baseURL: 'https://api.chinchillas-show.com/api/',
  onRequest: (context) => {
    const tokenStore = useTokenStore();
    const userStore = useUserStore();

    context.options.headers = {
      ...(context.options.headers || {}),
      Authorization: tokenStore.value ? `Bearer ${tokenStore.value}` : undefined,
      'Country-Code': userStore.country || undefined,
    };
  },
});
