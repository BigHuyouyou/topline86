import Vue from 'vue'
import VueRouter from 'vue-router'
import Views from '../views/login/index'
import Home from '../views/home/index'
import Welcome from '../views/welcome/index'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: Views
    // component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome

      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
