<script setup lang="ts">
import {type PaginationType, type UserType, UserTypeVariant} from "~/types/common";

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Логин', value: 'login' },
  { title: 'Имя', value: 'first_name' },
  { title: 'Фамилия', value: 'last_name' },
  { title: 'Отчество', value: 'patronymic' },
  { title: 'Город', value: 'city' },
  { title: 'Действия', value: 'actions', align: 'end' },
]

const userTypes = [
  { title: 'Пользователь', value: UserTypeVariant.user },
  { title: 'Эксперт', value: UserTypeVariant.expert },
  { title: 'Модератор', value: UserTypeVariant.moderator },
  { title: 'Админ', value: UserTypeVariant.admin },
]

const dialog = ref(false)
const activeItem = ref<UserType>()
const itemModels = ref<UserType>()
const totalCount = useState(() => 0);
const loading = ref(false);

const prepareData = (data: PaginationType<UserType>) => {
  totalCount.value = data.total;

  return data.data;
}

const { data: users, error } = await useAsyncData(() => $request<PaginationType<UserType>>('admin/users').then(prepareData), { default: () => [] });

if (error.value) {
  await navigateTo('/');
}

const requestPage = async (options: { page: number, itemsPerPage: number }) => {
  loading.value = true;
  const response = await $request<PaginationType<UserType>>(
    `admin/users?page=${options.page}&perPage=${options.itemsPerPage}`
  )
  users.value = prepareData(response);
  loading.value = false;
}

const selectUser = (item: UserType) => {
  activeItem.value = item
  itemModels.value = { ...item }
  dialog.value = true
}

const changeUser = async () => {
  if (!itemModels.value || !activeItem.value) return;

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

  dialog.value = false
}

</script>

<template>
  <div>
    <v-data-table-server
      :headers="headers"
      :items="users"
      item-value="id"
      :items-length="totalCount"
      :loading="loading"
      @update:options="requestPage"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="selectUser(item)"
          icon="edit"
          size="small"
          variant="text"
        />
      </template>
    </v-data-table-server>

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
            item-title="title"
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
