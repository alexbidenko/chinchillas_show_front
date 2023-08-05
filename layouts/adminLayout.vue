<template>
  <v-app class="adminLayout">
    <div>
      <v-toolbar dense>
        <nuxt-link to="/">
          <v-toolbar-title>Chinchillas-Show</v-toolbar-title>
        </nuxt-link>

        <v-spacer />

        <v-btn nuxt text to="/admin/users">Пользователи</v-btn>
        <v-btn nuxt text to="/admin/chinchillas">Шиншиллы</v-btn>
        <v-btn nuxt text to="/profile">Профиль</v-btn>
      </v-toolbar>
      <nuxt />
    </div>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style lang="scss">
.adminLayout {
  min-height: 100vh;
}
</style>
