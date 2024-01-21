import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,

  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    login({ commit }, credentials) {

      commit('SET_USER', credentials.user);
      commit('SET_AUTHENTICATED', true);
    },
    logout({ commit }) {
      commit('SET_USER', null);
      commit('SET_AUTHENTICATED', false);
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
  },
});