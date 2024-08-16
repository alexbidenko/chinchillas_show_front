<template>
  <div
    class="chinchillaPhoto"
    :class="{ chinchillaPhoto_avatar: isAvatar }"
    @click="$emit('click', $event)"
  >
    <NuxtImg
      class="chinchillaPhoto__image"
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
  position: relative;
  cursor: pointer;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  max-height: 400px;
  aspect-ratio: 1 / 1;

  &:hover {
    box-shadow: none;
  }

  &__image {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    display: block;
  }

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
