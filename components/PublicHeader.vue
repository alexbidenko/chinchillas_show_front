<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <header class="publicHeader">
    <nuxt-link to="/" class="publicHeader__logo paddingLeft">
      Chinchillas - show
    </nuxt-link>
    <nav class="publicHeader__nav paddingRight">
      <nuxt-link
        v-if="userStore.isModerator"
        class="publicHeader__link"
        to="/admin"
      >
        Админ
      </nuxt-link>
      <nuxt-link class="publicHeader__link" to="/">Главная</nuxt-link>
      <nuxt-link class="publicHeader__link" to="/raech">РАЭШ</nuxt-link>
      <nuxt-link class="publicHeader__link" to="/auction">Аукцион</nuxt-link>

      <BaseSidenav>
        <nuxt-link
          v-if="userStore.isModerator"
          class="publicHeader__sidenavLink"
          to="/admin"
        >
          Админ
        </nuxt-link>
        <nuxt-link class="publicHeader__sidenavLink" to="/">Главная</nuxt-link>
        <nuxt-link class="publicHeader__sidenavLink" to="/raech">
          РАЭШ
        </nuxt-link>
        <nuxt-link class="publicHeader__sidenavLink" to="/auction">
          Аукцион
        </nuxt-link>
      </BaseSidenav>
    </nav>
  </header>
</template>

<style lang="scss">
.publicHeader {
  background: #d79b00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 64px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;

  &__logo {
    background: #fff;
    border-radius: 0 16px 16px 0;
    height: 32px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    align-items: center;
    color: #d79b00;
    padding-right: 24px;
    text-decoration: none;

    @include mq('tablet-small') {
      height: 24px;
      font-size: 18px;
    }
  }

  &__nav {
    margin-left: auto;
    display: flex;
    height: 100%;
    align-items: center;
    width: fit-content;
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

    @include mq('tablet') {
      display: none;
    }
  }

  &__sidenavLink {
    @include buttonReset;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    display: block;
    align-items: center;
    color: #000 !important;
    text-decoration: none;
    padding: 8px 16px;
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
