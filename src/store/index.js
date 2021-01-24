import Vue from 'vue'
import Vuex from 'vuex'

import Cookies from 'js-cookie' // eslint-disable-line no-unused-vars

import * as helpers from '../assets/js/helpers.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // misc
    isLoading: false,
    statusMessage: '',

    // users
    userIsAuthenticated: false,
    user: undefined,
    userProfile: undefined,
    userToken: undefined,
    cart: {},
  },
  getters: {
    isLoading (state) {
      return state.isLoading;
    },
    statusMessage (state) {
      return state.statusMessage;
    },
    userIsAuthenticated (state) {
      return state.userIsAuthenticated;
    },
    user (state) {
      return state.user;
    },
    userProfile (state) {
      return state.user;
    },
    userToken (state) {
      return state.userToken;
    },
    cart (state) {
      return state.cart;
    },
    cartItemCount (state) {
      if (!Object.keys(state.cart).length) {return 0;}
      let cartCountList = Object.values(state.cart);
      let result = cartCountList.reduce((a, b) => a + b, 0);
      return result;
    }
  },
  mutations: {
    isLoading (state, bool) {
      state.isLoading = bool;
    },
    statusMessage (state, message) {
      state.statusMessage = message;
    },
    userIsAuthenticated (state, bool) {
      state.userIsAuthenticated = bool;
    },
    userIs (state, user) {
      state.user = user;
    },
    userProfileIs (state, userProfile) {
      state.userProfile = userProfile;
    },
    userToken (state, userToken) {
      state.userToken = userToken;
    },
    cartAdd (state, item, quantityToAdd=1) {
      // if cart doesn't contain the item, add its key to the cart
      if (typeof(item) !== "object") {
        return false
      }
      else if (!Object.prototype.hasOwnProperty.call(state.cart, String(item.id))) {
        state.cart[String(item.id)] = quantityToAdd;
      } else {
        state.cart[String(item.id)] += quantityToAdd;
      }
      console.log(state.cart);
    },
    cartRemove (state, item, quantityToRemove=1) {
      // if cart doesn't contain the item, do nothing
      if (typeof(item) !== "object") {
        return false
      }
      else if (!Object.prototype.hasOwnProperty.call(state.cart, String(item.id))) {
        return false;
      }
      // if cart contains <= [quantity] of the item, delete the key from the cart
      else if (state.cart[String(item.id)] <= quantityToRemove) {
        delete state.cart[String(item.id)];
      }
      // otherwise, decrease the quantity as expected
      else {
        state.cart[String(item.id)] -= quantityToRemove;
      }
    },
    cartIs (state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    displayStatusMessage (context, message, displayFor=4000) {
      context.commit('statusMessage', message);
      setTimeout(() => {
        context.commit('statusMessage', '');
      }, displayFor)
    },
    login (context, token) {
      context.dispatch('authenticate', token);
      context.dispatch('getUser', token);
      context.dispatch('getUserProfile', token);
    },
    authenticate (context, token) {
      context.commit('userIsAuthenticated', true);
      context.commit('userToken', token);
      Cookies.set('userToken', token, { sameSite: 'strict' });
    },
    logout (context) {
      context.commit('userIsAuthenticated', false);
      context.commit('userIs', undefined);
      context.commit('userProfileIs', undefined);
      Cookies.remove('userToken');
    },
    async getUser (context, token) {
      let url = helpers.urls.getUser;
      let user = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          context.dispatch('logout');
        }
        return response.json()
      })
      context.commit('userIs', user);
    },
    async getUserProfile (context, token) {
      let url = helpers.urls.getProfile;
      let userProfile = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          context.dispatch('logout');
        }
        return response.json()
      })
      context.commit('userProfileIs', userProfile);
      context.commit('cartIs', userProfile.cart);
    },
    updateCart (context, item, quantity=1) {
      // let url = helpers.urls.cartUpdate(item.id, quantity);

      // if (context.getters.userToken) {
      //   fetch(url, {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Token ${context.getters.userToken}.
      //     }
      //   })
      // }

      let verb = quantity === 1 ? 'has' : 'have';
      let adjective = quantity >= 0 ? 'added' : 'removed';
      context.dispatch('displayStatusMessage', `${quantity} '${item.name}' ${verb} been ${adjective} to your cart.`);
    }
  },
  modules: {
  }
})
