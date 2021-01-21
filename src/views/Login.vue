<template>
  <div class="container">
    <div class="section has-text-centered">
      <div class="columns">
        <div class="column">
          <h1 class="title">{{ item.name }}</h1>
          <h2 class="subtitle">{{ item.description }}</h2>
          <figure class="image is-16-by-9 card-image-container">
            <img :src="item.image" :title="item.name" :alt="`${item.name} Image`">
          </figure>
          <h2 class="subtitle">{{ item.price }}</h2>
        </div>
      </div>
      <div class="row columns is-multiline">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ItemDetail',
  components: {
  },
  props: [
    'itemId'
  ],
  data() {
    return {
      item: {},
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getItemDetail(this.itemId);
    })
  },
  methods: {
    getItemDetail() { // move this into vuex store
      fetch(this.$helpers.urls.itemDetail(this.itemId))
      .then(response => response.json())
      .then(data => this.item = data)
    },
  }
}
</script>
