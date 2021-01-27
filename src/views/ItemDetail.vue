<template>
  <div class="container">
    <div class="section has-text-centered">
      <div class="mb-4 subtitle has-text-left">
        <router-link v-if="Object.keys(item).length" :to="{name: 'categoryDetail', params: {storeId: item.store_id, categoryId: item.category_id}}">&larr; Return to '{{ item.category_name }}'</router-link>
      </div>
      <div class="columns">
        <item-card :item="item"
                   class="column is-6 is-offset-3">
        </item-card>
      </div>
    </div>
  </div>
</template>

<script>

import ItemCard from '../components/ItemCard.vue'

export default {
  name: 'ItemDetail',
  components: {
    ItemCard
  },
  props: [
    'itemId'
  ],
  data() {
    return {
      item: {},
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getItemDetail(this.itemId);
    })
  },
  methods: {
    columnCenterClass(index) {
      if (this.items.length % 3 === 2) {
        return [];
      } else if (this.items.length % 3 === 1) {
        if (this.items[index] === this.items.slice(-1)) {
          return ['is-red'];
        }
        return [''];
      } else {
        return [];
      }
    },
    getItemDetail() { // move this into vuex store
      fetch(this.$helpers.urls.itemDetail(this.itemId))
      .then(response => response.json())
      .then(data => this.item = data[0])
    },
  }
}
</script>

<style>

.card-image-container {
  display: flex;
  margin: auto;
  background-color: white;
  overflow: hidden;
  height: 15rem;
  width: 15rem;
  justify-content: center;
  align-items: center;
}

.image-not-available {
  background-color: darkgray;
  width: 100%;
  font-size: 10rem;
  padding-bottom: 4rem;
  color: white;
}

</style>
