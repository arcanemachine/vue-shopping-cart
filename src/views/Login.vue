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
            <transition name="fade" mode="out-in">
              <div v-if="loginResponse === 'Success!'" class="has-text-weight-bold">Success!</div>
              <div v-for="message in loginResponse.form_errors" :key="message" class="has-text-weight-bold">{{ message }}</div>
              <div v-for="message in loginResponse.non_field_errors" :key="message" class="has-text-weight-bold">Error: {{ message }}</div>
              <div v-for="message in loginResponse.username" :key="message" class="has-text-weight-bold">Username: {{ message }}</div>
              <div v-for="message in loginResponse.password" :key="message" class="has-text-weight-bold">Password: {{ message }}</div>
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
  components: {
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loginResponse: {}
    }
  },
  methods: {
    async login() {
      event.preventDefault();

      // do not continue if form fields are empty
      if (!this.form.username || !this.form.password) {
        this.loginResponse = {form_errors: ['Please complete the form before continuing.']};
        setTimeout(() => {
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
        }
        return response.json();
        // this.$helpers.handleResponse(response);
      })
      .then(data => {
        if ('key' in data) {
          // successful login
          this.$store.dispatch('login', data.key);
          this.loginResponse = 'Success!';
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
      if (this.$store.getters.userIsAuthenticated) {
        // redirect on successful login
        setTimeout(() => {
          this.$router.push({name: 'userDetail'});
        }, 750)
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
  width: 25rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}

.login-hr {
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
