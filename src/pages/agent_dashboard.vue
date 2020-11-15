<template>
  <div>
    <b-container class="agent-header">
      <h3><strong>Welcome, Agent!</strong></h3>
      <h4>
        <strong>Earnings: </strong>
        {{ (state.totalMoneyForTrips * 0.1) | currency }}
      </h4>
    </b-container>
    <div v-if="!state.todaysTrips.length">
      <h3><strong>Todays Trips:</strong></h3>
      <h5>There are no trips today</h5>
    </div>
    <b-container v-if="state.todaysTrips.length">
      <h3>Today's Trips:</h3>
      <b-row class="pending-trips">
        <b-col v-for="trip in state.todaysTrips" :key="trip.id">
          <div class="trip-img">
            <b-img
              thumbnail
              v-bind:src="state.allDestinations[trip.destinationID].image"
            />
          </div>
          <span><strong> Traveler: </strong></span>
          <div class="trav-name">
            {{ state.travelers[trip.userID].name }}
          </div>
          <div class="trip-destination">
            <strong> Destination: </strong>
            {{ state.allDestinations[trip.destinationID].destination }}
          </div>
          <div class="trip-date">
            <strong> Trip Date: </strong> {{ trip.date }}
          </div>
          <div class="trip-duration">
            <strong> Trip Duration: </strong> {{ trip.duration }} days
          </div>
          <div class="trip-status">
            <strong> Trip Status: </strong><br />
            {{ trip.status }}
          </div>
        </b-col>
      </b-row>
    </b-container>
    <h3><strong>Pending Trips:</strong></h3>
    <div>
      <b-card-group deck>
        <b-card
          overlay
          v-for="(trip, index) in state.pendingTrips"
          :key="trip.id"
          :title="'Pending Trip ' + (index + 1)"
          :img-src="state.allDestinations[trip.destinationID - 1].image"
        >
          <b-card-text>
            <strong> Traveler: </strong> <br />
            {{ state.travelers[trip.userID - 1].name }} <br />
            <strong> Destination: </strong> <br />
            {{ state.allDestinations[trip.destinationID - 1].destination }}
            <br />
            <strong> Trip Date: </strong> <br />
            {{ trip.date }}
          </b-card-text>
          <template #footer>
            <b-button @click="approveTrip(trip.id)">Approve</b-button>
            <b-button @click="deleteTrip(trip.id)">Delete</b-button>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentDashboard',
  mounted() {
    if (!this.$store.state.pendingTrips.length) {
      this.$store.dispatch('getPendingTrips', this.allTrips);
    }
    this.$store.dispatch('getTodaysTrips');
    this.$store.dispatch('getAgentEarnings');
  },
  methods: {
    approveTrip(tripId) {
      this.$store.dispatch('approveTrip', tripId);
    },
    deleteTrip(tripId) {
      this.$store.dispatch('deleteTrip', tripId);
    },
  },
  computed: {},
  data() {
    return {
      trip: '',
      state: this.$store.state,
      allTrips: this.$store.state.allTrips,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 3%;
}
button {
  margin: 5%;
}
/* img {
  size: 300px;
} */
.agent-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.card-title {
  background-color: rgba(0, 0, 0, 0.5);
}
.card-text {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
.card-title {
  color: #fff;
}
.list-group-item {
  color: #000;
}
@media (min-width: 576px) {
  .card {
    width: 270px;
    margin: 1%;
    flex: auto;
  }
  img {
    height: 230px;
  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .card-deck {
    justify-content: center;
  }
  .card {
    width: 350px;
    margin: 1%;
    flex: inherit;
  }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .card-deck {
    justify-content: center;
  }
  .card {
    width: 350px;
    margin: 2%;
    flex: inherit;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
