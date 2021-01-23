<template>
  <div class="section">
    <div class="container has-text-centered">
      <div class="is-4 is-offset-4">
        <h2 class="title has-text-black">User Detail</h2>
      </div>
    </div>
    <div class="content">
      <div class="mt-4">
        <p>Update your address</p>
        <p><router-link :to="{name: 'cartDetail'}">View your cart</router-link></p>
        <p><router-link :to="{name: 'logoutConfirm'}">Logout</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserDetail',
  components: {
  },
  beforeCreate() {
    if (!this.$store.getters.userIsAuthenticated) {
      this.$router.push({name: 'login'});
    }
  },
  methods: {
  }
}
</script>
