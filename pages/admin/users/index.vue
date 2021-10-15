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
            item-text="text"
            item-value="value"
          />

          <v-checkbox
            v-model="itemModels.admitted"
            name="admitted"
            label="Разрешен доступ к сайту"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="darken-1" text @click="changeUser"> Сохранить </v-btn>

          <v-btn color="darken-1" text @click="dialog = false"> Отмена </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',

  layout: 'adminLayout',

  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Логин', value: 'login' },
        { text: 'Имя', value: 'first_name' },
        { text: 'Фамилия', value: 'last_name' },
        { text: 'Отчество', value: 'patronymic' },
        { text: 'Город', value: 'city' },
      ],
      userTypes: [
        {
          text: 'Пользователь',
          value: 'user',
        },
        {
          text: 'Эксперт',
          value: 'expert',
        },
        {
          text: 'Модератор',
          value: 'moderator',
        },
        {
          text: 'Админ',
          value: 'admin',
        },
      ],
      users: [],
      page: 1,
      perPage: 10,
      dialog: false,
      activeItem: null,
      itemModels: null,
    }
  },

  async fetch() {
    try {
      const response = await this.$axios.$get('admin/users')
      this.users = Array(response.total).fill({})
      response.data.forEach((el, index) => {
        this.users[(response.page - 1) * 10 + index] = el
      })
    } catch (e) {
      await this.$router.push('/')
    }
  },

  methods: {
    async requestPage() {
      const response = await this.$axios.$get(
        `admin/users?page=${this.page}&perPage=${this.perPage}`
      )
      this.users = Array(response.total).fill({})
      response.data.forEach((el, index) => {
        this.users[(this.page - 1) * this.perPage + index] = el
      })
    },
    updatePerPage(perPage) {
      this.perPage = perPage
      this.requestPage()
    },
    updatePage(page) {
      this.page = page
      this.requestPage()
    },
    selectUser(item) {
      this.activeItem = item
      this.itemModels = { ...item }
      this.dialog = true
    },
    async changeUser() {
      Object.assign(
        this.activeItem,
        await this.$axios.$put(`admin/user/${this.itemModels.id}`, {
          admitted: this.itemModels.admitted,
          type: this.itemModels.type,
        })
      )
      this.dialog = false
    },
  },
}
</script>
