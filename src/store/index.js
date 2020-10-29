import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    correctPw: 'travel2020',
    agentLogin: 'agency',
    formData: {},
    errors: [],
    formIsValid: false,
    passwordIsValid: false,
    usernameIsValid: false,
    user: '',
    agentLoggedIn: false,
    travelerLoggedIn: false,
    travelerId: Number,
    travelers: [],
    traveler: {},
  },

  getters: {

    whichUser: state => state.user,

  },

  mutations: {
    checkForErrors(state, form) {
      state.errors = [];
      if (!form.username) {
        state.errors.push('Username is required.');
      }
      if (!form.password) {
        state.errors.push('Password is required.');
      }
      if (form.username && form.password) {
        state.formIsValid = true;
      }
    },
    validatePassword(state, form) {
      if (state.formIsValid && form.password === state.correctPw) {
        state.passwordIsValid = true;
      } else {
        state.errors.push('Please enter a valid password');
      }
    },
    validateUsername(state, form) {
      if (form.username === state.agentLogin || form.username.includes('traveler')) {
        state.usernameIsValid = true;
      } else {
        state.errors.push('Please enter a valid Username');
      }
    },
    determineUser(state, form) {
      if (state.formIsValid &&
        state.passwordIsValid &&
        state.usernameIsValid) {
        if (form.username === state.agentLogin) {
          state.user = form.username;
        }
        if (form.username.toLowerCase().includes('traveler') && form.username.slice(8) < state.travelers.length) {
          state.user = form.username;
        }
      }
    },
    agentLogin(state) {
      router.push('/Agent-Dashboard');
      state.agentLoggedIn = true;
    },
    travelerLogin(state, form) {
      state.travelerId = form.username.slice(8);
      state.traveler = this.state.travelers[state.travelerId - 1];
      state.travelerLoggedIn = true;
      router.push('/Traveler-Dashboard');
    },
    getAllTravelers(state, response) {
      state.travelers = response.travelers;
    },

  },

  actions: {
    checkForErrors(context, form) {
      context.commit('checkForErrors', form);
    },
    validatePassword(context, form) {
      context.commit('validatePassword', form);
    },
    validateUsername(context, form) {
      context.commit('validateUsername', form);
    },
    determineUser(context, form) {
      context.commit('determineUser', form);
    },

    agentLogin(context) {
      context.commit('agentLogin');
    },
    travelerLogin(context, form) {
      context.commit('travelerLogin', form);
    },
    getAllTravelers({ commit }) {
      axios.get('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
        .then((response) => {
          commit('getAllTravelers', response.data);
        });
    },

  },

});
