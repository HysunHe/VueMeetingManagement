// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
// import router from './router'
import axios from 'axios'
import vConsole from 'vconsole';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.baseurl = 'https://o100.odainfra.com/faw_backend';
Vue.prototype.datacache = {};
window.vConsole = new vConsole();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
