<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="perPage"
      class="elevation-1"
      @update:items-per-page="updatePerPage"
      @update:page="updatePage"
      @click:row="selectUser"
    />

    <v-dialog v-model="dialog" max-width="290">
      <v-card v-if="activeItem && itemModels">
        <v-card-title class="headline"
          >Разрешить пользователю доступ к сайту</v-card-title
        >

        <v-card-title
          >{{ activeItem.last_name }} {{ activeItem.first_name }}</v-card-title
        >

        <v-divider />

        <v-card-text>
          <v-select
            v-model="itemModels.type"
            :items="userTypes"
            label="Тип пользователя"
            item-title="text"
            item-value="value"
          />

          <v-checkbox
            v-model="itemModels.admitted"
            name="admitted"
            label="Разрешен доступ к сайту"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer/>

          <v-btn color="darken-1" variant="text" @click="changeUser"> Сохранить </v-btn>

          <v-btn color="darken-1" variant="text" @click="dialog = false"> Отмена </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {type PaginationType, type UserType, UserTypeVariant} from "~/types/common";

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Логин', value: 'login' },
  { text: 'Имя', value: 'first_name' },
  { text: 'Фамилия', value: 'last_name' },
  { text: 'Отчество', value: 'patronymic' },
  { text: 'Город', value: 'city' },
]

const userTypes = [
  { text: 'Пользователь', value: UserTypeVariant.user },
  { text: 'Эксперт', value: UserTypeVariant.expert },
  { text: 'Модератор', value: UserTypeVariant.moderator },
  { text: 'Админ', value: UserTypeVariant.admin },
]

const page = ref(1)
const perPage = ref(10)
const dialog = ref(false)
const activeItem = ref<UserType>()
const itemModels = ref<UserType>()

const { data: users, error } = await useAsyncData<UserType[]>(() => $request<PaginationType<UserType>>('admin/users').then((data) => {
  const result = Array(data.total).fill({})
  data.data.forEach((el, index) => {
    result[(data.page - 1) * 10 + index] = el
  });
  return result;
}), { default: () => [] });

if (error.value) {
  await navigateTo('/');
}

const requestPage = async () => {
  const response = await $request<PaginationType<UserType>>(
    `admin/users?page=${page.value}&perPage=${perPage.value}`
  )
  users.value = Array(response.total).fill({})
  response.data.forEach((el, index) => {
    users.value[(page.value - 1) * perPage.value + index] = el
  })
}

const updatePerPage = (newPerPage: number) => {
  perPage.value = newPerPage
  requestPage()
}

const updatePage = (newPage: number) => {
  page.value = newPage
  requestPage()
}

const selectUser = (item: UserType) => {
  activeItem.value = item
  itemModels.value = { ...item }
  dialog.value = true
}

const changeUser = async () => {
  if (activeItem.value && itemModels.value) {
    Object.assign(
      activeItem.value,
      await $request(`admin/user/${itemModels.value.id}`, {
        method: 'put',
        body: {
          admitted: itemModels.value.admitted,
          type: itemModels.value.type,
        },
      })
    )
  }

  dialog.value = false
}

</script>

