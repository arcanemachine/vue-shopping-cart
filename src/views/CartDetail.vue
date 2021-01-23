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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  computed: {
    cart() {
      return this.$store.getters.cart
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
