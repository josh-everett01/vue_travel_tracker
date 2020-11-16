<template>
  <div v-if="!this.$store.state.anyoneLoggedIn" class="main-container">
    <div :style="{ backgroundImage: `url('${getimage}')` }" class="heading">
      <h1>Your Voyage Awaits!</h1>
    </div>
    <div class="grid container-fluid">
      <div
        v-for="destination in this.$store.state.allDestinations.slice(0, 15)"
        :key="destination.id"
        class="destination"
      >
        <!-- <template v-if="index < 15"> -->
        <b-img :src="destination.image" alt="" />
        <p>
          <strong>{{ destination.destination }}</strong>
        </p>
        <!-- </template> -->
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
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 25px;
}
.destination {
  margin-top: 5px;
  background-size: cover;
}

img {
  border-radius: 25px;
  border: 1px solid #000;
  width: 95%;
}
p {
  font-size: 20px;
  margin-top: 10px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  overflow-y: hidden;
  justify-content: center;
}
.heading {
  color: #fff;
  padding: 8%;
  background-size: cover;
  background-position: bottom;
  margin-bottom: 20px;
  border: 1px solid #000;
}
/* * {
  border: 1px solid red;
} */

/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 280px;
    height: 210px;
    margin: 5px;
  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 350px;
    height: 280px;
  }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  img {
    width: 400px;
    height: 340px;
  }
}
</style>
