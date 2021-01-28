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
      <div v-if="currentStep" class="mb-4 modal-card">
        <header class="modal-card-head">
          <div v-if="hasPreviousStep" @click="goToPreviousStep" class="pt-1 back-arrow-container">
            <font-awesome-icon icon="arrow-left" class="back-arrow" />
          </div>
          <p class="modal-card-title has-text-centered">{{ currentStep }}</p>
          <button @click="$emit('cancel-checkout')" class="delete" aria-label="close"></button>
        </header>

        <!-- orderConfirm -->
        <section v-if="currentStep === steps.orderConfirm" class="pb-5 modal-card-body">
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

        <!-- addressConfirm -->
        <section v-if="currentStep === steps.addressConfirm" class="pb-5 modal-card-body">
          <div class="mb-5 is-size-5">We have the following address on file for you:</div>
            <div class="ml-4 address-display">
              <div class="name">{{ address.name }}</div>
              <div class="address1">{{ address.address1 }}</div>
              <div class="city-state-zip">
                {{ address.city }}, {{ address.state }}{{ noCommaIfStateIsAbbreviated }}{{ address.zip }}
              </div>
              <div class="country">{{ address.country }}</div>
            </div>
          <div class="mt-5 is-size-5">Is this correct?</div>
        </section>

        <!-- addressUpdate -->
        <section v-if="currentStep === steps.addressUpdate" class="pb-5 modal-card-body">
          <div class="mb-5 is-size-5">Please enter your address:</div>
            <form class="address-form" @submit="addressUpdate">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="search"
                         v-model="newAddress.name" @keyup.enter="addressUpdate" ref="formname"
                         aria-required="true" required="required">
                </div>
                <label class="label">Address</label>
                <div class="control">
                  <input class="input" type="search"
                         v-model="newAddress.address" @keyup.enter="addressUpdate" ref="formaddress"
                         aria-required="true" required="required">
                </div>
                <label class="label">City</label>
                <div class="control">
                  <input class="input" type="search"
                         v-model="newAddress.city" @keyup.enter="addressUpdate" ref="formcity"
                         aria-required="true" required="required">
                </div>
                <label class="label">State/Province</label>
                <div class="control">
                  <input class="input" type="search"
                         v-model="newAddress.state" @keyup.enter="addressUpdate" ref="formstate"
                         aria-required="true" required="required">
                </div>
                <label class="label">ZIP/Postal Code</label>
                <div class="control">
                  <input class="input" type="search"
                         v-model="newAddress.zip" @keyup.enter="addressUpdate" ref="formzip"
                         aria-required="true" required="required">
                </div>
                <label class="label">Country</label>
                <div class="control">
                  <input class="input" type="search"
                         v-model="newAddress.country" @keyup.enter="addressUpdate" ref="formcountry"
                         aria-required="true" required="required">
                </div>
              </div>
            </form>
        </section>

        <footer class="modal-card-foot">
          <div class="columns is-multiline">
            <div class="column">
              <button @click="goToNextStep" class="button is-success">Confirm</button>
              <button v-if="secondaryButtonText"
                      @click="secondaryButtonClicked"
                      class="button is-warning">
                {{ secondaryButtonText }}
              </button>
              <button @click="checkoutCancel" class="button is-danger">Cancel</button>
            </div>
          </div>
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

      currentStep: '',
      secondaryButtonText: '',
      stepTransitionName: 'slide-next',

      isLoading: false,
      loadingMessage: '',
      defaultLoadingTime: 1500,
      purchaseComplete: false,

      address: {
        name: 'Jamie Smith',
        address: '123 Fake St.',
        city: 'Fakeville',
        state: 'Alberta',
        zip: '90210',
        country: 'USA',
      },
      newAddress: {
        name: 'Bill Murray',
        address: '123 Real St.',
        city: 'Realville',
        state: 'RL',
        zip: '90210',
        country: 'Realtopia',
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

    this.stepTransitionName = 'fade';
    this.$nextTick(() => {
      // this.goToOrderConfirm(0);
      this.goToAddressUpdate(0);
    })

    // cancel checkout when Esc key is pressed
    // document.addEventListener('keyup', this.checkoutCancelOnKeyEsc)
  },
  methods: {
    addressUpdate() {
      event.preventDefault();

      let formFields = this.newAddress;
      for (let i = 0; i < Object.keys(formFields).length; i++) {
        let currentkey = Object.keys(formFields)[i];
        if (!formFields[currentkey].length) {
          console.log(`key: ${currentkey}, formFields[currentkey]: ${formFields[currentkey]}`);
          this.$store.dispatch('statusMessageDisplay', {message: "Please fill out all fields before continuing."});
          let evalString = `this.$refs.form${currentkey}.select()`;
          console.log(evalString);
          eval(evalString);
          return false;
        }
      }
      // if all fields have been populated, assign the new address values onto the old values
      // this.address = Object.assign({}, this.newAddress);
      // debugger;
      this.address = this.newAddress;
      return true;
    },
    // checkoutCancelOnKeyEsc(e) {
    //   if (e.key === 'Escape') {
    //     this.checkoutCancel();
    //     console.log('checkoutCancelOnKeyEsc()');
    //   }
    // },
    displayLoadingMessage(message, loadingTime=undefined) {
      if (loadingTime === undefined) {
        loadingTime = this.defaultLoadingTime;
      }
      this.loadingMessage = message;
      setTimeout(() => {
        this.loadingMessage = '';
      }, loadingTime)
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

      this.secondaryButtonText = 'Update';
      setTimeout(() => {
        this.currentStep = this.steps.addressConfirm;
      }, loadingTime)
    },
    goToAddressUpdate(loadingTime=undefined) {
      if (loadingTime === undefined) {loadingTime = this.defaultLoadingTime}
      this.currentStep = undefined;

      this.secondaryButtonText = 'Undo changes';
      setTimeout(() => {
        this.currentStep = this.steps.addressUpdate;
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
      this.isLoading = true;
      this.$nextTick(() => {
        if (this.currentStep === this.steps.orderConfirm) {
          this.goToAddressConfirm();
        }
        else if (this.currentStep === this.steps.addressConfirm) {
          this.goToPaymentMethodConfirm();
        }
        else if (this.currentStep === this.steps.addressUpdate) {
          this.stepTransitionName = 'slide-previous';
          let addressUpdated = this.addressUpdate();
          if (addressUpdated) {
            this.$nextTick(() => {
              this.displayLoadingMessage("Saving...");
              this.goToAddressConfirm();
            })
          }
        }
      })
    },
    goToPreviousStep() {
      let loadingTime = 600;
      // this.isLoading = false;
      this.stepTransitionName = 'slide-previous';

      this.$nextTick(() => {
        if (this.currentStep === this.steps.paymentMethodConfirm) {
          this.goToAddressConfirm(loadingTime);
        }
        else if (this.currentStep === this.steps.addressConfirm) {
          this.goToOrderConfirm(loadingTime);
        }
        else if (this.currentStep === this.steps.addressUpdate) {
          this.goToAddressConfirm(loadingTime);
        }
      })
      setTimeout(() => {
        this.isLoading = true;
      }, loadingTime + 300)
    },
    secondaryButtonClicked() {
      if (this.currentStep === this.steps.addressConfirm) {
        this.stepTransitionName = 'slide-next';
        this.isLoading = false;
        this.$nextTick(() => {
          this.goToAddressUpdate(600);
        })
      }
      else if (this.currentStep === this.steps.addressUpdate) {
        this.goToPreviousStep();
      }
    },
    checkoutCancel() {
      this.$emit('cancel-checkout');
    }
  },
  destroyed() {
    // document.removeEventListener('keyup', this.checkoutCancelOnKeyEsc)
    this.$store.dispatch('statusMessageDisplay', {
      message: "Your checkout session has been canceled."
    })
  }
}

</script>

<style scoped lang="scss">
.modal-background {
  position: fixed;
}

div.modal-card {
  align-self: center;
  margin-top: 4rem;
  max-height: 85vh;
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

  border-radius: 0.5rem;
  border: 1px solid darkgray;
}

.loading-message {
  color: black;
  font-size: 1.2rem;
  font-weight: bold;

  padding: 0.25rem 1rem;
}

.back-arrow-container {
  position: absolute;
  display: flex;
  background-color: #c6c6c6;
  cursor: pointer;

  height: 1.4rem;
  width: 1.4rem;
  padding-bottom: 0.2rem;

  justify-content: center;
  align-items: center;

  border-radius: 50%;
}

.back-arrow {
  color: white;
}

.address-display {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
