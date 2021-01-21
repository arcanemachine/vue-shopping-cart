import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

// store
import StoreDetail from '../views/StoreDetail.vue'
import CategoryDetail from '../views/CategoryDetail.vue'
import ItemDetail from '../views/ItemDetail.vue'

// user
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import LogoutConfirm from '../views/LogoutConfirm.vue'
import UserDetail from '../views/UserDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Home'}
  },
  {
    path: '/stores/',
    name: 'storeList',
    component: Home,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Store List'}
  },

  // users
  {
    path: '/register/',
    name: 'register',
    component: Register,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Register New User'}
  },
  {
    path: '/login/',
    name: 'login',
    component: Login,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'User Login'}
  },
  {
    path: '/my-account/',
    name: 'userDetail',
    component: UserDetail,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Your Account'}
  },
  {
    path: '/logout/confirm/',
    name: 'logoutConfirm',
    component: LogoutConfirm,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Confirm Logout'}
  },
  {
    path: '/logout/',
    name: 'logout',
    component: Logout,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Logout'}
  },

  // stores
  {
    path: '/:storeId(\\d+)/',
    name: 'storeDetail',
    component: StoreDetail,
    props: true,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Store Info'}
  },
  {
    path: '/:storeId(\\d+)/:categoryId(\\d+)/',
    name: 'categoryDetail',
    component: CategoryDetail,
    props: true,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Category Info'}
  },
  {
    path: '/:storeId(\\d+)/:categoryId(\\d+)/:itemId(\\d+)/',
    name: 'itemDetail',
    component: ItemDetail,
    props: true,
    pathToRegexpOptions: { strict: true },
		meta: {title: 'Category Info'}
  },
  {
    path: '*',
    name: 'pageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../components/PageNotFound.vue'),
		meta: {title: '404: Page Not Found'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => { // eslint-disable-line no-unused-vars
  const DEFAULT_TITLE = 'Vue Shopping Cart';
  Vue.nextTick(() => {
    if (!to.meta.title) {
      document.title = DEFAULT_TITLE;
    } else {
      document.title = to.meta.title + ' - ' + DEFAULT_TITLE;
    }
  });
});

export default router
