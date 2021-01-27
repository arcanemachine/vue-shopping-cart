<template>
  <div class="status-message-container">
    <div @click="clearStatusMessage" class="status-message button is-info">
      {{ $store.getters.statusMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusMessage',
  methods: {
    clearStatusMessage() {
      this.$store.dispatch('displayStatusMessage', {message: '', displayFor: 0});
    }
  }
}
</script>

<style scoped lang="scss">
.status-message-container {
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.status-message {
  margin-top: 1.15rem;
  z-index: 5;
}

.button {
  padding: 1.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

</style>
