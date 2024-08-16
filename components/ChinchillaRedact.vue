<template>
  <div class="chinchillaRedact baseContainer">
    <form class="chinchillaRedact__form" @submit.prevent="onSubmit">
      <div>
        <v-text-field v-model="models.name" name="name" label="Кличка" />
        Готова ли к публикации
        <v-checkbox
          v-model="models.is_ready"
          name="is_ready"
          label="Готова ли к публикации"
        />
        <div/>
        <v-menu
          v-model="datepicker"
          :close-on-content-click="false"
          :nudge-right="40"
          offset-y
          min-width="290px"
        >
          <template #activator="{ props }">
            <v-text-field
              v-model="formatBirthday"
              label="День рождения"
              prepend-icon="event"
              name="birthday"
              v-bind="props"
              @blur="saveBirthday"
            />
          </template>
          <v-date-picker v-model="birthday" @input="datepicker = false" />
        </v-menu>
        <div/>
        Пол
        <v-radio-group v-model="models.sex">
          <v-radio label="Самка" value="f" name="sex" />
          <v-radio label="Самец" value="m" name="sex" />
        </v-radio-group>
        <v-divider />
        <v-select
          v-model="models.breeder_type"
          :items="breederTypes"
          label="О заводчике"
          item-title="label"
          item-value="key"
        />
        <v-autocomplete
          v-if="models.breeder_type === 'user'"
          v-model="models.breeder_id"
          v-model:search="breederSearch"
          :items="breederItems"
          :loading="isLoadingBreeder"
          item-title="fullName"
          item-value="id"
          label="Заводчик"
          placeholder="Введите имя заводчика"
          clearable
        />
        <v-text-field
          v-if="models.breeder_type === 'not_user'"
          v-model="models.breeder_name"
          name="breeder_name"
          label="Имя заводчика"
        />
        <v-divider />
        <v-checkbox v-model="globalSearch" label="Глобальный поиск" />
        <v-autocomplete
          v-model="models.mother_id"
          v-model:search="motherSearch"
          :items="motherItems"
          :loading="isLoadingMother"
          item-title="name"
          item-value="id"
          label="Мама"
          placeholder="Введите кличку шиншиллы"
          clearable
        >
          <template #item="{ item, props }">
            <v-list-item
              :prepend-avatar="
                item.raw.avatar
                    ? `https://api.chinchillas-show.com/photos/chinchillas/${item.raw.owner_id}/${item.raw.id}/${item.raw.avatar.name}`
                    : '/assets/empty.jpg'
              "
              v-bind="props"
            >
              <v-list-item-subtitle>
                {{ colorToString(item.raw.color) || 'Стандарт' }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-autocomplete>
        <v-autocomplete
          v-model="models.father_id"
          v-model:search="fatherSearch"
          :items="fatherItems"
          :loading="isLoadingFather"
          item-title="name"
          item-value="id"
          label="Папа"
          placeholder="Введите кличку шиншиллы"
          clearable
        >
          <template #item="{ item, props }">
            <v-list-item
              :prepend-avatar="
                item.raw.avatar
                    ? `https://api.chinchillas-show.com/photos/chinchillas/${item.raw.owner_id}/${item.raw.id}/${item.raw.avatar.name}`
                    : '/assets/empty.jpg'
              "
              v-bind="props"
            >
              <v-list-item-subtitle>
                {{ colorToString(item.raw.color) || 'Стандарт' }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-autocomplete>
        <v-divider />
        <v-text-field
          v-model="models.weight"
          name="weight"
          label="Вес при рождении"
        />
        <v-text-field
          v-model="models.brothers"
          name="brothers"
          label="Щенков в помете"
        />
        <v-text-field v-model="models.awards" name="awards" label="Награды" />
        <v-text-field
          v-model="models.description"
          name="description"
          label="Дополнительное описание"
        />
        <v-btn
          color="primary"
          type="submit"
          :disabled="v$.$invalid || isLoading"
          >Сохранить</v-btn
        >
      </div>
      <div>
        <div class="chinchillaRedact__photos">
          <ChinchillaPhoto
            v-for="photo in photos"
            :key="photo.id"
            :user-id="userId"
            :chinchilla="chinchillaId ? models : undefined"
            :photo="photo"
            class="chinchillaRedact__photo"
            :is-avatar="avatar && photo.id === avatar.id"
            @to-avatar="photoToAvatar"
            @delete="deletePhoto"
          />
          <label class="chinchillaRedact__uploadPhoto">
            <v-icon size="40px" color="white">add</v-icon>
            <input type="file" multiple accept="image/*" @change="savePhotos" >
          </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const route = useRoute()
const router = useRouter()

const chinchillaId = ref(route.params.id || 0)

const models = reactive({
  name: '',
  status: 'growing',
  is_ready: false,
  birthday: null,
  sex: 'f',
  mother_id: null,
  father_id: null,
  weight: '',
  brothers: '',
  awards: '',
  description: '',
  breeder_type: 'owner',
  breeder_id: null,
  breeder_name: '',
})

const userId = useState(() => +useCookie('USER_ID').value)
const birthday = ref(null)
const formatBirthday = ref(null)
const isLoading = ref(false)
const datepicker = ref(false)
const isLoadingMother = ref(false)
const isLoadingFather = ref(false)
const isLoadingBreeder = ref(false)
const motherItems = ref([])
const fatherItems = ref([])
const breederItems = ref([])
const motherSearch = ref('')
const fatherSearch = ref('')
const breederSearch = ref('')
const photos = ref([])
const avatar = ref(null)
const globalSearch = ref(false)
const timers = ref({})
const breederTypes = ref([
  { key: 'owner', label: 'Владелец' },
  { key: 'user', label: 'Выбрать на сайте' },
  { key: 'not_user', label: 'Нет на сайте' },
  { key: 'unknown', label: 'Неизвестен' },
])

if (chinchillaId.value) {
  const { data } = await useAsyncData(() => $request(`chinchilla/details/${chinchillaId.value}`))
  Object.assign(models, data.value)
  photos.value = data.value.photos
  avatar.value = data.value.avatar
  birthday.value = new Date(data.value.birthday).toISOString().substring(0, 10)
  formatBirthday.value = dateFormat(new Date(data.value.birthday), 'yyyy.MM.dd')
}

watch(birthday, (val) => {
  formatBirthday.value = val && dateFormat(new Date(val), 'yyyy.MM.dd')
})

watch(motherSearch, (val) => {
  search(val, 'Mother')
  if (!val) models.mother_id = null
})

watch(fatherSearch, (val) => {
  search(val, 'Father')
  if (!val) models.father_id = null
})

watch(breederSearch, () => {
  searchBreeder(breederSearch.value)
})

watch(globalSearch, () => {
  search(motherSearch.value, 'Mother')
  search(fatherSearch.value, 'Father')
})

onMounted(() => {
  fetchParents()
})

const fetchParents = () => {
  search(motherSearch.value, 'Mother')
  search(fatherSearch.value, 'Father')
}

const saveBirthday = () => {
  if (/^\d{1,2}.\d{1,2}.\d{4}$/.test(formatBirthday.value)) {
    const paths = formatBirthday.value.split('.')
    const date = new Date()
    date.setFullYear(+paths[2], +paths[1] - 1, +paths[0])
    birthday.value = date.toISOString().substring(0, 10)
    models.birthday = date.getTime()
  }
}

const onSubmit = () => {
  models.birthday = new Date(birthday.value).getTime()
  isLoading.value = true
  const modelData = { ...models }
  if (chinchillaId.value) delete modelData.status
  if (modelData.breeder_type !== 'user') modelData.breeder_id = null
  if (modelData.breeder_type !== 'not_user') modelData.breeder_name = ''
  if (modelData.breeder_type === 'owner') {
    modelData.breeder_id = +useCookie('USER_ID').value
  }
  $request(
    chinchillaId.value
      ? `chinchilla/update/${chinchillaId.value}`
      : 'chinchilla/create',
    {
      method: chinchillaId.value ? 'put' : 'post',
      body: modelData,
    }
  )
    .then((data) => {
      uploadPhotos(data.id || chinchillaId.value)
    })
    .catch(() => {
      alert('Что-то пошло не так')
      isLoading.value = false
    })
}

const search = (val, type) => {
  clearTimeout(timers.value[type])
  timers.value[type] = setTimeout(() => {
    isLoading[type] = true
    $request(`chinchilla/search`, {
      params: {
        name: val || undefined,
        sex: type === 'Mother' ? 'f' : 'm',
        limit: 20,
        is_owner: globalSearch.value ? undefined : true,
      },
    }).then((response) => {
      if (type === 'Mother') {
        motherItems.value = (
          models[type.toLowerCase()]
            ? [models[type.toLowerCase()]]
            : []
        ).concat(response.data.filter((f) => f.id !== chinchillaId.value));;
        isLoadingMother.value = false;
      } else {
        fatherItems.value = (
          models[type.toLowerCase()]
            ? [models[type.toLowerCase()]]
            : []
        ).concat(response.data.filter((f) => f.id !== chinchillaId.value));
        isLoadingFather.value = false;
      }
    })
  }, 500)
}

const searchBreeder = (val) => {
  clearTimeout(timers.value.breeder)
  timers.value.breeder = setTimeout(() => {
    isLoadingBreeder.value = true
    $request(`user/search?q=${val || ''}&perPage=20`).then((data) => {
      breederItems.value = (
        models.breeder ? [models.breeder] : []
      ).concat(data).map((el) => ({
        ...el,
        fullName: `${el.first_name} ${el.last_name} (${el.login})`,
      }))
      isLoadingBreeder.value = false
    })
  }, 500)
}

const savePhotos = (event) => {
  for (const file of event.target.files) {
    photos.value.push({
      file,
      data: URL.createObjectURL(file),
      id: Math.random(),
    })
  }
}

const uploadPhotos = (id) => {
  const requests = photos.value
    .filter((el) => el.file)
    .map(({ file, id: photoId }) => {
      const formData = new FormData()
      formData.append('photo', file)
      return new Promise((resolve, reject) => {
        $request(`/photo/chinchilla/${id}`, { method: 'post', body: formData })
          .then((data) => {
            resolve({ prevId: photoId, data })
          })
          .catch(reject)
      })
    })

  Promise.allSettled(requests).then(async (results) => {
    if (avatar.value) {
      const avatarPhoto = results.find(
        (el) =>
          el.status === 'fulfilled' && el.value.prevId === avatar.value.id
      )
      if (avatarPhoto) await photoToAvatar(avatarPhoto.id, id)
    }
    router.push(
      chinchillaId.value
        ? `/profile/chinchillas/${chinchillaId.value}`
        : `/profile/chinchillas/${id}/color`
    )
  })
}

const deletePhoto = async (photoId) => {
  if (chinchillaId.value)
    await $request(`/photo/chinchilla/${photoId}`, { method: 'delete' })
  photos.value = photos.value.filter((el) => el.id !== photoId)
  if (avatar.value && avatar.value.id === photoId) avatar.value = null
}

const photoToAvatar = async (photoId, chinchillaId) => {
  if (chinchillaId)
    await $request(`/chinchilla/update/${chinchillaId}`, {
      method: 'put',
      body: { avatar_id: photoId },
    })
  avatar.value = photos.value.find((el) => el.id === photoId)
}

const v$ = useVuelidate({
  models: {
    name: {
      required,
    },
  },
  birthday: {
    required,
  },
}, reactive({
  models,
  birthday,
}))
</script>

<style lang="scss">
.chinchillaRedact {
  width: 100%;

  &__form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 24px;
    padding: 40px 0;

    @include mq('tablet', 'phone') {
      grid-template-columns: 1fr 1fr;
    }

    @include mq('phone') {
      grid-template-columns: 1fr;
    }
  }

  &__photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
    grid-row-gap: 16px;

    @include mq('tablet') {
      grid-template-columns: 1fr;
    }
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

  &__photo {
    width: 100%;
    background: no-repeat center / cover;
  }
}
</style>
