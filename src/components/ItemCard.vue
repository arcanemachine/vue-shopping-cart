<template>
    <div>
      <div class="card large">
        <div class="card-image">
          <figure v-if="item.image" class="image is-16-by-9 card-image-container">
            <img :src="item.image" :title="item.name" :alt="`${item.name} Image`">
          </figure>
          <figure v-else class="image is-16-by-9 card-image-container">
            <i class="bi bi-camera-fill image-not-available"></i>
          </figure>
        </div>
        <div class="card-content">
          <div class="has-size-4">
            <span class="pt-0 is-size-4">
              {{ item.name }}
            </span>
          </div>
          <div>
            <span :to="{
              name: 'itemDetail',
              params: {
                storeId: item.store_id,
                categoryId: item.category_id,
                itemId: item.id}
              }">
              {{ item.description }}
            </span>
          </div>
          <add-to-cart-button :item="item" />
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
