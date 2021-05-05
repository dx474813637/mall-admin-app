import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
