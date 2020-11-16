import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import App from '../App';


import AgentDashboard from '../pages/agent_dashboard';
import TravelerDashboard from '../pages/traveler_dashboard';
import TravelerSearch from '../pages/traveler_search';
import TripRequestForm from '../pages/trip_request_page';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  routes: [
    {
      path: '/#',
      name: 'Home',
      component: App,
    },
    {
      path: '/agent-dashboard',
      name: 'AgentDashboard',
      component: AgentDashboard,
    },
    {
      path: '/traveler-dashboard/',
      name: 'TravelerDashboard',
      component: TravelerDashboard,
    },
    {
      path: '/traveler-search/',
      name: 'TravelerSearch',
      component: TravelerSearch,
    },
    {
      path: '/trip-request-form/',
      name: 'TripRequestForm',
      component: TripRequestForm,
    },

  ],
});
