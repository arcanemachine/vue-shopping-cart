<template>
  <div class="container">
    <div class="section has-text-centered">
      <div class="columns">
        <div class="column">
          <h1 class="title">{{ store.name }}</h1>
          <h2 class="subtitle">{{ store.description }}</h2>
        </div>
      </div>
      <div class="row columns is-multiline">
        <category-card v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    class="column">
        </category-card>
      </div>
    </div>
  </div>
</template>

<script>

import CategoryCard from '../components/CategoryCard.vue'

export default {
  name: 'StoreDetail',
  components: {
    CategoryCard
  },
  props: {
    // store: Object,
    storeId: String
  },
  data() {
    return {
      store: {},
      categories: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getStoreDetail(this.storeId);
      this.getStoreCategoryList(this.store.id);
    })
  },
  methods: {
    getStoreDetail() { // move this into vuex store
      fetch(this.$helpers.urls.storeDetail(this.storeId))
      .then(response => response.json())
      .then(data => this.store = data)
    },
    getStoreCategoryList() {
      fetch(this.$helpers.urls.storeCategoryList(this.storeId))
      .then(response => response.json())
      .then(data => this.categories = data)
    }
  }
}
</script>
