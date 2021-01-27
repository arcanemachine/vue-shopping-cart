<template>
  <div class="container">
    <div class="section has-text-centered">
      <div class="mb-4 title">
        <router-link v-if="Object.keys(category).length"
                     :to="{name: 'storeDetail', params: {storeId: category.store_id}}">
          &larr; Return to '{{ category.store_name }}'
        </router-link>
      </div>
      <div class="columns">
        <div class="column">
          <h1 class="title">{{ category.name }}</h1>
          <h2 class="subtitle">{{ category.description }}</h2>
        </div>
      </div>
      <div class="row columns is-multiline is-centered">
        <item-card v-for="item in items"
                    :key="item.id"
                    :item="item"
                    class="column is-4">
        </item-card>
      </div>
    </div>
  </div>
</template>

<script>

import ItemCard from '../components/ItemCard.vue'

export default {
  name: 'CategoryDetail',
  components: {
    ItemCard
  },
  props: [
    'categoryId'
  ],
  data() {
    return {
      category: {},
      items: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCategoryDetail(this.categoryId);
      this.getCategoryItemList(this.categoryId);
    })
  },
  methods: {
    getCategoryDetail() { // move this into vuex store
      fetch(this.$helpers.urls.categoryDetail(this.categoryId))
      .then(response => response.json())
      .then(data => this.category = data)
    },
    getCategoryItemList() {
      fetch(this.$helpers.urls.categoryItemList(this.categoryId))
      .then(response => response.json())
      .then(data => this.items = data)
    }
  }
}
</script>

<style>
.is-red {
  color: red;
}
</style>
