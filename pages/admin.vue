<script setup>
definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <v-app class="adminLayout">
    <div>
      <v-toolbar dense>
        <nuxt-link to="/">
          <v-toolbar-title>Chinchillas-Show</v-toolbar-title>
        </nuxt-link>

        <v-spacer />

        <v-btn nuxt variant="text" to="/admin/users">Пользователи</v-btn>
        <v-btn nuxt variant="text" to="/admin/chinchillas">Шиншиллы</v-btn>
        <v-btn nuxt variant="text" to="/profile">Профиль</v-btn>
      </v-toolbar>

      <NuxtPage />
    </div>
  </v-app>
</template>

<style lang="scss">
.adminLayout {
  min-height: 100vh;
}
</style>
