<template>
  <nuxt-link class="userBlock" :to="`/profile?id=${user.id}`">
    <div class="userBlock__background">
      <div class="userBlock__backgroundImage"></div>
    </div>
    <div class="userBlock__container baseContainer">
      <div class="userBlock__cell">
        <div class="userBlock__avatarContainer">
          <p class="userBlock__name">{{ user.first_name || 'Не указано' }}</p>
          <p class="userBlock__name">{{ user.last_name || 'Не указано' }}</p>
          <div
            class="userBlock__avatar"
            :style="{
              backgroundImage: `url(${
                user.avatar
                  ? `https://api.chinchillas-show.com/photos/users/${user.id}/${user.avatar}`
                  : '/assets/empty.jpg'
              })`,
            }"
          />
        </div>
      </div>
      <div class="userBlock__cell">
        <p
          v-for="meta in infoMetaRight"
          :key="meta.key"
          class="userBlock__info"
        >
          <span>{{ meta.label }}</span>
          <span>{{ user[meta.key] || 'Не указано' }}</span>
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'UserBlock',

  props: {
    user: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      infoMetaRight: [
        ...(this.small
          ? []
          : [
              {
                label: 'Телефон',
                key: 'phone',
              },
              {
                label: 'E-Mail',
                key: 'email',
              },
            ]),
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
}
</script>

<style lang="scss">
.userBlock {
  $self: &;
  position: relative;
  width: 100%;
  background: #838383;
  text-decoration: none;
  color: #d79b00;

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

    @include mq('tablet') {
      width: 100%;
    }
  }

  &__avatarContainer {
    background: #d79b00;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 16px;
    width: fit-content;
    position: relative;

    @include mq('tablet') {
      margin: 0 auto 40px;
    }

    @include mq('tablet-small') {
      margin-left: 0;
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

    &:first-of-type {
      top: 15%;
      left: 60%;
      padding-left: 40%;
    }

    &:last-of-type {
      top: 45%;
      left: 75%;
      padding-left: 35%;
    }

    @include mq('tablet-small') {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
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
    cursor: pointer;
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
  }

  &__info {
    background: #ebebeb;
    width: 100%;
    height: 40px;
    font-size: 18px;
    border-radius: 20px;
    padding: 4px 0;
    display: flex;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    @include mq('tablet-small') {
      height: 24px;
      font-size: 14px;
    }

    & * {
      text-align: center;
      white-space: nowrap;
    }

    & *:first-child {
      width: 40%;
      flex: 0 0 40%;
      border-right: 1px solid #d9d9d9;
    }

    & *:last-child {
      width: 60%;
      flex: 0 0 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 16px;
    }
  }
}
</style>
