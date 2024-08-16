<script lang="ts" setup>
import chinchillaConclusions from '~/assets/datas/chinchillaConclusions.json'
import type {ChinchillaType, ColorCommentType, ColorInfoType, PaginationType} from "~/types/common";

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Кличка', value: 'name' },
  { title: 'Владелец', value: 'ownerName' },
  { title: 'Действия', value: 'actions', align: 'end' },
]

const dialog = ref(false)
const activeItem = ref<ChinchillaType | null>(null)
const itemModels = ref<ChinchillaType | null>(null)
const commentText = ref('')
const totalCount = useState(() => 0);
const loading = ref(false);

const prepareData = (data: PaginationType<ChinchillaType>) => {
  return data.data.map((el) => ({
    ...el,
    ownerName: `${el.owner.first_name} ${el.owner.last_name} (${el.owner.login})`,
  }));
}

const { data: chinchillas, error } = await useAsyncData('admin-chinchillas', () =>
  $request<PaginationType<ChinchillaType>>('admin/chinchillas/1/10').then((data) => {
    totalCount.value = data.total;

    return prepareData(data);
  }),
  { default: () => [] },
)

if (error.value) await navigateTo('/')

const requestPage = async (options: { page: number, itemsPerPage: number }) => {
  loading.value = true;
  const response = await $request<PaginationType<ChinchillaType>>(
    `admin/chinchillas/${options.page}/${options.itemsPerPage}`
  )
  chinchillas.value = prepareData(response);
  loading.value = false;
}

const selectChinchilla = (item: ChinchillaType) => {
  activeItem.value = item
  console.log(item);
  itemModels.value = { ...item }
  dialog.value = true
}

const changeChinchilla = async () => {
  if (!itemModels.value || !activeItem.value) return;

  const updatedItem = await $request(`admin/chinchilla/${itemModels.value.id}`, {
    method: 'put',
    body: { conclusion: itemModels.value.conclusion },
  })
  Object.assign(activeItem.value, updatedItem)
  dialog.value = false
}

const colorString = (color: ColorInfoType) => {
  return colorToString(color)
}

const sendComment = () => {
  if (!itemModels.value) return;

  $request<ColorCommentType>('admin/color/comment', {
    method: 'post',
    body: {
      chinchillaId: itemModels.value.id,
      content: commentText.value,
    },
  }).then((data) => {
    if (!activeItem.value) return;

    activeItem.value.color_comments = [
      data,
      ...activeItem.value.color_comments,
    ]
  })
}
</script>

<template>
  <div>
    <v-data-table-server
      :headers="headers"
      :items="chinchillas"
      item-value="id"
      :items-length="totalCount"
      :loading="loading"
      @update:options="requestPage"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="selectChinchilla(item)"
          icon="edit"
          size="small"
          variant="text"
        />
      </template>
    </v-data-table-server>

    <v-dialog v-model="dialog" max-width="800">
      <v-card v-if="activeItem && itemModels">
        <v-card-title class="headline">Проверка шиншиллы</v-card-title>

        <v-card-title>
          {{ activeItem.name }}
          <v-btn target="_blank" :href="`/profile/chinchillas/${activeItem.id}`">
            Открыть
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <p>{{ colorString(activeItem.color) }}</p>

          <v-select
            v-model="itemModels.conclusion"
            :items="chinchillaConclusions"
            label="Оценка окраса"
            item-title="text"
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
              >
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
          <v-spacer/>

          <v-btn v-if="commentText" color="darken-1" variant="text" @click="sendComment">
            Комментировать
          </v-btn>

          <v-btn color="darken-1" variant="text" @click="changeChinchilla">
            Сохранить
          </v-btn>

          <v-btn color="darken-1" variant="text" @click="dialog = false"> Отмена </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

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
