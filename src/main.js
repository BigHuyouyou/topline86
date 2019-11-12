import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/global.css'
import ElementUI from 'element-ui'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // userinfo并不是始终存在的，要做判断使用
  let userinfo = window.sessionStorage.getItem('userinfo')

  if (userinfo) {
    let token = JSON.parse(userinfo).token
    // 给axios请求头配置token
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
