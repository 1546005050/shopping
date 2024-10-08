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

export default router
