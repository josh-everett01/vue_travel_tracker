<template>
  <div>
    <label for="destination-choice"
      >Where would you like to go? Search for a destination here:</label
    >
    <select v-model="destination">
      <input type="text" />
      <template v-for="destination in this.$store.state.allDestinations">
        <option :key="destination.destination">
          {{ destination.destination }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      destination: '',
    };
  },
};
</script>
