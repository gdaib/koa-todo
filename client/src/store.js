import Vue from "vue";
import Vuex from "vuex";
import { loginApi } from "@/services/v1";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: "",
      username: "",
      email: ""
    }
  },
  mutations: {
    update(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value;
      });
    }
  },
  actions: {
    async login({ commit }, payload) {

      const data = await loginApi(payload);

      commit("update", data);
    }
  },
  getters: {
    user: state => state.user
  }
});
