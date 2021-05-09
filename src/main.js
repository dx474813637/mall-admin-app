import Vue from 'vue';
import axios from '@/axios';
import VCharts from 'v-charts'
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
Vue.use(VCharts)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
