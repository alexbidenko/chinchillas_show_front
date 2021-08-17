<template>
  <section
    class="featureSection"
    :class="{ 'featureSection--reverse': reverse }"
  >
    <div class="featureSection__imageContainer">
      <img :src="image" :alt="title" />
      <div class="featureSection__overlay"></div>
    </div>
    <div class="featureSection__textContainer">
      <h3 class="featureSection__title">{{ title }}</h3>
      <p class="featureSection__text">{{ text }}</p>
      <WaterButton class="featureSection__action" :to="url">{{
        actionText
      }}</WaterButton>
    </div>
  </section>
</template>

<script>
import WaterButton from '~/components/WaterButton/WaterButton.vue'

export default {
  name: 'FeatureSection',

  components: {
    WaterButton,
  },

  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    actionText: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.featureSection {
  $self: &;

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: auto;
  padding: 80px 0;

  @media (min-width: 1042px) {
    flex-direction: row;
    align-items: center;
  }

  &__imageContainer {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    width: 100%;
    position: relative;
    min-height: 1px;
    max-height: 315px;
    display: flex;
    align-items: center;

    @media (min-width: 768px) {
      max-height: 595px;
    }

    @media (min-width: 1042px) {
      max-width: 70%;
      order: 2;
      right: 0;
    }
  }

  &__textContainer {
    color: #fff;
    display: -webkit-flex;
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    margin: -18% 1.66667em 0;
    align-self: flex-end;
    z-index: 1;

    @media (min-width: 576px) {
      width: 59%;
      margin: -60px 5.55556em 0;
    }

    @media (min-width: 1042px) {
      padding-left: 10%;
      order: 1;
      width: 40%;
      margin: 0 -10% 0 0;
      -webkit-align-self: center;
      align-self: center;
    }
  }

  &__overlay {
    position: absolute;
    height: 50%;
    width: 100%;
    bottom: 0;
    background-image: linear-gradient(
      0deg,
      rgba(16, 20, 27, 0.4),
      rgba(16, 20, 27, 0) 98%
    );

    @media (min-width: 1042px) {
      width: 33%;
      height: 100%;
      background-image: linear-gradient(
        90deg,
        rgba(16, 20, 27, 0.8),
        rgba(16, 20, 27, 0) 98%
      );
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #f9f4f2;
    text-align: right;
    margin-top: 5px;

    @media (min-width: 576px) {
      font-size: 48px;
      line-height: 55px;
    }

    @media (min-width: 1042px) {
      font-size: 60px;
      line-height: 65px;
      margin-top: 20px;
    }
  }

  &__text {
    font-size: 0.77778em;
    line-height: 20px;
    text-align: right;
    margin-top: 1.11111em;

    @media (min-width: 1042px) {
      font-size: 0.88889em;
      line-height: 24px;
    }
  }

  &__action {
    margin-top: 1.11111em;
  }

  &--reverse {
    #{$self}__imageContainer {
      @media (min-width: 1042px) {
        order: 1;
      }
    }

    #{$self}__textContainer {
      @media (min-width: 1042px) {
        order: 2;
      }

      * {
        text-align: left !important;
      }

      @media (min-width: 576px) {
        width: 59%;
        margin: -60px 5.55556em 0;
      }

      @media (min-width: 1042px) {
        align-self: center;
        padding-left: 0;
        padding-right: 10%;
        margin: 0 0 0 -10%;
      }
    }
  }
}
</style>
