<template>
  <div id="app">
    <nav-bar></nav-bar>
    <!--get-session-cookie /-->
    <transition name="fade">
      <status-message class="status-message" v-if="$store.getters.statusMessage" />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view class="router-view"/>
    </transition>
  </div>
</template>

<script>
import Cookies from 'js-cookie' // eslint-disable-line no-unused-vars

import NavBar from './components/NavBar.vue'
import StatusMessage from './components/StatusMessage.vue'

export default {
  name: 'App',
  components: {
    NavBar, StatusMessage
  },
  mounted() {
    // if userToken cookie exists, get user info from server
    let userToken = Cookies.get('userToken');
    if (userToken) {
      this.$store.dispatch('login', userToken);
    } else {
      // get cart info from cookies
      if (Cookies.get('cart')) {
        this.$store.commit('cartIs', JSON.parse(Cookies.get('cart')));
        this.$store.commit('cartModifiedAt', JSON.parse(Cookies.get('cartModifiedAt')));
      }
    }
  },
}

</script>

<style lang="scss">
body {
  background-color: #caf0f8;
}

#app {
  padding-top: 2rem;
  min-height: 100vh;
}

a {
  font-weight: bold;
  color: #ade8f4;
}

.bottom-links {
  font-size: 1.2rem;
  margin-top: 3rem;
}

.underline {
  text-decoration: underline;
}

.cursor-url {
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.delay-transition-1000 {
  transition-delay: 1s;
}

/* bulma extensions */
.is-absolute {
  position: absolute;
}
</style>
