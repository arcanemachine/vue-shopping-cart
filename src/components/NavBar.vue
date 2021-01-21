<template>
  <nav class="navbar is-fixed-top is-dark border-bottom navbar-color-custom">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{name: 'home'}" class="navbar-item brand-text has-text-weight-bold">Vue Store + Shopping Cart</router-link>
        <transition name="fade">
          <div v-if="$store.getters.isLoading" class="navbar-item-touch-container-start is-hidden-desktop is-hidden-widescreen">
            <a class="navbar-item navbar-show-icon-touch-container loading-animation" alt="Loading Icon" title="Loading...">
              <svg class="bi bi-arrow-repeat navbar-show-icon-touch has-text-light loading-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
              </svg>
            </a>
          </div>
        </transition>
        <div class="navbar-item-touch-container-end is-hidden-desktop is-hidden-widescreen">
          <router-link :to="userIconUrl"
                       class="navbar-item navbar-show-icon-touch-container"
                       alt="User Profile Icon"
                       title="Your Account">
            <i class="bi-person-circle navbar-show-icon-touch icon-person-circle" :style="userProfileIconStyle"></i>
          </router-link>
          <router-link :to="{name: 'cart'}"
                       class="navbar-item navbar-show-icon-touch-container"
                       alt="Shopping Cart Icon"
                       title="Your Cart">
            <i class="bi-cart2 navbar-show-icon-touch has-text-light"></i>
          </router-link>
        </div>
        <span @click="navbarToggle"
              class="navbar-burger burger hover-background-white"
              :class="navbarMenuClass"
              data-target="navMenu"
              title="Menu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu"
           class="navbar-menu is-dark"
           :class="navbarMenuClass">
          <div class="navbar-end">
            <a class="navbar-item is-hidden-mobile is-hidden-tablet-only">
              Your Cart <span class="navbar-icon-container-wide"><i class="bi-cart2 is-size-5"></i></span>
            </a>
            <router-link :to="{name: 'cart'}"
                         @click="this.navbarIsActive = false"
                         class="navbar-item has-text-centered">Your Cart</router-link>
            <router-link v-if="!$store.getters.userIsAuthenticated"
                         @click="this.navbarIsActive = false"
                         :to="{name: 'userDetail'}"
                         class="navbar-item has-text-centered">Login</router-link>
            <router-link v-if="$store.getters.userIsAuthenticated"
                         @click="this.navbarIsActive = false"
                         :to="{name: 'userDetail'}"
                         class="navbar-item has-text-centered">Your Account</router-link>
            <router-link v-if="$store.getters.userIsAuthenticated"
                         @click="this.navbarIsActive = false"
                         :to="{name: 'logoutConfirm'}"
                         class="navbar-item has-text-centered">Logout</router-link>
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
        'is-active': this.navbarIsActive ? true : false,
      }
    },
    userIconUrl() {
      if (!this.$store.getters.userIsAuthenticated) {
        return {name: 'login'};
      } else {
        return {name: 'userDetail'};
      }
    },
    userProfileIconStyle() {
      return {
        color: this.$store.getters.userIsAuthenticated ? 'gold' : 'white'
      }
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

.navbar-item-touch-container-start {
	display: flex;
	flex-grow: 1;
	justify-content: flex-start;
	align-items: center;
}

.navbar-item-touch-container-end {
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	align-items: center;
}

.navbar-show-icon-touch-container {
  margin-right: 0.2rem;
	padding-bottom: 0.25rem;
  border-radius: 0.5rem;
	font-size: 1.3rem;
  transition: background-color 0.5s;
}

@keyframes rotate-right {
  100% {
    transform: rotate(360deg);
  }
}

.loading-icon {
  padding-top: 0.25rem;
  transform: scale(2, 2);
}

.loading-animation {
  animation: 1.2s infinite rotate-right linear;
}

.hover-background-white {
  transition: background-color 0.5s;
}

.hover-background-white:hover, .navbar-item.navbar-icon-container-touch:hover {
  background-color: rgb(255, 255, 255, 0.2);
}

.navbar-show-icon-touch {
  margin: -0.35rem 0 0.35rem;
  transition: color 0.5s;
}

.navbar-icon-container-wide {
  margin: -0.25rem 0.25rem 0.25rem;
}

.icon-person-circle {
  margin-top: 0;
}

</style>

