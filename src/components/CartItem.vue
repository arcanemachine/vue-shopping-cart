<template>
  <div class="card large">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure v-if="item.image" class="image is-48x48">
            <img v-if="item.image" :src="item.image" :alt="item.name">
            <div v-else></div>
          </figure>
        </div>
        <div class="media-content cart-item-container">
          <router-link :to="{name: 'itemDetail', params: {'storeId': item.store_id, 'categoryId': item.category_id, 'itemId': item.id}}">
            <p class="cart-item-name">{{ item.name }}</p>
          </router-link>
        </div>
        <div class="cart-quantity-container">
          <button @click="itemRemove(item)" class="button cart-quantity-button">-</button>
          <input type="text" v-model="cart[item.id]" class="input cart-quantity-text" disabled>
          <button @click="itemAdd(item)" class="button cart-quantity-button">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Logout',
  props: ['item']
}
</script>

<style>
.logout-hr {
  width: 25rem;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 2px solid black;
}

.logout-container {
  background-color: whitesmoke;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 0;
}

.clear-cart-checkbox {
  margin-top: 2rem;
}

</style>
