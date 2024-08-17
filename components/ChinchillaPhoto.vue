<template>
  <div
    class="relative transition aspect-square shadow-lg hover:shadow-sm rounded-lg cursor-pointer"
    :class="{ chinchillaPhoto_avatar: isAvatar }"
    @click="$emit('click', $event)"
  >
    <NuxtImg
      class="block w-full h-full object-cover rounded-lg"
      format="webp"
      placeholder="/assets/empty.jpg"
      :src="
        !photo.file
          ? `https://api.chinchillas-show.com/photos/chinchillas/${chinchilla.owner_id}/${chinchilla.id}/${photo.name}`
          : photo.data
      "
      width="400"
      height="400"
    />

    <div v-if="!chinchilla || userId === chinchilla.owner_id" class="chinchillaPhoto__actions">
      <v-btn
        type="button"
        color="primary"
        size="x-small"
        icon="close"
        @click.stop="deletePhoto(photo.id)"
      />
      <v-btn
        type="button"
        color="primary"
        size="x-small"
        icon="account_circle"
        @click.stop="photoToAvatar(photo.id)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChinchillaPhoto',

  props: {
    userId: {
      type: Number,
      required: true,
    },
    chinchilla: {
      type: Object,
      default: null,
    },
    photo: {
      type: [String, Object],
      required: true,
    },
    isAvatar: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    deletePhoto(photoId) {
      this.$emit('delete', photoId)
    },
    photoToAvatar(photoId) {
      this.$emit('toAvatar', photoId)
    },
  },
}
</script>

<style lang="scss">
.chinchillaPhoto {
  &__actions {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &_avatar {
    border: 1px solid #d79b00;
  }
}
</style>
