<template>
    <div>
      <div class="card large">
        <router-link :to="{name: 'itemDetail', params: {storeId: item.store_id, categoryId: item.category_id, itemId: item.id}}" class="pt-0 is-size-4">
          <div class="card-image" :style="cardImageStyle">
            <figure v-if="item.image" class="image is-16-by-9 card-image-container">
                <img :src="item.image"
                     :title="item.name"
                     :alt="`${item.name} Image`"
                     :style="itemImageStyle"
                     class="card-img">
            </figure>
            <figure v-else class="image card-image-container">
              <i class="bi bi-camera-fill image-not-available"></i>
            </figure>
          </div>
        </router-link>
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
  },
  computed: {
    cardImageStyle() {
      return {'background-color': this.item.image ? 'white' : 'darkgray'}
    },
    itemImageStyle() {
      // don't show mouse pointer icon on itemDetail
      return {'cursor': this.$route.name === "itemDetail" ? 'default' : 'pointer'}
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped lang="scss">

.card-image-container {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

img.card-img {
  width: auto;
  height: 15rem;
}

.image-not-available {
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
