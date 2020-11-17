<template>
  <div class="trip-request">
    <section
      class="container"
      id="request-form"
      v-if="
        (this.isTripRequestFormValid === false) |
          (this.tripRequestInfoCreated === false)
      "
    >
      <b-button @click="backToTravelerDashboard()" class="back-button">
        BACK TO TRAVELER DASHBOARD
      </b-button>
      <h3>Request Trips:</h3>
      <label for="destination-choice">Search for a Destination:</label>
      <b-form-input
        list="destinations"
        v-model="tripRequestForm.destination"
      ></b-form-input>
      <datalist id="destinations">
        <option v-for="destination in allDestinations" :key="destination.id">
          {{ destination.destination }}
        </option>
      </datalist>
      <label for="number-of-travelers">Number of Travelers:</label>
      <b-form-input
        list="number-of-travelers"
        v-model="tripRequestForm.numberOfTravs"
      ></b-form-input>
      <datalist id="number-of-travelers">
        <option v-for="index in 20" :key="index">
          {{ index }}
        </option>
      </datalist>
      <label for="trip-start">Please select a start date:</label>
      <b-form-datepicker
        id="trip-start"
        v-model="tripRequestForm.startDate"
        class="mb-2"
      ></b-form-datepicker>
      <label for="trip-end">Please select an end date:</label>
      <b-form-datepicker
        id="trip-end"
        v-model="tripRequestForm.endDate"
        class="mb-2"
      ></b-form-datepicker>
      <b-button
        v-on:click="validateFormAndCalculateTripRequest()"
        class="trip-request-button"
      >
        CALCULATE
      </b-button>
    </section>
    <template v-if="this.tripRequestInfoCreated">
      <section
        v-if="this.tripRequestInfoCreated"
        class="container confirm-trip"
      >
        <h1 class="confirm-h1">Please confirm your trip details:</h1>
        <div class="destinationimage">
          <img v-bind:src="state.tripRequestInfo.destinationImageUrl" />
        </div>
        <div class="trip-info">
          <div class="trip-destination">
            <strong> Traveling To: </strong>
            {{ state.tripRequestInfo.destination }}
          </div>
          <div class="number-of-travelers">
            <strong> Total Number of Travelers:</strong>
            {{ state.tripRequestInfo.numberOfTravelers }}
          </div>
          <div class="trip-start-date">
            <strong>Trip Begins: </strong>
            {{ startDate() }}
          </div>
          <div class="trip-length">
            <strong>Trip Length: </strong>
            {{ state.tripRequestInfo.tripLength }}
          </div>
          <div class="trip-end-date">
            <strong>Trip Ends: </strong>
            {{ endDate() }}
          </div>
          <div class="lodging-costs">
            <strong
              >Estimated lodging costs @
              {{ state.tripRequestInfo.destinationsLodgingCost | currency }} per
              day:
            </strong>
            {{ state.tripRequestInfo.lodgingCost | currency }}
          </div>
          <div class="flight-costs">
            <strong
              >Estimated flight costs @
              {{ state.tripRequestInfo.destinationsFlightCost | currency }} per
              person:
            </strong>
            {{ state.tripRequestInfo.flightCost | currency }}
          </div>
          <div class="fees">
            <strong>Estimated fees: </strong>
            {{ state.tripRequestInfo.agentFee | currency }}
          </div>
          <div class="total-cost">
            <strong>Estimated total cost: </strong>
            {{ state.tripRequestInfo.totalTripCost | currency }}
          </div>
        </div>
        <div class="submit-request">
          If you would like to submit this request, please click 'Submit Trip'
          below:
          <button v-on:click="submitTripRequest">Submit Trip</button>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import parseISO from 'date-fns/parseISO';
import { mapGetters } from 'vuex';

export default {
  mounted() {
    if (this.$store.state.travelerLoggedIn === false) {
      this.$router.push('/');
    }
    this.makeFormBlank();
  },
  data() {
    return {
      state: this.$store.state,
      destination: '',
      index: '',
      allDestinations: this.$store.state.allDestinations,
      tripRequestForm: {
        destination: '',
        numberOfTravs: '',
        startDate: '',
        endDate: '',
      },
      errors: [],
    };
  },
  methods: {
    validateFormAndCalculateTripRequest() {
      this.$store.dispatch('validateTripRequestForm', this.tripRequestForm);
      if (this.isTripRequestFormValid === true) {
        this.$store.dispatch('calculateTripRequest', this.tripRequestForm);
      }
    },
    makeFormBlank() {
      this.tripRequestForm.destination = '';
      this.tripRequestForm.numberOfTravs = '';
      this.tripRequestForm.startDate = '';
      this.tripRequestForm.endDate = '';
    },
    submitTripRequest() {
      this.$store.dispatch('submitTripRequest');
      this.$router.push('/traveler-dashboard');
    },
    startDate() {
      return parseISO(
        // eslint-disable-next-line comma-dangle
        this.$store.state.tripRequestInfo.startDate
      ).toDateString();
    },
    endDate() {
      return parseISO(this.$store.state.tripRequestInfo.endDate).toDateString();
    },
    backToTravelerDashboard() {
      this.$store.state.tripRequestSubmitted = true;
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapGetters(['isTripRequestFormValid']),
    ...mapGetters(['tripRequestInfoCreated']),
    ...mapGetters(['hasTripRequestBeenSubmitted']),
  },
};
</script>

<style scoped>
.container {
  margin-top: 3%;
}
button {
  align-self: center;
  border-radius: 25px;
  margin: 2%;
  width: 25%;
}
img {
  border: 1px solid #000;
  border-radius: 25px;
  margin-top: 10px;
  width: 45%;
}
input {
  width: 55%;
}
.back-button {
  display: flex;
  width: 75%;
  justify-content: center;
}
.confirm-h1 {
  border: 1px solid #000;
  border-radius: 25px;
}
.confirm-trip {
  align-content: center;
  display: grid;
}
.container {
  align-items: center;
  border: 1px solid #000;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2%;
}
.submit-request {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}
.total-cost {
  padding-top: 15px;
}
.trip-info {
  padding-top: 15px;
}
.trip-request-button {
  width: 35%;
}
</style>
