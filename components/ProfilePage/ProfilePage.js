import CardSection from '../CardSection/CardSection.vue'
import ProfileInfo from '../ProfileInfo/ProfileInfo.vue'
import statuses from '~/assets/datas/statuses.json'

export default {
  name: 'ProfilePage',

  components: { CardSection, ProfileInfo },

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
}
