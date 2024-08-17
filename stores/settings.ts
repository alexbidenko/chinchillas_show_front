export const useSettingsStore = defineStore('settings', () => {
  const interfaceScaleValue = useCookie<number | null>('interface_scale', { path: '/', expires: getEternalCookieExpired() });

  const interfaceScale = computed({
    get: () => interfaceScaleValue.value || 16,
    set: (v) => {
      interfaceScaleValue.value = v;
    }
  });

  const gridCountValue = computed(() => {
    if (interfaceScale.value < 14) return 'sm';
    if (interfaceScale.value < 15) return 'md';
    if (interfaceScale.value < 20) return 'lg';
    return 'xl';
  });

  return { interfaceScale, gridCountValue };
});
