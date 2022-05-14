<template>
  <section
    class="pedigreeTree"
    :class="{ pedigreeTree__forPrint: forPrint }"
    :style="{ transform: `scale(${scale})`, margin: `${margin}px` }"
  >
    <div ref="container" class="pedigreeTree__container">
      <div class="pedigreeTree__row">
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('m')"
            :chinchilla="getParent('m')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('f')"
            :chinchilla="getParent('f')"
            :opened="forPrint"
          />
        </div>
      </div>
      <div class="pedigreeTree__row pedigreeTree__row_2">
        <div class="pedigreeTree__cell pedigreeTree__cell--pair">
          <ChinchillaCard
            v-if="getParent('m.m')"
            :chinchilla="getParent('m.m')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('m.f')"
            :chinchilla="getParent('m.f')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell pedigreeTree__cell--pair">
          <ChinchillaCard
            v-if="getParent('f.m')"
            :chinchilla="getParent('f.m')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('f.f')"
            :chinchilla="getParent('f.f')"
            :opened="forPrint"
          />
        </div>
      </div>
      <div v-if="!forPrint" class="pedigreeTree__row pedigreeTree__row--join">
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('m.m.m')"
            :chinchilla="getParent('m.m.m')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('m.f.m')"
            :chinchilla="getParent('m.f.m')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('f.m.m')"
            :chinchilla="getParent('f.m.m')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('f.f.m')"
            :chinchilla="getParent('f.f.m')"
            :opened="forPrint"
          />
        </div>
      </div>
      <div v-if="!forPrint" class="pedigreeTree__row pedigreeTree__row--last">
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('m.m.f')"
            :chinchilla="getParent('m.m.f')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('m.f.f')"
            :chinchilla="getParent('m.f.f')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('f.m.f')"
            :chinchilla="getParent('f.m.f')"
            :opened="forPrint"
          />
        </div>
        <div class="pedigreeTree__cell">
          <ChinchillaCard
            v-if="getParent('f.f.f')"
            :chinchilla="getParent('f.f.f')"
            :opened="forPrint"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChinchillaCard from '../ChinchillaCard/ChinchillaCard'

export default {
  name: 'PedigreeTree',

  components: {
    ChinchillaCard,
  },

  props: {
    chinchilla: {
      type: Object,
      required: true,
    },
    forPrint: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scale: 1,
      margin: 0,
    }
  },

  mounted() {
    import('~/assets/scripts/zoomElement').then((zoomElement) => {
      // zoomElement.default(this.$refs.container)
      this.review()
    })
    window.addEventListener('resize', this.review)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.review)
  },

  methods: {
    review() {
      const width = document.body.scrollWidth
      width < 1100
        ? (this.scale = Math.max(width / 1100, 0.2))
        : (this.scale = 1)
      this.scale === 1
        ? (this.margin = 0)
        : (this.margin = -(((1 - this.scale) * 1100) / 2))
    },
    getParent(steps) {
      return steps
        .split('.')
        .reduce(
          (c, s) => c && c[s === 'm' ? 'mother' : 'father'],
          this.chinchilla
        )
    },
  },
}
</script>

<style lang="scss">
.pedigreeTree {
  $self: &;

  width: 100%;
  min-width: 1100px;
  overflow: hidden;
  padding-bottom: 40px;

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
    width: 240px;
    height: 240px;
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
