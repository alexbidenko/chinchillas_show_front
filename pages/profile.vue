<script lang="ts" setup>
const userStore = useUserStore();

onServerPrefetch(async () => {
  await userStore.checkUser();
});

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <v-app class="profileLayout">
    <ProfileHeader />
    <main class="profileLayout__content">
      <NuxtPage />
    </main>
    <ProfileFooter />
  </v-app>
</template>

<style lang="scss">
.profileLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    display: flex;
  }
}
</style>
