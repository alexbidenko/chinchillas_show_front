<template>
  <section class="cardSection">
    <div class="cardSection__container">
      <header
        v-if="title"
        class="cardSection__header"
        @click="expand = !expand"
      >
        <div class="cardSection__headerCard paddingRight">
          <h3 class="cardSection__title paddingLeft">
            {{ title }} ({{ items.length }})
          </h3>
          <v-btn :icon="expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
        </div>
      </header>
      <div v-auto-animate style="overflow: hidden">
        <main v-if="expand" class="cardSection__list baseContainer">
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

<script>
export default {
  name: 'CardSection',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    sectionKey: {
      type: String,
      required: true,
    },
    defaultExpand: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    let expand = this.defaultExpand
    const value = this.$cookies.get(`section_expanded:${this.sectionKey}`)
    if (typeof value === 'boolean') expand = value

    return {
      expand,
    }
  },

  watch: {
    expand(val) {
      const date = new Date()
      date.setFullYear(date.getFullYear() + 200)
      this.$cookies.set(`section_expanded:${this.sectionKey}`, val, {
        expires: date,
      })
    },
  },
}
</script>

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

  &__list {
    padding-top: 40px;
    padding-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 24px;

    @include mq('desktop', 'desktop-small') {
      grid-column-gap: 12px;
      grid-row-gap: 18px;
    }

    @include mq('desktop-small', 'tablet') {
      grid-template-columns: repeat(6, 1fr);
    }

    @include mq('tablet', 'tablet-small') {
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 16px;
      grid-row-gap: 24px;
    }

    @include mq('tablet-small') {
      grid-column-gap: 12px;
      grid-row-gap: 16px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.gridCount__more .cardSection__list {
  @include mq('tablet-small') {
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 16px;
  }
}
</style>
