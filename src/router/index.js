import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/layout/Login.vue'),
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/layout/Reg.vue'),
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import(/* webpackChunkName: "forget" */ '../views/layout/Forget.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(store.state.userInfo.username && store.state.userInfo.email && store.state.userInfo.appkey && store.state.userInfo.role ) {
      next()
    }else {
      next('/login')
    }
    return
  }
  next()
  return
})

export default router;
