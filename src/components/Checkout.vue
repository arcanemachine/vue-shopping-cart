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
          <button @click="handleNextStep" class="button is-success">Confirm</button>
          <button @click="$emit('cancel-checkout')" class="button">Cancel</button>
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

      currentStep: 'confirm',
      isLoading: false,

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
  },
  methods: {
    handleNextStep() {
      if (this.currentStep === 'confirm') {
        this.currentStep = undefined;
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">

div.modal-card {
  align-self: center;
}

</style>
