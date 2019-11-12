import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/global.css'
import ElementUI from 'element-ui'
// 引入axios独立文件
import '@/utils/ax.js' // 本质，执行该文件的内容

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
