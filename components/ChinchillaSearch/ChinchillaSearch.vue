<template>
  <label class="chinchillaSearch">
    <v-icon color="white">search</v-icon>
    <input
      v-model="models.search"
      class="chinchillaSearch__input"
      placeholder="Поиск шиншиллы"
    />
    <span class="chinchillaSearch__settings">
      <v-btn icon @click="dialog = true">
        <v-icon color="white">settings</v-icon>
      </v-btn>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          @click="dialog = true"
        >
          <v-icon>settings</v-icon>
        </v-btn>
      </v-fab-transition>
    </span>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline lighten-2">
          Параметры поиска
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="models.sex"
            :items="sexItems"
            label="Пол"
            item-text="label"
            item-value="value"
          />
          <v-select
            v-if="isRussian"
            v-model="models.status"
            :items="statuses"
            label="Статус"
            item-text="label"
            item-value="key"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="py-4">
          <v-btn @click="showColorDialog">Поиск по окрасам</v-btn>
          <div class="mt-3">{{ stringColor }}</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Закрыть </v-btn>
          <v-btn color="primary" text @click="apply"> Применить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="colorDialog"
      width="820"
      content-class="chinchillaSearch__colorDialog"
    >
      <v-card class="chinchillaSearch__colorCard">
        <v-card-title class="headline lighten-2">
          Поиск по окрасам
        </v-card-title>

        <v-card-text class="chinchillaSearch__grid">
          <v-combobox
            v-for="item in config"
            :key="item.name"
            :value="item.variants.find((el) => el.value === colors[item.name])"
            class="chinchillaSearch__label"
            :name="item.name"
            :items="item.variants"
            item-text="label"
            item-value="value"
            :label="item.label"
            clearable
            @change="onUpdateColor(item.name, $event)"
          />
        </v-card-text>

        <v-divider class="chinchillaSearch__footerDivider"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="colorDialog = false"> Закрыть </v-btn>
          <v-btn color="primary" text @click="saveColors"> Сохранить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </label>
</template>

<script>
import colorConfig from '~/assets/datas/colorConfig.json'
import statuses from '~/assets/datas/statuses.json'
import colorToString from '~/assets/scripts/colorToString'

export default {
  name: 'ChinchillaSearch',

  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      timer: 0,
      dialog: false,
      colorDialog: false,
      sexItems: [
        {
          label: 'Любой',
          value: '',
        },
        {
          label: 'Самка',
          value: 'f',
        },
        {
          label: 'Самец',
          value: 'm',
        },
      ],
      statuses: [
        {
          key: '',
          label: 'Любой',
        },
      ].concat(statuses),
      config: colorConfig,
      models: {
        search: '',
        sex: '',
        status: this.$route.query.status || '',
        colors: {},
      },
      colors: {},
    }
  },

  computed: {
    isRussian() {
      return this.$store.state.UserModule.country === 'RU'
    },
    stringColor() {
      return Object.keys(this.models.colors).length
        ? colorToString(this.models.colors)
        : 'Не выбрано'
    },
  },

  watch: {
    parameters: {
      handler() {
        Object.assign(this.models, this.parameters, {
          colors: { ...this.parameters.colors },
        })
      },
      immediate: true,
    },
    'models.search'() {
      clearTimeout(this.timer)
      setTimeout(() => {
        this.$emit('change', this.models)
      }, 1000)
    },
  },

  methods: {
    showColorDialog() {
      this.colorDialog = true
      this.colors = { ...this.models.colors }
    },
    onUpdateColor(name, event) {
      if (event?.value) this.colors[name] = event.value
      else delete this.colors[name]
    },
    apply() {
      this.dialog = false
      this.$emit('change', this.models)
    },
    saveColors() {
      this.colorDialog = false
      this.models.colors = { ...this.colors }
    },
  },
}
</script>

<style lang="scss">
.chinchillaSearch {
  background-color: #c5c5c5;
  border-radius: 22px;
  height: 44px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 4px 16px;

  &__input {
    margin-left: 16px;
    margin-right: 16px;
    color: white;
    flex: 1;
  }

  &__settings {
    & > *:first-child {
      @include mq('tablet') {
        display: none;
      }
    }
    & > *:last-child {
      display: none;

      @include mq('tablet') {
        display: block;
      }
    }
  }

  &__grid {
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

  &__colorDialog.v-dialog {
    @include mq('tablet-small') {
      border-radius: 0;
      margin: 0;
      height: 100%;
      position: fixed;
      overflow-y: auto;
      top: 0;
      left: 0;
      max-height: initial !important;
      max-width: 100%;
    }
  }

  &__colorCard.v-card {
    @include mq('tablet-small') {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
  }

  &__footerDivider {
    @include mq('tablet-small') {
      margin-top: auto;
    }
  }
}
</style>
