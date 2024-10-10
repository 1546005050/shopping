import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchLlist from '@/views/search/list'
import Home from '@/views/layout/home'
import Catgory from '@/views/layout/catgory'
import Cart from '@/views/layout/cart'
import My from '@/views/layout/my'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    {
      path: '/layout',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/catgory', component: Catgory },
        { path: '/cart', component: Cart },
        { path: '/my', component: My }
      ]
    },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认哪个将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchLlist }
  ]
})
// 所以的路由在真正的被访问到之前（解析渲染对应组件页面前），都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面
// 全局前置导航守卫
// to:到哪去，到哪去的完整路由信息（路径，参数）
// from：从哪来，从哪来的完整路由对象（路径参数）
// next() 是否放行
// (1)next()直接放行，放行到to的路径
// (2)next（路径）进行拦截，拦截到next里面配置的路径
// 定义一个数据，专门用于存放所有需要权限的访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看to.path 是否在 autUrls中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，需要判断token
  const token = store.getters.token
  console.log(token)

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
