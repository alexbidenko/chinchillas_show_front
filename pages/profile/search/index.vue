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
    <div class="searchPage__list baseGrid">
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

export default {
  name: 'SearchPage',

  components: {
    BaseSpinner,
    ChinchillaCard,
  },

  layout: 'profileLayout',

  async asyncData({ $axios, params, app }) {
    const isRussian = app.store.state.UserModule.country === 'RU'
    let url = 'chinchilla/search?'
    if (params.sex) url = `${url}sex=${params.sex}&`
    if (params.status || !isRussian)
      url = `${url}status=${isRussian ? params.status : 'sale'}&`
    const chinchillas = (await $axios.$get(url)).data
    return {
      chinchillas,
    }
  },

  data() {
    return {
      isLoading: false,
      search: '',
      timer: 0,
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
  },

  watch: {
    search() {
      this.searchData()
    },
  },

  methods: {
    async searchData(immediate) {
      clearTimeout(this.timer)
      const requestData = async () => {
        this.isLoading = true
        let url = 'chinchilla/search?'
        if (this.search) url = `${url}name=${this.search}&`
        if (this.params.sex) url = `${url}sex=${this.params.sex}&`
        if (this.params.status || !this.isRussian)
          url = `${url}status=${this.isRussian ? this.params.status : 'sale'}&`
        this.chinchillas = (await this.$axios.$get(url)).data
        this.isLoading = false
      }
      if (!immediate) this.timer = setTimeout(requestData, 1000)
      else await requestData()
    },
    apply() {
      this.dialog = false
      this.params = this.models
      this.searchData(true)
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
}
</style>
