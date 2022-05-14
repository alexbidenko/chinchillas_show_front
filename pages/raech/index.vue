<template>
  <div class="raechPage">
    <p class="raechPage__title mb-0">РАЭШ</p>
    <p class="text--secondary mt-2">Раздел сайта находится в разработке</p>
  </div>
</template>

<script></script>

<style lang="scss">
.raechPage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  &__title {
    @include buttonReset;
    font-size: 24px;
  }
}
</style>
