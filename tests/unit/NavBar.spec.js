import { mount, createLocalVue } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

// local vue
const localVue = createLocalVue()

// mocks
import { store } from '../dummy/mocks/'
// import store from '@/store/index.js'

// helpers
import * as helpers from '@/assets/js/helpers.js'
localVue.prototype.$helpers = helpers;

describe('NavBar.vue', () => {
  let wrapper;
  let defaultArgs;

  beforeEach(() => {
    defaultArgs = {
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $store: store
      }
    }
  })

  let mountComponent = ((args={}, mocks={}, stubs=[], computed={}) => {
    args = Object.assign({
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $store: store
      },
      computed: {}
    }, args)
    args.mocks = Object.assign(args.mocks, mocks);
    wrapper = mount(NavBar, args)
  });

  it("computed.iconCartItemCount returns cartItemCount if item count < 99", () => {
    mountComponent();
    expect(wrapper.vm.iconCartItemCount).toEqual(0);
  })

  it("computed.iconCartItemCount returns 99 if item count > 99", () => {
    mountComponent({
      computed: {
        cartItemCount: () => 100
      }
    });
    expect(wrapper.vm.iconCartItemCount).toEqual(99);
  })

  it("methods.navbarToggle() toggles data.navbarIsActive", () => {
    mountComponent();

    // navbarIsActive initially set to false
    expect(wrapper.vm.navbarIsActive).toEqual(false);

    // navbarToggle() sets navbarIsActive to true
    wrapper.vm.navbarToggle();
    expect(wrapper.vm.$data.navbarIsActive).toEqual(true);
  })

})
