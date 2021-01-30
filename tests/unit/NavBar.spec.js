import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NavBar from '@/components/NavBar.vue'

// local vue
// const localVue = createLocalVue()
const localVue = createLocalVue({store})
localVue.use(Vuex)

// vuex store

// mocks
import { store } from '../dummy/mocks/'

// helpers
import * as helpers from '@/assets/js/helpers.js'
localVue.prototype.$helpers = helpers;

describe('NavBar.vue', () => {
  let localStore;

  beforeEach(() => {
  })

  it('methods.navbarToggle() toggles data.navbarIsActive', async () => {
    const wrapper = mount(NavBar, {
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $store: store
       }
    })

    // navbarIsActive initially set to false
    expect(wrapper.vm.navbarIsActive).toEqual(false);

    // navbarToggle() sets navbarIsActive to true
    wrapper.vm.navbarToggle();
    expect(wrapper.vm.$data.navbarIsActive).toEqual(true);
  })
})
