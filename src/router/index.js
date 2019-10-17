import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
// let MeetingOrganizeDetail = resolve => require(['@/components/MeetingOrganizeDetail'], resolve);

// Lazy Loading
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'JESP',
    component: Home
  }]
});
