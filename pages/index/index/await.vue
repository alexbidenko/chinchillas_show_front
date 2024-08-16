<template>
  <div class="awaitPage baseContainer">
    <span class="awaitPage__title">
      {{ user ? `${user.first_name}, ваша` : 'Ваша' }} заявка на регистрацию
      отправлена, ожидайте ее проверки
    </span>

    <v-btn @click="logout">Выйти</v-btn>
  </div>
</template>

<script>
import {mapStores} from "pinia";

export default {
  name: 'AwaitPage',

  computed: {
    ...mapStores(useUserStore),
    user() {
      return this.userStore.user
    },
  },

  watch: {
    user: {
      handler(v) {
        if (v?.admitted) this.$router.push('/profile')
      },
      immediate: true,
    },
  },

  methods: {
    logout() {
      this.$cookies.remove('TOKEN')
      this.$cookies.remove('USER_ID')
      this.userStore.logout()
      this.$router.push('/auth')
    },
  },
}
</script>

<style lang="scss">
.awaitPage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  flex: 1;

  &__title {
    @include buttonReset;
    font-size: 24px;
  }
}
</style>
