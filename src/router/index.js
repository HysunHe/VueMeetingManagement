import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/Home.vue'
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
      component: home,
      redirect: '/home',
      children: [
        { path: '/home', component: MeetingHome, name: '我的任务' },
        { path: '/organize', component: MeetingOrganize, name: '会议组织' },
        { path: '/organize/detail', component: MeetingOrganizeDetail, name: '详情信息展示' }
      ]
    }
  ]
})
