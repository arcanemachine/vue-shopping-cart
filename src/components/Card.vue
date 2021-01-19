<template>
    <div class="card large">
      <router-link to="/stores/1/">
      <div class="card-image">
        <figure class="image is-16-by-9">
          <img src="http://192.168.1.120:8000/media/images/MallMart/mallmart.jpg" title="STORE NAME" alt="STORE NAME">
        </figure>
      </div>
      </router-link>
      <div class="card-content">
        <div class="is-4">
          <router-link to="/stores/1/" class="title">
            MallMart
          </router-link>
        </div>
        <div class="is-6">
          <router-link to="/stores/1/" class="subtitle">
            We've got everything you need!
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

