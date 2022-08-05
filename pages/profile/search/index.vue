<template>
  <div class="searchPage baseContainer">
    <label class="searchPage__searchContainer">
      <v-icon color="white">search</v-icon>
      <input
        v-model="search"
        class="searchPage__search"
        placeholder="Поиск шиншиллы"
      />
      <span class="searchPage__settings">
        <v-btn icon @click="dialog = true">
          <v-icon color="white">settings</v-icon>
        </v-btn>
        <v-fab-transition>
          <v-btn
            color="primary"
            dark
            fixed
            bottom
            right
            fab
            @click="dialog = true"
          >
            <v-icon>settings</v-icon>
          </v-btn>
        </v-fab-transition>
      </span>
    </label>

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

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline lighten-2">
          Параметры поиска
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="models.sex"
            :items="sexItems"
            label="Пол"
            item-text="label"
            item-value="value"
          />
          <v-select
            v-if="isRussian"
            v-model="models.status"
            :items="statuses"
            label="Статус"
            item-text="label"
            item-value="key"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Закрыть </v-btn>
          <v-btn color="primary" text @click="apply"> Применить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import statuses from '~/assets/datas/statuses.json'
import ChinchillaCard from '~/components/ChinchillaCard/ChinchillaCard.vue'
import BaseSpinner from '~/components/BaseSpinner/BaseSpinner.vue'
import Actions from '~/store/actions.type'

export default {
  name: 'SearchPage',

  components: {
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
    return {
      timer: 0,
      search: '',
      dialog: false,
      sexItems: [
        {
          label: 'Любой',
          value: '',
        },
        {
          label: 'Самка',
          value: 'f',
        },
        {
          label: 'Самец',
          value: 'm',
        },
      ],
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
      statuses: [
        {
          key: '',
          label: 'Любой',
        },
      ].concat(statuses),
      models: {
        sex: '',
        status: this.$route.query.status || '',
      },
      params: {
        sex: '',
        status: this.$route.query.status || '',
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
    search() {
      clearTimeout(this.timer)
      setTimeout(() => {
        this.$store.dispatch('ChinchillaModule/' + Actions.FETCH_CHINCHILLAS, {
          reset: true,
          isRussian: this.isRussian,
          search: this.search,
          params: this.params,
        })
      }, 1000)
    },
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
          search: this.search,
          params: this.params,
        })
      }
    },
    apply() {
      this.dialog = false
      this.params = this.models
      this.$store.dispatch('ChinchillaModule/' + Actions.FETCH_CHINCHILLAS, {
        reset: true,
        isRussian: this.isRussian,
        search: this.search,
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

  &__searchContainer {
    background-color: #c5c5c5;
    border-radius: 22px;
    height: 44px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    padding: 4px 16px;
  }

  &__search {
    margin-left: 16px;
    margin-right: 16px;
    color: white;
    flex: 1;
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
