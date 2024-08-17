<script>
import colorConfig from '~/assets/datas/colorConfig.json'
import statuses from '~/assets/datas/statuses.json'
import {mapStores} from "pinia";

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
    ...mapStores(useUserStore),
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
      if (event) this.colors[name] = event;
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

<template>
  <label class="chinchillaSearch">
    <v-icon color="white" icon="search" />
    <input
      v-model="models.search"
      class="chinchillaSearch__input"
      placeholder="Поиск шиншиллы"
    >
    <span class="chinchillaSearch__settings">
      <v-btn icon variant="text" @click="dialog = true">
        <v-icon color="white">settings</v-icon>
      </v-btn>
      <v-fab
        color="primary"
        dark
        position="fixed"
        location="bottom end"
        app
        icon="settings"
        @click="dialog = true"
      />
    </span>

    <Dialog
      v-model:visible="dialog"
      header="Параметры поиска"
      modal
      dismissable-mask
      class="w-96 min-w-fit max-w-full"
    >
      <div class="pt-1">
        <Select
          v-model="models.sex"
          :options="sexItems"
          placeholder="Пол"
          option-label="label"
          option-value="value"
          class="w-full"
        />
        <Select
          v-if="userStore.fullAccess"
          v-model="models.status"
          :options="statuses"
          placeholder="Статус"
          option-label="label"
          option-value="key"
          class="w-full mt-4"
        />
      </div>

      <Divider/>

      <div class="pb-4">
        <Button severity="secondary" outlined @click="showColorDialog" label="Поиск по окрасам" />
        <div class="mt-3 text-md">{{ stringColor }}</div>
      </div>

      <template #footer>
        <Button @click="dialog = false" severity="secondary" label="Закрыть" />
        <Button @click="apply" label="Применить" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="colorDialog"
      header="Поиск по окрасам"
      modal
      dismissable-mask
      class="w-96 min-w-fit max-w-full"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4 pt-1">
        <Select
          v-for="item in config"
          :key="item.name"
          @update:model-value="onUpdateColor(item.name, $event)"
          :model-value="colors[item.name]"
          :placeholder="item.label"
          :options="item.variants"
          option-label="label"
          option-value="value"
          show-clear
          class="sm:w-52"
        />
      </div>

      <template #footer>
        <Button @click="colorDialog = false" severity="secondary" label="Закрыть" />
        <Button @click="saveColors" label="Сохранить" />
      </template>
    </Dialog>
  </label>
</template>

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
}
</style>
