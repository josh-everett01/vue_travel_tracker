import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import isBefore from 'date-fns/isBefore';
import router from '../router/index';

Vue.use(Vuex);


export default new Vuex.Store({

  state: {
    anyoneLoggedIn: false,
    allDestinations: [],
    correctPw: 'travel2020',
    agentLogin: 'agency',
    formData: {},
    errors: [],
    formIsValid: false,
    passwordIsValid: false,
    usernameIsValid: false,
    user: '',
    trips: [],
    destinations: [],
    agentLoggedIn: false,
    travelerLoggedIn: false,
    travelerId: Number,
    travelers: [],
    travelersTrips: [],
    travelersPreviousTrips: [],
    travelersUpcomingTrips: [],
    travelersDestinations: [],
    allTrips: [],
    traveler: {},
    picUrl: '',
    eachTripsCost: [],
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
      state.anyoneLoggedIn = true;
    },
    travelerLogin(state, form) {
      state.travelerId = form.username.slice(8);
      state.traveler = this.state.travelers[state.travelerId - 1];
      state.anyoneLoggedIn = true;
      state.travelerLoggedIn = true;
      router.push('/Traveler-Dashboard');
    },
    getAllTravelers(state, response) {
      state.travelers =
        response.travelers;
    },
    getAllTrips(state, response) {
      state.allTrips = response.trips;
    },
    getTravelersTrips(state) {
      state.allTrips.forEach((trip, index) => {
        const tripUserId = state.allTrips[index].userID;
        // eslint-disable-next-line radix
        if (parseInt(state.travelerId) === tripUserId) {
          state.travelersTrips.push(trip);
        }
      });
    },
    logOut(state) {
      state.travelerLoggedIn = false;
      state.agentLoggedIn = false;
      state.anyoneLoggedIn = false;
    },
    getAllDestinations(state, response) {
      state.allDestinations = response.destinations;
    },
    getTravelersDestinations(state) {
      state.travelersTrips.forEach((trip) => {
        let i;
        // eslint-disable-next-line no-plusplus
        for (i = 0; i < state.allDestinations.length; i++) {
          if (trip.destinationID === state.allDestinations[i].id) {
            state.travelersDestinations.push(state.allDestinations[i]);
          }
        }
      });
    },
    sendPicUrlToState(state, picUrl) {
      state.picUrl = picUrl;
    },
    getTravsTripsAndDestinations(state) {
      state.travelersTrips.forEach((trip) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < state.allDestinations.length; i++) {
          if (trip.destinationID === state.allDestinations[i].id) {
            state.trips.push(trip);
            state.destinations.push(state.allDestinations[i]);
          }
        }
      });
    },
    getUpcomingAndPastTrips(state) {
      state.trips.forEach((trip) => {
        const result = isBefore(new Date(trip.date), new Date());
        if (result) {
          state.travelersPreviousTrips.push(trip);
        } else if (result === false) {
          state.travelersUpcomingTrips.push(trip);
        }
      });
    },
    calcAmntTravSpent(state) {
      state.travelersTrips.forEach((trip) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < state.allDestinations.length; i++) {
          if (trip.destinationID === state.allDestinations[i].id && trip.status === 'approved') {
            const tripFlightCosts = state.allDestinations[i]
              .estimatedFlightCostPerPerson * trip.travelers;
            const tripLodgingCosts = state.allDestinations[i]
              .estimatedLodgingCostPerDay * trip.duration;
            const agentFee = (tripLodgingCosts + tripFlightCosts) * 0.1;
            const totalTripCost = (tripFlightCosts + tripLodgingCosts) + agentFee;
            state.eachTripsCost.push(totalTripCost);
          }
        }
      });
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
    getAllTrips({ commit }) {
      axios.get('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then((response) => {
          commit('getAllTrips', response.data);
        });
    },
    getTravelersTrips(context) {
      context.commit('getTravelersTrips');
    },
    logOut(context) {
      context.commit('logOut');
    },
    separateTravelersTrips(context) {
      context.commit('separateTravelersTrips');
    },
    getAllDestinations({ commit }) {
      axios.get('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
        .then((response) => {
          commit('getAllDestinations', response.data);
        });
    },
    sendPicUrlToState(context, picUrl) {
      context.commit('sendPicUrlToState', picUrl);
    },
    getTravsTripsAndDestinations(context) {
      context.commit('getTravsTripsAndDestinations');
    },
    getUpcomingAndPastTrips(context) {
      context.commit('getUpcomingAndPastTrips');
    },
    calcAmntTravSpent(context) {
      context.commit('calcAmntTravSpent');
    },
  },
});
