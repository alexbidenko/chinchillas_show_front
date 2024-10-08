export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('cookies', {
    get: (name) => useCookie(name).value,
    set: (name, value, options) => {
      useCookie(name, { ...options, path: '/' }).value = value;
    },
    remove: (name) => {
      useCookie(name, { path: '/' }).value = null;
    },
  });
});
