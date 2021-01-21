<template>
  <div class="section">
    <div class="hero is-fullheight">
      <div class="hero body">
        <div class="container has-text-centered">
          <div class="is-4 is-offset-4">
            <h2 class="title has-text-black">Login</h2>
            <div class="hr-container">
              <hr class="login-hr">
            </div>
            <p class="login-text subtitle has-text-black">Login to your account</p>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-large" type="text" placeholder="Username" autofocus="">
                  </div>
                  <div class="control">
                    <input class="input is-large" type="password" placeholder="Password" autofocus="">
                  </div>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ItemDetail',
  components: {
  },
  props: [
    'itemId'
  ],
  data() {
    return {
      item: {},
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getItemDetail(this.itemId);
    })
  },
  methods: {
    getItemDetail() { // move this into vuex store
      fetch(this.$helpers.urls.itemDetail(this.itemId))
      .then(response => response.json())
      .then(data => this.item = data)
    },
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
