<template>
  <div class="section">
    <div class="hero">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
            <h2 class="title has-text-black">Logout</h2>
            <div class="hr-container">
              <hr class="logout-hr">
            </div>
          </div>
          <div>
            Logging you out...
          </div>
          <transition name="fade">
            <div v-if="!$store.getters.userIsAuthenticated" class="mt-3 is-size-4">
              <strong>Success!</strong>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Logout',
  mounted() {
    if (!Object.keys(this.$store.getters.userProfile).length) {
      this.$router.push({name: 'cartDetail'});
    }
    setTimeout(() => {
      this.logout();
    }, 1500)
    if (this.clearCart) {
      this.$store.dispatch('cartClear');
    }
  },
  props: {
    clearCart: Boolean
  },
  methods: {
    async logout() {
      let url = this.$helpers.urls.logout;
      await fetch(url, {
        method: 'POST',
      })
      .then(result => this.$helpers.handleResponse(result)) // use handleResponse
      .then(data => {
        if ('detail' in data && data.detail === "Successfully logged out.") {
          this.$store.dispatch('logout');
          setTimeout(() => {
            this.$router.push({name: 'cartDetail'});
          }, 1250)
        }
      })
    },
  }
}
</script>

<style>

.logout-hr {
  margin: 2rem auto 3rem;
  border-bottom: 2px solid black;
}

</style>
