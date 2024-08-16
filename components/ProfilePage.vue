<script>
import statuses from '~/assets/datas/statuses.json'

export default {
  name: 'ProfilePage',

  props: {
    userId: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    chinchillas: {
      type: Object,
      required: true,
    },
    soldChinchillas: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isOwner: this.userId === +this.$cookies.get('USER_ID'),
      statuses: [
        { key: 'm', label: 'Самцы' },
        { key: 'f', label: 'Самки' },
        ...statuses,
      ],
      gridCountItems: [
        {
          label: '2 карточки',
          value: 'default',
        },
        {
          label: '4 карточки',
          value: 'more',
        },
      ],
      sortItems: [
        {
          label: 'По алфавиту',
          value: 'default',
        },
        {
          label: 'По дате рождения',
          value: 'birthday',
        },
      ],
      gridCountValue: this.$cookies.get('grid_count_value') || 'default',
      sortValue: this.$cookies.get('sort_value') || 'default',
    }
  },

  computed: {
    sortedChinchillas() {
      const result = {}
      Object.entries(this.chinchillas).forEach(([key, value]) => {
        const field = this.sortValue === 'birthday' ? 'birthday' : 'name'
        result[key] = value.sort((a, b) => (a[field] > b[field] ? 1 : -1))
      })
      return result
    },
  },

  watch: {
    gridCountValue(val) {
      const date = new Date()
      date.setFullYear(date.getFullYear() + 200)
      this.$cookies.set('grid_count_value', val, { expires: date })
    },
    sortValue(val) {
      const date = new Date()
      date.setFullYear(date.getFullYear() + 200)
      this.$cookies.set('sort_value', val, { expires: date })
    },
  },
}

</script>

<template>
  <div class="profilePage">
    <ProfileInfo
      v-if="user"
      :user="user"
      :is-owner="isOwner"
      @update="user = $event"
    />
    <div class="profilePage__settings baseContainer">
      <v-select
        v-model="gridCountValue"
        solo
        label="В ряд"
        :items="gridCountItems"
        item-title="label"
        item-value="value"
        class="profilePage__gridCount"
      />
      <v-select
        v-model="sortValue"
        solo
        label="Сортировка шиншилл"
        :items="sortItems"
        item-title="label"
        item-value="value"
        class="profilePage__sorting"
      />
    </div>
    <div
      v-for="(list, key) in sortedChinchillas"
      :key="key"
      :class="`gridCount__${gridCountValue}`"
    >
      <CardSection
        v-if="list.length && key !== 'dead'"
        :section-key="key"
        :items="list"
        :title="
          (statuses.find((el) => el.key === key) || { label: 'Без статуса' })
            .label
        "
      />
    </div>
    <CardSection
      v-if="soldChinchillas && soldChinchillas.length"
      title="Проданные"
      section-key="extra-sold"
      :items="soldChinchillas"
      :default-expand="false"
      :class="`gridCount__${gridCountValue}`"
    />
    <CardSection
      v-if="sortedChinchillas.dead && sortedChinchillas.dead.length"
      :items="sortedChinchillas.dead"
      section-key="extra-dead"
      title="На радуге"
      :default-expand="false"
      :class="`gridCount__${gridCountValue}`"
    />
    <v-fab
      v-if="isOwner"
      color="primary"
      icon="add"
      dark
      position="fixed"
      location="bottom end"
      app
      nuxt
      to="/profile/chinchillas/create"
    />
  </div>
</template>

<style lang="scss">
.profilePage {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  &__title {
    @include buttonReset;
    font-size: 24px;
  }

  &__settings {
    padding-top: 32px;
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
    column-gap: 16px;

    @include mq('tablet-small') {
      column-gap: 8px;
    }
  }

  & &__gridCount {
    display: none;
    max-width: 142px;

    @include mq('tablet-small') {
      display: block;
    }
  }

  & &__sorting {
    max-width: 180px;
  }
}
</style>
