<template>
  <div class="searchPage baseContainer">
    <ChinchillaSearch :parameters="params" @change="apply" />

    <div class="searchPage__settings">
      <v-select
        v-model="gridCountValue"
        solo
        label="В ряд"
        :items="gridCountItems"
        item-title="label"
        item-value="value"
        class="searchPage__gridCount"
      />
    </div>

    <div
      class="searchPage__list baseGrid"
      :class="`gridCount__${gridCountValue}`"
    >
      <ChinchillaCard
        v-for="chinchilla in chinchillas"
        :key="chinchilla.id"
        :chinchilla="chinchilla"
      />
    </div>
    <div v-if="isLoading" class="searchPage__loaderContainer">
      <BaseSpinner />
    </div>
  </div>
</template>

<script>
import {mapStores} from "pinia";

export default {
  name: 'SearchPage',

  async setup() {
    const route = useRoute()
    const userStore = useUserStore();
    const chinchillaStore = useChinchillaStore();

    if (!chinchillaStore.chinchillas.length) {
      const params = { ...route.params, status: userStore.fullAccess ? route.params.status : 'sale' }

      await useAsyncData(async () => {
        await chinchillaStore.fetchChinchillas({
          reset: true,
          params,
        });

        return 'search-chinchillas';
      });
    }
  },

  data() {
    return {
      gridCountItems: [
        {
          label: '2 карточки',
          value: 'default',
        },
        {
          label: '4 карточки',
          value: 'more',
        },
      ],
      gridCountValue: this.$cookies.get('grid_count_value') || 'default',
      params: {
        search: '',
        sex: '',
        status: this.$route.query.status || '',
        colors: {},
      },
    }
  },

  computed: {
    ...mapStores(useUserStore, useChinchillaStore),
    chinchillas() {
      return this.chinchillaStore.chinchillas
    },
    isLoading() {
      return this.chinchillaStore.isLoading
    },
  },

  watch: {
    gridCountValue(val) {
      const date = new Date()
      date.setFullYear(date.getFullYear() + 200)
      this.$cookies.set('grid_count_value', val, { expires: date })
    },
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      if (
        window.scrollY + window.innerHeight + 500 >
        document.body.scrollHeight
      ) {
        this.chinchillaStore.fetchChinchillas({
          params: this.params,
        });
      }
    },
    apply(parameters) {
      this.dialog = false
      this.params = parameters
      this.chinchillaStore.fetchChinchillas({
        reset: true,
        params: this.params,
      });
    },
  },
}
</script>

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

  &__settings {
    & > *:first-child {
      @include mq('tablet') {
        display: none;
      }
    }
    & > *:last-child {
      display: none;

      @include mq('tablet') {
        display: block;
      }
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
