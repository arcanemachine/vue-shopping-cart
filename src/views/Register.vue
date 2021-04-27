<template>
  <div class="section">
    <div class="hero is-fullheight">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
            <h2 class="title has-text-black">Register</h2>
            <div class="hr-container">
              <hr class="login-hr">
            </div>
            <p class="login-text subtitle has-text-black">Register a new account by clicking the link below:</p>
              <a :href="registerUrl">
                <button class="button is-block is-info is-large is-fullwidth">Register</button>
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Register',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    registerUrl() {
      return this.$helpers.urls.registerBackend + '?frontend=1';
    }
  },
  mounted() {


  },
  methods: {
  }
}
</script>

<style>
.this-container {
  width: 80%;
}

.box {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.this-container {
  width: 100%;
}

.login-hr {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 2px solid black;
}

.login-text {
  margin-top: 5rem;
}

.input {
  margin-bottom: 1rem;
}
</style>
