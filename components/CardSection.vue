<script setup lang="ts">
import type {ChinchillaType} from "~/types/common";

const props = defineProps<{
  items: ChinchillaType[];
  title: string | null;
  sectionKey: string;
  defaultExpand?: boolean;
}>();

const settingsStore = useSettingsStore();

const expanded = useCookie<boolean>(
  `section_expanded:${props.sectionKey}`,
  { path: '/', expires: getEternalCookieExpired(), default: () => !!props.defaultExpand, },
);
</script>

<template>
  <section class="cardSection">
    <div class="cardSection__container">
      <header
        v-if="title"
        class="cardSection__header"
        @click="expanded = !expanded"
      >
        <div class="cardSection__headerCard paddingRight">
          <h3 class="cardSection__title paddingLeft">
            {{ title }} ({{ items.length }})
          </h3>
          <v-btn :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
        </div>
      </header>
      <div v-auto-animate style="overflow: hidden">
        <main
          v-if="expanded"
          class="grid sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 sm:gap-2 md:gap-3 lg:gap-4 py-4 baseContainer"
          :class="settingsStore.gridCountValue === 'more' ? 'grid-cols-4 gap-1' : 'grid-cols-2 gap-2'"
        >
          <ChinchillaCard
            v-for="item in items"
            :key="item.id"
            :chinchilla="item"
          />
        </main>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.cardSection {
  width: 100%;
  padding-bottom: 16px;

  &__container {
    background-color: white;
  }

  &__header {
    cursor: pointer;
  }

  &__title {
    background: #d79b00;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
    height: calc(100% - 16px);
    font-size: 24px;
    padding-right: 32px;
    border-radius: 0 24px 24px 0;
    display: flex;
    align-items: center;

    @include mq('tablet-small') {
      font-size: 18px;
      height: calc(100% - 8px);
    }
  }

  &__headerCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e2e2e2;
    height: 56px;

    @include mq('tablet-small') {
      height: 40px;
    }
  }
}
</style>
