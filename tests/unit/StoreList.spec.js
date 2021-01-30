import { mount, createLocalVue } from '@vue/test-utils'
import StoreList from '@/views/StoreList.vue'

// mocks
import * as m from '../dummy/mocks/'
global.fetch = m.fetch;

// helper functions
import * as helpers from '@/assets/js/helpers.js'
const localVue = createLocalVue()
localVue.prototype.$helpers = helpers;

describe('StoreList.vue', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('loads info from getStores()', async () => {
    
    const thisComponent = mount(StoreList, {
      localVue,
      stubs: ['router-link', 'router-view']
    });

    // getStores()
    await thisComponent.vm.getStores();

    const expected = JSON.stringify(await m.fetchResponse(helpers.urls.storeList));
    const actual = JSON.stringify(thisComponent.vm.$data.stores);

    expect(actual).toMatch(expected);
  })
})
