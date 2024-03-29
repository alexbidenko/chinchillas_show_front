<template>
  <nuxt-link
    class="chinchillaCard"
    :class="{ chinchillaCard__opened: opened }"
    :to="`/profile/chinchillas/${chinchilla.id}`"
  >
    <div class="chinchillaCard__container">
      <nuxt-img
        class="chinchillaCard__image"
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
      <div class="chinchillaCard__bubbleContainer" @click.stop.prevent>
        <div class="chinchillaCard__infoBubble">
          <v-icon>info</v-icon>
        </div>
      </div>
      <div class="chinchillaCard__info">
        <p class="chinchillaCard__infoRow">
          Пол: {{ chinchilla.sex === 'f' ? 'самка' : 'самец' }}
        </p>
        <p class="chinchillaCard__infoRow">
          {{ colorString || 'стандарт' }}
        </p>
        <p class="chinchillaCard__infoRow">
          {{ opened ? birthdayDate : dateDifference }}
        </p>
      </div>
    </div>
    <div class="chinchillaCard__titleContainer">
      <h4 class="chinchillaCard__title">
        {{ chinchilla.name }} <span v-if="!chinchilla.color">(без окраса)</span>
      </h4>
    </div>
  </nuxt-link>
</template>

<script>
import dateFormat from 'assets/scripts/dateFormat'
import colorToString from '~/assets/scripts/colorToString'
import dateDifference from '~/assets/scripts/dateDifference'

export default {
  name: 'ChinchillaCard',

  props: {
    chinchilla: {
      type: Object,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    colorString() {
      return colorToString(this.chinchilla.color)
    },
    dateDifference() {
      return dateDifference(this.chinchilla.birthday, new Date(), 'sm')
    },
    birthdayDate() {
      return dateFormat(this.chinchilla.birthday, 'yyyy.MM.dd')
    },
  },
}
</script>

<style lang="scss">
.chinchillaCard {
  $self: &;

  padding-top: 100%;
  background-color: #ccc;
  position: relative;
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    aspect-ratio: 1 / 1;
  }

  &__image {
    max-height: 100%;
    object-fit: cover;
    display: block;
  }

  &__titleContainer {
    position: absolute;
    background-color: #828282;
    padding: 0 16px;
    height: 34px;
    width: 100%;
    left: 0;
    bottom: 0;

    @include mq('desktop-small') {
      height: 24px;
    }

    @include mq('tablet-small') {
      height: 20px;
    }
  }

  &__info {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(224, 224, 224, 0.86);
    transform: translateY(100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.3s ease;
    padding: 0 14px 34px;

    @include mq('desktop') {
      padding: 0 10px 34px;
    }

    @include mq('desktop-small') {
      padding: 0 12px 24px;
    }

    @include mq('tablet') {
      padding: 0 10px 24px;
    }

    @include mq('tablet-small') {
      padding: 0 12px 20px;
    }

    @include mq('phone') {
      padding: 0 8px 20px;
    }
  }

  &__opened,
  &:hover {
    #{$self}__info {
      transform: translateY(0);
    }

    #{$self}__infoBubble {
      transform: translateY(-50px);
    }
  }

  & &__infoRow {
    font-size: 14px;
    color: #797979;
    display: -webkit-box;
    margin-bottom: 8px;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    @include mq('desktop') {
      line-height: 120%;
      font-size: 11px;
      margin-bottom: 6px;
    }

    @include mq('tablet-small') {
      font-size: 11px;
      margin-bottom: 4px;
    }

    @include mq('phone') {
      font-size: 9px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    text-align: center;
    color: #fff;
    border-top: 1px solid #fff;
    line-height: 33px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & span {
      color: red;
    }

    @include mq('desktop-small') {
      line-height: 23px;
      font-size: 18px;
    }

    @include mq('tablet-small') {
      line-height: 19px;
      font-size: 14px;
    }
  }

  & .v-responsive__content {
    width: 100% !important;
  }

  &__bubbleContainer {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    width: 56px;
    height: 56px;
  }

  &__infoBubble {
    background: #d79b00;
    transition: transform 0.3s ease;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: none;

    @include mq('tablet') {
      display: flex;
    }
  }
}

.gridCount__more .chinchillaCard {
  &__bubbleContainer {
    @include mq('tablet-small') {
      padding: 8px;
      width: 40px;
      height: 40px;
    }
  }

  &__info {
    @include mq('tablet-small') {
      padding: 0 8px 16px;
    }

    @include mq('phone') {
      padding: 0 4px 16px;
    }
  }

  &__infoRow {
    @include mq('tablet-small') {
      font-size: 10px;
      -webkit-line-clamp: 2;
    }

    @include mq('phone') {
      font-size: 8px;
    }
  }

  &__titleContainer {
    @include mq('tablet-small') {
      height: 16px;
    }
  }

  &__title {
    @include mq('tablet-small') {
      line-height: 16px;
      font-size: 12px;
    }
  }
}
</style>
