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
        <div></div>
        <v-menu
          v-model="datepicker"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="formatBirthday"
              label="День рождения"
              prepend-icon="event"
              name="birthday"
              v-bind="attrs"
              v-on="on"
              @blur="saveBirthday"
            />
          </template>
          <v-date-picker v-model="birthday" @input="datepicker = false" />
        </v-menu>
        <div></div>
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
          item-text="label"
          item-value="key"
        />
        <v-autocomplete
          v-if="models.breeder_type === 'user'"
          v-model="models.breeder_id"
          :items="breederItems"
          :loading="isLoadingBreeder"
          :search-input.sync="breederSearch"
          item-text="fullName"
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
          :items="motherItems"
          :loading="isLoadingMother"
          :search-input.sync="motherSearch"
          item-text="name"
          item-value="id"
          label="Мама"
          placeholder="Введите кличку шиншиллы"
          clearable
        >
          <template #item="data">
            <v-list-item-avatar
              size="60"
              :style="{
                background: `no-repeat center / cover url(${
                  data.item.avatar
                    ? `https://api.chinchillas-show.com/photos/chinchillas/${data.item.owner_id}/${data.item.id}/${data.item.avatar.name}`
                    : '/assets/empty.jpg'
                })`,
              }"
            />
            <v-list-item-content>
              <v-list-item-title>{{ data.item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                colorToString(data.item.color) || 'Стандарт'
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
        <v-autocomplete
          v-model="models.father_id"
          :items="fatherItems"
          :loading="isLoadingFather"
          :search-input.sync="fatherSearch"
          item-text="name"
          item-value="id"
          label="Папа"
          placeholder="Введите кличку шиншиллы"
          clearable
        >
          <template #item="data">
            <v-list-item-avatar
              size="60"
              :style="{
                background: `no-repeat center / cover url(${
                  data.item.avatar
                    ? `https://api.chinchillas-show.com/photos/chinchillas/${data.item.owner_id}/${data.item.id}/${data.item.avatar.name}`
                    : '/assets/empty.jpg'
                })`,
              }"
            />
            <v-list-item-content>
              <v-list-item-title>{{ data.item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                colorToString(data.item.color) || 'Стандарт'
              }}</v-list-item-subtitle>
            </v-list-item-content>
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
          :disabled="$v.$invalid || isLoading"
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
            @toAvatar="photoToAvatar"
            @delete="deletePhoto"
          />
          <label class="chinchillaRedact__uploadPhoto">
            <v-icon size="40px" color="white">mdi-plus</v-icon>
            <input type="file" multiple accept="image/*" @change="savePhotos" />
          </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ChinchillaPhoto from '~/components/ChinchillaPhoto/ChinchillaPhoto.vue'
import colorToString from '~/assets/scripts/colorToString'
import dateFormat from '~/assets/scripts/dateFormat'

export default {
  name: 'ChinchillaRedact',

  components: {
    ChinchillaPhoto,
  },

  props: {
    chinchillaId: {
      default: 0,
      type: Number,
    },
  },

  data() {
    return {
      models: {
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
      },
      userId: +this.$cookies.get('USER_ID'),
      birthday: null,
      formatBirthday: null,
      isLoading: false,
      datepicker: false,
      isLoadingMother: false,
      isLoadingFather: false,
      isLoadingBreeder: false,
      motherItems: [],
      fatherItems: [],
      breederItems: [],
      motherSearch: '',
      fatherSearch: '',
      breederSearch: '',
      photos: [],
      avatar: null,
      globalSearch: false,
      timers: {},
      breederTypes: [
        {
          key: 'owner',
          label: 'Владелец',
        },
        {
          key: 'user',
          label: 'Выбрать на сайте',
        },
        {
          key: 'not_user',
          label: 'Нет на сайте',
        },
        {
          key: 'unknown',
          label: 'Неизвестен',
        },
      ],
    }
  },

  async fetch() {
    if (this.chinchillaId) {
      this.models = await this.$axios.$get(
        `chinchilla/details/${this.chinchillaId}`
      )
      this.photos = this.models.photos
      this.avatar = this.models.avatar
      this.birthday = new Date(this.models.birthday)
        .toISOString()
        .substring(0, 10)
      this.formatBirthday = dateFormat(
        new Date(this.models.birthday),
        'yyyy.MM.dd'
      )
    }
  },

  watch: {
    birthday(val) {
      this.formatBirthday = val && dateFormat(new Date(val), 'yyyy.MM.dd')
    },
    motherSearch(val) {
      this.search(val, 'Mother')
      if (!val) this.models.mother_id = null
    },
    fatherSearch(val) {
      this.search(val, 'Father')
      if (!val) this.models.father_id = null
    },
    breederSearch(val) {
      this.searchBreeder(val)
    },
    globalSearch() {
      this.search(this.motherSearch, 'Mother')
      this.search(this.fatherSearch, 'Father')
    },
  },

  mounted() {
    this.fetchParents()
  },

  methods: {
    colorToString,
    fetchParents() {
      this.search(this.motherSearch, 'Mother')
      this.search(this.fatherSearch, 'Father')
    },
    saveBirthday() {
      if (/^[\d]{1,2}.[\d]{1,2}.[\d]{4}$/.test(this.formatBirthday)) {
        const paths = this.formatBirthday.split('.')
        const date = new Date()
        date.setFullYear(+paths[2], +paths[1] - 1, +paths[0])
        this.birthday = date.toISOString().substring(0, 10)
        this.models.birthday = date.getTime()
      }
    },
    onSubmit() {
      this.models.birthday = new Date(this.birthday).getTime()
      this.isLoading = true
      const models = { ...this.models }
      if (this.chinchillaId) delete models.status
      if (models.breeder_type !== 'user') models.breeder_id = null
      if (models.breeder_type !== 'not_user') models.breeder_name = ''
      if (models.breeder_type === 'owner')
        models.breeder_id = +this.$cookies.get('USER_ID')
      this.$axios[this.chinchillaId ? '$put' : '$post'](
        this.chinchillaId
          ? `chinchilla/update/${this.chinchillaId}`
          : 'chinchilla/create',
        models
      )
        .then((data) => {
          this.uploadPhotos(data.id || this.chinchillaId)
        })
        .catch(() => {
          alert('Что-то пошло не так')
          this.isLoading = false
        })
    },
    search(val, type) {
      clearTimeout(this.timers[type])
      this.timers[type] = setTimeout(() => {
        this['isLoading' + type] = true
        this.$axios
          .$get(
            `chinchilla/search?name=${val || ''}&sex=${
              type === 'Mother' ? 'f' : 'm'
            }&perPage=20${this.globalSearch ? '' : '&is_owner=true'}`
          )
          .then((response) => {
            this[type.toLowerCase() + 'Items'] = (
              this.models[type.toLowerCase()]
                ? [this.models[type.toLowerCase()]]
                : []
            ).concat(response.data.filter((f) => f.id !== this.chinchillaId))
            this['isLoading' + type] = false
          })
      }, 500)
    },
    searchBreeder(val) {
      clearTimeout(this.timers.breeder)
      this.timers.breeder = setTimeout(() => {
        this.isLoadingBreeder = true
        this.$axios
          .$get(`user/search?q=${val || ''}&perPage=20`)
          .then((data) => {
            this.breederItems = (
              this.models.breeder ? [this.models.breeder] : []
            )
              .concat(data)
              .map((el) => ({
                ...el,
                fullName: `${el.first_name} ${el.last_name} (${el.login})`,
              }))
            this.isLoadingBreeder = false
          })
      }, 500)
    },
    savePhotos(event) {
      for (const file of event.target.files) {
        this.photos.push({
          file,
          data: URL.createObjectURL(file),
          id: Math.random(),
        })
      }
    },
    uploadPhotos(id) {
      const requests = this.photos
        .filter((el) => el.file)
        .map(({ file, id: photoId }) => {
          const formData = new FormData()
          formData.append('photo', file)
          return new Promise((resolve, reject) => {
            this.$axios
              .$post(`/photo/chinchilla/${id}`, formData)
              .then((data) => {
                resolve({
                  prevId: photoId,
                  data,
                })
              })
              .catch(reject)
          })
        })
      Promise.allSettled(requests).then(async (results) => {
        if (this.avatar) {
          const avatar = results.find(
            (el) =>
              el.status === 'fulfilled' && el.value.prevId === this.avatar.id
          )
          if (avatar) await this.photoToAvatar(avatar.id, id)
        }
        this.$router.push(
          this.chinchillaId
            ? `/profile/chinchillas/${this.chinchillaId}/view`
            : `/profile/chinchillas/${id}/color`
        )
      })
    },
    async deletePhoto(photoId) {
      if (this.chinchillaId)
        await this.$axios.$delete(`/photo/chinchilla/${photoId}`)
      this.photos = this.photos.filter((el) => el.id !== photoId)
      if (this.avatar && this.avatar.id === photoId) this.avatar = null
    },
    async photoToAvatar(photoId, chinchillaId) {
      if (chinchillaId)
        await this.$axios.$put(
          `/chinchilla/update/${this.chinchillaId || chinchillaId}`,
          {
            avatar_id: photoId,
          }
        )
      this.avatar = this.photos.find((el) => el.id === photoId)
    },
  },

  validations: {
    models: {
      name: {
        required,
      },
    },
    birthday: {
      required,
    },
  },
}
</script>

<style lang="scss" src="./ChinchillaRedact.scss"></style>
