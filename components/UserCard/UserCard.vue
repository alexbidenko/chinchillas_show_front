<template>
  <nuxt-link class="userCard" :to="`/profile/${user.id}`">
    <v-img
      :src="
        user.avatar
          ? `https://api.chinchillas-show.com/photos/users/${user.id}/${user.avatar}`
          : '/assets/empty.jpg'
      "
      lazy-src="/assets/empty.jpg"
      class="userCard__avatar"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <div class="userCard__block">
      <p class="userCard__info"><b>Имя:</b> {{ user.first_name }}</p>
      <p class="userCard__info"><b>Фамилия:</b> {{ user.last_name }}</p>
    </div>
    <div class="userCard__block">
      <p class="userCard__info"><b>Страна:</b> {{ user.country }}</p>
      <p class="userCard__info"><b>Город:</b> {{ user.city }}</p>
    </div>

    <p class="userCard__count">{{ user.chinchillasCount }}</p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'UserCard',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.userCard {
  background: linear-gradient(55.31deg, #b0a9be 18.85%, #e8dbad 70.24%);
  box-shadow: 0 7px 14px rgba(14, 13, 13, 0.4);
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
  text-decoration: none;

  @include mq('tablet-small') {
    padding: 8px;
  }

  &__avatar {
    aspect-ratio: 1 / 1;
    box-shadow: 0 7px 14px rgba(14, 13, 13, 0.4);
    border-radius: 48px;
    width: 100%;
    margin-bottom: 24px;

    @include mq('tablet-small') {
      margin-bottom: 16px;
      border-radius: 32px;
    }
  }

  &__block {
    border-left: #cfcfcf solid 2px;
    padding-left: 6px;
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }

    @include mq('tablet-small') {
      padding-left: 2px;
    }
  }

  &__info {
    margin-top: 0;
    margin-bottom: 8px !important;
    font-size: 20px;
    line-height: 24px;
    color: #373434;

    &:last-child {
      margin-bottom: 0;
    }

    @include mq('desktop-small') {
      font-size: 14px;
      line-height: 18px;
    }

    @include mq('tablet') {
      font-size: 16px;
      line-height: 20px;
    }

    @include mq('tablet-small') {
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 4px !important;
    }
  }

  &__count {
    width: 132px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px auto 0 !important;
    border: 2px solid #f2e9e9;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 20px;
    line-height: 24px;
    color: #373434;

    @include mq('tablet-small') {
      width: 76px;
      height: 24px;
      font-size: 12px;
      line-height: 16px;
      margin: 16px auto 0 !important;
    }
  }
}
</style>
