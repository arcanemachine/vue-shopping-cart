import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StoreDetail from '../views/StoreDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stores/',
    name: 'StoreList',
    component: Home
  },
  {
    path: '/stores/:storeId/',
    name: 'StoreDetail',
    component: StoreDetail,
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
