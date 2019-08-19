import Vue from "vue";
import Vuex from "vuex";
import { loginApi } from "@/services/v1";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: "",
      username: "guest",
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
      const { payload: user } = await loginApi(payload);

      localStorage.setItem("userInfo", JSON.stringify(user));

      commit("update", {
        user: {
          token: user.token,
          username: user.username,
          email: user.email
        }
      });
    }
  },
  getters: {
    user: state => state.user
  }
});
