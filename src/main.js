import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faArrowLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)


// stylesheets
require('@/assets/main.scss');
require('@/assets/base.css');


// helper functions
import * as helpers from '@/assets/js/helpers.js'
Vue.prototype.$helpers = helpers;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
