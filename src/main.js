import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('@/assets/main.scss');
require('@/assets/base.css');

import * as helpers from './assets/js/helpers.js'
Vue.prototype.$helpers = helpers;

Vue.config.productionTip = false


/* test function */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
