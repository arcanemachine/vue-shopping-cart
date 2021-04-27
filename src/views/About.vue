<template>
  <div class="container">
    <div class="section">
      <h1 class="title has-text-centered">Vue Shopping Cart Demo</h1>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="about">
            <p class="mt-4">This demo simulates a user-based shopping/checkout experience. Users can browse items, add them to their cart, manage the cart (add/remove items), and perform a checkout process.</p>
            <p class="mt-2"><strong>This demo is a simulation only. No real money is spent when using this demo.</strong></p>
          </div>
          <div class="about">
            <h4 class="mt-4 is-size-4 has-text-centered">Features</h4>
          <ul class="ml-5 mr-5 list-style-dashed has-text-left">
            <li class="mt-2">The frontend is powered by Vue/Vue-Router/Vuex.</li>
            <li>The backend uses a REST API powered by Django + Django Rest Framework.</li>
            <li>The shopping cart will be stored locally unless the user creates an account.</li>
            <li>If the user creates an account, all items will be synced to the the backend server and can be accessed from any computer the user logs in to.</li>
          </ul>
          </div>
          <div class="mt-5 container has-text-centered">
            <router-link :to="{name: 'storeList'}">
              <button id="button-lets-go-shopping" class="mt-3 button is-large is-success">Let's go shopping!</button>
            </router-link>
          </div>
          <div class="mt-6 is-size-5 has-text-centered">
            <div>
              <a href="https://github.com/arcanemachine/vue-shopping-cart">View source code on Github</a>
            </div>
            <div class="mt-3">
              <a :href="$helpers.BACKEND_SERVER_URL">View the backend server</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Cookies from 'js-cookie'

export default {
  name: 'About',
  mounted() {
    Cookies.set('introSeen', 1);
  }
}
</script>

<style scoped>

.list-style-dashed {
  list-style-type: '- ';
}

</style>
