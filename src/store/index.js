import Vue from 'vue'
import Vuex from 'vuex'

import Cookies from 'js-cookie'

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
    cartModifiedAt: undefined,
    checkoutData: {}
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
      return JSON.parse(JSON.stringify(state.cart));
    },
    cartModifiedAt (state) {
      return state.cartModifiedAt;
    },
    cartItemCount (state) {
      if (!Object.keys(state.cart).length) {return 0;}
      let cartCountList = Object.values(state.cart);
      let result = cartCountList.reduce((a, b) => a + b, 0);
      return result;
    },
    checkoutData (state) {
      return state.checkoutData;
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
    cartModifiedAt (state, newDate=undefined) {
      state.cartModifiedAt = newDate ? newDate : new Date();
    },
    cartAdd (state, item, quantityToAdd=1) {
      // if cart doesn't contain the item, add its key to the cart
      if (typeof(item) !== "object") {
        return false
      }
      if (!Object.prototype.hasOwnProperty.call(state.cart, String(item.id))) {
        state.cart[String(item.id)] = quantityToAdd;
      } else {
        state.cart[String(item.id)] += quantityToAdd;
      }
    },
    cartRemove (state, item, quantityToRemove=1) {
      // if cart doesn't contain the item, do nothing
      if (typeof(item) !== "object") {
        return false
      }
      if (!Object.prototype.hasOwnProperty.call(state.cart, String(item.id))) {
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
    cartUpdate (state, payload) {

      let item = payload.item;
      let quantity = payload.quantity;
  
      // sanity checks
      if (quantity === 0) {
        state.dispatch('displayStatusMessage', 'Quantity must be a non-zero integer value.');
        return false;
      }
      else if (typeof(item) !== "object") {
        return false
      }

      if (quantity >= 1) {  // add to cart
        if (!Object.prototype.hasOwnProperty.call(state.cart, String(item.id))) {
          // state.cart[String(item.id)] = quantity;
          // state.cart = Object.assign({}, state.cart, {itemId: quantity});
          Vue.set(state.cart, item.id, quantity);

        } else {
          state.cart[String(item.id)] += quantity;
        }
      } else {  // remove from cart
        if (!Object.prototype.hasOwnProperty.call(state.cart, String(item.id))) {
          return false;
        }
        // if cart contains <= [quantity] of the item, delete the key from the cart
        else if (state.cart[String(item.id)] <= quantity) {
          delete state.cart[String(item.id)];
        }
        // otherwise, decrease the quantity as expected
        else {
          state.cart[String(item.id)] += quantity;
          // this is hacky, item should be removed up top
          if (state.cart[String(item.id)] === 0) {
            delete state.cart[String(item.id)];
          }
        }
      }
    },
    cartClearItem(state, item) {
      state.cart.pop(String(item.id));
    },
    cartIs (state, cart) {
      state.cart = cart;
    },
    checkoutData (state, payload) {
      state.checkoutData = payload;
    }
  },
  actions: {
    displayStatusMessage (context, payload) {
      let message = payload.message ? payload.message : '';
      if (!message) {
        return false;
      }
      let displayFor = payload.displayFor ? payload.displayFor : 4000;
      context.commit('statusMessage', message);
      setTimeout(() => {
        context.commit('statusMessage', '');
      }, displayFor)
    },
    clearStatusMessage (context) {
      context.dispatch('displayStatusMessage', {displayFor: 0});
    },
    login (context, token) {
      context.dispatch('authenticate', token);
      context.dispatch('getUser', token);
      context.dispatch('getUserProfile', token)
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
      // Cookies.remove('cart');
      // Cookies.remove('cartModifiedAt');
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
        // if response is not successful, log the user out
        if (!response.ok) {
          context.dispatch('logout');
        }
        return response.json()
      })
      context.commit('userIs', user);
    },
    async getUserProfile (context, token) {
      let url = helpers.urls.getProfile;
      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        // if response is not successful, log the user out
        if (!response.ok) {
          context.dispatch('logout');
          return false;
        }
        return response.json()
      })
      .then(data => {
        let userProfile = data;
        let localCart = context.getters.cart;
        let localCartModifiedAt = context.getters.cartModifiedAt;
        let remoteCart = userProfile.cart;

        // assign userProfile to the response object
        context.commit('userProfileIs', userProfile);

        // if local cart is newer than the remote, sync the local cart contents onto the remote
        if (Object.keys(localCart).length && localCartModifiedAt && localCartModifiedAt > new Date(userProfile.cart_modified_at)) {
          context.dispatch('cartSyncLocalOntoRemote');
        } 
        // otherwise, sync the remote cart onto the local cart if the remote cart is not empty
        else if (Object.keys(remoteCart).length) {
          context.commit('cartIs', remoteCart);
        }
      })
    },
    cartSyncLocalOntoRemote(context) {
      let url = helpers.urls.cartDetail;
      let postData = {cart: context.getters.cart}
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${context.getters.userToken}`,
        },
        body: JSON.stringify(postData)
      })
      .then(response => {
        context.dispatch('displayStatusMessage', "Your cart has been synced to your online account.");
        return response.json()
      })
    },
    cartUpdateItem (context, payload) {
      /*
      Add or remove a given quantity of an item.
      */

      let item = payload.item;
      let quantity = payload.quantity;

      // TODO: check this
      if (context.getters.cart[String(item.id)] >= 99) {
        context.dispatch('displayStatusMessage', "You cannot have more than 99 of a given item in your cart.")
      }

      // if userProfile is present (user logged in), perform remote cart update and sync to local
      if (context.getters.userProfile) {
        // send cart action to server
        let url = helpers.urls.cartItemUpdate(item.id, quantity);

        if (context.getters.userToken) {
          fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${context.getters.userToken}`,
            }
          })
          .then(response => response.json())
          .then(data => {
            context.commit('userProfileIs', data);
            context.commit('cartIs', data.cart);
            context.commit('cartModifiedAt', data.cart_modified_at);
          })
          .catch(error => console.log('store updateCart(): ' + error))
        }

      // if userProfile is not present (user not logged in), perform all actions locally
      } else {
        // add item to cart
        context.commit('cartUpdate', {item, quantity});
        // update cartModifiedAt time
        context.commit('cartModifiedAt', new Date());
      }

      // save local cart to cookies
      Cookies.set('cart', JSON.stringify(context.getters.cart));
      Cookies.set('cartModifiedAt', JSON.stringify(context.getters.cartModifiedAt));

      let verb = Math.abs(quantity) === 1 ? 'has' : 'have';
      let adjective = quantity >= 0 ? 'added' : 'removed';
      let preposition = quantity >= 0 ? 'to' : 'from';
      context.dispatch('displayStatusMessage', `${Math.abs(quantity)} '${item.name}' ${verb} been ${adjective} ${preposition} your cart.`);

    },
    cartClear (context) {
      // if userProfile is present, perform the reset via API and clear the local cart as a confirmation

      context.commit('cartIs', {});
      context.commit('cartModifiedAt', undefined);

      Cookies.remove('cart');
      Cookies.remove('cartModifiedAt');
      // if userProfile is not present, perform all actions locally

      context.dispatch('displayStatusMessage', "Your cart has been cleared.");
    }
  },
})
