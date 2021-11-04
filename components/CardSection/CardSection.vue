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
          <v-btn icon>
            <v-icon>{{
              expand ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </v-btn>
        </div>
      </header>
      <main v-if="expand" class="cardSection__list baseContainer">
        <ChinchillaCard
          v-for="item in items"
          :key="item.id"
          :chinchilla="item"
        ></ChinchillaCard>
      </main>
    </div>
  </section>
</template>

<script>
import ChinchillaCard from '../ChinchillaCard/ChinchillaCard'

export default {
  name: 'CardSection',

  components: {
    ChinchillaCard,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    defaultExpand: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      expand: this.defaultExpand,
    }
  },
}
</script>

<style lang="scss">
.cardSection {
  width: 100%;
  padding: 24px 0 0;
  background-color: #adadad;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 32px;

  &__container {
    background-color: white;
  }

  &__header {
    padding: 24px 0;
    cursor: pointer;
  }

  &__title {
    background: #d79b00;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
    height: calc(100% + 24px);
    font-size: 24px;
    padding-right: 32px;
    border-radius: 0 24px 24px 0;
    display: flex;
    align-items: center;

    @include mq('tablet-small') {
      font-size: 18px;
      height: calc(100% + 8px);
    }
  }

  &__headerCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e2e2e2;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    height: 24px;
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
      grid-column-gap: 18px;
      grid-row-gap: 24px;
    }

    @include mq('tablet-small') {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
