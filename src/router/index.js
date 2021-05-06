import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import store from '@/store'
import getMenuRoute from '@/utils/permission'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      requiresAuth: true,
      title: '商品',
      icon: 'shop'
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          requiresAuth: true,
          title: '商品列表',
          icon: 'bars'
        },
        component: () => import('@/views/page/ProductList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          requiresAuth: true,
          title: '添加商品',
          icon: 'edit'
        },
        component: () => import('@/views/page/ProductAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          requiresAuth: true,
          title: '类目管理',
          icon: 'setting'
        },
        component: () => import('@/views/page/Category.vue'),
      }
      
    ]
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: true,
      title: '首页',
      icon: 'home'
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          requiresAuth: true,
          title: '统计',
          icon: 'bar-chart'
        },
        component: () => import('@/views/page/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { isHide: true },
    component: () => import(/* webpackChunkName: "login" */ '../views/layout/Login.vue'),
  },
  {
    path: '/reg',
    name: 'Reg',
    meta: { isHide: true },
    component: () => import(/* webpackChunkName: "reg" */ '../views/layout/Reg.vue'),
  },
  {
    path: '/forget',
    name: 'Forget',
    meta: { isHide: true },
    component: () => import(/* webpackChunkName: "forget" */ '../views/layout/Forget.vue'),
  }
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if(to.path != '/login' && to.path != '/reg' && to.path != '/forget') {
    if(store.state.userInfo.username && store.state.userInfo.email && store.state.userInfo.appkey && store.state.userInfo.role ) {
      if (!isAddRoutes) {
        const menuList = getMenuRoute(store.state.userInfo.role, asyncRouterMap)
        store.dispatch('changeMenuRoutes', routes.filter(ele => !ele.meta.isHide).concat(menuList)).then(() => {
          router.addRoutes(menuList);
          next(to.path);
        });
        isAddRoutes = true;
      }else {
        next()
      }
      
    }else {
      next('/login')
    }
    return
  }else {
    next()
  }
  
  return
})

export default router;
