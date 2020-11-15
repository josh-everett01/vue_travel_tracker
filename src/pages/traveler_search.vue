<template>
  <b-container>
    <b-button class="back-to-agent-dashboard" @click="backToAgentDashboard()"
      >BACK TO AGENT DASHBOARD</b-button
    >
    <h1>Traveler Search</h1>
    <template v-if="!state.travelerSearchActive">
      <h5>
        *Here you may search for a traveler by name. If the traveler has any
        pending trips you will have the option to approve them*
      </h5>
      <label for="traveler-choice"
        ><strong>Search for a Traveler: </strong></label
      >
      <b-form-input list="travelers" v-model="traveler"></b-form-input>
      <datalist id="travelers">
        <option v-for="traveler in state.travelers" :key="traveler.id">
          {{ traveler.name }}
        </option>
      </datalist>
      <b-button class="show-traveler" @click="getTravelersInfo()"
        >SHOW TRAVELER</b-button
      >
    </template>
    <template v-if="state.travelerSearchActive">
      <h1>{{ state.traveler }}'s travels</h1>
      <h2>Total Spent on Trips: {{ addTotalTripCosts | currency }}</h2>
      <div v-if="state.travHasPendingTrips" class="pending-trips-div">
        <h2>Pending Trips:</h2>
        <div
          class="trips pending-trips"
          v-for="trip in state.travelersPendingTrips"
          :key="trip.id"
        >
          <div class="destinationimage">
            <b-img
              fluid
              v-bind:src="state.allDestinations[trip.destinationID - 1].image"
            />
          </div>
          <div class="trip-status">
            {{ trip.status }}
          </div>
          <div class="trip-date">
            {{ trip.date }}
          </div>
          <div class="trip-destination">
            {{ state.allDestinations[trip.destinationID - 1].destination }}
          </div>
          <b-button @click="approveTrip(trip.id)">Approve</b-button>
          <b-button @click="deleteTrip(trip.id)">Delete</b-button>
        </div>
      </div>
      <div v-else>{{ state.traveler }} has no pending trips</div>
      <h2>Approved Trips:</h2>
      <div class="approved-trips">
        <div
          class="trips"
          v-for="trip in state.travelersApprovedTrips"
          :key="trip.id + 10"
        >
          <div class="destinationimage">
            <b-img
              fluid
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
    </template>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      traveler: '',
      state: this.$store.state,
    };
  },
  methods: {
    backToAgentDashboard() {
      this.$router.push('/agent-dashboard');
    },
    getTravelersInfo() {
      this.$store.dispatch('setTravelerIdForAgent', this.traveler);
      this.$store.dispatch('getTravelersTrips');
      this.$store.dispatch('getTravsTripsAndDestinations');
      this.$store.dispatch('getUpcomingAndPastTrips');
      this.$store.dispatch('calcAmntTravSpent');
      this.$store.dispatch('travHasPendingTrips');
      this.$store.dispatch('getTravsPendingAndApprovedTrips');
    },
    approveTrip(tripId) {
      this.$store.dispatch('approveTrip', tripId);
    },
    deleteTrip(tripId) {
      this.$store.dispatch('deleteTrip', tripId);
    },
  },
  computed: {
    addTotalTripCosts() {
      const total = this.$store.state.eachTripsCost.reduce((a, b) => a + b, 0);
      return total;
    },

  },
};
</script>

<style scoped>
.container {
  margin-top: 2%;
}

.back-to-agent-dashboard {
  margin-bottom: 2%;
}
img {
  width: 300px;
  height: 260px;
  border-radius: 25px;
  border: 1px solid black;
}
.show-traveler {
  margin-top: 3%;
}
@media (min-width: 576px) {
  .approved-trips {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .trips {
    margin: 2%;
  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
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
  .approved-trips {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
