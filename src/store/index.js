import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    correctPw: 'travel2020',
    agentLogin: 'agency',
    passwordIsCorrect: false,
    agentLoggedIn: false,
  },

  getters: {

  },

  mutations: {
    validatePassword(state, password) {
      if (state.correctPw === password) {
        state.passwordIsCorrect = true;
        return;
      }
      state.passwordIsCorrect = false;
    },
    agentLogin(state) {
      router.push('/Agent-Dashboard');
      state.agentLoggedIn = true;
      return true;
    },
  },

  actions: {
    validatePassword(context, password) {
      context.commit('validatePassword', password);
    },
    agentLogin(context, username) {
      context.commit('agentLogin', username);
      return true;
    },

  },

});
