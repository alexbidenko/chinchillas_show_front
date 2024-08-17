<script setup lang="ts">
import statuses from '~/assets/datas/statuses.json';
import type {ChinchillaType, UserType} from "~/types/common";

const props = defineProps<{
  userId: number;
  user: UserType;
  chinchillas: Record<string, ChinchillaType[]>;
  soldChinchillas: Record<string, any>[];
}>();

const userStore = useUserStore();
const settingsStore = useSettingsStore();

const sortValue = useCookie('sort_value', { path: '/', expires: getEternalCookieExpired() })

const isOwner = computed(() => props.userId === userStore.userId);

const statusesData = [
  { key: 'm', label: 'Самцы' },
  { key: 'f', label: 'Самки' },
  ...statuses,
];

const sortItems = [
  {
    label: 'По алфавиту',
    value: 'default',
  },
  {
    label: 'По дате рождения',
    value: 'birthday',
  },
];

const sortedChinchillas = computed(() => {
  const result: Record<string, ChinchillaType[]> = {};
  Object.entries(props.chinchillas).forEach(([key, value]) => {
    const field = sortValue.value === 'birthday' ? 'birthday' : 'name';
    result[key] = value.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  });
  return result;
});
</script>


<template>
  <div class="profilePage">
    <ProfileInfo :user="user" />
    <div class="profilePage__settings baseContainer">
      <v-select
        v-model="sortValue"
        solo
        label="Сортировка шиншилл"
        :items="sortItems"
        item-title="label"
        item-value="value"
        class="profilePage__sorting"
      />
    </div>
    <div
      v-for="(list, key) in sortedChinchillas"
      :key="key"
      :class="`gridCount__${settingsStore.gridCountValue}`"
    >
      <CardSection
        v-if="list.length && key !== 'dead'"
        :section-key="key"
        :items="list"
        :title="
          (statusesData.find((el) => el.key === key) || { label: 'Без статуса' })
            .label
        "
      />
    </div>
    <CardSection
      v-if="soldChinchillas && soldChinchillas.length"
      title="Проданные"
      section-key="extra-sold"
      :items="soldChinchillas"
      :default-expand="false"
      :class="`gridCount__${settingsStore.gridCountValue}`"
    />
    <CardSection
      v-if="sortedChinchillas.dead && sortedChinchillas.dead.length"
      :items="sortedChinchillas.dead"
      section-key="extra-dead"
      title="На радуге"
      :default-expand="false"
      :class="`gridCount__${settingsStore.gridCountValue}`"
    />
    <v-fab
      v-if="isOwner"
      color="primary"
      icon="add"
      dark
      position="fixed"
      location="bottom end"
      app
      nuxt
      to="/profile/chinchillas/create"
    />
  </div>
</template>

<style lang="scss">
.profilePage {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  &__title {
    @include buttonReset;
    font-size: 24px;
  }

  &__settings {
    padding-top: 32px;
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
    column-gap: 16px;

    @include mq('tablet-small') {
      column-gap: 8px;
    }
  }

  & &__gridCount {
    display: none;
    max-width: 142px;

    @include mq('tablet-small') {
      display: block;
    }
  }

  & &__sorting {
    max-width: 180px;
  }
}
</style>
