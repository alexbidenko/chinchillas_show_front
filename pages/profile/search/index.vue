<template>
  <div class="searchPage baseContainer">
    <ChinchillaSearch :parameters="params" @change="apply" />

    <div class="searchPage__settings">
      <v-select
        v-model="gridCountValue"
        solo
        label="В ряд"
        :items="gridCountItems"
        item-text="label"
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
import ChinchillaCard from '~/components/ChinchillaCard/ChinchillaCard.vue'
import BaseSpinner from '~/components/BaseSpinner/BaseSpinner.vue'
import Actions from '~/store/actions.type'
import ChinchillaSearch from '~/components/ChinchillaSearch/ChinchillaSearch.vue'

export default {
  name: 'SearchPage',

  components: {
    ChinchillaSearch,
    BaseSpinner,
    ChinchillaCard,
  },

  layout: 'profileLayout',

  async asyncData({
    params,
    app: {
      store: { state, dispatch },
    },
  }) {
    if (!state.ChinchillaModule.chinchillas.length) {
      const isRussian = state.UserModule.country === 'RU'
      params.status = isRussian ? params.status : 'sale'
      await dispatch('ChinchillaModule/' + Actions.FETCH_CHINCHILLAS, {
        reset: true,
        isRussian,
        params,
      })
    }
  },

  data() {
    const gridCountValue = useCookie('grid_count_value');

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
      gridCountValue: gridCountValue.value || 'default',
      params: {
        search: '',
        sex: '',
        status: this.$route.query.status || '',
        colors: {},
      },
    }
  },

  computed: {
    isRussian() {
      return this.$store.state.UserModule.country === 'RU'
    },
    chinchillas() {
      return this.$store.state.ChinchillaModule.chinchillas
    },
    isLoading() {
      return this.$store.state.ChinchillaModule.isLoading
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

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      if (
        window.scrollY + window.innerHeight + 500 >
        document.body.scrollHeight
      ) {
        this.$store.dispatch('ChinchillaModule/' + Actions.FETCH_CHINCHILLAS, {
          isRussian: this.isRussian,
          params: this.params,
        })
      }
    },
    apply(parameters) {
      this.dialog = false
      this.params = parameters
      this.$store.dispatch('ChinchillaModule/' + Actions.FETCH_CHINCHILLAS, {
        reset: true,
        isRussian: this.isRussian,
        params: this.params,
      })
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
