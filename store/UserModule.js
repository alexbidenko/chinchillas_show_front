import Actions from '~/store/actions.type'
import Mutations from '~/store/mutations.type'
import Getters from '~/store/getters.type'

export default {
  state() {
    return {
      user: null,
      country: null,
    }
  },

  actions: {
    [Actions.CHECK_USER]({ commit }, callback) {
      return $request
        .$get('user/details')
        .then((data) => {
          commit(Mutations.SET_USER, data.user)
          callback?.(data.user)
        })
        .catch(() => callback?.())
    },
    [Actions.LOGOUT]({ commit }) {
      commit(Mutations.SET_USER, null)
      $request.setToken(null)
    },
  },

  mutations: {
    [Mutations.SET_COUNTRY](state, value) {
      state.country = value
      // state.country = 'EN'
    },
    [Mutations.SET_USER](state, value) {
      state.user = value
    },
  },

  getters: {
    [Getters.GET_USER](state) {
      return state.user
    },
  },
}
