import Vue from 'vue'
import Router from 'vue-router'

import MeetingCenter from '@/components/MeetingCenter.vue'
import  MeetingHome from '@/components/MeetingHome'
import  MeetingOrganize from '@/components/MeetingOrganize'
//import  MeetingOrganizeDetail from '@/components/MeetingOrganizeDetail'
let MeetingOrganizeDetail = resolve => require(['@/components/MeetingOrganizeDetail'], resolve);

// Lazy Loading
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '会议中心',
      component: MeetingCenter,
      redirect: '/meetingcenter',
      children: [
        { path: '/meetingcenter', component: MeetingHome, name: '会议中心' },
        { path: '/organize', component: MeetingOrganize, name: '会议组织' },
        { path: '/organize/detail', component: MeetingOrganizeDetail, name: '详情信息展示' }
      ]
    }
  ]
})
