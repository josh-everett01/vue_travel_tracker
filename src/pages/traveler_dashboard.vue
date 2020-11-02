<template>
  <div v-if="state.travelerLoggedIn">
    <trip-request-form></trip-request-form>
    <h1>Hello, {{ state.traveler.name }}</h1>
    <h3>You are a {{ state.traveler.travelerType }}</h3>
    <h3>
      You have spent {{ addTotalTripCosts | currency }} on traveling this year!
    </h3>
    <div v-if="this.$store.state.travelersUpcomingTrips.length">
      <h1>Your Upcoming Trips:</h1>
      <div
        v-for="(trip, index) in state.travelersUpcomingTrips"
        class="trips"
        :key="index"
      >
        <div class="destinationimage">
          <img v-bind:src="state.destinations[index].image" />
        </div>
        <div class="trip-date">
          {{ trip.date }}
        </div>
        <div class="trip-destination">
          {{ state.destinations[index].destination }}
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
        <img v-bind:src="state.destinations[index].image" />
      </div>
      <div class="trip-date">
        {{ trip.date }}
      </div>
      <div class="trip-destination">
        {{ state.destinations[index].destination }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
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
  },
  methods: {},
  components: {
    TripRequestForm,
  },
};
</script>
<style scoped>
.trips {
  display: flex;
  flex-direction: column;
}
img {
  height: 75%;
  width: 50%;
}
</style>
