<template>
    <div>
      <div class="card large">
        <router-link :to="{name: 'categoryDetail', params: {storeId: category.store_id, categoryId: category.id}}">
          <div class="card-image" :style="cardImageStyle">
            <figure v-if="category.image" class="image is-16-by-9 card-image-container">
              <img :src="category.image" :title="category.name" :alt="`${category.name} Image`">
            </figure>
            <figure v-else class="image is-16-by-9 card-image-container">
              <i class="bi bi-camera-fill image-not-available"></i>
            </figure>
          </div>
        </router-link>
        <div class="card-content">
          <div class="is-4">
            <router-link v-if="Object.keys(category).length"
                         :to="{name: 'categoryDetail', params: {storeId: category.store_id, categoryId: category.id}}"
                         class="title">
              {{ category.name }}
            </router-link>
          </div>
          <div class="is-6">
            {{ category.description }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: Object
  },
  computed: {
    cardImageStyle() {
      return {'background-color': this.category.image ? 'white' : 'darkgray'}
    }
  }
}
</script>

<style scoped lang="scss">
.card-image {
  height: 15rem;
}

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
 
</style>
