import Actions from '~/store/actions.type'
import Mutations from '~/store/mutations.type'

export default {
  state: {
    user: null,
    country: null,
  },
  actions: {
    [Actions.CHECK_USER]({ commit }, callback) {
      return this.$axios.$get('user/details').then((data) => {
        commit(Mutations.SET_USER, data.user)
        if (callback) callback(data.user)
      })
    },
    [Actions.LOGOUT]({ commit }) {
      commit(Mutations.SET_USER, null)
      this.$axios.setToken(null)
    },
  },
  mutations: {
    [Mutations.SET_COUNTRY](state, value) {
      state.country = value
    },
    [Mutations.SET_USER](state, value) {
      state.user = value
    },
  },
}
