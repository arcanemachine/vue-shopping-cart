<template>
  <div class="section">
    <div class="hero">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
            <h2 class="title has-text-black">Login</h2>
            <div class="hr-container">
              <hr class="login-hr">
            </div>
            <div class="box">
              <form @submit="login">
                <div class="field">
                  <div class="control">
                    <input type="text"
                           v-model="form.username"
                           class="input is-large"
                           placeholder="Username"
                           autofocus="">
                  </div>
                  <div class="control">
                    <input type="password"
                           v-model="form.password"
                           class="input is-large"
                           placeholder="Password"
                           autofocus="">
                  </div>
                </div>
                <button ref="loginButton" class="button is-block is-info is-large is-fullwidth">Login</button>
              </form>
            </div>
            <div class="csrftoken-container">csrftoken: {{ undefined }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserLogin',
  components: {
  },
  data() {
    return {
      // csrftoken: this.$helpers.getCookie('csrftoken'),
      form: {
        username: '',
        password: ''
      },
      deleteme: undefined
    }
  },
  mounted() {
    // if (!this.csrftoken) {
    //  window.location.replace(this.$helpers.urls.getCsrfToken);
    // }
  },
  methods: {
    async login() {
      event.preventDefault();
      this.$refs.loginButton.classList.add('is-loading');
      setTimeout(() => {
        this.$refs.loginButton.classList.remove('is-loading');
      }, 750)

      let url = this.$helpers.urls.login;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form)
      })
      .then(result => result.json())
      .then(data => {
        if ('key' in data) {
          this.$store.dispatch('userLogin', data.key);
        }
      })
      if (this.$store.getters.userIsAuthenticated) {
        console.log('is auth');
        this.$router.push({name: 'userDetail'});
      }

    },
  }
}
</script>

<style>

.csrftoken-container {
  word-wrap: anywhere;
}

.this-container {
  width: 80%;
}

.box {
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
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
