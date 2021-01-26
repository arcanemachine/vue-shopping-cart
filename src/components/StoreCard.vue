<template>
    <div>
      <div class="card large">
        <router-link :to="{name: 'storeDetail', params: {storeId: store.id}}">
        <div class="card-image">
          <figure v-if="store.image" class="image is-16-by-9 card-image-container">
            <img :src="store.image" :title="store.name" :alt="`${store.name} Image`">
          </figure>
          <figure v-else class="image is-16-by-9 card-image-container">
            <i class="bi bi-camera-fill image-not-available"></i>
          </figure>
        </div>
        </router-link>
        <div class="card-content">
          <div class="is-4">
            <router-link :to="{name: 'storeDetail', params: {storeId: store.id}}" class="title">
              {{ store.name }}
            </router-link>
          </div>
          <div class="is-6">
            <router-link :to="{name: 'storeDetail', params: {storeId: store.id}}" class="subtitle">
              {{ store.description }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'StoreCard',
  props: {
    store: Object
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
  
</style>
