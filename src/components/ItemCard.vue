<template>
    <div>
      <div class="card large">
        <router-link :to="{name: 'itemDetail', params: {storeId: item.store_id, categoryId: item.category_id, itemId: item.id}}">
        <div class="card-image">
          <figure v-if="item.image" class="image is-16-by-9 card-image-container">
            <img :src="item.image" :title="item.name" :alt="`${item.name} Image`">
          </figure>
          <figure v-else class="image is-16-by-9 card-image-container">
            <i class="bi bi-camera-fill image-not-available"></i>
          </figure>
        </div>
        </router-link>
        <div class="card-content has-text-left">
          <div class="has-size-4">
            <span :to="{name: 'itemDetail', params: {storeId: item.store_id, categoryId: item.category_id, itemId: item.id}}"
                         class="pt-0 is-size-4">
              {{ item.name }}
            </span>
            <add-to-cart-button :item="item" />
          </div>
          <div>
            <span :to="{name: 'itemDetail', params: {storeId: item.store_id, categoryId: item.category_id, itemId: item.id}}">
              {{ item.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import AddToCartButton from './AddToCartButton.vue'

export default {
  name: 'ItemCard',
  props: {
    item: Object
  },
  components: {
    AddToCartButton
  }
}
</script>

<style scoped lang="scss">
.card-image-container {
  background-color: darkgray;
  overflow: hidden;
  display: flex;
  height: 15rem;
  align-items: center;
  justify-content: center;
}

.image-not-available {
  width: 100%;
  font-size: 10rem;
  margin-bottom: 3rem;
  color: white;
}
  
</style>
