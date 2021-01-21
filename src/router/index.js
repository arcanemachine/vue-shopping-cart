import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

// store
import StoreDetail from '../views/StoreDetail.vue'
import CategoryDetail from '../views/CategoryDetail.vue'
import ItemDetail from '../views/ItemDetail.vue'

// user
import UserRegister from '../views/UserRegister.vue'
import UserLogin from '../views/UserLogin.vue'
import UserDetail from '../views/UserDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  // users
  {
    path: '/register/',
    name: 'userRegister',
    component: UserRegister,
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/login/',
    name: 'userLogin',
    component: UserLogin,
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/my-account/',
    name: 'userDetail',
    component: UserDetail,
    pathToRegexpOptions: { strict: true }
  },

  // stores
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
