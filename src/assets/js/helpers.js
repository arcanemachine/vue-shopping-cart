export const urls = {

  // users
  getCsrfToken: 'http://192.168.1.100:8000/get_csrftoken/',
  login: 'http://192.168.1.100:8000/api/rest-auth/login/',

  // stores
  storeList: 'http://192.168.1.100:8000/api/v1/stores/',
  storeCategoryList: (storeId) => {
    return `http://192.168.1.100:8000/api/v1/stores/${storeId}/categories/`
  },
  categoryItemList: (categoryId) => {
    return `http://192.168.1.100:8000/api/v1/categories/${categoryId}/items/`
  },
  storeDetail: (storeId) => {
    return `http://192.168.1.100:8000/api/v1/stores/${storeId}/`
  },
  categoryDetail: (categoryId) => {
    return `http://192.168.1.100:8000/api/v1/categories/${categoryId}/`
  },
  itemDetail: (itemId) => {
    return `http://192.168.1.100:8000/api/v1/items/${itemId}/`
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
