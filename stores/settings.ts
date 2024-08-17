export const useSettingsStore = defineStore('settings', () => {
  const interfaceScaleValue = useCookie<number | null>('interface_scale', { path: '/', expires: getEternalCookieExpired() });

  const interfaceScale = computed({
    get: () => interfaceScaleValue.value || 16,
    set: (v) => {
      interfaceScaleValue.value = v;
    }
  });

  const gridCountValue = computed(() => interfaceScale.value < 16 ? 'more' : 'default');

  return { interfaceScale, gridCountValue };
});
