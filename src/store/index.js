import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsAuthenticated: false,
    user: undefined,
    userToken: undefined,
  },
  getters: {
    userIsAuthenticated (state) {
      return state.userIsAuthenticated;
    },
    user (state) {
      return state.user;
    },
    userToken (state) {
      return state.userToken;
    }
  },
  mutations: {
    userIsAuthenticated (state, bool) {
      state.userIsAuthenticated = bool;
    },
    userIs (state, user) {
      state.user = user;
    },
    userToken (state, userToken) {
      state.userToken = userToken;
    }
  },
  actions: {
    userLogin (context, userToken) {
      context.commit('userIsAuthenticated', true);
      // context.commit('userIs', user);
      context.commit('userToken', userToken);
    },
    userLogout (context) {
      context.commit('userIsAuthenticated', false);
      context.commit('userIs', undefined);
    }
  },
  modules: {
  }
})
