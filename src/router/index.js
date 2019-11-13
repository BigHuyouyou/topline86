import Vue from 'vue'
import VueRouter from 'vue-router'
import Views from '../views/login/index'
import Home from '../views/home/index'
import Welcome from '../views/welcome/index'
import Article from '../views/article/index'

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  var userinfo = window.sessionStorage.getItem('userinfo')
  if (!userinfo && to.path !== '/login') {
    // 路由导航到登录页面
    return next('/login')// ok
  }
  next()
})

export default router
