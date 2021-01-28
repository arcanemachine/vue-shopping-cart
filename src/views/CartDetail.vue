<template>
  <div class="section">
    <div class="container">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-6 is-offset-3">
            <h2 class="title has-text-black">Your Cart</h2>
            <div class="hr-container">
              <hr class="logout-hr">
            </div>
          </div>
          <transition name="fade">
            <div v-if="isMounted && !Object.keys(cartData).length" class="cart-empty container has-text-centered">
              <div class="mb-6 title">Your cart is empty.</div>
              <router-link :to="{name: 'storeList'}">
                <button class="button is-large is-success is-4 is-fullwidth">Let's go shopping!</button>
              </router-link>
              <router-link v-if="!$store.getters.userProfile" :to="{name: 'login'}">
                <button class="mt-3 button is-large is-info is-fullwidth">Login to your account</button>
              </router-link>
            </div>
          </transition>
          <transition-group name="fade">
            <div v-for="item in cartData" :key="item.id" class="mb-3">
              <div class="card large cart-item-card">
                <div class="cart-item-card-container">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure v-if="item.image" class="image is-48x48">
                          <img v-if="item.image" :src="item.image" :alt="item.name">
                          <div v-else></div>
                        </figure>
                      </div>
                      <div class="media-content cart-item-container">
                        <router-link :to="{name: 'itemDetail', params: {'storeId': item.store_id, 'categoryId': item.category_id, 'itemId': item.id}}">
                          <div class="cart-item-name">{{ item.name }}</div>
                        </router-link>
                          <div class="has-text-black">Price/ea: {{ $helpers.getFormattedPrice(item.price) }}</div>
                      </div>
                      <div class="cart-quantity-container">
                        <button @click="itemRemove(item)" class="button cart-quantity-button">-</button>
                        <input type="text" v-model="cart[item.id]" class="input cart-quantity-text" disabled>
                        <button @click="itemAdd(item)" class="button cart-quantity-button">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
          <transition name="fade">
            <div v-if="!cartIsEmpty" class="mt-6 card large has-background-light">
              <div class="card-content">
                <div class="media">
                  <div class="media-left mb-2 checkout-icon-container">
                    <figure class="image">
                      <i class="bi-cart is-size-3"></i>
                    </figure>
                  </div>
                  <div class="media-content checkout-text-container">
                    <div class="mb-2">Item Count: {{ itemCount }}</div>
                    <div>Total Price: {{ totalFormattedPrice }}</div>
                  </div>
                  <div class="media-right checkout-button-container">
                    <button @click="toggleCheckout"
                            class="button is-success checkout-button">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fade">
            <button v-if="true && !cartIsEmpty"
                    @click="cartClear"
                    class="mt-6 button is-large is-danger clear-cart-button">
              Remove all Items <i class="trash-icon bi-trash navbar-show-icon-touch"></i>
            </button>
          </transition>
        </div>
      </div>
    </div>
    <transition name="fade">
      <checkout v-if="performCheckout"
                :cart="cart"
                :cartData="cartData"
                :totalFormattedPrice="totalFormattedPrice"
                @cancel-checkout="toggleCheckout()" />
    </transition>
  </div>
</template>

<!--
    <div>{{ cart }}</div>
    <div>{{ cartData }}</div>
-->

<script>

import Checkout from '../components/Checkout.vue'

export default {
  name: 'CartDetail',
  components: { Checkout },
  data() {
    return {
      cartData: {},
      isMounted: false,
      performCheckout: false
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartIsEmpty() {
      return !Object.keys(this.cart).length;
    },
    itemCount() {
      let cartItemCounts = Object.values(this.cart);
      let sum = cartItemCounts.reduce((a, b) => a + b);
      return sum;
    },
    totalPrice() {
      if (!this.isMounted || !this.cartData.length) {
        return 0;
      }
      let price = 0;
      for (let i = 0; i < Object.keys(this.cart).length; i++) {
        // get item info from cartData
        let currentCartObj = this.cartData[i];
        let currentItemCount = this.cart[currentCartObj.id];
        let currentItemPrice = this.cartData[i].price;
        price += (currentItemCount * currentItemPrice);
      }
      return price;
    },
    totalFormattedPrice() {
      return this.$helpers.getFormattedPrice(this.totalPrice);
    }
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(() => {
      this.getCartData();
    })
  },
  methods: {
    toggleCheckout() {
      // commit current checkout data to vuex store
      if (Object.keys(this.$store.getters.checkoutData).length) {
        this.performCheckout = false;
        this.$store.commit('checkoutData', {});
        this.$store.dispatch('statusMessageDisplay', {
          message: "Your checkout session has been canceled."
        })
        return false;
      }
      this.$store.commit('checkoutData', {
        checkoutStatus: {},
        cart: this.cart,
        cartData: this.cartData,
        totalFormattedPrice: this.totalFormattedPrice
      })
      this.performCheckout = true;
      this.$store.dispatch('statusMessageClear');
    },
    async getCartData() {
      if (Object.keys(this.cart).length > 0) {

        // get list of item IDs from cart keys
        let cartItems = Object.keys(this.cart);

        // convert list to string of comma-seperated values
        let itemsString = cartItems.toString();

        // get array of items from server that match the CSVs
        let url = this.$helpers.urls.cartItemList(itemsString);
        await fetch(url)
        .then(request => request.json())
        .then(data => {this.cartData = data;})
      }
    },
    itemAdd(item) {
      this.$store.dispatch('cartUpdateItem', {item: item, quantity: 1})
    },
    itemRemove(item) {
      this.$store.dispatch('cartUpdateItem', {item: item, quantity: -1})

      // if item no longer in cartData, remove it
      let cartDataIds = this.cartData.map(x => x.id);
      let currentItemIndex = cartDataIds.indexOf(item.id)
      if (!this.cart[String(item.id)]) {
        this.cartData.splice(currentItemIndex, 1);
      }
      if (!Object.keys(this.cartData).length) {
        this.$store.dispatch('cartClear');
      }
    },
    cartClear() {
      this.$store.dispatch('cartClear');
      this.cartData = {};
    }
  },
  destroyed() {
    this.$store.commit('checkoutData', {});
  }
}
</script>

<style>

.cart-item-card {
  height: 8rem;
}

.cart-item-card-container {
  margin-top: 1rem;
}

.cart-item-container {
  margin: auto;
}

.cart-item-name {
  color: #222;
  font-size: 1.3rem;
  overflow-x: initial;
}

.modal-background {
  position: absolute;
  display: flex;

  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

div.cart-empty {
  position: absolute;
  left: 0;
  right: 0;
}

.logout-hr {
  width: 25rem;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 2px solid black;
}

.cart-quantity-container {
  display: flex;
  max-width: 9rem;
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.cart-quantity-button {
  background-color: #bbb;
  width: 2rem;
}

.input.cart-quantity-text {
  margin: auto 0.5rem;
  pointer-events: none;
  width: 3rem;
  text-align: center;
}

.checkout-icon-container {
  margin-left: 0.4rem;
}

.checkout-text-container {
  margin: auto;
}

.checkout-button-container {
  display: flex;
  max-width: 9rem;
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.clear-cart-button {
  display: none;
}

.trash-icon {
  font-size: 1.3rem;
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
}

</style>
