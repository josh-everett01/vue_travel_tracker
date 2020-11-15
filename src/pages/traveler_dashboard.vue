<template>
  <div v-if="state.travelerLoggedIn">
    <b-container class="traveler-info">
      <h3>Hello, {{ state.traveler.name }}</h3>
      <h4>You are a {{ state.traveler.travelerType }}</h4>
      <h5>
        You have spent {{ addTotalTripCosts | currency }} on traveling this
        year!
      </h5>
    </b-container>

    <h1 class="upcoming-trips-h1">Your Upcoming Trips:</h1>
    <div
      v-if="this.$store.state.travelersUpcomingTrips.length"
      class="upcoming-trips"
    >
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
    <div class="previous-trips">
      <div
        v-for="(trip, index) in state.travelersPreviousTrips"
        class="trips"
        :key="index"
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
    <router-view></router-view>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import { mapGetters } from 'vuex';
import Vue from 'vue';

Vue.use(Vue2Filters);
export default {
  mounted() {
    if (!this.hasTripRequestBeenSubmitted) {
      this.$store.dispatch('getTravelersTrips');
      this.$store.dispatch('getTravsTripsAndDestinations');
      this.$store.dispatch('getUpcomingAndPastTrips');
      this.$store.dispatch('calcAmntTravSpent');
    }
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
  },
};
</script>
<style scoped>
img {
  width: 300px;
  height: 260px;
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
@media (min-width: 576px) {
  img {
    width: 310px;
    height: 270px;
  }
  .upcoming-trips {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .upcoming-trips-h1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 1;
  }
  .previous-trips {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .upcoming-trips {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .upcoming-trips-h1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 1;
  }
  .previous-trips {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 350px;
    height: 320px;
  }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  img {
    width: 370px;
    height: 340px;
  }
  .upcoming-trips {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .upcoming-trips-h1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 1;
  }
  .previous-trips {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  img {
    width: 400px;
    height: 370px;
  }
}
</style>
