<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'


export default {
  name: 'App',
  components: {
    NavBar
  }
}

</script>

<style lang="scss">
body {
  background-color: #caf0f8;
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
</style>
