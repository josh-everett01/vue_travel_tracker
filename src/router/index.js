import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import AgentDashboard from '../pages/agent_dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    // },
    {
      path: '/agent-dashboard',
      name: 'AgentDashboard',
      component: AgentDashboard,
    },

  ],
});
