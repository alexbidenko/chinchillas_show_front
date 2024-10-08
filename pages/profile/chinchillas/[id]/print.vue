<template>
  <div class="viewPage">
    <template v-if="data">
      <div class="baseContainer viewPage__photos">
        <v-card title="Родословная шиншиллы">
          <v-card-text class="pb-0">
            <div class="viewPage__infoGrid">
              <p class="pb-4 mb-0">Идентификатор: {{ data.id }}</p>
              <p class="pb-4 mb-0">Имя: {{ data.name }}</p>
              <p v-if="data.breeder" class="pb-4 mb-0">
                Заводчик:
                {{
                  `${data.breeder.first_name} ${data.breeder.last_name} (${data.breeder.login})`
                }}
              </p>
              <p v-else-if="data.breeder_name">
                Заводчик: {{ data.breeder_name }}
              </p>
              <p class="pb-4 mb-0">
                Пол: {{ data.sex === 'f' ? 'самка' : 'самец' }}
              </p>
              <p class="pb-4 mb-0">Дата рождения: {{ birthdayDate }}</p>
              <p class="pb-4 mb-0">Окрас: {{ colorString }}</p>
              <p v-if="data.weight" class="pb-4 mb-0">
                Вес при рождении: {{ data.weight }} г.
              </p>
              <p v-if="data.brothers" class="pb-4 mb-0">
                Щенков в помете: {{ data.brothers }}
              </p>
              <p v-if="data.description" class="pb-4 mb-0">
                Комментарий: {{ data.description }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="viewPage__tree">
        <ClientOnly>
          <PedigreeTree :chinchilla="data" for-print style="padding-bottom: 0" />
        </ClientOnly>
      </div>
      <div class="baseContainer viewPage__photos">
        <v-card class="mb-8">
          <v-card-text>
            <p class="py-4">Подпись: ___________________________</p>
            <p class="py-4 mb-0">Печать: ___________________________</p>
          </v-card-text>
        </v-card>
      </div>
    </template>
    <BaseSpinner v-else />
  </div>
</template>

<script>
import {mapStores} from "pinia";

const CURRENCIES = {
  RUB: '₽',
  EUR: '€',
}

export default {
  async setup() {
    const route = useRoute()
    const data = await $request(`chinchilla/details/${route.params.id}`)
    return { data }
  },

  data() {
    return {
      chinchillaId: +this.$route.params.id,
      userId: +this.$cookies.get('USER_ID'),
      isOpenPhotos: false,
      photosHeight: 500,
      activePhoto: 0,
      fab: false,
      CURRENCIES,
    }
  },

  computed: {
    ...mapStores(useUserStore),
    user() {
      return this.userStore.user
    },
    colorString() {
      return this.data ? colorToString(this.data.color) : ''
    },
    birthdayDate() {
      return dateFormat(this.data.birthday, 'yyyy.MM.dd')
    },
    dateDifference() {
      return getDateDifference(this.data.birthday)
    },
    activeStatus() {
      const status = {
        ...(this.data.statuses[0] || {}),
        prices: [],
      }
      if (
        this.data.price_rub &&
        this.data.price_rub.status_id === status.id &&
        (this.data.owner_id === this.userId || this.userStore.fullAccess)
      )
        status.prices.push(this.data.price_rub)
      if (
        this.data.price_eur &&
        this.data.price_eur.status_id === status.id &&
        (this.data.owner_id === this.userId || !this.userStore.fullAccess)
      )
        status.prices.push(this.data.price_eur)
      return status
    },
  },

  created() {
    if (
      !(
        this.userStore.fullAccess ||
        this.data.owner_id === this.userId ||
        this.data.children.some((el) => el.owner_id === this.userId) ||
        this.data.statuses.some((el) => el.name === 'sale')
      )
    ) {
      this.$router.push('/profile')
    }
  },
}
</script>

<style lang="scss">
.viewPage {
  width: 100%;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__infoGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
  }

  &__photo {
    max-width: 100%;
    max-height: 100%;
  }

  & .v-speed-dial__list {
    align-items: flex-end;
  }

  &__tree {
    overflow-x: auto;
    transform: scale(1.2);
    transform-origin: 50% 50%;
    margin: 40px 0;
  }
}
</style>
