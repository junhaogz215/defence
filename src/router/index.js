import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/pages/loading/index'
import Login from '@/pages/login/index'
import SetPassword from '@/pages/setpasswd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading...',
      component: Loading
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/password',
      name: '修改密码',
      component: SetPassword
    }
  ]
})
