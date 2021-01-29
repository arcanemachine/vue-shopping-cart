import { mount } from '@vue/test-utils'
import StoreList from '@/views/StoreList.vue'

import * as helpers from '@/assets/js/helpers.js'

// import helpers
import Vue from 'vue'
Vue.prototype.$helpers = helpers;

// mock functions
const storeListFetchResult = [];
// const storeListFetchResult = [{"id":1,"name":"MallMart","description":"We've got everything you need!","registrant":1,"image":"http://192.168.1.120:8000/media/images/MallMart/mallmart.jpg"},{"id":2,"name":"Food Stop","description":"Stop in and get what you want.","registrant":1,"image":null}];
global.fetch = jest.fn((url) => Promise.resolve({
  json: () => storeListFetchResult
}));


beforeEach(() => {
  fetch.mockClear();
});

describe('StoreList.vue', () => {
  it('starts with data.stores === []', async () => {
    
    const storeList = await mount(StoreList);

    // get stores from url
    await storeList.vm.getStores();

    const expected = JSON.stringify(storeListFetchResult);
    const actual = JSON.stringify(storeList.vm.$data.stores);
    expect(actual).toMatch(expected);
  })
})
