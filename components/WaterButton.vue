<script lang="ts" setup>
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="baseButton"
  >
    <slot />
  </NuxtLink>
</template>

<style lang="scss">
.baseButton {
  @include buttonReset;
  display: inline-flex;
  align-items: center;
  background: linear-gradient(317.7deg, #fff 0%, #000 105.18%), #eaeefb;
  background-blend-mode: soft-light, normal;
  box-shadow: 5px 5px 10px rgba(208, 220, 255, 0.63), -5px -5px 15px #f3f6ff, inset -5px -5px 7px #e1e9ff, inset 5px 5px 7px #f3f6ff;
  border-radius: 40px;
  appearance: none;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 1.3em;
  color: #59566e !important;
  font-weight: 400;
  justify-content: center;
  padding: 20px;
  min-width: 194px;
  letter-spacing: -0.03em;
  text-decoration: none;
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, 0.3s opacity ease;

  &:not(&--active):hover,
  &:not(&--active):focus {
    background: linear-gradient(317.7deg, #fff 0%, #000 105.18%), #f2f4fe;
    box-shadow: 2px 2px 6px rgba(208, 220, 255, 0.63), -4px -5px 10px #fff, inset -3px -3px 6px #e1e9ff, inset 2px 2px 4px #fff;
  }

  &--active,
  &:active {
    background: linear-gradient(317.7deg, rgba(255, 255, 255, 0.57) 0%, #000 105.18%), #e6eaff;
    box-shadow: -3px -3px 5px rgba(208, 220, 255, 0.67), 3px 3px 7px #fff, inset 2px 2px 6px #cbd0ff, inset -2px -2px 5px rgba(255, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @include mq("desktop", "desktop-small") {
    font-size: 14px;
    min-width: 168px;
    padding: 14px;
  }

  @include mq("desktop-small", "tablet") {
    min-width: 150px;
    font-size: 14px;
    padding: 11px;
  }

  @include mq("tablet", "tablet-small") {
    min-width: 168px;
    padding: 14px;
  }

  @include mq("tablet-small", "phone") {
    min-width: 158px;
    font-size: 14px;
    padding: 11px;
  }

  @include mq("phone") {
    min-width: 150px;
    font-size: 14px;
    padding: 11px;
  }
}

</style>
