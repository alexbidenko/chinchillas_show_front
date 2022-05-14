<template>
  <div class="auctionPage">
    <p class="auctionPage__title mb-0">Аукцион</p>
    <p class="text--secondary mt-2">Раздел сайта находится в разработке</p>
  </div>
</template>

<script></script>

<style lang="scss">
.auctionPage {
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
