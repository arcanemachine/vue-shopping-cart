<template>
  <!--div @click="$store.dispatch('addToCart', item)" -->
  <div @click="addToCart"
       class="button is-success add-to-cart-button">
    Add to Cart <i class="ml-3 pb-1 bi-cart2 navbar-show-icon-touch has-text-light"></i>
  </div>
</template>

<script>
export default {
  name: 'AddToCartButton',
  props: {
    item: Object
  },
  methods: {
    addToCart() {
      this.$store.commit('cartAdd', this.item);
    }
  }
}
</script>

<style scoped lang="scss">
.button {
  float: right;
  margin-top: 0.4rem;
  padding: 1.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

</style>
