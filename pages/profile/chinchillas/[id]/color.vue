<template>
  <div class="colorPage">
    <div v-if="data" class="baseContainer">
      <h1 class="text-h4 my-4">{{ data.name }}</h1>
      <p>{{ colorName }}</p>
      <form class="colorPage__form" @submit.prevent="onSubmit">
        <v-select
          v-for="item in config"
          :key="item.name"
          :model-value="item.variants.find((el) => el.value === models[item.name])?.value"
          class="colorPage__label"
          :name="item.name"
          :items="item.variants"
          item-title="label"
          item-value="value"
          :label="item.label"
          @update:model-value="models[item.name] = $event"
        />
        <v-btn color="primary" type="submit">Сохранить</v-btn>
      </form>
    </div>
    <BaseSpinner v-else />
  </div>
</template>

<script>
import colorConfig from '~/assets/datas/colorConfig.json'

export default {
  name: 'ColorPage',

  data() {
    const models = {}
    colorConfig.forEach((el) => (models[el.name] = el.variants[0].value))
    return {
      chinchillaId: +this.$route.params.id,
      data: null,
      config: colorConfig,
      models,
      userId: this.$cookies.get('USER_ID'),
    }
  },

  computed: {
    colorName() {
      return colorToString(this.models)
    },
  },

  created() {
    $request(`chinchilla/details/${this.chinchillaId}`).then((data) => {
      if (data.owner_id === +this.userId) {
        this.data = data
        if (data.color) this.models = data.color
      } else this.$router.push('/profile')
    })
  },

  methods: {
    onSubmit() {
      $request(`chinchilla/color/${this.chinchillaId}`, { method: 'post', body: this.models })
        .then(() => {
          this.$router.push(`/profile/chinchillas/${this.chinchillaId}`)
        })
        .catch(() => {
          alert('Что-то пошло не так')
        })
    },
  },
}
</script>

<style lang="scss">
.colorPage {
  position: relative;
  width: 100%;

  &__form {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--column-space);
    row-gap: 8px;

    @include mq('tablet') {
      row-gap: 0;
    }
  }

  &__label {
    width: calc((100% + var(--column-space)) / 4 - var(--column-space));
    display: block;

    @include mq('tablet') {
      width: calc((100% + var(--column-space)) / 2 - var(--column-space));
    }
  }

  & .baseSpinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
