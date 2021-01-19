<template>
    <footer class="footer">
      <div class="content has-text-centered">
        <strong>Copyright 2020. Licensed under <router-link to="/public/LICENSE.txt">MIT License</router-link>.</strong>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'PageFooter',
  props: {
    store: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

