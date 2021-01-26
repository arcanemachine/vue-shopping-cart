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
            <router-link :to="{name: 'itemDetail', params: {storeId: item.store_id, categoryId: item.category_id, itemId: item.id}}" class="pt-0 is-size-4">
              {{ item.name }}
            </router-link>
          </div>
          <div class="item-description">
            {{ item.description }}
          </div>
          <div class="item-price">
            {{ $helpers.getFormattedPrice(item.price) }}
          </div>
        </div>
        <add-to-cart-button :item="item" class="add-to-cart-button" />
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
  background-color: white;
  overflow: hidden;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: stretch;
}

.image-not-available {
  background-color: darkgray;
  width: 100%;
  font-size: 10rem;
  color: white;
}
 .item-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-weight: bold;
}

.add-to-cart-button {
  margin-bottom: 1.5rem;
}
</style>
