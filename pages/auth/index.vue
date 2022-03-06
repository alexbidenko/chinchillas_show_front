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
      <transition mode="out-in" name="fade">
        <form
          v-if="mode === 'signIn'"
          key="signIn"
          class="authPage__form authPage__form--signIn"
          @submit.prevent="submitSignIn"
        >
          <v-text-field
            v-model="signIn.login"
            placeholder="Логин"
            class="authPage__input"
            name="login"
          />
          <v-text-field
            v-model="signIn.password"
            placeholder="Пароль"
            type="password"
            class="authPage__input"
            name="password"
          />
          <button
            type="button"
            class="authPage__remindPassword"
            @click="mode = 'remind'"
          >
            Забыли пароль?
          </button>
          <button type="submit" class="authPage__submit">Войти</button>
        </form>
        <form
          v-else-if="mode === 'signUp'"
          key="signUp"
          class="authPage__form authPage__form--signUp"
          @submit.prevent
        >
          <BaseScroller>
            <v-text-field
              v-model="$v.signUp.login.$model"
              :error="$v.signUp.login.$error"
              label="Логин"
              class="authPage__input"
              name="login"
            />
            <v-text-field
              v-model="$v.signUp.email.$model"
              :error="$v.signUp.email.$error"
              label="E-Mail"
              type="email"
              class="authPage__input"
              name="email"
            />
            <v-text-field
              v-model="$v.signUp.phone.$model"
              :error="$v.signUp.phone.$error"
              type="tel"
              label="Телефон"
              class="authPage__input"
              name="phone"
              mask="+7 (###)-###-##-##"
            />
            <v-text-field
              v-model="$v.signUp.first_name.$model"
              :error="$v.signUp.first_name.$error"
              label="Имя"
              type="text"
              class="authPage__input"
              name="firstName"
            />
            <v-text-field
              v-model="$v.signUp.last_name.$model"
              :error="$v.signUp.last_name.$error"
              label="Фамилия"
              type="text"
              class="authPage__input"
              name="lastName"
            />
            <v-text-field
              v-model="$v.signUp.patronymic.$model"
              :error="$v.signUp.patronymic.$error"
              label="Отчество"
              type="text"
              class="authPage__input"
              name="patronymic"
            />
            <v-text-field
              v-model="$v.signUp.country.$model"
              :error="$v.signUp.country.$error"
              label="Страна"
              type="text"
              class="authPage__input"
              name="country"
            />
            <v-text-field
              v-model="$v.signUp.city.$model"
              :error="$v.signUp.city.$error"
              label="Город"
              type="text"
              class="authPage__input"
              name="city"
            />
            <v-text-field
              v-model="$v.signUp.password.$model"
              :error="$v.signUp.password.$error"
              label="Пароль"
              type="password"
              class="authPage__input"
              name="password"
            />
          </BaseScroller>

          <v-dialog v-model="dialog">
            <template #activator="{ on, attrs }">
              <button
                type="submit"
                class="authPage__submit"
                v-bind="attrs"
                :disabled="$v.$invalid"
                v-on="on"
              >
                Зарегистрироваться
              </button>
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
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
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
          key="signIn"
          class="authPage__form authPage__form--signIn"
          @submit.prevent="submitRemind"
        >
          <v-text-field
            v-model="email"
            placeholder="Email"
            class="authPage__input"
            name="email"
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
      </transition>
    </article>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import BaseScroller from '~/components/BaseScroller/BaseScroller.vue'

export default {
  components: {
    BaseScroller,
  },

  data() {
    return {
      mode: 'signIn',
      email: '',
      signIn: {
        login: '',
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
      dialog: false,
    }
  },

  methods: {
    submitRemind() {},
    submitSignIn() {
      this.$axios.$post('login', this.signIn).then((data) => {
        this.$cookies.set('TOKEN', data.token)
        this.$cookies.set('USER_ID', data.user.id)
        this.$axios.setHeader('Authorization', `Bearer ${data.token}`)
        this.$router.push('/profile')
      })
    },
    submitSignUp() {
      this.$axios.$post('register', this.signUp).then((data) => {
        this.$cookies.set('TOKEN', data.token)
        this.$cookies.set('USER_ID', data.user.id)
        this.$axios.setHeader('Authorization', `Bearer ${data.token}`)
        this.$router.push('/profile')
      })
    },
  },

  validations: {
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
  },
}
</script>

<style lang="scss">
.authPage {
  flex: 1;
  background: url('/assets/background/background_auth.png') no-repeat center /
    cover;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

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
    margin-bottom: 12px;
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

    &--signUp {
      height: calc(100vh - 500px);
      min-height: 400px;
    }

    .baseScroller {
      flex: 1;
    }
  }

  &__input {
    margin: 24px 0 32px;

    &:last-of-type {
      margin-bottom: 12px;
    }
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
