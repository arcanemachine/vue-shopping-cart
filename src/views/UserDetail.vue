<template>
  <div class="section">
    <div class="container has-text-centered">
      <div class="is-4 is-offset-4">
        <h2 class="title has-text-black">User Detail</h2>
        <h2 class="subtitle has-text-black">{{ user.username }}</h2>
      </div>
    </div>
    <div class="content">
      <div class="mt-6 is-size-4 has-text-centered">
        <div><router-link :to="{name: 'cartDetail'}">View your cart</router-link></div>
        <div class="mt-3"><router-link :to="{name: 'storeList'}">View stores</router-link></div>
        <div class="mt-6"><router-link :to="{name: 'logoutConfirm'}">Logout</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserDetail',
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    user() {
      if (this.$store.state.user) {
        return this.$store.state.user;
      }
      return {username: ''}
    }
  }
}
</script>
