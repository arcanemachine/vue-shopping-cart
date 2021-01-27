<template>
  <div class="container">
    <div class="section has-text-centered">
      <div class="columns">
        <div class="column">
          <h1 class="title">Shopping Cart Demo</h1>
          <h2 class="subtitle">Enjoy the Vue</h2>
        </div>
      </div>
      <div class="row columns is-multiline">
        <store-card v-for="store in stores"
                    :key="store.id"
                    :store="store"
                    class="column">
        </store-card>
      </div>
    </div>
  </div>
</template>

<script>

import Cookies from 'js-cookie'

import StoreCard from '../components/StoreCard.vue'

export default {
  name: 'StoreList',
  components: {
    StoreCard
  },
  mounted() {
    this.$nextTick(() => {
      if (!Cookies.get('introSeen')) {
        this.$router.push({name: 'about'});
      }
      this.getStores();
    })
  },
  methods: {
    getStores() {
      fetch(this.$helpers.urls.storeList)
      .then(response => response.json())
      .then(data => this.stores = data)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
