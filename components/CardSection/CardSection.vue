<template>
  <section class="cardSection">
    <div class="cardSection__container">
      <header v-if="title" class="cardSection__header">
        <div class="cardSection__headerCard">
          <h3 class="cardSection__title paddingLeft">
            {{ title }}
          </h3>
        </div>
      </header>
      <main class="cardSection__list baseContainer baseGrid">
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
    background-color: #e2e2e2;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    height: 24px;
  }

  &__list {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}
</style>
