<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="fade">
      <status-message class="status-message" v-if="$store.getters.statusMessage" />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view class="router-view"/>
    </transition>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import StatusMessage from './components/StatusMessage.vue'

export default {
  name: 'App',
  components: {
    NavBar, StatusMessage
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

/* bulma extensions */
.is-absolute {
  position: absolute;
}
</style>
