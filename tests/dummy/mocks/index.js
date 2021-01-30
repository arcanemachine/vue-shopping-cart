import * as helpers from '@/assets/js/helpers.js'
import * as s from '../stubs'

const fetch = jest.fn((url) => {
  if (url === 'test') {
    return Promise.resolve({
      json: () => 'hello world!'
    })
  }
  if (url === helpers.urls.storeList) {
    return Promise.resolve({
      json: () => s.storeListFetchResult
    })
  }
});

export const fetchResponse = function (url) {
  return fetch(url).then(response => response.json());
}

export const store = {
  state: {
    cart: {},
    isLoading: false,
    userIsAuthenticated: false
  },
  getters: {
    cartItemCount: 0
  }
}

module.exports.fetch = fetch;
module.exports.fetchResponse = fetchResponse;
