<script lang="ts" setup>
import type {ChinchillaPriceType, ChinchillaType, PhotoType} from "~/types/common";

const CURRENCIES = {
  RUB: '₽',
  EUR: '€',
}

const userStore = useUserStore();
const route = useRoute()
const router = useRouter()

const { data, error } = await useAsyncData<ChinchillaType>(() => $request(`chinchilla/details/${route.params.id}`), { default: () => ({} as ChinchillaType) });

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Запрашиваемая шиншилла не найдена',
  })
}

const isOpenPhotos = ref(false);
const photosHeight = ref(500);
const activePhoto = ref(0);
const photosDialog = ref();
const photosHeader = ref();

const isPrinting = computed(() => (
  data.value.owner_id === userStore.userId ||
  data.value.breeder_id === userStore.userId
));
const colorString = computed(() => colorToString(data.value.color));
const birthdayDate = computed(() => dateFormat(data.value.birthday, 'yyyy.MM.dd'));
const dateDifference = computed(() => getDateDifference(data.value.birthday));
const activeStatus = computed(() => {
  const status = {
    ...(data.value.statuses[0] || {}),
    prices: [] as ChinchillaPriceType[],
  }
  if (
    data.value.price_rub &&
    data.value.price_rub.status_id === status.id &&
    (data.value.owner_id === userStore.userId || userStore.fullAccess)
  )
    status.prices.push(data.value.price_rub)
  if (
    data.value.price_eur &&
    data.value.price_eur.status_id === status.id &&
    (data.value.owner_id === userStore.userId || !userStore.fullAccess)
  )
    status.prices.push(data.value.price_eur)
  return status;
});

const updateUser = async () => {
  data.value = await $request(
    `chinchilla/details/${route.params.id}`
  )
}

const uploadPhotos = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const requests = [...files].map(async (file) => {
    const resizedFile = await resizeImage(file)
    const formData = new FormData()
    formData.append('photo', resizedFile)
    return $request<PhotoType>(`/photo/chinchilla/${data.value.id}`, {
      method: 'post',
      body: formData,
    })
  })

  Promise.allSettled(requests).then((response) => {
    data.value.photos = data.value.photos.concat(
      response.filter((el) => el.status === 'fulfilled').map((el) => el.value)
    )
  })
}

const deletePhoto = (photoId: number) => {
  $request(`/photo/chinchilla/${photoId}`, { method: 'delete' }).then(() => {
    data.value.photos = data.value.photos.filter((el) => el.id !== photoId)
  })
}

const photoToAvatar = (photoId: number) => {
  $request(`/chinchilla/update/${data.value.id}`, {
    method: 'put',
    body: {
      avatar_id: photoId,
    },
  })
    .then(() => {
      data.value.avatar = data.value.photos.find((el) => el.id === photoId)
    })
}

const updatePhotosHeight = () => {
  if (photosDialog.value && photosHeader.value)
    photosHeight.value =
      photosDialog.value.$el.clientHeight -
      photosHeader.value.$el.clientHeight
}

const toggleHideChinchilla = () => {
  $request(`admin/chinchilla/${data.value.id}/hidden`, {
    method: 'put',
    body: {
      hidden: !data.value.hidden,
    },
  })
    .then(() => {
      data.value.hidden = !data.value.hidden
    })
}

const deleteChinchilla = () => {
  if (
    confirm(`Вы уверены что хотите удалить шиншиллу ${data.value.name}?`)
  ) {
    $request(`admin/chinchilla/${data.value.id}`, { method: 'delete' }).then(() => {
      router.back()
    })
  }
};

const openDocument = () => {
  window.open('https://docs.google.com/document/d/1s_YV9SWVg0_kL2nLJPPbt_ZUHYN7pd0qDghlMcpMrYY/edit', '_blank');
};

watch(isOpenPhotos, () => {
  setTimeout(updatePhotosHeight, 100)
});

if (
  !(
    userStore.fullAccess ||
    data.value.owner_id === userStore.userId ||
    data.value.children.some((el) => el.owner_id === userStore.userId) ||
    data.value.statuses.some((el) => el.name === 'sale')
  )
) {
  await navigateTo('/profile')
}

onMounted(() => {
  window.addEventListener('resize', updatePhotosHeight)
  updatePhotosHeight()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePhotosHeight)
})
</script>

<template>
  <div class="viewPage">
    <template v-if="data">
      <ChinchillaHeader
        :chinchilla="data"
        @update-statuses="data.statuses = $event"
        @update-conclusion="data.conclusion = $event"
        @update-owner="updateUser"
      />
      <div class="baseContainer viewPage__photos pb-6">
        <v-card v-if="userStore.userId === data.owner_id" title="Действия" class="mb-8">
          <v-card-text>
            <div class="mb-3">
              <v-btn :to="`/profile/chinchillas/${data.id}/color`" nuxt variant="tonal">
                Редактировать окрас
              </v-btn>
            </div>
            <div>
              <v-btn :to="`/profile/chinchillas/${data.id}/redact`" nuxt variant="tonal">
                Редактировать параметры
              </v-btn>
            </div>
            <v-menu v-if="userStore.isModerator">
              <template v-slot:activator="{ props }">
                <v-btn variant="tonal" class="mt-3" v-bind="props">
                  Действия модератора
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="toggleHideChinchilla">
                  <v-list-item-title>{{ data.hidden ? 'Показать' : 'Скрыть' }} шиншиллу</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteChinchilla">
                  <v-list-item-title>Удалить шиншиллу</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openDocument">
                  <v-list-item-title>Умная родословная</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-card>
        <v-card
          v-if="activeStatus.name === 'sale' && data.price_rub"
          title="Шиншилла на продажу"
          class="mb-8"
        >
          <v-card-text class="pb-0">
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
        <v-card title="Информация шиншиллы" class="mb-8">
          <v-card-text class="pb-0">
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
            :user-id="userStore.userId"
            :chinchilla="data"
            :photo="photo"
            @to-avatar="photoToAvatar"
            @delete="deletePhoto"
            @click="
              isOpenPhotos = true;
              activePhoto = index;
            "
          />
          <label v-if="userStore.userId === data.owner_id" class="viewPage__uploadPhoto">
            <v-icon size="40px" color="white">add</v-icon>
            <input
              type="file"
              multiple
              accept="image/*"
              @change="uploadPhotos"
            >
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

      <v-dialog
        v-model="isOpenPhotos"
        fullscreen
        hide-overlay
        :scrollable="false"
      >
        <v-card ref="photosDialog">
          <v-toolbar ref="photosHeader" dark color="primary">
            <v-spacer />
            <v-btn icon="close" dark @click="isOpenPhotos = false" />
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
