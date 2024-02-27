<template>
  <div class="passwordPage">
    <v-card>
      <v-card-title>Изменение пароля</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="password"
          label="Введите пароль"
          type="password"
          class="passwordPage__input"
        />
        <v-text-field
          v-model="repeatPassword"
          label="Повторите пароль"
          type="password"
          class="passwordPage__input"
        />
        <v-btn
          :disabled="password !== repeatPassword || password.length < 8"
          :loading="request"
          @click="savePassword"
          >Сохранить</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'profileLayout',
  data: () => ({
    password: '',
    repeatPassword: '',
    request: false,
  }),

  methods: {
    savePassword() {
      this.request = true
      $request
        .$post('user/password', { password: this.password })
        .then(() => {
          this.$router.push('/profile')
        })
        .finally(() => {
          this.request = false
        })
    },
  },
}
</script>

<style lang="scss">
.passwordPage {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__input {
    width: 280px;
  }
}
</style>
