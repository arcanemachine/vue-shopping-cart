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

import StoreCard from '../components/StoreCard.vue'

export default {
  name: 'Home',
  components: {
    StoreCard
  },
  data() {
    return {
      stores: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
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
