<template>
  <b-container>
    <h1>Traveler Search</h1>
    <button @click="backToAgentDashboard()">Back To Agent Dashboard</button>
    <template v-if="!state.travelerSearchActive">
      <h3>
        Here you may search for a traveler by name. If that traveler has any
        pending trips you will have the option to approve them
      </h3>
      <label for="traveler-choice">Search for a Traveler:</label>
      <b-form-input list="travelers" v-model="traveler"></b-form-input>
      <datalist id="travelers">
        <option v-for="traveler in state.travelers" :key="traveler.id">
          {{ traveler.name }}
        </option>
      </datalist>
      <button @click="getTravelersInfo()">Show Traveler</button>
    </template>
    <template v-if="state.travelerSearchActive">
      <h1>{{ state.traveler }}'s travels</h1>
      <h4>Pending Trips:</h4>
      <div class="trips" v-for="trip in state.travelersTrips" :key="trip.id">
        <div class="pending-trips" v-if="trip.status === 'pending'">
          <div class="destinationimage">
            <b-img
              fluid
              v-bind:src="state.allDestinations[trip.destinationID].image"
            />
          </div>
          <div class="trip-status">
            {{ trip.status }}
          </div>
          <div class="trip-date">
            {{ trip.date }}
          </div>
          <div class="trip-destination">
            {{ state.allDestinations[trip.destinationID].destination }}
          </div>
        </div>

        <div class="trips" v-if="trip.status === 'approved'">
          <div class="destinationimage">
            <b-img
              fluid
              v-bind:src="state.allDestinations[trip.destinationID].image"
            />
          </div>
          <div class="trip-status">
            {{ trip.status }}
          </div>
          <div class="trip-date">
            {{ trip.date }}
          </div>
          <div class="trip-destination">
            {{ state.allDestinations[trip.destinationID].destination }}
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
    },
  },
};
</script>
