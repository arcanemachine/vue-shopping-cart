<template>
    <div>
      <div class="card large">
        <router-link :to="`/stores/${store.id}/`">
        <div class="card-image">
          <figure class="image is-16-by-9 center-image-in-card">
            <img :src="`${store.image}`" :title="`${store.name}`" :alt="`${store.name} Image`">
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
.center-image-in-card {
  overflow: hidden;
  display: flex;
  max-height: 20rem;
  align-items: center;
  justify-content: stretch;
}
</style>
