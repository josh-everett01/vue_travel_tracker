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
  metaInfo: {
    meta: [
      { property: 'og:title', content: 'Vue Travel Tracker' },
      { property: 'og:site_name', content: 'Vue Travel Tracker' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://i.imgur.com/Mrt8abr.jpg' },
      { property: 'og:description', content: 'Web application built with vue.js which manages and tracks different trips for users and travel agents, by consuming and posting to an external API.' },
    ],
  },
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
