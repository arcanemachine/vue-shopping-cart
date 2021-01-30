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

const fetchResponse = function (url) {
  return fetch(url).then(response => response.json());
}

module.exports.fetch = fetch;
module.exports.fetchResponse = fetchResponse;
