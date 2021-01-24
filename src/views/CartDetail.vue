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
          <ul>
            <li v-for="item in cart" :key="item">{{ item }} - {{ cart[item] }}</li>
          </ul>
          <div class="mt-6">{{ cart }}</div>
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
      return this.$store.getters.cart
    }
  },
  mounted() {
    if (Object.keys(this.cart).length > 0) {
      // get list of item IDs from cart keys
      let cartItems = Object.keys(this.cart);
      // convert list to string of comma-seperated values
      let itemsString = cartItems.toString();
      // get array of items from server that match the CSVs
      let url = this.$helpers.urls.cartItemList(itemsString);
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.$store.getters.userToken}`
        }
      })
      .then(request => request.json())
      .then(data => {
        this.cartData = data;
      })
    }
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

</style>
