// 引入Vue
import Vue from 'vue'

// 引入axios
import axios from 'axios'
import router from '@/router'
import JSONbing from 'json-bigint'
// 公共根地址
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

// 配置相应拦截器
axios.interceptors.response.use(function (res) {
  return res
}, function (error) {
  if (error.response.status === '401') {
    // 强制登录
    return router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

axios.defaults.transformResponse = [function (data) {
  if (data) {
    return JSONbing.parse(data)
  } else {
    return data
  }
}]

// 把axios通过原型继承的方式配置给Vue，使得组件内部可以直接访问
// 后期在组件内部就可以通过 this.$http 的方式获得axios对象
// $http:就是自定义名称，可以为其他
Vue.prototype.$http = axios
