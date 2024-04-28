// auth.js

const state = {
  user: null,
  role: null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setRole(state, role) {
    state.role = role;
  },
};

const actions = {
  login({ commit }, { user, role }) {
    commit("setUser", user);
    commit("setRole", role);
  },
  logout({ commit }) {
    commit("setUser", null);
    commit("setRole", null);
  },
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  isAdmin: (state) => state.role === "admin",
  isModerator: (state) => state.role === "moderator",
  isAuthor: (state) => state.role === "author",
  isMember: (state) => state.role === "member",
};

export default {
  state,
  mutations,
  actions,
  getters,
};
