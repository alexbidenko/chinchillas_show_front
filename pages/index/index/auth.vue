<script>
import { required, email, minLength } from '@vuelidate/validators'
import {mapStores} from "pinia";
import useVuelidate from "@vuelidate/core";

export default {
  setup () {
    const loading = ref(false);

    return { v$: useVuelidate(), loading }
  },

  data() {
    return {
      mode: 'signIn',
      email: '',
      signIn: {
        email: '',
        password: '',
      },
      signUp: {
        login: '',
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        country: '',
        city: '',
        password: '',
      },
      repeatPassword: '',
      showPassword: false,
      dialog: false,
    }
  },

  computed: {
    ...mapStores(useTokenStore),
  },

  methods: {
    // TODO: нет логики
    submitRemind() {},
    submitSignIn() {
      this.loading = true;

      $request('login', {
        method: 'post',
        body: this.signIn,
      }).then((data) => {
        const date = new Date()
        date.setFullYear(date.getFullYear() + 200)
        this.$cookies.set('TOKEN', data.token, { expires: date })
        this.$cookies.set('USER_ID', data.user.id, { expires: date })
        this.tokenStore.value = data.token;
        this.$router.push('/profile')
      }).finally(() => {
        this.loading = false;
      })
    },
    submitSignUp() {
      this.loading = true;

      $request('register', {
        method: 'post',
        body: this.signUp,
      }).then((data) => {
        const date = new Date()
        date.setFullYear(date.getFullYear() + 200)
        this.$cookies.set('TOKEN', data.token, { expires: date })
        this.$cookies.set('USER_ID', data.user.id, { expires: date })
        this.tokenStore.value = data.token;
        this.$router.push('/profile')
      }).finally(() => {
        this.loading = false;
      })
    },
  },

  validations() {
    return {
      signUp: {
        login: {
          required,
          minLength: minLength(6),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
        first_name: {
          required,
        },
        last_name: {
          required,
        },
        patronymic: {
          required,
        },
        phone: {
          required,
        },
        country: {
          required,
        },
        city: {
          required,
        },
      },
    };
  },
}
</script>

<template>
  <div class="authPage baseContainer">
    <article class="authPage__card">
      <nav class="authPage__toggle">
        <button
          class="authPage__toggleButton"
          :class="{ 'authPage__toggleButton--active': mode === 'signIn' }"
          @click="mode = 'signIn'"
        >
          Вход
        </button>
        <button
          class="authPage__toggleButton"
          :class="{ 'authPage__toggleButton--active': mode === 'signUp' }"
          @click="mode = 'signUp'"
        >
          Регистрация
        </button>
      </nav>

      <div v-auto-animate class="authPage__container">
        <form
          v-if="mode === 'signIn'"
          key="signIn"
          class="authPage__form authPage__form--signIn"
          @submit.prevent="submitSignIn"
        >
          <v-text-field
            v-model="signIn.email"
            placeholder="Email"
            class="authPage__input"
            type="email"
            name="email"
            autocomplete="email"
            inputmode="email"
          />
          <v-text-field
            v-model="signIn.password"
            placeholder="Пароль"
            :append-inner-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            class="authPage__input"
            name="password"
            autocomplete="current-password"
            @click:append-inner="showPassword = !showPassword"
          />
          <button
            type="button"
            class="authPage__remindPassword"
            @click="mode = 'remind'"
          >
            Забыли пароль?
          </button>
          <Button type="submit" label="Войти" :loading="loading" rounded class="ml-auto !px-8" />
        </form>
        <form
          v-else-if="mode === 'signUp'"
          key="signUp"
          class="authPage__form"
          @submit.prevent
        >
          <v-text-field
            v-model="v$.signUp.email.$model"
            :error="v$.signUp.email.$error"
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="email"
            inputmode="email"
            class="authPage__input"
          />
          <v-text-field
            v-model="v$.signUp.phone.$model"
            :error="v$.signUp.phone.$error"
            type="tel"
            name="phone"
            autocomplete="tel"
            inputmode="tel"
            label="Телефон"
            class="authPage__input"
            mask="+7 (###)-###-##-##"
          />
          <v-text-field
            v-model="v$.signUp.login.$model"
            :error="v$.signUp.login.$error"
            label="Логин"
            class="authPage__input"
            name="login"
            autocomplete="nickname"
          />
          <v-text-field
            v-model="v$.signUp.first_name.$model"
            :error="v$.signUp.first_name.$error"
            label="Имя"
            type="text"
            class="authPage__input"
            name="firstName"
            autocomplete="given-name"
          />
          <v-text-field
            v-model="v$.signUp.last_name.$model"
            :error="v$.signUp.last_name.$error"
            label="Фамилия"
            type="text"
            class="authPage__input"
            name="lastName"
            autocomplete="family-name"
          />
          <v-text-field
            v-model="v$.signUp.patronymic.$model"
            :error="v$.signUp.patronymic.$error"
            label="Отчество"
            type="text"
            class="authPage__input"
            name="patronymic"
            autocomplete="additional-name"
          />
          <v-text-field
            v-model="v$.signUp.country.$model"
            :error="v$.signUp.country.$error"
            label="Страна"
            type="text"
            class="authPage__input"
            name="country"
            autocomplete="country"
          />
          <v-text-field
            v-model="v$.signUp.city.$model"
            :error="v$.signUp.city.$error"
            label="Город"
            type="text"
            class="authPage__input"
            name="city"
            autocomplete="city"
          />
          <v-text-field
            v-model="v$.signUp.password.$model"
            :error="v$.signUp.password.$error"
            label="Пароль"
            :append-inner-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            class="authPage__input"
            name="password"
            autocomplete="new-password"
            @click:append-inne="showPassword = !showPassword"
          />

          <v-dialog v-model="dialog">
            <template #activator="{ props }">
              <Button
                type="submit"
                label="Зарегистрироваться"
                :loading="loading"
                :disabled="v$.$invalid"
                rounded
                class="ml-auto !px-8"
                v-bind="props"
              />
            </template>

            <v-card>
              <v-card-title class="headline"
                >Пожалуйста подтвердите пароль</v-card-title
              >
              <v-card-text>
                <v-text-field
                  v-model="repeatPassword"
                  label="Пароль"
                  type="password"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary"
                  :disabled="repeatPassword !== signUp.password"
                  @click="submitSignUp"
                  >Подтвердить</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </form>
        <form
          v-else
          key="restore"
          class="authPage__form authPage__form--signIn"
          @submit.prevent="submitRemind"
        >
          <v-text-field
            v-model="email"
            placeholder="Email"
            class="authPage__input"
            type="email"
            name="email"
            autocomplete="email"
            inputmode="email"
          />
          <button
            type="button"
            class="authPage__remindPassword"
            @click="mode = 'signIn'"
          >
            Войти
          </button>
          <button type="submit" class="authPage__submit">Восстановить</button>
        </form>
      </div>
    </article>
  </div>
</template>

<style lang="scss">
.authPage {
  flex: 1;
  background: url('/assets/background/background_auth.png') no-repeat center /
    cover;
  display: flex;
  align-items: baseline;
  padding-top: 120px;
  padding-bottom: 40px;

  &__container {
    overflow: hidden !important;
  }

  &__card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    width: 100%;
    max-width: 520px;
    padding: 28px 42px;
    display: flex;
    flex-direction: column;
  }

  &__toggle {
    width: 100%;
    flex: 0 0 36px;
    height: 36px;
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 24px;
    display: flex;
  }

  &__toggleButton {
    @include buttonReset;
    width: 50%;
    height: 100%;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    color: #fff;
    background: #c7c7c7;
    transition: box-shadow 0.3s, background-color 0.3s, color 0.3s;

    &--active {
      background: #d79b00;
      box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  &__form {
    transition: opacity 0.3s;
    flex: 1;
    display: flex;
    flex-direction: column;

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
  }

  &__input {
    margin-bottom: 4px;
  }

  &__remindPassword {
    font-family: 'Noto Sans', sans-serif;
    font-size: 14px;
    line-height: 19px;
    color: #11a3f5;
    margin-left: auto;
    display: block;
    width: fit-content;
    margin-bottom: 12px;
  }

  &__submit {
    @include buttonReset;
    margin-left: auto;
    background: #d79b00;
    border-radius: 16px;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    height: 36px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
    padding: 0 24px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 20px;

    &:disabled {
      background: #c7c7c7;
    }
  }
}
</style>
