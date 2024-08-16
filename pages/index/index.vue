<template>
  <v-app class="defaultLayout">
    <PublicHeader />
    <main class="defaultLayout__content">
      <NuxtPage />
    </main>
    <PublicFooter />
  </v-app>
</template>

<style lang="scss">
.defaultLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    display: flex;
  }
}
</style>
