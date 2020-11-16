import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import isBefore from 'date-fns/isBefore';
import formatDistance from 'date-fns/formatDistance';
import isSameDay from 'date-fns/isSameDay';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allLodging: [],
    allFlight: 0,
    agentEarnings: [],
    agentLogin: 'agency',
    agentLoggedIn: false,
    allDestinations: [],
    allTrips: [],
    anyoneLoggedIn: false,
    approvedTrips: [],
    correctPw: 'travel2020',
    destinations: [],
    eachTripsCost: [],
    errors: [],
    formData: {},
    formHasUnAndPw: false,
    formIsValid: false,
    passwordIsValid: false,
    pendingTrips: [],
    picUrl: '',
    todaysTrips: [],
    totalMoneyForTrips: Number,
    traveler: {},
    travelerId: Number,
    travelerLoggedIn: false,
    travelers: [],
    travelersDestinations: [],
    travelersPreviousTrips: [],
    travelerSearchActive: false,
    travelersTrips: [],
    travelersUpcomingTrips: [],
    tripRequestApproved: false,
    tripRequestFormValid: false,
    tripRequestInfo: {
      agentFee: '',
      destination: '',
      destinationsFlightCost: '',
      destinationId: Number,
      destinationImageUrl: '',
      destinationsLodgingCost: '',
      endDate: '',
      flightCost: '',
      lodgingCost: '',
      numberOfTravelers: '',
      startDate: '',
      totalTripCost: '',
      tripLength: '',
    },
    tripRequestInfoCreated: false,
    tripRequestSubmitted: false,
    trips: [],
    user: '',
    usernameIsValid: false,
  },

  getters: {
    whichUser: state => state.user,
    isTripRequestFormValid: state => state.tripRequestFormValid,
    tripRequestInfoCreated: state => state.tripRequestInfoCreated,
    hasTripRequestBeenSubmitted: state => state.tripRequestSubmitted,
  },

  mutations: {
    checkForErrors(state, form) {
      state.errors = [];
      if (!form.username) {
        state.errors.push('Username is required');
      }
      if (!form.password) {
        state.errors.push('Password is required');
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
      if (form.username.toLowerCase() === state.agentLogin) {
        debugger;
        state.usernameIsValid = true;
      }
      if (form.username.toLowerCase().includes('traveler')) {
        state.travelers.forEach(((traveler) => {
          if (parseInt(form.username.slice(8), 10) === traveler.id) {
            state.usernameIsValid = true;
          }
        }));
      }
      if (state.usernameIsValid === false) {
        state.errors.push('Please enter a valid username');
      }
    },
    determineUser(state, form) {
      if (state.formIsValid && state.passwordIsValid && state.usernameIsValid) {
        if (form.username.toLowerCase() === state.agentLogin) {
          state.user = form.username.toLowerCase();
        }
        if (form.username.toLowerCase().includes('traveler')) {
          state.travelers.forEach(((traveler) => {
            if (parseInt(form.username.slice(8), 10) === traveler.id) {
              state.user = form.username.toLowerCase();
            }
          }));
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
      state.travelers = response.travelers;
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
      location.reload();
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
          return state.travelersPreviousTrips.push(trip);
        } else if (result === false) {
          return state.travelersUpcomingTrips.push(trip);
        }
        return false;
      });
    },
    calcAmntTravSpent(state) {
      state.travelersTrips.forEach((trip) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < state.allDestinations.length; i++) {
          if (
            trip.destinationID === state.allDestinations[i].id &&
            trip.status === 'approved'
          ) {
            const tripFlightCosts =
              state.allDestinations[i].estimatedFlightCostPerPerson *
              trip.travelers;
            const tripLodgingCosts =
              state.allDestinations[i].estimatedLodgingCostPerDay *
              trip.duration;
            const agentFee = (tripLodgingCosts + tripFlightCosts) * 0.1;
            const totalTripCost = tripFlightCosts + tripLodgingCosts + agentFee;
            state.eachTripsCost.push(totalTripCost);
          }
        }
      });
    },
    validateTripRequestForm(state, tripRequestForm) {
      state.errors = [];
      if (state.tripRequestFormValid === false) {
        if (!tripRequestForm.destination) {
          state.errors.push('Please select a destination');
        }
        if (!tripRequestForm.numberOfTravs) {
          state.errors.push('Please enter the number of travelers');
        }
        if (!tripRequestForm.startDate || !tripRequestForm.endDate) {
          state.errors.push('Start AND End date required');
        }
        if (
          tripRequestForm.destination &&
          tripRequestForm.numberOfTravs &&
          tripRequestForm.startDate &&
          tripRequestForm.endDate
        ) {
          state.tripRequestFormValid = true;
        }
      }
    },
    calculateTripRequest(state, tripRequestForm) {
      state.allDestinations.forEach((destination) => {
        if (tripRequestForm.destination === destination.destination) {
          state.tripRequestInfo.destination = tripRequestForm.destination;
          state.tripRequestInfo.numberOfTravelers =
            tripRequestForm.numberOfTravs;
          state.tripRequestInfo.startDate = tripRequestForm.startDate;
          state.tripRequestInfo.endDate = tripRequestForm.endDate;
          state.tripRequestInfo.flightCost =
            destination.estimatedFlightCostPerPerson *
            tripRequestForm.numberOfTravs;
          state.tripRequestInfo.tripLength = formatDistance(
            new Date(tripRequestForm.endDate),
            new Date(tripRequestForm.startDate),
          );
          state.tripRequestInfo.lodgingCost =
            destination.estimatedLodgingCostPerDay *
            Number(state.tripRequestInfo.tripLength.slice(0, 1));
          const costBeforeAgentFee =
            state.tripRequestInfo.lodgingCost +
            state.tripRequestInfo.flightCost;
          state.tripRequestInfo.agentFee = costBeforeAgentFee * 0.1;
          state.tripRequestInfo.totalTripCost =
            costBeforeAgentFee + state.tripRequestInfo.agentFee;
          state.tripRequestInfo.destinationImageUrl = destination.image;
          state.tripRequestInfoCreated = true;
          state.tripRequestInfo.destinationsLodgingCost =
            destination.estimatedLodgingCostPerDay;
          state.tripRequestInfo.destinationsFlightCost =
            destination.estimatedFlightCostPerPerson;
          state.destinationID = destination.id;
        }
      });
    },
    submitTrip(state) {
      const data = JSON.stringify({
        id: parseFloat(state.allTrips.length + 1),
        userID: state.traveler.id,
        destinationID: state.destinationID,
        travelers: parseFloat(state.tripRequestInfo.numberOfTravelers),
        date: state.tripRequestInfo.startDate.replace(/-/g, '/'),
        duration: Number(state.tripRequestInfo.tripLength.slice(0, 1)),
        status: 'pending',
        suggestedActivities: [''],
      });
      const dataToJson = JSON.parse(data);
      axios
        .post(
          'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
          dataToJson,
        )
        // eslint-disable-next-line no-shadow
        .then(({ data }) => {
          // eslint-disable-next-line no-console
          state.travelersUpcomingTrips.push(data.newResource);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
      state.tripRequestSubmitted = true;
    },
    refreshTravelerDashboard(state) {
      state.tripRequestFormValid = false;
    },
    getRefreshedTrips(state, response) {
      state.allTrips = response.trips;
    },
    getPendingTrips(state, allTrips) {
      allTrips.forEach(((trip) => {
        if (trip.status === 'pending') {
          state.pendingTrips.push(trip);
        }
      }));
    },
    setTravelerIdForAgent(state, traveler) {
      state.travelers.forEach(((person) => {
        if (person.name === traveler) {
          state.travelerId = person.id;
          state.travelerSearchActive = true;
          state.traveler = traveler;
        }
      }));
    },
    getTodaysTrips(state) {
      state.allTrips.forEach(((trip) => {
        const tripDate = new Date(trip.date);
        const today = new Date();

        if (isSameDay(tripDate, today)) {
          state.todaysTrips.push(trip);
        }
      }));
    },
    getAgentEarnings(state) {
      state.totalMoneyForTrips = 0;
      state.allTrips.forEach(((trip) => {
        if (trip.status === 'approved') {
          state.approvedTrips.push(trip);
          // eslint-disable-next-line consistent-return
          state.allDestinations.forEach(((destination) => {
            if (destination.id === trip.destinationID) {
              const tripFlightCost = destination.estimatedFlightCostPerPerson * trip.travelers;
              const tripLodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
              const totalTripCost = tripFlightCost + tripLodgingCost;
              state.totalMoneyForTrips += totalTripCost;
            }
          }));
        }
      }));
    },
    approveTrip(state, tripId) {
      const data = JSON.stringify({ id: tripId, status: 'approved' });
      const dataToJson = JSON.parse(data);
      axios
        .post(
          'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip',
          dataToJson,
        )
        // eslint-disable-next-line no-console
        // eslint-disable-next-line no-shadow
        .then(({ data }) => {
          // eslint-disable-next-line no-console
          state.pendingTrips.forEach(((trip, index) => {
            if (trip.id === data.updatedResource.id) {
              state.pendingTrips.splice(index);
            }
          }));
          state.travelersTrips.forEach(((trip, index) => {
            if (trip.id === data.updatedResource.id) {
              state.travelersTrips.splice(index);
            }
          }));
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
      state.tripRequestApproved = true;
    },
    deleteTrip(state, tripId) {
      const data = { id: tripId };
      fetch(
        'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
        {
          method: 'DELETE', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
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
      axios
        .get(
          'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers',
        )
        .then((response) => {
          commit('getAllTravelers', response.data);
        });
    },
    getAllTrips({ commit }) {
      axios
        .get(
          'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
        )
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
      axios
        .get(
          'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations',
        )
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
    validateTripRequestForm(context, tripRequestForm) {
      context.commit('validateTripRequestForm', tripRequestForm);
    },
    calculateTripRequest(context, tripRequestForm) {
      context.commit('calculateTripRequest', tripRequestForm);
    },
    submitTripRequest(context) {
      context.commit('submitTrip');
    },
    refreshTravelerDashboard(context) {
      context.commit('refreshTravelerDashboard');
    },
    getRefreshedTrips({ commit }) {
      axios
        .get(
          'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
        )
        .then((response) => {
          commit('getRefreshedTrips', response.data);
        });
    },
    getPendingTrips(context, allTrips) {
      context.commit('getPendingTrips', allTrips);
    },
    setTravelerIdForAgent(context, traveler) {
      context.commit('setTravelerIdForAgent', traveler);
    },
    getTodaysTrips(context) {
      context.commit('getTodaysTrips');
    },
    getAgentEarnings(context) {
      context.commit('getAgentEarnings');
    },
    approveTrip(context, tripId) {
      context.commit('approveTrip', tripId);
    },
    deleteTrip(context, tripId) {
      context.commit('deleteTrip', tripId);
    },
  },
});
