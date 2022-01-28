<template>
  <section class="chinchillaHeader">
    <div class="chinchillaHeader__background">
      <div class="chinchillaHeader__backgroundImage"></div>
    </div>
    <div class="chinchillaHeader__container baseContainer">
      <div class="chinchillaHeader__cell">
        <div class="chinchillaHeader__avatarContainer">
          <div class="chinchillaHeader__name">
            {{ chinchilla.name }}
          </div>
          <div
            class="chinchillaHeader__name chinchillaHeader__name--desktopOnly"
          >
            {{ colorString || 'Стандарт' }}
          </div>
          <Status
            class="chinchillaHeader__name"
            :data="chinchilla"
            @updateStatuses="$emit('updateStatuses', $event)"
            @updateConclusion="$emit('updateConclusion', $event)"
            @updateOwner="$emit('updateOwner', $event)"
          />
          <div
            class="chinchillaHeader__avatar"
            :style="{
              backgroundImage: `url(${
                chinchilla.avatar
                  ? `https://api.chinchillas-show.com/photos/chinchillas/${chinchilla.owner_id}/${chinchilla.id}/${chinchilla.avatar.name}`
                  : '/assets/empty.jpg'
              })`,
            }"
          />
        </div>
      </div>
      <div class="chinchillaHeader__cell">
        <div
          v-if="chinchilla.owner.first_name"
          class="chinchillaHeader__avatarContainer chinchillaHeader__avatarContainer--owner"
        >
          <p class="chinchillaHeader__name chinchillaHeader__name--owner">
            {{ chinchilla.owner.first_name || 'Не указано' }}
          </p>
          <p class="chinchillaHeader__name chinchillaHeader__name--owner">
            {{ chinchilla.owner.last_name || 'Не указано' }}
          </p>
          <nuxt-link
            :to="`/profile?id=${chinchilla.owner.id}`"
            class="chinchillaHeader__avatar chinchillaHeader__avatar--owner"
            :style="{
              backgroundImage: `url(${
                chinchilla.owner.avatar
                  ? `https://api.chinchillas-show.com/photos/users/${chinchilla.owner.id}/${chinchilla.owner.avatar}`
                  : '/assets/empty.jpg'
              })`,
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import colorToString from '~/assets/scripts/colorToString'
import Status from '~/components/ChinchillaHeader/Status/Status'

export default {
  name: 'ChinchillaHeader',
  components: { Status },
  props: {
    chinchilla: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      infoMetaRight: [
        {
          label: 'Телефон',
          key: 'phone',
        },
        {
          label: 'E-Mail',
          key: 'email',
        },
        {
          label: 'Страна',
          key: 'country',
        },
        {
          label: 'Город',
          key: 'city',
        },
      ],
    }
  },

  computed: {
    colorString() {
      return this.chinchilla ? colorToString(this.chinchilla.color) : ''
    },
  },
}
</script>

<style lang="scss">
.chinchillaHeader {
  $self: &;
  position: relative;
  width: 100%;
  background: #838383;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);

  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__backgroundImage {
    height: 100%;
    background: no-repeat center / cover
      url('/assets/background/background_wave.svg');
  }

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 80px;
    padding-bottom: 80px;

    @include mq('tablet') {
      display: block;
    }
  }

  &__cell {
    width: 50%;
  }

  &__avatarContainer {
    background-color: #d79b00;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 16px;
    width: fit-content;
    position: relative;

    @include mq('tablet') {
      margin: 0 auto 40px;
    }

    @include mq('phone') {
      margin-left: 0;
    }

    &--owner {
      background-color: #11a3f5;
      padding: 12px;
    }
  }

  &__name {
    background: #ebebeb;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 18px;
    display: block;
    position: absolute;
    white-space: nowrap;
    padding: 0 32px;
    width: fit-content;
    box-sizing: border-box;

    @include mq('tablet-small') {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }

    &:first-of-type {
      top: 15%;
      left: 60%;
      padding-left: 40%;
    }

    &:nth-of-type(2) {
      top: 45%;
      left: 75%;
      padding-left: 35%;
    }

    &:nth-of-type(3) {
      top: 75%;
      left: 45%;
      padding-left: 50%;
    }

    &--owner {
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      font-size: 14px;
    }

    &--desktopOnly {
      @include mq('desktop-small') {
        display: none;
      }
    }

    &--desktopOnly + &:nth-of-type(3) {
      @include mq('desktop-small') {
        top: 45%;
        left: 75%;
        padding-left: 35%;
      }
    }
  }

  &__avatar {
    width: 180px;
    height: 180px;
    background: no-repeat center / cover;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    display: block;

    @include mq('tablet') {
      width: 240px;
      height: 240px;
    }

    @include mq('tablet-small') {
      width: 120px;
      height: 120px;
    }

    &:hover #{$self}__change {
      top: 0;
      transform: translateX(-50%);
    }

    &--owner {
      width: 140px;
      height: 140px;

      @include mq('tablet') {
        width: 180px;
        height: 180px;
      }

      @include mq('tablet-small') {
        width: 90px;
        height: 90px;
      }
    }
  }
}
</style>
