<template>
  <div class="modal-background">

    <div v-if="isLoading" class="loading-container">
    </div>

    <transition name="slide">
      <div v-if="currentStep === 'confirm'" class="modal-card">

        <header class="modal-card-head">
          <p class="modal-card-title">Checkout</p>
          <button @click="$emit('cancel-checkout')" class="delete" aria-label="close"></button>
        </header>

        <section class="modal-card-body">
          <div class="content">Please confirm your order.</div>
        </section>

        <footer class="modal-card-foot">
          <button @click="nextStep" class="button is-success">Confirm</button>
          <button @click="checkoutCancel" class="button">Cancel</button>
        </footer>

      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      isMounted: false,
      eventListenerEsc: undefined,

      currentStep: 'confirm',
      // isLoading: false,

      /*
      enterAddress: false,
      selectPaymentMethod: false,
      confirmCheckout: true,
      success: false
      */
    }
  },
  mounted() {
    this.isMounted = true;

    // cancel checkout when Esc key is pressed
    document.addEventListener('keyup', this.checkoutCancelOnKeyEsc)
  },
  methods: {
    checkoutCancelOnKeyEsc(e) {
      if (e.key === 'Escape') {
        this.checkoutCancel();
        console.log('checkoutCancelOnKeyEsc()');
      }
    },
    checkoutCancel() {
      this.$emit('cancel-checkout');
    },
    nextStep() {
      if (this.currentStep === 'confirm') {
        this.currentStep = 'loading';
        setTimeout(() => {
          this.currentStep = 'confirm';
        }, 700)
      }
    },
    previousStep() {
      if (this.currentStep === 'confirm') {
        this.currentStep = 'loading';
        setTimeout(() => {
          this.currentStep = 'confirm';
        }, 700)
      }
    },
  },
  destroyed() {
    document.removeEventListener('keyup', this.checkoutCancelOnKeyEsc)
  }
}

</script>

<style scoped lang="scss">

div.modal-card {
  align-self: center;
}

.slide-enter-active, .slide-leave-active {
  transition: opacity .3s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
}

</style>
