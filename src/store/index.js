import Vue from "vue";
import Vuex from "vuex";
import { getUserCookie, setCookie, removeUserCookie } from "@/utils/userCookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuCollapsed: false,
    userInfo: getUserCookie(),
    menuRoutes: [],
  },
  mutations: {
    handleChangeMenuCollapsed(state) {
      state.menuCollapsed = !state.menuCollapsed;
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    logout(state) {
      state.userInfo = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    handleChangeMenuCollapsed({ commit }) {
      commit("handleChangeMenuCollapsed");
    },
    saveUserInfo({ commit }, userInfo) {
      commit("saveUserInfo", userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit("logout");
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {}
});
