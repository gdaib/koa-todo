const state = {
  sidebar: {
    opened: true
  }
};

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
