<template>
  <div class="section">
    <div class="hero">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
            <h2 class="title has-text-black">Confirm Logout</h2>
            <div class="hr-container">
              <hr class="logout-hr">
            </div>
          </div>
          <div class="logout-container">
            <div class="mb-5 subtitle">Are you sure you want to log out?</div>
            <router-link :to="{name: 'logout', query: {clearCart: clearCartCheckbox}}">
              <button class="button is-block is-info is-large is-fullwidth">Logout</button>
            </router-link>
            <div class="clear-cart-text">
              <label for="clear-cart-checkbox">
                <input id="clear-cart-checkbox"
                       v-model="clearCartCheckbox"
                       class="clear-cart-checkbox"
                       type="checkbox"> Clear my shopping cart when I log out
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Logout',
  data() {
    return {
      clearCartCheckbox: true
    }
  }
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
