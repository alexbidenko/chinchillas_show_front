<template>
  <header class="profileHeader">
    <nuxt-link class="profileHeader__logo paddingLeft" to="/"
      >Chinchillas - show</nuxt-link
    >
    <nav class="profileHeader__nav paddingRight">
      <nuxt-link v-if="user" class="profileHeader__link" to="/profile"
        >Профиль</nuxt-link
      >
      <nuxt-link class="profileHeader__link" to="/raech">РАЭШ</nuxt-link>
      <nuxt-link class="profileHeader__link" to="/auction">Аукцион</nuxt-link>
      <nuxt-link
        v-if="user && isRussian"
        class="profileHeader__link"
        to="/profile/users"
        >Люди</nuxt-link
      >
      <nuxt-link class="profileHeader__link" to="/profile/search"
        >Шиншиллы</nuxt-link
      >
      <nuxt-link v-if="user" class="profileHeader__link" to="/auction"
        >Калькулятор</nuxt-link
      >
      <button v-if="user" class="profileHeader__link" @click="logout">
        Выход
      </button>
      <BaseSidenav>
        <nuxt-link
          v-if="user && isRussian"
          class="profileHeader__sidenavLink"
          to="/profile"
          >Профиль</nuxt-link
        >
        <nuxt-link class="profileHeader__sidenavLink" to="/raech"
          >РАЭШ</nuxt-link
        >
        <nuxt-link class="profileHeader__sidenavLink" to="/auction"
          >Аукцион</nuxt-link
        >
        <nuxt-link
          v-if="user"
          class="profileHeader__sidenavLink"
          to="/profile/users"
          >Люди</nuxt-link
        >
        <nuxt-link class="profileHeader__sidenavLink" to="/profile/search"
          >Шиншиллы</nuxt-link
        >
        <nuxt-link v-if="user" class="profileHeader__sidenavLink" to="/auction"
          >Калькулятор</nuxt-link
        >
        <button v-if="user" class="profileHeader__sidenavLink" @click="logout">
          Выход
        </button>
      </BaseSidenav>
    </nav>
  </header>
</template>

<script>
import BaseSidenav from '../BaseSidenav/BaseSidenav.vue'
import Actions from '~/store/actions.type'

export default {
  name: 'ProfileHeader',

  components: {
    BaseSidenav,
  },

  computed: {
    user() {
      return this.$store.state.UserModule.user
    },
    isRussian() {
      return this.$store.state.UserModule.country === 'RU'
    },
  },

  methods: {
    logout() {
      this.$cookies.remove('TOKEN')
      this.$cookies.remove('USER_ID')
      this.$store
        .dispatch('UserModule/' + Actions.LOGOUT)
        .then(() => this.$router.push('/auth'))
    },
  },
}
</script>

<style lang="scss">
.profileHeader {
  background: url('/assets/background/profile_header_background.png') no-repeat
    center / cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 120px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;

  &__logo {
    background: #d79b00;
    border-radius: 0 16px 16px 0;
    width: fit-content;
    height: 32px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    align-items: center;
    color: #fff !important;
    padding-right: 24px;
    text-decoration: none;

    @include mq('tablet-small') {
      font-size: 18px;
    }
  }

  &__nav {
    background: #d79b00;
    margin-left: auto;
    display: flex;
    height: 32px;
    border-radius: 24px 0 0 24px;
    overflow: hidden;
    border: 8px solid #d0d0d0;
    border-right: 0;
    align-items: center;
    color: #fff !important;
    width: fit-content;
    box-sizing: content-box !important;

    @include mq('tablet') {
      height: 44px;
      border-radius: 32px 0 0 32px;
      border-width: 4px;
    }

    @include mq('tablet-small') {
      height: 40px;
    }
  }

  &__link {
    @include buttonReset;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff !important;
    padding: 0 16px;
    height: 100%;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    @include mq('tablet') {
      display: none;
    }

    &:hover {
      background: #aa7a00;
      box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2) inset;
    }
  }

  &__sidenavLink {
    @include buttonReset;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    display: block;
    align-items: center;
    text-align: left;
    color: #000 !important;
    text-decoration: none;
    padding: 8px 16px;
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
