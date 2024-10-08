<script setup lang="ts">
import {ref, watch} from 'vue';
import type {UserType} from "~/types/common";

const INFO_META: { label: string; key: keyof UserType }[] = [
  { label: 'Телефон', key: 'phone' },
  { label: 'E-Mail', key: 'email' },
  { label: 'Страна', key: 'country' },
  { label: 'Город', key: 'city' },
];

const props = defineProps<{
  user: UserType;
}>();

const userStore = useUserStore();

const dialog = ref(false);
const isLoading = ref(false);

const models = ref<Partial<UserType>>({
  first_name: '',
  last_name: '',
  patronymic: '',
  country: '',
  city: '',
  avatar: null,
});

const isOwner = computed(() => props.user.id === userStore.userId);

const update = async () => {
  isLoading.value = true;
  const formData = new FormData();
  Object.keys(models.value).forEach((key) => {
    const value = models.value[key as keyof UserType];
    if (key !== 'avatar' || value) formData.append(key, value as string | Blob);
  });

  try {
    userStore.user = await $request<UserType>('user/update', {method: 'post', body: formData});
    dialog.value = false;
  } finally {
    isLoading.value = false;
  }
};

watch(dialog, (val) => {
  if (val) models.value = { ...props.user, avatar: null };
});
</script>

<template>
  <section class="profileInfo">
    <div class="profileInfo__background">
      <div class="profileInfo__backgroundImage"/>
    </div>
    <div class="profileInfo__container baseContainer">
      <div class="profileInfo__cell">
        <div class="profileInfo__avatarContainer">
          <p class="profileInfo__name">{{ user.first_name || 'Не указано' }}</p>
          <p class="profileInfo__name">{{ user.last_name || 'Не указано' }}</p>
          <button
            class="profileInfo__avatar"
            :style="{
              backgroundImage: `url(${
                user.avatar
                  ? `https://api.chinchillas-show.com/photos/users/${user.id}/${user.avatar}`
                  : '/assets/empty.jpg'
              })`,
            }"
            @click="dialog = isOwner"
          >
            <span v-if="isOwner" class="profileInfo__change">
              <v-icon color="white" size="x-large" large>edit</v-icon>
            </span>
          </button>
        </div>
      </div>
      <div class="profileInfo__cell">
        <p
          v-for="meta in INFO_META"
          :key="meta.key"
          class="profileInfo__info"
        >
          <span>{{ meta.label }}</span>
          <span>{{ user[meta.key] || 'Не указано' }}</span>
        </p>
      </div>
    </div>

    <v-bottom-sheet v-model="dialog" inset scrollable>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon="close" dark @click="dialog = false" />
          <v-toolbar-title>Редактирование профиля</v-toolbar-title>
          <v-spacer/>
          <v-toolbar-items>
            <v-btn dark variant="text" :loading="isLoading" @click="update"
              >Сохранить</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>
        <div class="baseContainer">
          <v-list three-line subheader>
            <v-list-subheader>Основные сведения</v-list-subheader>
            <v-list-item>
              <v-file-input
                accept="image/*"
                label="Выберите аватар"
                @change="models.avatar = $event"
              />
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="models.last_name"
                name="last_name"
                label="Изменить фамилию"
              />
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="models.first_name"
                name="name"
                label="Изменить имя"
              />
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="models.patronymic"
                name="patronymic"
                label="Изменить отчество"
              />
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="models.country"
                name="country"
                label="Изменить страну"
              />
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="models.city"
                name="city"
                label="Изменить город"
              />
            </v-list-item>
            <v-list-item>
              <v-btn to="/profile/password">Изменить пароль</v-btn>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-bottom-sheet>
  </section>
</template>

<style lang="scss">
.profileInfo {
  $self: &;
  position: relative;
  width: 100%;
  background: #838383;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);

  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__backgroundImage {
    height: 100%;
    background: no-repeat center / cover
      url('/assets/background/background_wave.svg');
  }

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 80px;
    padding-bottom: 80px;

    @include mq('tablet') {
      display: block;
    }
  }

  &__cell {
    width: 50%;

    @include mq('tablet') {
      width: 100%;
    }
  }

  &__avatarContainer {
    background: #d79b00;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 16px;
    width: fit-content;
    position: relative;

    @include mq('tablet') {
      margin: 0 auto 40px;
    }

    @include mq('tablet-small') {
      margin-left: 0;
    }
  }

  &__name {
    background: #ebebeb;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 18px;
    display: block;
    position: absolute;
    white-space: nowrap;
    padding: 0 32px;
    width: fit-content;
    box-sizing: border-box;

    &:first-of-type {
      top: 15%;
      left: 60%;
      padding-left: 40%;
    }

    &:last-of-type {
      top: 45%;
      left: 75%;
      padding-left: 35%;
    }

    @include mq('tablet-small') {
      font-size: 14px;
      height: 24px;
      line-height: 24px;
    }
  }

  &__avatar {
    width: 180px;
    height: 180px;
    background: no-repeat center / cover;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    cursor: pointer;
    display: block;

    @include mq('tablet') {
      width: 240px;
      height: 240px;
    }

    @include mq('tablet-small') {
      width: 120px;
      height: 120px;
    }

    &:hover #{$self}__change {
      top: 0;
      transform: translateX(-50%);
    }
  }

  &__change {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.3s ease, top 0.3s ease;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 16px;
  }

  &__info {
    background: #ebebeb;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-size: 18px;
    padding: 4px 0;
    display: flex;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    @include mq('tablet-small') {
      font-size: 14px;
      height: 24px;
    }

    & * {
      text-align: center;
      white-space: nowrap;
    }

    & *:first-child {
      width: 40%;
      flex: 0 0 40%;
      border-right: 1px solid #d9d9d9;
    }

    & *:last-child {
      width: 60%;
      flex: 0 0 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 16px;
    }
  }
}
</style>
