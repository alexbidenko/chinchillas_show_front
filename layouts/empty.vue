<template>
  <v-app class="empty">
    <nuxt />
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style lang="scss">
.empty {
  min-height: 100vh;
}
</style>
