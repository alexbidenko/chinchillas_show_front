<script lang="ts" setup>
import type {UserType} from "~/types/common";

defineProps<{
  user: UserType;
}>();
</script>

<template>
  <nuxt-link class="contents" :to="`/profile/${user.id}`">
    <Card class="!rounded-2xl !bg-surface-100 !shadow-lg hover:!shadow-sm transition">
      <template #header>
        <NuxtImg
          :src="
          user.avatar
            ? `https://api.chinchillas-show.com/photos/users/${user.id}/${user.avatar}`
            : '/assets/empty.jpg'
        "
          placeholder="/assets/empty.jpg"
          class="userCard__avatar !rounded-2xl"
        />
      </template>

      <template #content>
        <ul class="list-none m-0 p-0">
          <li class="px-0 py-2 flex justify-between items-center border-b border-surface-900">
            <span class="text-600 font-medium text-sm">Имя</span
            ><span class="text-900 font-medium text-sm">{{ user.first_name }}</span>
          </li>
          <li class="px-0 py-2 flex justify-between items-center border-b border-surface-900">
            <span class="text-600 font-medium text-sm">Фамилия</span>
            <span class="text-900 font-medium text-sm">{{ user.last_name }}</span>
          </li>
          <li class="px-0 py-2 flex justify-between items-center border-b border-surface-900">
            <span class="text-600 font-medium text-sm">Страна</span>
            <span class="text-900 font-medium text-sm">{{ user.country }}</span>
          </li>
          <li class="px-0 py-2 flex justify-between items-center">
            <span class="text-600 font-medium text-sm">Город</span>
            <span class="text-900 font-medium text-sm">{{ user.city }}</span>
          </li>
        </ul>

        <Chip
          :label="`${user.chinchillasCount} ${wordFormat(user.chinchillasCount, ['шиншилла', 'шиншиллы', 'шиншилл'])}`"
          class="mt-3 !bg-surface-300 mx-auto !block w-fit"
        />
      </template>
    </Card>
  </nuxt-link>
</template>

<style lang="scss">
.userCard {
  &__avatar {
    aspect-ratio: 1 / 1;
    width: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
