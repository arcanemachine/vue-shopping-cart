<template>
  <div class="modal-background">

    <transition>
      <div v-if="!currentStep && isLoading" class="loading-container">
        <div class="loading-box">
          <transition-group name="fade">
            <img v-if="!purchaseComplete" :key="purchaseComplete" src="../assets/img/spinner.svg" class="loading-icon">
          </transition-group>
        </div>
        <transition>
          <div v-if="loadingMessage" class="loading-message-box">
            <div class="loading-message">{{ loadingMessage }}</div>
          </div>
        </transition>
      </div>
    </transition>

    <transition :name="stepTransitionName">
      <div v-if="currentStep" class="modal-card">
        <header class="modal-card-head">
          <div v-if="hasPreviousStep" @click="goToPreviousStep" class="pt-1 back-arrow-container">
            <font-awesome-icon icon="arrow-left" class="back-arrow" />
          </div>
          <p class="modal-card-title has-text-centered">{{ currentStep }}</p>
          <button @click="$emit('cancel-checkout')" class="delete" aria-label="close"></button>
        </header>

        <section v-if="currentStep === 'Confirm Your Order'" class="modal-card-body">
          <div class="subtitle">Please confirm your order:</div>
          <div class="is-size-4">Items:</div>
          <ol class="mt-3">
            <div v-for="item in cartData" :key="item.id" class="ml-6 list-item">
              <li>
                {{ item.name }}: {{ cart[item.id] }} x {{ $helpers.getFormattedPrice(item.price) }} = {{ $helpers.getFormattedPrice(item.price * cart[item.id]) }}
              </li>
            </div>
          </ol>
          <div class="mt-6">
            <span class="is-size-4">Total Price:</span>
            <span class="ml-2 is-size-4 bold">{{ totalFormattedPrice }}</span>
          </div>

        </section>

        <section v-if="currentStep === 'Confirm Your Address'" class="modal-card-body">
          <div class="mb-5 is-size-5">We have the following address on file for you:</div>
          <div class="ml-4 address">
            <div class="name">{{ address.name }}</div>
            <div class="address1">{{ address.address1 }}</div>
            <div v-if="address.address2" class="address2">{{ address.address2 }}</div>
            <div class="city-state-zip">
              {{ address.city }}, {{ address.state }}{{ noCommaIfStateIsAbbreviated }}{{ address.zip }}
            </div>
            <div class="phone">{{ address.phone }}</div>
          </div>
          <div class="mt-5 mb-2 is-size-5">Is this correct?</div>
        </section>

        <footer class="modal-card-foot">
          <button @click="goToNextStep" class="button is-success">{{ primaryButtonText }}</button>
          <button v-if="secondaryButtonText"
                  @click="secondaryButtonClicked"
                  class="button"
                  :class="secondaryButtonClass">
            {{ secondaryButtonText }}
          </button>
          <button @click="checkoutCancel" class="button">Cancel</button>
        </footer>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'Checkout',
  props: {
    cart: Object,
    cartData: Array,
    totalFormattedPrice: String
  },
  data() {
    return {
      isMounted: false,

      steps: {
        orderConfirm: 'Confirm Your Order',
        addressConfirm: 'Confirm Your Address',
        addressUpdate: 'Change Your Address',
      },
      // currentStep: '',
      currentStep: 'Confirm Your Order',
      primaryButtonText: 'Confirm',
      secondaryButtonText: '',
      stepTransitionName: 'slide-next',

      isLoading: true,
      loadingMessage: '',
      defaultLoadingTime: 1500,
      purchaseComplete: false,

      address: {
        name: 'Jamie Smith',
        address1: '123 Fake St.',
        address2: '',
        city: 'Fakeville',
        state: 'Alberta',
        zip: '90210',
        country: 'Canada',
        phone: '+1 (555) 555-1234',
      },

      paymentMethod: {
        name: 'Saved Payment Method',
        cardholderName: 'Jamie Smith',
        cardNumber: '1234123412341234',
        expiryDate: '1234',
        cvvCode: '123'
      }
    }
  },
  computed: {
    secondaryButtonClass() {
      return {
        // 'is-success': this.currentStep !== this.steps.confirmAddress ? true : false,
        'is-warning': this.currentStep === this.steps.addressConfirm ? true : false
      }
    },
    noCommaIfStateIsAbbreviated() {
      return this.address.state.length <= 2 ? ' ' : ', ';
    },
    hasPreviousStep() {
      if (this.currentStep !== Object.values(this.steps)[0]) {
        return true;
      } else return false;
    },
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
    goToOrderConfirm(loadingTime=undefined) {
      if (loadingTime === undefined) {loadingTime = this.defaultLoadingTime}
      this.currentStep = undefined;
      setTimeout(() => {
        this.secondaryButtonText = '';
        this.currentStep = this.steps.orderConfirm;
      }, loadingTime)
    },
    goToAddressConfirm(loadingTime=undefined) {
      if (loadingTime === undefined) {loadingTime = this.defaultLoadingTime}
      this.currentStep = undefined;
      setTimeout(() => {
        this.secondaryButtonText = 'Change Address';
        this.currentStep = this.steps.addressConfirm;
      }, loadingTime)
    },
    goToAddressUpdate(loadingTime=undefined) {
      if (loadingTime === undefined) {loadingTime = this.defaultLoadingTime}
      this.currentStep = undefined;
      setTimeout(() => {
        this.currentStep = this.steps.addressUpdate;
        this.secondaryButtonText = '';
      }, loadingTime)
    },
    goToPaymentMethodConfirm(loadingTime=undefined) {
      if (loadingTime === undefined) {loadingTime = this.defaultLoadingTime}
      this.currentStep = undefined;
      setTimeout(() => {
        this.currentStep = this.steps.paymentMethodConfirm;
        this.secondaryButtonText = '';
      }, loadingTime)
    },
    checkoutFinish() {
      this.$helpers.delay(1500).then(() => this.currentStep = this.steps.orderConfirm);
    },
    goToNextStep() {
      this.stepTransitionName = 'slide-next';
      this.$nextTick(() => {
        if (this.currentStep === this.steps.orderConfirm) {
          this.goToAddressConfirm();
        }
        else if (this.currentStep === this.steps.addressConfirm) {
          this.goToPaymentMethodConfirm();
        }
        else if (this.currentStep === this.steps.addressUpdate) {
          this.goToAddressConfirm();
        }
      })
    },
    goToPreviousStep() {
      let loadingTime = 600;
      this.isLoading = false;
      this.stepTransitionName = 'slide-previous';

      this.$nextTick(() => {
        if (this.currentStep === this.steps.paymentMethodConfirm) {
          this.goToAddressConfirm(loadingTime);
        }
        else if (this.currentStep === this.steps.addressConfirm) {
          this.goToOrderConfirm(loadingTime);
        }
      })
      setTimeout(() => {
        this.isLoading = true;
      }, loadingTime)
    },
    secondaryButtonClicked() {
      if (this.currentStep === this.steps.addressConfirm) {
        this.goToUpdateAddress();
      }
    },
    checkoutCancel() {
      this.$emit('cancel-checkout');
    }
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

.loading-container {
  position: fixed;
  display: flex;
  flex-direction: column;

  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  justify-content: center;
  align-items: center;
}

.loading-box {
  display: flex;
  background-image: linear-gradient(to bottom right, #eee, #bbb);

  height: 6rem;
  width: 6rem;

  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  border: 2px solid darkgray;
}

@keyframes loading-animation {
  100% {
    transform: rotate(360deg);
  }
}

.loading-icon {
  margin-top: 0.5rem;
  height: 4rem;
  width: 4rem;
  animation: loading-animation 1s infinite linear;  
}

.loading-message-box {
  display: flex;
  background-image: linear-gradient(to bottom right, #eee, #bbb);

  margin-top: 0.75rem;

  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  border: 2px solid darkgray;
}

.loading-message {
  color: black;
  font-size: 1.2rem;
  font-weight: bold;

  padding: 0.5rem 1rem;
}

.back-arrow-container {
  position: absolute;
  display: flex;
  background-color: #c6c6c6;
  cursor: pointer;

  height: 1.4rem;
  width: 1.4rem;
  padding-left: 0.1rem;
  padding-bottom: 0.2rem;

  justify-content: center;
  align-items: center;

  border-radius: 50%;
}

.back-arrow {
  color: white;
}
</style>
