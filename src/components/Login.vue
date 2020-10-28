<template>
  <div class="login-wrapper-div">
    <h1>Travel Tracker</h1>
    <div class="input-button-div">
      <div class="input-div">
        <div class="username-div">
          <label for="username">Username:</label>
          <input type="text" v-model="username" />
        </div>
        <div class="password-div">
          <label for="password">Password:</label>
          <input type="text" v-model="password" />
        </div>
      </div>
      <div class="login-button-div">
        <button v-on:click="validForm">login</button>
      </div>
    </div>
    <template v-if="errors">
      <div class="errors-div">
        <ul>
          <li v-for="error in errors" v-bind:key="error">- {{ error }}</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import agentDashboard from '../pages/agent_dashboard';

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },
  components: { agentDashboard },
  methods: {
    isValidPassword() {
      if (this.password === this.$store.state.correctPw) {
        this.$store.dispatch('validatePassword', this.password);
        this.determineUser();
        return true;
      }
      return false;
    },
    determineUser() {
      if (this.username === this.$store.state.agentLogin) {
        this.$store.dispatch('agentLogin', this.username);
      }
    },
    validForm() {
      this.errors = [];
      if (!this.username === 'agency' || this.username === '') {
        this.errors.push('Username is required');
      }
      if (!this.password === 'travel2020' || this.password === '') {
        this.errors.push('Password is required');
      }
      this.isValidPassword();
      return true;
    },
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
  flex-direction: column;
  grid-column: 2;
}
.login-button-div {
  grid-column: 2;
  align-self: center;
}

.login-wrapper-div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.username-div,
.password-div {
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
