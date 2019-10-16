import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
// import MeetingCenter from '@/components/MeetingCenter.vue'
// import  MeetingHome from '@/components/MeetingHome'
// import  MeetingOrganize from '@/components/MeetingOrganize'
//import  MeetingOrganizeDetail from '@/components/MeetingOrganizeDetail'
// let MeetingOrganizeDetail = resolve => require(['@/components/MeetingOrganizeDetail'], resolve);

// Lazy Loading
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JESP',
      component: Home,
      redirect: '/home',
      children: [
        { path: '/home', component: Home, name: '首页' }
        // { path: '/organize', component: MeetingOrganize, name: '会议组织' }
        // { path: '/organize/detail', component: MeetingOrganizeDetail, name: '详情信息展示' }
      ]
    }
  ]
})
