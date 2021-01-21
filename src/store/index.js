import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    userIsAuthenticated: false,
    user: undefined,
    userToken: undefined,
  },
  getters: {
    isLoading (state) {
      return state.isLoading;
    },
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
    isLoading (state, bool) {
      state.isLoading = bool;
    },
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
    login (context, userToken) {
      context.commit('userIsAuthenticated', true);
      // context.commit('userIs', user);
      context.commit('userToken', userToken);
    },
    logout (context) {
      context.commit('userIsAuthenticated', false);
      context.commit('userIs', undefined);
    }
  },
  modules: {
  }
})
