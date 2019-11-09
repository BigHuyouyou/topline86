import Vue from 'vue'
import VueRouter from 'vue-router'
import Views from '../views/login/index'
import Home from '../views/home/index'

Vue.use(VueRouter)

const routes = [
  { path: '/login',
    name: 'login',
    component: Views
    // component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
