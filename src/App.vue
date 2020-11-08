<template>
  <div id="app">
    <login></login>
    <main-page-styling></main-page-styling>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Login from './components/Login';
import MainPageStyling from './components/MainPageStyling';

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('getAllDestinations');
  },
  components: {
    Login,
    MainPageStyling,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
