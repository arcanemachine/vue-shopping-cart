<template>
  <div class="container">
    <div class="section">
      <div class="column has-text-centered">
        <h1 class="title">Store Detail</h1>
        <h2 class="subtitle">MallMart</h2>
      </div>
      <div class="mt-3 column has-text-centered">
        <div class="title">Categories</div>
        <category-card></category-card>
      </div>
    </div>
  </div>
</template>

<script>

import * as CategoryCard from '../components/Card.vue';

export default {
  name: 'Home',
  components: {
    CategoryCard
  },
  props: {
    store: Number
  },
  mounted() {
    console.log('hello!');
  }
}
</script>


