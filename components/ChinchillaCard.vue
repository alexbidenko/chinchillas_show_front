<script setup lang="ts">
import type {ChinchillaType} from "~/types/common";

const props = defineProps<{
  chinchilla: ChinchillaType;
  forPrint?: boolean;
  withParent?: boolean;
}>();

const colorString = computed(() => colorToString(props.chinchilla.color));

const dateDifference = computed(() => getDateDifference(props.chinchilla.birthday, new Date(), 'sm'));

const birthdayDate = computed(() => dateFormat(props.chinchilla.birthday, 'yyyy.MM.dd'));
</script>

<template>
  <nuxt-link
    class="contents"
    :to="`/profile/chinchillas/${chinchilla.id}`"
  >
    <Card class="group/card !rounded-xl !bg-surface-100 !shadow-lg hover:!shadow-sm transition" :pt="{ body: { class: '!p-1 md:!p-2' } }">
      <template #header>
        <div class="overflow-hidden relative aspect-square !rounded-xl">
          <NuxtImg
            class="w-full h-full object-cover"
            format="webp"
            placeholder="/assets/empty.jpg"
            :src="
              chinchilla.avatar
                ? `https://api.chinchillas-show.com/photos/chinchillas/${chinchilla.owner_id}/${chinchilla.id}/${chinchilla.avatar.name}`
                : '/assets/empty.jpg'
            "
            width="400"
            height="400"
          />

          <div class="group/info absolute pt-1 pr-1 top-0 right-0 lg:hidden transition group-hover/card:-translate-y-full group-hover:info:-translate-y-full" @click.stop.prevent>
            <div class="bg-primary-600 text-900 text-surface-100 aspect-square flex align-center justify-center rounded-full p-1">
              <i class="pi pi-info-circle" />
            </div>
          </div>

          <div class="absolute top-0 left-0 right-0 bottom-0 transition translate-y-full group-hover:info:translate-y-0 group-hover/card:translate-y-0 bg-surface-200/75 p-1 md:p-2">
            <ul class="list-none m-0 p-0">
              <li class="px-0 py-1 flex justify-between gap-1">
                <span class="text-900 font-medium text-xs">{{ chinchilla.sex === 'f' ? 'Самка' : 'Самец' }}</span>
              </li>
              <li class="px-0 py-1 flex justify-between gap-1 border-t border-surface-900">
                <span class="text-900 font-medium text-xs">{{ colorString || 'стандарт' }}</span>
              </li>
              <li class="px-0 py-1 flex justify-between gap-1 border-t border-surface-900">
                <span class="text-900 font-medium text-xs">{{ forPrint ? birthdayDate : dateDifference }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <template #content>
        <ul class="list-none m-0 p-0">
          <li v-if="!chinchilla.color" class="px-0 py-1 flex justify-between gap-1 border-b border-surface-900">
            <span class="text-600 font-medium text-xs">Без окраса</span>
          </li>
          <li class="px-0 py-1 flex justify-between gap-1">
            <span class="text-600 font-medium text-xs hidden lg:inline-block">Кличка</span>
            <span class="text-900 font-medium text-xs lg:text-right">{{ chinchilla.name }}</span>
          </li>
          <template v-if="withParent">
            <li v-if="chinchilla.mother" class="px-0 py-1 flex justify-between gap-1 border-t border-surface-900">
              <span class="text-600 font-medium text-xs hidden lg:inline-block">Мать</span>
              <span class="text-900 font-medium text-xs lg:text-right">{{ chinchilla.mother.name }}</span>
            </li>
            <li v-if="chinchilla.father" class="px-0 py-1 flex justify-between gap-1 border-t border-surface-900">
              <span class="text-600 font-medium text-xs hidden lg:inline-block">Отец</span>
              <span class="text-900 font-medium text-xs lg:text-right">{{ chinchilla.father.name }}</span>
            </li>
          </template>
        </ul>
      </template>
    </Card>
  </nuxt-link>
</template>
