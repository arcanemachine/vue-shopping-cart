import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StoreDetail from '../views/StoreDetail.vue'
import CategoryDetail from '../views/CategoryDetail.vue'
import ItemDetail from '../views/ItemDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:storeId/',
    name: 'storeDetail',
    component: StoreDetail,
    props: true,
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/:storeId/:categoryId/',
    name: 'categoryDetail',
    component: CategoryDetail,
    props: true,
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/:storeId/:categoryId/:itemId/',
    name: 'itemDetail',
    component: ItemDetail,
    props: true,
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '*',
    name: 'pageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../components/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
