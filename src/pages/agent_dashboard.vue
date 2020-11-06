<template>
  <div>
    <div class="agent-header">
      <h1>Welcome, Agent!</h1>
      <h3>Earnings: {{ (state.totalMoneyForTrips * 0.1) | currency }}</h3>
      <button @click="pushToTravelerPage()">
        Agent Tools / Traveler Search
      </button>
    </div>
    <div v-if="!state.todaysTrips.length">
      <h1>Todays Trips</h1>
      <h1>There are no travelers on trips today</h1>
    </div>
    <b-container v-if="state.todaysTrips.length">
      <h3>Today's Trips:</h3>
      <span
        ><i
          >If there are travelers on trips today the trips will be shown here</i
        ></span
      >
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
    <b-container>
      <h1>Pending Trips:</h1>
      <b-row class="pending-trips">
        <b-col v-for="trip in state.pendingTrips" :key="trip.id">
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
          <b-button>Approve</b-button>
        </b-col>
      </b-row>
    </b-container>
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
    pushToTravelerPage() {
      this.$router.push('/traveler-search');
    },
  },
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
.agent-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.trav-name,
.trip-destination {
  white-space: nowrap;
}
img {
  width: 15em;
  height: 13em;
}
button {
  margin: 5%;
}
</style>
