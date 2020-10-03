import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login'
import Home from '@/views/home/'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫 页面所有导航都会经过这里
// to:要去的那个页面路由信息  from:来自哪个的路由信息  next:放行方法
const user = JSON.parse(window.localStorage.getItem('user'))
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是login，没有登录跳转登录页，登录了允许访问
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
