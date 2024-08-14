<template>
  <NuxtLoadingIndicator />
  <NuxtPage />
</template>

<style lang="scss" src="~/assets/styles/reset.scss" />
<style lang="scss" src="~/assets/styles/styles.scss" />

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
