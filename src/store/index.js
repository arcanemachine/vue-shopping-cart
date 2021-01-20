import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsAuthenticated: false,
    user: undefined,
  },
  getters: {
    userIsAuthenticated (state) {
      return state.userIsAuthenticated;
    },
    user (state) {
      return state.user;
    }
  },
  mutations: {
    userIsAuthenticated (state, bool) {
      state.userIsAuthenticated = bool;
    },
    userIs (state, user) {
      state.user = user;
    }
  },
  actions: {
    userLogin (context, user) {
      context.commit('userIsAuthenticated', true);
      context.commit('userIs', user);
    },
    userLogout (context) {
      context.commit('userIsAuthenticated', false);
      context.commit('userIs', undefined);
    }
  },
  modules: {
  }
})
