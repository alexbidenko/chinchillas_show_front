<template>
  <div class="baseSidenav">
    <button class="baseSidenav__button" @click="isOpen = !isOpen">
      <svg>
        <use xlink:href="~/assets/sprites/common.svg#icon_hamburger" />
      </svg>
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="baseSidenav__background"
        @click="isOpen = false"
      />
    </transition>

    <nav
      class="baseSidenav__menu"
      :class="{ 'baseSidenav__menu--open': isOpen }"
    >
      <slot />
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BaseSidenav',

  data() {
    return {
      isOpen: false,
    }
  },

  watch: {
    $route() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss">
.baseSidenav {
  width: fit-content;

  &__button {
    @include buttonReset;
    width: 64px;
    height: 64px;
    padding: 12px;
    display: none;
    stroke: white;

    svg {
      width: 100%;
      height: 100%;
      color: white;
    }

    @include mq('tablet') {
      display: inline-flex;
    }

    @include mq('tablet-small') {
      width: 40px;
      height: 40px;
      padding: 8px;
    }
  }

  &__background {
    opacity: 0.5;
    background: black;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 0.3s;
    z-index: 999;

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
  }

  &__menu {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    transition: transform 0.3s;
    transform: translateX(100%);
    background: white;
    z-index: 1000;
    padding: 24px 0;

    &--open {
      transform: translateX(0);
    }
  }
}
</style>
