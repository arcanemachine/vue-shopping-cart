import Vue from 'vue'
import Vuex from 'vuex'

import * as helpers from '../assets/js/helpers.js'

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
    login (context, token) {
      context.commit('userIsAuthenticated', true);
      context.commit('userToken', token);
    },
    logout (context) {
      context.commit('userIsAuthenticated', false);
      context.commit('userIs', undefined);
    },
    async getUser (context, token) {
      let url = helpers.urls.getUser;
      let user = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      })
      .then(response => response.json())
      context.commit('userIs', user);
    }
  },
  modules: {
  }
})
