<template>
    <div>
      <div class="card large">
        <router-link :to="`/stores/${store.id}/`">
        <div class="card-image">
          <figure v-if="store.image" class="image is-16-by-9 card-image-container">
            <img :src="`${store.image}`" :title="`${store.name}`" :alt="`${store.name} Image`">
          </figure>
          <figure v-else class="image is-16-by-9 card-image-container">
            <i class="bi bi-camera-fill image-not-available"></i>
          </figure>
        </div>
        </router-link>
        <div class="card-content">
          <div class="is-4">
            <router-link to="/stores/1/" class="title">
              {{ store.name }}
            </router-link>
          </div>
          <div class="is-6">
            <router-link to="/stores/1/" class="subtitle">
              {{ store.description }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    store: Object
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
  justify-content: stretch;
}

.image-not-available {
  width: 100%;
  font-size: 10rem;
  color: white;
}
  
</style>
