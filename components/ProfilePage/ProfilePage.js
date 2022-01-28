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
  },

  async fetch() {
    this.user = await this.$axios.$get(`user/details/${this.userId}`)
    const list = await this.$axios.$get(`chinchilla/get/${this.userId}`)
    this.soldChinchillas = await this.$axios.$get(
      `chinchilla/sold/${this.userId}`
    )
    this.chinchillas = list.reduce((arr, el) => {
      if (this.soldChinchillas.some((f) => f.id === el.id)) return arr
      if (!el.status || el.status.name === 'breeding')
        arr[el.sex] = [el, ...(arr[el.sex] || [])]
      else arr[el.status.name] = [el, ...(arr[el.status.name] || [])]
      return arr
    }, {})
  },

  data() {
    return {
      user: null,
      chinchillas: statuses.reduce((acc, el) => ({ ...acc, [el.key]: [] }), {}),
      soldChinchillas: null,
      isOwner: this.userId === +this.$cookies.get('USER_ID'),
      statuses: [
        { key: 'm', label: 'Самцы' },
        { key: 'f', label: 'Самки' },
        ...statuses,
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
      sortValue: this.$cookies.get('sort_value') || 'default',
    }
  },

  watch: {
    sortValue(val) {
      this.$cookies.set('sort_value', val)
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
