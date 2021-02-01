<template>
  <div class="section">
    <div class="hero">
      <div class="hero body">
        <div class="container has-text-centered component-login-container">
          <div class="is-4 is-offset-4">
            <div class="title has-text-black">Login</div>
            <div class="hr-container">
              <hr class="login-hr">
            </div>
            <div class="mt-6 mb-4 has-text-weight-bold">Please login to your account to continue.</div>
            <div class="box">
              <form @submit="login">
                <div class="field">
                  <div class="control">
                    <input type="text"
                           v-model="form.username"
                           id="login-input-username"
                           class="input is-large"
                           placeholder="Username"
                           autofocus="">
                  </div>
                  <div class="control">
                    <input type="password"
                           v-model="form.password"
                           id="login-input-password"
                           class="input is-large"
                           placeholder="Password">
                  </div>
                </div>
                <button id="login-submit-button" ref="loginButton" class="button is-block is-info is-large is-fullwidth">Login</button>
              </form>
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="loginResponse === 'Success!'"
                   class="is-size-4 has-text-success has-text-weight-bold">
                Success!
              </div>
              <div v-for="message in loginResponse.form_errors"
                   :key="message"
                   class="is-size-5 has-text-danger has-text-weight-bold">
                {{ message }}
              </div>
              <div v-for="message in loginResponse.non_field_errors"
                   :key="message"
                   class="is-size-5 has-text-danger has-text-weight-bold">
                Error: {{ message }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loginResponse: {},
      messageTimeout: undefined
    }
  },
  mounted() {
    if (this.$store.getters.userIsAuthenticated) {
      this.$router.push({name: 'userDetail'});
    }
  },
  methods: {
    async getUser() {
      
    },
    async login() {
      event.preventDefault();

      // do not continue if form fields are empty
      if (!this.form.username || !this.form.password) {
        this.loginResponse = {form_errors: ['Please complete the form before continuing.']};
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
          this.loginResponse = {};
        }, 4000)
        return false;
      }

      this.$refs.loginButton.classList.add('is-loading');

      let url = this.$helpers.urls.login;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form)
      })
      .then(response => {
        if (!response.ok) {
          console.log("Fetch error: " + response.status);
          this.$refs.loginButton.classList.remove('is-loading');
        }
        return response.json();
      })
      .then(data => {
        if ('key' in data) {
          // successful login
          this.$store.dispatch('login', data.key);
          this.loginResponse = 'Success!';
          setTimeout(() => {
            this.$router.replace({name: 'userDetail'});
          }, 750)
        } else {
          // on unsuccessful login, display status message and re-enable login button
          setTimeout(() => {
            this.$refs.loginButton.classList.remove('is-loading');
            this.loginResponse = data;
            setTimeout(() => {
              this.loginResponse = {};
            }, 4000)
          }, 500)
        }
      })
      .catch(error => console.log(error))
    },
  }
}
</script>

<style>

.component-login-container {
  width: 25rem;
}

.box {
  padding: 1rem;
}

.login-hr {
  margin: 1rem auto;
  border-bottom: 2px solid black;
}

.login-text {
  margin-top: 5rem;
}

.input {
  margin-bottom: 1rem;
}
</style>
