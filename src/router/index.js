import Vue from 'vue';
import Router from 'vue-router';
import App from '../App';


import AgentDashboard from '../pages/agent_dashboard';
import TravelerDashboard from '../pages/traveler_dashboard';

Vue.use(Router);

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

  ],
});
