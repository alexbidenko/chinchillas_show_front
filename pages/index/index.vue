<template>
  <v-app class="defaultLayout">
    <PublicHeader :user="user" />
    <main class="defaultLayout__content">
      <NuxtPage />
    </main>
    <PublicFooter />
  </v-app>
</template>

<script>
import {mapStores} from "pinia";

export default {
  computed: {
    ...mapStores(useUserStore),
    user() {
      return this.userStore.user
    },
  },

  created() {
    this.userStore.checkUser();
  },
}
</script>

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
