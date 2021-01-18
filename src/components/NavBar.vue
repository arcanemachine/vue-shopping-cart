<template>
  <nav class="navbar is-white border-bottom">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item brand-text" href="/">Vue Store + Shopping Cart</a>
        <div class="navbar-item-show-on-mobile is-hidden-desktop is-hidden-widescreen">
          <a class="navbar-item navbar-item-shopping-cart">&#x1f6d2;</a>
        </div>
        <span @click="navbarToggle" class="navbar-burger burger" :class="navbarMenuClass" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu" :class="navbarMenuClass">
          <div class="navbar-end">
            <a class="navbar-item is-hidden-mobile is-hidden-tablet-only">Your Cart <span class="ml-2 is-size-5">&#x1f6d2;</span></a>
            <a class="navbar-item">Stores</a>
            <a class="navbar-item">Your Account</a>
          </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  },
  data() {
    return {
      helloWorld: 'Hello Bulma!',
      navbarIsActive: false,
    }
  },
  computed: {
    navbarMenuClass() {
      return {
        'is-active': this.navbarIsActive ? true : false}
    }
  },
  methods: {
    navbarToggle() {
      this.navbarIsActive = !this.navbarIsActive;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.border-top {
  border: 2px solid black;
  border-width: 2px 0 0;
}

.border-bottom {
  border: 2px solid black;
  border-width: 0 0 2px;
}

.navbar-item-show-on-mobile {
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	align-items: center;
}

.navbar-item-shopping-cart {
	font-size: 1.3rem;
	margin-bottom: 0.25rem;
}


</style>

