<script lang="ts" setup>
defineProps<{
  isLight?: boolean;
}>();
</script>

<template>
  <span class="baseSpinner" :class="{ 'baseSpinner--light': isLight }" />
</template>

<style lang="scss">
.baseSpinner {
  width: 196px;
  height: 196px;
  border: 2px solid #e4e4e4;
  position: relative;
  border-radius: 50%;
  display: block;

  @include mq("desktop-small", "tablet") {
    width: 130px;
    height: 130px;
  }

  @include mq("phone") {
    width: 130px;
    height: 130px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    transform: translate(-50%, -50%) rotate(0deg);
    border: 2px solid transparent;
    border-bottom-color: #0b0d12;
    border-left-color: #0b0d12;
    border-radius: inherit;
    animation: preloader-rotate 1s linear infinite;
  }

  &--light {
    border-color: rgba(#fff, 0.1);

    &::before {
      border-bottom-color: #fff;
      border-left-color: #fff;
    }
  }
}

@keyframes preloader-rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
