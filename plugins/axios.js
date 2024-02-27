export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token');

  if (token.value) $request.setToken(token.value, 'Bearer')
  $request.setHeader('Country-Code', nuxtApp.$store.state.UserModule.country)
});
