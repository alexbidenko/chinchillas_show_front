<script setup lang="ts">
import type {ChinchillaType, ColorInfoType} from '~/types/common';

const route = useRoute();

const userStore = useUserStore();
const chinchillaStore = useChinchillaStore();

const params = ref({
  search: '',
  sex: '',
  status: (route.query.status || '') as string,
  colors: {} as ColorInfoType,
});

const chinchillas = computed<ChinchillaType[]>(() => chinchillaStore.chinchillas);
const isLoading = computed<boolean>(() => chinchillaStore.isLoading);

const onScroll = () => {
  if (window.scrollY + window.innerHeight + 500 > document.body.scrollHeight) {
    chinchillaStore.fetchChinchillas({ params: params.value });
  }
};

const apply = (parameters: typeof params.value) => {
  params.value = parameters;
  chinchillaStore.fetchChinchillas({ reset: true, params: params.value });
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);

  if (!chinchillaStore.chinchillas.length) {
    const fetchParams = { ...route.params, status: userStore.fullAccess ? (route.params.status as string) : 'sale' };

    chinchillaStore.fetchChinchillas({ reset: true, params: fetchParams });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>


<template>
  <div class="searchPage baseContainer">
    <ChinchillaSearch :parameters="params" @change="apply" />

    <AdaptiveGrid class="searchPage__list py-4">
      <ChinchillaCard
        v-for="chinchilla in chinchillas"
        :key="chinchilla.id"
        :chinchilla="chinchilla"
        with-parent
      />
    </AdaptiveGrid>
    <div v-if="isLoading" class="searchPage__loaderContainer">
      <BaseSpinner />
    </div>
  </div>
</template>

<style lang="scss">
.searchPage {
  padding-top: 40px;
  padding-bottom: 40px;

  &__list {
    flex: 1;
  }

  &__title {
    @include buttonReset;
    font-size: 24px;
  }

  &__loaderContainer {
    height: 160px;
    padding: 58px 58px 18px;
    display: flex;
    justify-content: center;

    .baseSpinner {
      height: 44px;
      width: 44px;
    }
  }

  & &__gridCount {
    display: none;
    max-width: 160px;
    margin-left: auto;

    @include mq('tablet-small') {
      display: block;
    }
  }
}
</style>
