<template>
  <div v-if="!this.$store.state.anyoneLoggedIn" class="main-container">
    <div :style="{ backgroundImage: `url('${getimage}')` }" class="heading">
      <h1>Bon Voyage!</h1>
    </div>
    <div class="grid">
      <div
        v-for="(destination, index) in this.$store.state.allDestinations"
        :key="destination.id"
        class="destination"
      >
        <template v-if="index < 15">
          <b-img :src="destination.image" alt="" width="425px" height="350px" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: null,
      image: '',
    };
  },
  methods: {},
  computed: {
    getimage() {
      if (this.$store.state.allDestinations.length) {
        const destination = this.$store.state.allDestinations[
          Math.floor(Math.random() * this.$store.state.allDestinations.length)
        ];
        return destination.image;
      }
      return false;
    },
  },
};
</script>

<style scoped>
h1 {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid #fff;
  border-radius: 25px;
}
.destination {
  margin: 5%;
  border-radius: 25px;
  background-size: cover;
}
img {
  border-radius: 25px;
  border: 1px solid #000;
}
.main-container {
  align-items: center;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;
}
.heading {
  color: #fff;
  padding: 8%;
  background-size: cover;
  background-position: bottom;
  opacity: 88%;
}
/* * {
  border: 1px solid red;
} */
</style>
