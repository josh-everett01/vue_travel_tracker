<template>
  <div v-if="state.travelerLoggedIn">
    <h1>Hello, {{ state.traveler.name }}</h1>
    <h3>You are a {{ state.traveler.travelerType }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: this.$store.state,
      travId: this.$store.state.travId,
      travelers: this.$store.state.travelers.travelers,
    };
  },
};
</script>
