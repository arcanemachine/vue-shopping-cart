const BACKEND_SERVER_URL = 'http://192.168.1.120:8000'

export const urls = {

  // misc
  getSessionCookie: BACKEND_SERVER_URL + '/get-session-cookie/',

  // user
  login: BACKEND_SERVER_URL + '/api/rest-auth/login/',
  logout: BACKEND_SERVER_URL + '/api/rest-auth/logout/',
  getUser: BACKEND_SERVER_URL + `/api/v1/user/`,
  getProfile: BACKEND_SERVER_URL + `/api/v1/user/profile/`,

  // cart
  cartDetail: BACKEND_SERVER_URL + '/api/v1/cart/',
  cartItemUpdate: (itemId, quantity) => {
    return BACKEND_SERVER_URL + `/api/v1/cart/update/${itemId}/${quantity}/`;
  },
  cartClearItem: (itemId) => {
    return BACKEND_SERVER_URL + `/api/v1/cart/clear/${itemId}/`;
  },
  cartClearAll: BACKEND_SERVER_URL + '/api/v1/cart/clear/all/',

  // stores
  storeList: BACKEND_SERVER_URL + '/api/v1/stores/',
  storeCategoryList: (storeId) => {
    return BACKEND_SERVER_URL + `/api/v1/stores/${storeId}/categories/`
  },
  categoryItemList: (categoryId) => {
    return BACKEND_SERVER_URL + `/api/v1/categories/${categoryId}/items/`
  },
  storeDetail: (storeId) => {
    return BACKEND_SERVER_URL + `/api/v1/stores/${storeId}/`
  },
  categoryDetail: (categoryId) => {
    return BACKEND_SERVER_URL + `/api/v1/categories/${categoryId}/`
  },
  itemDetail: (itemId) => {
    return BACKEND_SERVER_URL + `/api/v1/items/${itemId}/`
  },
  cartItemList: (itemsString) => {
    return BACKEND_SERVER_URL + `/api/v1/items/${itemsString}/`
  }
}

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function handleResponse(response) { // , responseType='json') {
  if (!response.ok) {
    console.log("HTTP error, status = " + response.status);
    // throw new Error("HTTP error, status = " + response.status);
    }
  // if (responseType === 'none') {
  //   return undefined;
  // }
  // if (responseType === 'json') {
  // }
  return response.json();
}

export const pp = JSON.stringify;
