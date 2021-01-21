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
          <div class="subtitle">Are you sure you want to log out?</div>
          <router-link :to="{name: 'logout'}">
            <button ref="logoutButton" class="button is-block is-info is-large is-fullwidth">Logout</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  mounted() {
    setTimeout(() => {
      this.logout();
    }, 1500)
  },
}
</script>

<style>

.logout-hr {
  width: 25rem;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 2px solid black;
}

</style>
