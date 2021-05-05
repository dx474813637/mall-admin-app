import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuCollapsed: false,
  },
  mutations: {
    handleChangeMenuCollapsed(state) {
      state.menuCollapsed = !state.menuCollapsed;
    },
  },
  actions: {
    handleChangeMenuCollapsed({ commit }) {
      commit('handleChangeMenuCollapsed');
    },
  },
  modules: {
  },
});
