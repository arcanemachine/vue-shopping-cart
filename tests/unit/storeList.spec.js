import { mount, createLocalVue } from '@vue/test-utils'
import StoreList from '@/views/StoreList.vue'

// mocks
import * as m from '../dummy/mocks/'
global.fetch = m.fetch;

// helper functions
import * as helpers from '@/assets/js/helpers.js'
const localVue = createLocalVue()
localVue.prototype.$helpers = helpers;

beforeEach(() => {
  fetch.mockClear();
});

describe('StoreList.vue', () => {
  it('loads info from getStores()', async () => {
    
    const storeList = mount(StoreList, {
      localVue,
      stubs: ['router-link', 'router-view']
    });

    // get expected result
    const expected = JSON.stringify(await m.fetchResponse(helpers.urls.storeList));
    console.log(`expected: ${expected}`);
    console.log(`helpers.urls.storeList: ${helpers.urls.storeList}`);

    debugger;

    // get actual result
    await storeList.vm.getStores();
    const actual = JSON.stringify(storeList.vm.$data.stores);
    console.log(`actual: ${actual}`);

    expect(actual).toMatch(expected);
  })
})
