<template>
  <nav class="navbar is-dark border-bottom navbar-color-custom">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item brand-text has-text-weight-bold" href="/">Vue Store + Shopping Cart</a>
        <div class="navbar-item-touch is-hidden-desktop is-hidden-widescreen">
          <a class="navbar-item navbar-cart-container-touch">
            <i class="bi-cart2 navbar-cart-touch has-text-light"></i>
          </a>
        </div>
        <span @click="navbarToggle" class="navbar-burger burger hover-background-white" :class="navbarMenuClass" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu is-dark" :class="navbarMenuClass">
          <div class="navbar-end">
            <a class="navbar-item is-hidden-mobile is-hidden-tablet-only">
              Your Cart <span class="navbar-cart-container-wide"><i class="bi-cart2 is-size-5 shopping-cart-icon-wide"></i></span>
            </a>
            <a class="navbar-item has-text-centered">Stores</a>
            <a class="navbar-item has-text-centered">Your Account</a>
          </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
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

.navbar-item-touch {
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	align-items: center;
}

.navbar-cart-container-touch {
  margin-right: 0.2rem;
	padding-bottom: 0.25rem;
  border-radius: 0.5rem;
	font-size: 1.3rem;
  transition: background-color 0.5s;
}

.hover-background-white {
  transition: background-color 0.5s;
}

.hover-background-white:hover, .navbar-item.navbar-cart-container-touch:hover {
  background-color: rgb(255, 255, 255, 0.2);
}

.navbar-cart-touch {
  margin: -0.35rem 0 0.35rem;
}

.navbar-cart-container-wide {
  margin: -0.25rem 0.25rem 0.25rem;
}


</style>

