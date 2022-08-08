import Actions from '~/store/actions.type'
import Mutations from '~/store/mutations.type'
import Getters from '~/store/getters.type'

const PER_PAGE_COUNT = 40

export default {
  state() {
    return {
      chinchillas: [],
      isLoading: false,
      isFinish: false,
      offset: 0,
    }
  },

  actions: {
    async [Actions.FETCH_CHINCHILLAS](
      { commit, state },
      { reset, isRussian, search, params }
    ) {
      if (reset) commit(Mutations.SET_CHINCHILLAS, { isFinish: false })
      if (state.isLoading || state.isFinish) return
      commit(Mutations.SET_CHINCHILLAS, { isLoading: true })
      const data = (
        await this.$axios.$get('chinchilla/search', {
          params: {
            name: search || undefined,
            sex: params.sex || undefined,
            status: isRussian ? params.status || undefined : 'sale',
            offset: reset ? 0 : state.offset,
            limit: PER_PAGE_COUNT,
          },
        })
      ).data
      commit(Mutations.SET_CHINCHILLAS, {
        chinchillas: [...(!reset ? state.chinchillas : []), ...data],
        isLoading: false,
        isFinish: !data.length,
        offset: (reset ? 0 : state.offset) + PER_PAGE_COUNT,
      })
    },
  },

  mutations: {
    [Mutations.SET_CHINCHILLAS](state, data) {
      state.chinchillas = data.chinchillas ?? state.chinchillas
      state.isLoading = data.isLoading ?? state.isLoading
      state.isFinish = data.isFinish ?? state.isFinish
      state.offset = data.offset ?? state.offset
    },
  },

  getters: {
    [Getters.GET_CHINCHILLAS](state) {
      return state.chinchillas
    },
  },
}
