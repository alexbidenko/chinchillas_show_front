const PER_PAGE_COUNT = 40;

export const useChinchillaStore = defineStore('chinchilla', () => {
  const userStore = useUserStore();

  const chinchillas = ref([]);
  const isLoading = ref(false);
  const isFinish = ref(false);
  const offset = ref(0);

  const fetchChinchillas = async ({ reset, params }) => {
    if (reset) isFinish.value = false;
    if (isLoading.value || isFinish.value) return

    isLoading.value = true;

    const {data} = await $request('chinchilla/search', {
      params: {
        name: params.search || undefined,
        sex: params.sex || undefined,
        status: userStore.fullAccess ? params.status || undefined : 'sale',
        offset: reset ? 0 : offset.value,
        limit: PER_PAGE_COUNT,

        ...(params.colors
          ? {
            color_operation: 'and',
            colors: encodeURIComponent(
              Object.entries(params.colors)
                .map(([key, value]) => `${key}:${value}`)
                .join(',')
            ),
          }
          : {}),
      }
    });

    chinchillas.value = [...(!reset ? chinchillas.value : []), ...data];
    isLoading.value = false;
    isFinish.value = !data.length;
    offset.value = (reset ? 0 : offset.value) + PER_PAGE_COUNT;
  };

  const setChinchillas = (data) => {
    chinchillas.value = data.chinchillas ?? chinchillas.value;
    isLoading.value = data.isLoading ?? isLoading.value;
    isFinish.value = data.isFinish ?? isFinish.value;
    offset.value = data.offset ?? offset.value;
  };

  return {
    chinchillas,
    isLoading,
    isFinish,
    offset,

    fetchChinchillas,
    setChinchillas,
  };
});
