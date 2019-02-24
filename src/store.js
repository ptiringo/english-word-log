import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user,
    logined: state => state.user != null
  },
  mutations: {
    login: (state, payload) => (state.user = payload),
    logout: (state, payload) => (state.user = null)
  }
});

export default store;
