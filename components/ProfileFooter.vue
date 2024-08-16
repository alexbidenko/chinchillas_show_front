<template>
  <footer class="profileFooter">
    <div class="profileFooter__divider"/>
    <nav class="profileFooter__nav baseContainer">
      <span class="profileFooter__mainLink">
        <nuxt-link to="/" class="profileFooter__link"
          >Chinchillas-Show</nuxt-link
        >
        ©
        <span class="profileFooter__years">2020-{{ year }}</span>
      </span>

      <div class="profileFooter__links">
        <!--<nuxt-link to="/" class="profileFooter__linksItem">О нас</nuxt-link>-->
        <!--<nuxt-link to="/" class="profileFooter__linksItem">Правила</nuxt-link>-->
        <!--<nuxt-link to="/" class="profileFooter__linksItem">Реклама</nuxt-link>-->
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'ProfileFooter',

  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style lang="scss">
.profileFooter {
  background: #5b5b5b;
  padding: 24px 0 32px;

  &__divider {
    background: #939393;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    height: 32px;
  }

  &__nav {
    padding-top: 48px;
    display: flex;
    justify-content: space-between;

    @include mq('tablet') {
      flex-direction: column;
    }
  }

  &__link {
    @include buttonReset;
    color: white !important;
  }

  &__mainLink {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: white;

    @include mq('tablet') {
      margin-bottom: 32px;
    }
  }

  &__years {
    color: #d79b00;
  }

  &__links {
    width: fit-content;
    display: flex;

    @include mq('tablet') {
      margin-left: -16px;
      flex-direction: column;
    }
  }

  &__linksItem {
    @include buttonReset;
    font-size: 18px;
    line-height: 18px;
    display: flex;
    align-items: center;
    font-family: 'Noto Sans', sans-serif;
    color: #fff !important;
    padding: 16px;
  }
}
</style>
