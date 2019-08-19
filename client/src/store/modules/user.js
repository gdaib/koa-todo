import { loginApi } from "@/services/v1";

const state = {
  token: "",
  username: "guest",
  email: ""
};

const actions = {
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
};

const mutations = {
  update(state, payload) {
    Object.entries(payload).forEach(([key, value]) => {
      state[key] = value;
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
