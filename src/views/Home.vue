<template>
  <div class="container">
    <div class="section">
      <div class="column has-text-centered">
        <h1 class="title">Shopping Cart Demo</h1>
        <store-card v-for="store in storeList" :key="store.id" :store="store"></store-card>
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
      storeList: {}
    }
  },
  mounted() {
    console.log('hello');
    this.$nextTick(() => {
      this.getStoreList();
    })
  },
  methods: {
    getStoreList() {
      fetch(this.$helpers.urls.storeList)
      .then(response => response.json())
      .then(data => this.storeList = data)
    }
  }
}
</script>
