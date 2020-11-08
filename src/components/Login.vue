<template>
  <div class="login-wrapper-div">
    <h1>Travel Tracker</h1>
    <div v-if="this.$store.state.anyoneLoggedIn === false">
      <div class="input-div">
        <div class="username-div">
          <label for="username">Username:</label>
          <input type="text" v-model="loginForm.username" />
        </div>
        <div class="password-div">
          <label for="password">Password:</label>
          <input type="text" v-model="loginForm.password" />
        </div>
        <div class="login-button-div">
          <button v-on:click="validateFormAndUser">login</button>
        </div>
      </div>
    </div>
    <div v-else>
      <b-button @click="pushHome()">LOGOUT</b-button>
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
    pushHome() {
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.$router.push('/');
      this.$store.dispatch('logOut');
    },
  },
  computed: {
    ...mapGetters(['whichUser']),
  },
};
</script>

<style scoped>
h1 {
  grid-column: 2;
}
input {
  grid-column: 3;
}
.errors-div {
  grid-column: 2;
}
.input-button-div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.input-div {
  display: flex;
  justify-content: center;
  grid-column: 2;
  padding: 1%;
}
.login-button-div {
  align-self: flex-end;
  margin-left: 1%;
}
.login-wrapper-div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #000;
}
.password-div,
.username-div {
  align-self: center;
  display: flex;
  flex-direction: column;
}
.password-div {
  margin-left: 1%;
}
</style>
