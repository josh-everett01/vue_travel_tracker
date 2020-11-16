<template>
  <div class="login-wrapper-div">
    <div class="h1-div">
      <h1 class="travel-tracker-h1">Travel Tracker</h1>
    </div>
    <template
      v-if="this.$store.state.anyoneLoggedIn === false"
      class="reg-login"
    >
      <div class="input-div">
        <div class="username-div">
          <label for="username">Username:</label>
          <input type="text" v-model="loginForm.username" />
        </div>
        <div class="password-div">
          <label for="password">Password:</label>
          <input type="text" v-model="loginForm.password" />
        </div>
        <b-button v-on:click="validateFormAndUser">LOGIN</b-button>
      </div>
    </template>
    <div v-else-if="this.$store.state.travelerLoggedIn" class="traveler-logout">
      <b-button class="trip-request-button" @click="pushToTripRequestPage()"
        >TRIP REQUEST</b-button
      >
      <b-button class="logout-button" @click="pushHome()">LOGOUT</b-button>
    </div>
    <div v-else-if="this.$store.state.agentLoggedIn" class="agent-logout">
      <b-button class="agent-tools-button" @click="pushToTravelerPage()">
        TRAVELER SEARCH
      </b-button>
      <b-button class="logout-button" @click="pushHome()">LOGOUT</b-button>
    </div>
    <template v-if="this.$store.state.errors.length">
      <div class="errors-div">
        <ul>
          <li v-for="error in this.$store.state.errors" v-bind:key="error">
            - {{ error }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import agentDashboard from '../pages/agent_dashboard';
import travelerDashboard from '../pages/traveler_dashboard';

export default {
  mounted() {
    this.$store.dispatch('getAllTrips');
    this.$store.dispatch('getAllTravelers');
  },
  data() {
    return {
      loginForm: { username: '', password: '' },
      errors: [],
    };
  },
  components: { agentDashboard, travelerDashboard },
  methods: {
    validateFormAndUser() {
      this.$store.dispatch('checkForErrors', this.loginForm);
      this.$store.dispatch('validatePassword', this.loginForm);
      this.$store.dispatch('validateUsername', this.loginForm);
      this.$store.dispatch('determineUser', this.loginForm);
      if (this.whichUser === 'agency') {
        this.$store.dispatch('agentLogin');
      } else {
        this.$store.dispatch('travelerLogin', this.loginForm);
      }
    },
    pushToTripRequestPage() {
      this.$router.push('/trip-request-form');
    },
    pushHome() {
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.$router.push('/');
      this.$store.dispatch('logOut');
    },
    pushToTravelerPage() {
      this.$router.push('/traveler-search');
    },
  },
  computed: {
    ...mapGetters(['whichUser']),
  },
};
</script>

<style scoped>
.agent-tools-button {
  width: 45%;
  margin-right: 1%;
}
.agent-logout {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1%;
}
.h1-div {
  display: flex;
  grid-row: 1;
  white-space: nowrap;
  align-self: center;
  justify-content: center;
}
/* input {
  grid-column: 3;
} */
.errors-div {
  grid-column: 2;
}
/* .input-button-div {
  display: grid;
} */
.input-div {
  display: flex;
  grid-row: 2;
  justify-content: space-around;
  padding: 10px;
}
button {
  margin-left: 1%;
  align-self: flex-end;
  width: 30%;
  padding: 1%;
  border: 1px solid #000;
}
label {
  grid-row: 1;
}
input {
  grid-row: 2;
  width: 95%;
}
.login-wrapper-div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 0.5fr;
  border-bottom: 1px solid #000;
}
.logout-button {
  grid-row: 1;
}
.traveler-logout {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
}
.trip-request-button {
  width: 40%;
  margin-right: 1%;
}
.password-div,
.username-div {
  align-self: center;
  display: flex;
  flex-direction: column;
}
.password-div {
  margin-left: 1%;
  grid-row: 2;
}

@media (min-width: 576px) {
  button {
    width: 20%;
  }
  .agent-tools-button {
    width: 30%;
  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  button {
    margin-left: 1%;
    align-self: flex-end;
    width: 20%;
    padding: 1%;
  }
  .agent-tools-button {
    width: 25%;
  }
  .logout-button {
    width: 20%;
  }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .login-wrapper-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .logout-button {
    grid-column: 2;
    width: 25%;
  }
  .travel-tracker-h1 {
    grid-row: 1;
    grid-column: 2;
    margin-bottom: -0.25%;
  }
  .agent-logout {
    grid-row: 1;
    grid-column: 3;
  }
  .agent-tools-button {
    grid-column: 1;
    grid-row: 1;
    width: 45%;
  }
  .h1-div {
    grid-row: 1;
    display: flex;
    grid-column: 2;
    align-items: flex-end;
    height: 100%;
  }
  .input-div {
    grid-column: 3;
    grid-row: 1;
  }
  .traveler-logout {
    grid-column: 3;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .agent-tools-button {
    grid-column: 1;
  }
  .traveler-logout {
    grid-column: 3;
  }
  .upcoming-trips {
    justify-content: center;
  }
  .logout-button {
    margin-right: 3%;
  }
  /* .login-wrapper-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .h1-div {
    grid-column: 2;
  }
  .input-div {
    grid-column: 3;
  } */
}
</style>
