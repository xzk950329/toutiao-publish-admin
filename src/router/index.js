import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login'
import Home from '@/views/home/'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout', 默认有子路由 则不要命名，会出现警告
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
