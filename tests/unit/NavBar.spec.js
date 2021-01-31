import { mount, createLocalVue } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

// local vue
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

// mocks
import { store } from '../dummy/mocks/'
// import store from '@/store/index.js'

// helpers
import * as helpers from '@/assets/js/helpers.js'
localVue.prototype.$helpers = helpers;

describe('NavBar.vue', () => {
  let wrapper;
  let defaultParams;

  beforeEach(() => {
    defaultParams = {
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $store: store
      }
    }
  })

  let mountComponent = ((params={}, data={}, mocks={}, stubs=[], computed={}) => {

    //// if no store object is passed in, use the default mocked store
    // if (!Object.keys(params).filter(x => x === 'store').length) {
    //   params['store'] = store;
    // }
    
    // assign all custom params onto defaultParams
    let componentArgs = Object.assign(defaultParams, params)

    //// overwrite all existing default params
    // Object.keys(params).forEach((key, index) => {
    //   componentArgs.key = params.key;
    // })
    wrapper = mount(NavBar, componentArgs)
  });

  // computed.iconCartItemCount
  it("computed.iconCartItemCount returns cartItemCount if item count <= 99", () => {
    mountComponent();
    expect(wrapper.vm.iconCartItemCount).toEqual(0);
  })

  it("computed.iconCartItemCount returns 99 if item count > 99", () => {
    mountComponent({
      computed: {cartItemCount: () => 100}
    });
    expect(wrapper.vm.iconCartItemCount).toEqual(99);
  })

  // computed.navbarMenuClass
  it("computed.navbarMenuClass returns false if !data.navbarIsActive", () => {
    mountComponent({
      data: () => {
        return {navbarIsActive: false}
      }
    })
    expect(wrapper.vm.navbarMenuClass).toEqual({'is-active': false});
  })

  it("computed.navbarMenuClass returns true if data.navbarIsActive", () => {
    mountComponent({
      data: () => {
        return {navbarIsActive: true}
      }
    });
    expect(wrapper.vm.navbarMenuClass).toEqual({'is-active': true});
  })

  // computed.userIconUrl
  it("computed.userIconUrl returns {name: 'login'} if !$store.state.userIsAuthenticated", () => {
    mountComponent({});
    expect(wrapper.vm.userIconUrl).toEqual({name: 'login'});
  })

  it("computed.userIconUrl returns {name: 'userDetail'} if $store.state.userIsAuthenticated", () => {
    mountComponent({
      computed: {userIsAuthenticated: () => true}
    })
    expect(wrapper.vm.userIconUrl).toEqual({name: 'userDetail'});
  })

  // computed.userProfileIconStyle
  it("computed.userProfileIconStyle returns {color: 'white'} if !$store.state.userIsAuthenticated", () => {
    mountComponent({});
    expect(wrapper.vm.userProfileIconStyle).toEqual({color: 'white'});
  })

  it("computed.userProfileIconStyle returns {color: '#88f'} if $store.state.userIsAuthenticated", () => {
    mountComponent({
      computed: {userIsAuthenticated: () => true}
    });
    expect(wrapper.vm.userProfileIconStyle).toEqual({color: '#88f'});
  })

  // computed.cartIconStyle
  it("computed.cartIconStyle returns {color: 'white'} if !$store.state.userIsAuthenticated", () => {
    mountComponent({});
    expect(wrapper.vm.cartIconStyle).toEqual({color: 'white'});
  })

  it("computed.cartIconStyle returns {color: '#88f'} if $store.state.userIsAuthenticated", () => {
    mountComponent({
      computed: {cartItemCount: () => 1}
    });
    expect(wrapper.vm.cartIconStyle).toEqual({color: '#88f'});
  })

  // methods.navbarMenuClass
  it("methods.navbarToggle() toggles data.navbarIsActive", () => {
    mountComponent();

    // navbarIsActive initially set to false
    expect(wrapper.vm.navbarIsActive).toEqual(false);

    // navbarToggle() sets navbarIsActive to true
    wrapper.vm.navbarToggle();
    expect(wrapper.vm.$data.navbarIsActive).toEqual(true);
  })

})
