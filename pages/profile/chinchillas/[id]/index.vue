<script>
import {mapStores} from "pinia";

const CURRENCIES = {
  RUB: '₽',
  EUR: '€',
}

export default {
  async setup() {
    const route = useRoute()
    const handleError = useError()

    try {
      const data = await $request(`chinchilla/details/${route.params.id}`)
      return { data }
    } catch (err) {
      handleError({
        statusCode: 404,
        message: 'Запрашиваемая шиншилла не найдена',
      })
    }
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
    isPrinting() {
      return (
        this.data.owner_id === +this.$cookies.get('USER_ID') ||
        this.data.breeder_id === +this.$cookies.get('USER_ID')
      )
    },
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
      return dateDifference(this.data.birthday)
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

  watch: {
    isOpenPhotos() {
      setTimeout(this.updatePhotosHeight, 100)
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

  mounted() {
    window.addEventListener('resize', this.updatePhotosHeight)
    this.updatePhotosHeight()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updatePhotosHeight)
  },

  methods: {
    async updateUser() {
      this.data = await $request(
        `chinchilla/details/${this.$route.params.id}`
      )
    },
    uploadPhotos(event) {
      const requests = [...event.target.files].map(async (file) => {
        const resizedFile = await resizeImage(file)
        const formData = new FormData()
        formData.append('photo', resizedFile)
        return $request(`/photo/chinchilla/${this.data.id}`, {
          method: 'post',
          body: formData,
        })
      })
      Promise.allSettled(requests).then((data) => {
        this.data.photos = this.data.photos.concat(
          data.filter((el) => el.value).map((el) => el.value)
        )
      })
    },
    deletePhoto(photoId) {
      $request(`/photo/chinchilla/${photoId}`, { method: 'delete' }).then(() => {
        this.data.photos = this.data.photos.filter((el) => el.id !== photoId)
      })
    },
    photoToAvatar(photoId) {
      $request(`/chinchilla/update/${this.data.id}`, {
        method: 'put',
        body: {
          avatar_id: photoId,
        },
      })
        .then(() => {
          this.data.avatar = this.data.photos.find((el) => el.id === photoId)
        })
    },
    updatePhotosHeight() {
      if (this.$refs.photosDialog && this.$refs.photosHeader)
        this.photosHeight =
          this.$refs.photosDialog.$el.clientHeight -
          this.$refs.photosHeader.$el.clientHeight
    },
    toggleHideChinchilla() {
      $request(`admin/chinchilla/${this.data.id}/hidden`, {
        method: 'put',
        body: {
          hidden: !this.data.hidden,
        },
      })
        .then(() => {
          this.data.hidden = !this.data.hidden
        })
    },
    deleteChinchilla() {
      if (
        confirm(`Вы уверены что хотите удалить шиншиллу ${this.data.name}?`)
      ) {
        $request(`admin/chinchilla/${this.data.id}`, { method: 'delete' }).then(() => {
          this.$router.back()
        })
      }
    },
  },
}
</script>

<template>
  <div class="viewPage">
    <template v-if="data">
      <ChinchillaHeader
        :chinchilla="data"
        @updateStatuses="data.statuses = $event"
        @updateConclusion="data.conclusion = $event"
        @updateOwner="updateUser"
      />
      <div class="baseContainer viewPage__photos pb-6">
        <v-card
          v-if="userStore.isModerator"
          class="mb-8"
        >
          <v-card-text>
            <div class="display-1 text--primary mb-4">Панель модератора</div>
            <div class="mb-4">
              <v-btn @click="toggleHideChinchilla"
                >{{ data.hidden ? 'Показать' : 'Скрыть' }} шиншиллу</v-btn
              >
            </div>
            <div class="mb-4">
              <v-btn @click="deleteChinchilla">Удалить шиншиллу</v-btn>
            </div>
            <div>
              <a
                href="https://docs.google.com/document/d/1s_YV9SWVg0_kL2nLJPPbt_ZUHYN7pd0qDghlMcpMrYY/edit"
                target="_blank"
                rel="noopener"
                style="text-decoration: none"
              >
                <v-btn>Умная родословная</v-btn>
              </a>
            </div>
          </v-card-text>
        </v-card>
        <v-card
          v-if="activeStatus.name === 'sale' && data.price_rub"
          class="mb-8"
        >
          <v-card-text class="pb-0">
            <div class="display-1 text--primary mb-4">Шиншилла на продажу</div>
            <p class="pb-4 mb-0">
              Цена шиншиллы:
              {{
                activeStatus.prices
                  .filter((el) => el.currency === 'RUB')
                  .map((el) => `${CURRENCIES[el.currency]}${el.value}`)
                  .join(', ')
              }}
            </p>
          </v-card-text>
        </v-card>
        <v-card class="mb-8">
          <v-card-text class="pb-0">
            <div class="display-1 text--primary mb-4">Информация шиншиллы</div>
            <p class="pb-4 mb-0">Идентификатор: {{ data.id }}</p>
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
            <p class="pb-4 mb-0">Возраст: {{ dateDifference }}</p>
            <p class="pb-4 mb-0 viewPage--phoneOnly">
              Окрас: {{ colorString }}
            </p>
            <p v-if="data.weight" class="pb-4 mb-0">
              Вес при рождении: {{ data.weight }} г.
            </p>
            <p v-if="data.brothers" class="pb-4 mb-0">
              Щенков в помете: {{ data.brothers }}
            </p>
            <p v-if="data.description" class="pb-4 mb-0">
              Комментарий: {{ data.description }}
            </p>
          </v-card-text>
        </v-card>
        <div class="baseGrid">
          <ChinchillaPhoto
            v-for="(photo, index) in data.photos"
            :key="photo.id"
            :user-id="userId"
            :chinchilla="data"
            :photo="photo"
            @toAvatar="photoToAvatar"
            @delete="deletePhoto"
            @click="
              isOpenPhotos = true;
              activePhoto = index;
            "
          />
          <label v-if="userId === data.owner_id" class="viewPage__uploadPhoto">
            <v-icon size="40px" color="white">add</v-icon>
            <input
              type="file"
              multiple
              accept="image/*"
              @change="uploadPhotos"
            />
          </label>
        </div>
      </div>
      <div v-if="isPrinting" class="my-4">
        <a
          :href="`/profile/chinchillas/${data.id}/print`"
          target="_blank"
          rel="noopener"
          style="text-decoration: none"
        >
          <v-btn>Открыть родословную</v-btn>
        </a>
      </div>
      <div style="overflow-x: auto">
        <ClientOnly>
          <PedigreeTree :chinchilla="data" />
        </ClientOnly>
      </div>
      <CardSection
        v-if="data.children.length"
        title="Дети"
        section-key="children"
        :items="data.children"
      />
      <CardSection
        v-if="data.relatives && data.relatives.length"
        title="Браться и сестры"
        section-key="relatives"
        :items="data.relatives"
      />

      <v-speed-dial
        v-if="userId === data.owner_id"
        v-model="fab"
        location="top right"
      >
        <template #activator="{ props }">
          <v-fab
            color="primary"
            dark
            position="fixed"
            location="bottom end"
            app
            @click="fab = !fab"
            :icon="fab ? 'close' : 'edit'"
            v-bind="props"
          />
        </template>

        <v-btn
          dark
          small
          color="primary"
          rounded
          :to="`/profile/chinchillas/${chinchillaId}/color`"
          nuxt
        >
          Редактировать окрас
        </v-btn>
        <v-btn
          dark
          small
          color="primary"
          rounded
          :to="`/profile/chinchillas/${chinchillaId}/redact`"
          nuxt
        >
          Редактировать параметры
        </v-btn>
      </v-speed-dial>

      <v-dialog
        v-model="isOpenPhotos"
        fullscreen
        hide-overlay
        :scrollable="false"
      >
        <v-card ref="photosDialog">
          <v-toolbar ref="photosHeader" dark color="primary">
            <v-spacer />
            <v-btn icon dark @click="isOpenPhotos = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-carousel v-model="activePhoto" continuous :height="photosHeight">
            <v-carousel-item
              v-for="photo in data.photos"
              :key="photo.name"
              :src="`https://api.chinchillas-show.com/photos/chinchillas/${data.owner_id}/${data.id}/${photo.name}`"
            />
          </v-carousel>
        </v-card>
      </v-dialog>
    </template>
    <BaseSpinner v-else />
  </div>
</template>

<style lang="scss">
.viewPage {
  width: 100%;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__photos {
    padding-top: 32px;
  }

  &__avatar {
    width: 200px;
  }

  &__photo {
    max-width: 100%;
    max-height: 100%;
  }

  &__uploadPhoto {
    max-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #828282;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;

    & input {
      display: none;
    }

    &:hover {
      box-shadow: none;
    }

    &::before {
      content: '';
      padding-bottom: 100%;
      display: inline-block;
      vertical-align: top;
    }
  }

  & .v-speed-dial__list {
    align-items: flex-end;
  }

  &--phoneOnly {
    display: none;

    @include mq('desktop-small') {
      display: block;
    }
  }
}
</style>
