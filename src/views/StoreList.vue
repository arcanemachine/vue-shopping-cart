<template>
  <div class="container">
    <div class="section has-text-centered">
      <div class="columns">
        <div class="column">
          <div id="store-list-title" class="title">Shopping Cart Demo</div>
          <div id="store-list-subtitle" class="subtitle">Enjoy the Vue</div>
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
  name: 'StoreList',
  components: {
    StoreCard
  },
  data() {
    return {
      stores: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getStores();
    })
  },
  methods: {
    async getStores() {
      this.stores = await fetch(this.$helpers.urls.storeList).then(response => response.json())
    }
  }
}
</script>

<style scoped lang="scss">

</style>
