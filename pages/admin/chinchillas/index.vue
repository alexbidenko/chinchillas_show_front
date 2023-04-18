<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="chinchillas"
      :items-per-page="perPage"
      class="elevation-1"
      @update:items-per-page="updatePerPage"
      @update:page="updatePage"
      @click:row="selectUser"
    />

    <v-dialog v-model="dialog" max-width="800">
      <v-card v-if="activeItem && itemModels">
        <v-card-title class="headline">Проверка шиншиллы</v-card-title>

        <v-card-title>
          {{ activeItem.name }}
          <v-btn target="_blank" :href="`/profile/chinchillas/${activeItem.id}`"
            >Открыть</v-btn
          >
        </v-card-title>

        <v-divider />

        <v-card-text>
          <p>{{ colorString(activeItem.color) }}</p>

          <v-select
            v-model="itemModels.conclusion"
            :items="chinchillaConclusions"
            label="Оценка окраса"
            item-text="text"
            item-value="value"
          />

          <div class="adminChinchillas__photos">
            <a
              v-for="photo in itemModels.photos"
              :key="photo.name"
              target="_blank"
              :href="`https://api.chinchillas-show.com/photos/chinchillas/${itemModels.owner_id}/${itemModels.id}/${photo.name}`"
            >
              <img
                :src="`https://api.chinchillas-show.com/photos/chinchillas/${itemModels.owner_id}/${itemModels.id}/${photo.name}`"
                :alt="itemModels.name"
                class="adminChinchillas__photo"
              />
            </a>
          </div>

          <v-textarea
            v-model="commentText"
            name="comment"
            label="Комментарий"
          />

          <div v-for="comment in activeItem.color_comments" :key="comment.id">
            <v-divider />
            <p>{{ comment.content }}</p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn v-if="commentText" color="darken-1" text @click="sendComment">
            Комментировать
          </v-btn>

          <v-btn color="darken-1" text @click="changeChinchilla">
            Сохранить
          </v-btn>

          <v-btn color="darken-1" text @click="dialog = false"> Отмена </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import colorToString from '~/assets/scripts/colorToString'
import chinchillaConclusions from '~/assets/datas/chinchillaConclusions.json'

export default {
  name: 'AdminChinchillas',

  layout: 'adminLayout',

  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Кличка', value: 'name' },
        { text: 'Владелец', value: 'ownerName' },
      ],
      chinchillaConclusions,
      chinchillas: [],
      page: 1,
      perPage: 10,
      dialog: false,
      activeItem: null,
      itemModels: null,
      commentText: '',
    }
  },

  async fetch() {
    try {
      const response = await this.$axios.$get('admin/chinchillas/1/10')
      this.chinchillas = response.data.map((el) => ({
        ...el,
        ownerName: `${el.owner.first_name} ${el.owner.last_name} (${el.owner.login})`,
      }))
    } catch (e) {
      await this.$router.push('/')
    }
  },

  methods: {
    async requestPage() {
      const response = await this.$axios.$get(
        `admin/chinchillas/${this.page}/${this.perPage}`
      )
      response.data.forEach((el, index) => {
        this.chinchillas[(this.page - 1) * this.perPage + index] = el
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
    async changeChinchilla() {
      Object.assign(
        this.activeItem,
        await this.$axios.$put(`admin/chinchilla/${this.itemModels.id}`, {
          conclusion: this.itemModels.conclusion,
        })
      )
      this.dialog = false
    },
    colorString(color) {
      return colorToString(color)
    },
    sendComment() {
      this.$axios
        .$post('admin/color/comment', {
          chinchillaId: this.itemModels.id,
          content: this.commentText,
        })
        .then((data) => {
          this.activeItem.color_comments = [
            data,
            ...this.activeItem.color_comments,
          ]
        })
    },
  },
}
</script>

<style lang="scss">
.adminChinchillas {
  &__photos {
    overflow-x: auto;
    white-space: nowrap;
  }

  &__photo {
    height: 300px;
  }
}
</style>
