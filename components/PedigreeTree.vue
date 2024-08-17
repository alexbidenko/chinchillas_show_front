<script lang="ts" setup>
import type {ChinchillaType} from "~/types/common";

const props = defineProps<{
  chinchilla: ChinchillaType;
  forPrint?: boolean;
}>();

const scale = ref(1)
const margin = ref(0)

const review = () => {
  const width = document.body.scrollWidth
  const preparedScale = width < 1100 ? Math.max(width / 1100, 0.2) : 1
  scale.value = props.forPrint ? (preparedScale * 1.4) : preparedScale;
  const preparedMargin = scale.value === 1 ? 0 : -(((1 - scale.value) * 1100) / 2);
  margin.value = props.forPrint ? (preparedMargin / 2.4) : (preparedMargin / 0.8);
}

const getParent = (steps: string) => {
  return steps.split('.').reduce(
    (c, s) => c && c[s === 'm' ? 'mother' : 'father'],
    props.chinchilla
  )
}

onMounted(() => {
  import('~/utils/zoomElement.js').then(() => {
    // zoomElement.default(this.$refs.container)
    review()
  })
  window.addEventListener('resize', review)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', review)
})
</script>

<template>
  <section
    class="pedigreeTree"
    :class="{ pedigreeTree__forPrint: forPrint }"
  >
    <div ref="container" class="pedigreeTree__container" :style="{ transform: `scale(${scale})`, margin: `${margin}px` }">
      <div class="pedigreeTree__row">
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('m')"
            :chinchilla="getParent('m')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('f')"
            :chinchilla="getParent('f')"
            :for-print="forPrint"
          />
        </div>
      </div>
      <div class="pedigreeTree__row pedigreeTree__row_2">
        <div class="pedigreeTree__cell rounded-xl pedigreeTree__cell--pair">
          <ChinchillaCard
            v-if="getParent('m.m')"
            :chinchilla="getParent('m.m')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('m.f')"
            :chinchilla="getParent('m.f')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl pedigreeTree__cell--pair">
          <ChinchillaCard
            v-if="getParent('f.m')"
            :chinchilla="getParent('f.m')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('f.f')"
            :chinchilla="getParent('f.f')"
            :for-print="forPrint"
          />
        </div>
      </div>
      <div v-if="!forPrint" class="pedigreeTree__row pedigreeTree__row--join">
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('m.m.m')"
            :chinchilla="getParent('m.m.m')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('m.f.m')"
            :chinchilla="getParent('m.f.m')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('f.m.m')"
            :chinchilla="getParent('f.m.m')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('f.f.m')"
            :chinchilla="getParent('f.f.m')"
            :for-print="forPrint"
          />
        </div>
      </div>
      <div v-if="!forPrint" class="pedigreeTree__row pedigreeTree__row--last">
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('m.m.f')"
            :chinchilla="getParent('m.m.f')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('m.f.f')"
            :chinchilla="getParent('m.f.f')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('f.m.f')"
            :chinchilla="getParent('f.m.f')"
            :for-print="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell rounded-xl">
          <ChinchillaCard
            v-if="getParent('f.f.f')"
            :chinchilla="getParent('f.f.f')"
            :for-print="forPrint"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.pedigreeTree {
  $self: &;

  width: 100%;
  min-width: 1100px;
  overflow: hidden;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;

  &__container {
    min-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__row {
    display: flex;
    width: fit-content;
    margin: 0 auto;
  }

  &__cell {
    z-index: 2;
    width: 240px;
    aspect-ratio: 1 / 1.13;
    margin: 32px 16px;
    position: relative;
    background-color: #828282;

    &::after {
      content: '';
      position: absolute;
      width: 8px;
      bottom: -64px;
      height: 64px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #d79b00;
    }

    &--pair::before {
      content: '';
      position: absolute;
      height: 8px;
      right: -32px;
      width: 32px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #d79b00;
    }
  }

  &__row--last &__cell::after {
    display: none;
  }

  &__row--join &__cell {
    margin-bottom: 0;

    &::after {
      bottom: -32px;
      height: 32px;
    }
  }

  &__forPrint {
    #{$self}__cell {
      &::after {
        display: none;
      }

      &::before {
        display: none;
      }
    }

    #{$self}__row_2 {
      transform-origin: 50% 50%;
      transform: scale(0.5);
      margin: -80px 0;
    }
  }
}
</style>
