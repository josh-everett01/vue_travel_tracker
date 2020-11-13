<template>
  <div v-if="state.travelerLoggedIn">
    <h1>Hello, {{ state.traveler.name }}</h1>
    <h3>You are a {{ state.traveler.travelerType }}</h3>
    <h3>
      You have spent {{ addTotalTripCosts | currency }} on traveling this year!
    </h3>
    <trip-request-form></trip-request-form>
    <div v-if="this.$store.state.travelersUpcomingTrips.length">
      <h1>Your Upcoming Trips:</h1>
      <div
        v-for="(trip, i) in state.travelersUpcomingTrips"
        class="trips"
        :key="i"
      >
        <div class="destinationimage">
          <img
            v-bind:src="state.allDestinations[trip.destinationID - 1].image"
          />
        </div>
        <div class="trip-date">
          <strong>Trip Date:</strong>
          {{ trip.date }}
        </div>
        <div class="trip-destination">
          <strong>Trip Destination:</strong>
          {{ state.allDestinations[trip.destinationID - 1].destination }}
        </div>
        <div class="trip-duration">
          <strong>Trip Duration: </strong>{{ trip.duration }} days
        </div>
        <div class="trip-status">
          <strong>Trip Status:</strong>
          {{ trip.status }}
        </div>
      </div>
    </div>
    <h1>Your Previous Trips:</h1>
    <div
      v-for="(trip, index) in state.travelersPreviousTrips"
      class="trips"
      :key="index"
    >
      <div class="destinationimage">
        <img v-bind:src="state.allDestinations[trip.destinationID - 1].image" />
      </div>
      <div class="trip-date">
        <strong>Trip Date:</strong>
        {{ trip.date }}
      </div>
      <div class="trip-destination">
        <strong>Trip Destination:</strong>
        {{ state.allDestinations[trip.destinationID - 1].destination }}
      </div>
      <div class="trip-duration">
        <strong>Trip Duration: </strong>{{ trip.duration }} days
      </div>
      <div class="trip-status">
        <strong>Trip Status:</strong>
        {{ trip.status }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import { mapGetters } from 'vuex';
import Vue from 'vue';
import TripRequestForm from '../components/TripRequestForm';

Vue.use(Vue2Filters);
export default {
  mounted() {
    this.$store.dispatch('getTravelersTrips');
    this.$store.dispatch('getTravsTripsAndDestinations');
    this.$store.dispatch('getUpcomingAndPastTrips');
    this.$store.dispatch('calcAmntTravSpent');
  },
  data() {
    return {
      componentKey: 0,
      state: this.$store.state,
      travId: this.$store.state.travId,
      travelers: this.$store.state.travelers.travelers,
      trips: this.$store.state.allTrips,
      upcomingTrips: [],
      pastTrips: [],
      trip: {},
      destination: {},
      destinationImage: '',
      picUrl: '',
    };
  },
  computed: {
    addTotalTripCosts() {
      const total = this.$store.state.eachTripsCost.reduce((a, b) => a + b, 0);
      return total;
    },
    ...mapGetters(['hasTripRequestBeenSubmitted']),
    hopefullyRefresh() {
      if (this.hasTripRequestBeenSubmitted) {
        this.forceRerender();
      }
      return false;
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
  components: {
    TripRequestForm,
  },
};
</script>
<style scoped>
img {
  height: 75%;
  width: 50%;
  border-radius: 25px;
  border: 1px solid black;
}
.trips {
  display: flex;
  flex-direction: column;
  margin: 1%;
}
.trip-date {
  margin-top: 1%;
}
.trip-status {
  margin-bottom: 1%;
}
</style>
