const EXPIRES = (() => {
  const value = new Date();
  value.setFullYear(value.getFullYear() + 1);
  return value;
})();

export const useSettingsStore = defineStore('settings', () => {
  const interfaceScaleValue = useCookie<number | null>('interface_scale', { path: '/', expires: EXPIRES });

  const interfaceScale = computed({
    get: () => interfaceScaleValue.value || 16,
    set: (v) => {
      interfaceScaleValue.value = v;
    }
  });

  return { interfaceScale };
});
