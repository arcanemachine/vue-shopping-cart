export const urls = {
  storeList: 'http://192.168.1.120:8000/api/v1/stores/',
  storeCategoryList: (storeId) => {
    return `http://192.168.1.120:8000/api/v1/stores/${storeId}/categories/`
  },
  categoryItemList: (categoryId) => {
    return `http://192.168.1.120:8000/api/v1/categories/${categoryId}/items/`
  },
  storeDetail: (storeId) => {
    return `http://192.168.1.120:8000/api/v1/stores/${storeId}/`
  },
  categoryDetail: (categoryId) => {
    return `http://192.168.1.120:8000/api/v1/categories/${categoryId}/`
  },
  itemDetail: (itemId) => {
    return `http://192.168.1.120:8000/api/v1/items/${itemId}/`
  }
}
