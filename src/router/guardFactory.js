
import store from '@/store'
import { Message } from 'element-ui';
import api from '@/api';
export default function (router) {
  router.beforeEach(async (to, from, next) => {
    if (to.path === '/noaccess') next()
    let userInfo = store && store.state && store.state.userInfo
    let storageLoginStatus = localStorage.getItem('defenceIslogin')
    console.log('beforeEachUserInfo:', userInfo)
    if (!userInfo) {
      Message('未登录用户只能访问登录页面')
      next('/login')
      return
    }

    // 如果storage中的状态是已登录那就获取当前用户登录信息
    if (!userInfo.isLogin && storageLoginStatus) {
      let res = await api.getUserInfo()
      if (res && res.data && res.data.status) {
        store.commit('setUserInfo', res)
      }
    }

    if (!userInfo.isLogin) {
      if (to.path !== '/login') {
        Message('未登录用户只能访问登录页面')
        next('/login')
        return
      } else {
        next()
        return
      }
    }

    if (userInfo.isLogin) {
      switch (userInfo.data && +userInfo.data.role) {
        case 1:
          next()
          break
        case 2:
          next()
          break
        case 3:
          next()
          break
        default:
          next('/noaccess')
      }
    }
    console.log('routerto:', to)
  })
}