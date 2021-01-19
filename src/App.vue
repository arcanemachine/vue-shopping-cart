<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'

var world = 'world!'; // eslint-disable-line


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
</style>
