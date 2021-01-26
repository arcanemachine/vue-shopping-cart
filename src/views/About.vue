<template>
  <div class="container">
    <div class="section">
      <h1 class="title has-text-centered">Vue Shopping Cart Demo</h1>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="about">
            <h4 class="is-size-4 has-text-centered">About</h4>
            <p class="mt-4">This is a demo of a store/shopping cart interface, made using the Vue.js framework.</p>
            <p class="mt-2">This demo simulates a user-base shopping/checkout experience. Users can browse items, add them to their cart, manage the cart (add/remove items), and perform a checkout process.</p>
            <p class="mt-2"><strong>This demo is a simulation only. No real money is spent when using this demo.</strong></p>
          </div>
          <div class="about">
            <h4 class="mt-4 is-size-4 has-text-centered">Features</h4>
            <div class="mt-4">This demo uses the following features/technologies:</div>
          <ul class="ml-5 mr-5 list-style-dashed has-text-left">
            <li class="mt-2">The frontend is powered by Vue/Node.js.</li>
            <li>Uses a REST backend powered by Django + Django Rest Framework</li>
            <li>Stores and products are created on the backend.</li>
            <li>Users may save their shopping history by registering an account. The cart will then be stored on the backend server and can be accessed from any computer.</li>
            <li>If the user does not register an account, the shopping cart info will only be stored locally (saved using cookies).</li>
            <li>When an account is registered, the cart will sync with the backend server and all actions will be saved remotely, providing a seamless experience to the user.</li>
            <li>Users can add and edit their address and preferred payment methods.</li>
          </ul>
          </div>
          <div class="mt-5 container has-text-centered">
            <router-link :to="{name: 'storeList'}">
              <button class="button is-success">Let's go shopping!</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'About',
}
</script>

<style scoped>

.list-style-dashed {
  list-style-type: '- ';
}

</style>
