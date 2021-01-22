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
            <div v-if="!$store.getters.userIsAuthenticated" class="content">
              Success!
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
    setTimeout(() => {
      this.logout();
    }, 1500)
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
            this.$router.push({name: 'login'});
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
