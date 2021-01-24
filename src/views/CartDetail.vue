<template>
  <div class="section">
    <div class="hero">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
            <h2 class="title has-text-black">Your Cart</h2>
            <div class="hr-container">
              <hr class="logout-hr">
            </div>
          </div>
          <div v-for="item in cartData"
               :key="item.id"
               class="card large">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure v-if="item.image" class="image is-48x48">
                    <img :src="item.image" :alt="item.name">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4 no-padding">
                    {{ item.name }}
                  </p>
                  <p>
                    <span class="subtitle is-6">{{ item.description }}</span>
                  </p>
                </div>
                <div class="cart-quantity-container">
                  <button @click="itemRemove(item)" class="button cart-quantity-button">-</button>
                  <input type="text" v-model="cart[item.id]" class="input cart-quantity-text" disabled>
                  <button @click="itemAdd(item)" class="button cart-quantity-button">+</button>
                </div>
              </div>
            </div>
          </div>
          <br><br>
          <div class="mt-6">{{ cart }}</div>
          <div class="mt-6">{{ cartData }}</div>
          <div v-if="!Object.keys(cart).length" class="subtitle">Your cart is empty.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      cartData: {}
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
  },
  mounted() {
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
    },
    itemAdd(item) {
      console.log(item)
      this.$store.dispatch('cartUpdateItem', {item: item, quantity: 1})
    },
    itemRemove(item) {
      this.$store.dispatch('cartUpdateItem', {item: item, quantity: -1})
      // if item no longer in cartData, remove it
    },
  }
}
</script>

<style>

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
  width: 3rem;
  text-align: center;
}

</style>
