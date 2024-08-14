export const useTokenStore = defineStore('token', () => {
  const value = useCookie('TOKEN', {
    path: '/',
  });

  return { value };
});
