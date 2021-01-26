<template>
  <div class="section">
    <div class="container">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
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
            <div v-for="item in cartData" :key="item.id">
              <div class="card large">
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
                        <p class="cart-item-name">{{ item.name }}</p>
                      </router-link>
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
          </transition-group>
          <transition name="fade">
            <button v-if="Object.keys(cartData).length"
                    @click="cartClear"
                    class="mt-6 button is-large is-danger clear-cart-button">
              Remove all Items <i class="trash-icon bi-trash navbar-show-icon-touch"></i>
            </button>
          </transition>
        </div>
      </div>
<div>{{ cartData }}</div>
    </div>
  </div>
</template>

<!--
<div>{{ cart }}</div>
-->

<script>

export default {
  name: 'CartDetail',
  data() {
    return {
      cartData: {},
      isMounted: false,
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(() => {
      this.getCartData();
    })
  },
  methods: {
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
      this.$forceUpdate();
    },
    itemAdd(item) {
      console.log(item)
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
  }
}
</script>

<style>

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
  transition-delay: 0.4s;
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

.trash-icon {
  font-size: 1.3rem;
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
}

</style>
