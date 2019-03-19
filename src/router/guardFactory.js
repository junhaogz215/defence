
import store from '@/store'
import { Message } from 'element-ui';
import { powerConfig } from '@/config'
let checkPower = function (routes, to) {
  return routes.indexOf(to.path) > -1
}
export default function (router) {
  router.beforeEach(async (to, from, next) => {
    let userInfo = store && store.state && store.state.userInfo
    let storageUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
    let noLogin = !userInfo || (userInfo && !userInfo.isLogin && !storageUserInfo.status)
    if (to.path === '/login' || to.path === '/') {
      store.commit('setUserInfo', storageUserInfo)
      next()
      return
    }
    if (to.path !== '/login' && noLogin) {
      Message('未登录用户只能访问登录页面')
      next('/login')
      return
    } else {
      // store无登录信息且localStorage有登陆信息
      store.commit('setUserInfo', storageUserInfo)
    }

    if (userInfo.isLogin) {
      switch (userInfo.data && +userInfo.data.role) {
        // 管理员
        case 1:
          if (checkPower(powerConfig.adminRoutes, to)) {
            next()
          } else {
            next('/noaccess')
          }
          break
        // 教师
        case 2:
          if (+userInfo.data.isLeader === 1) {
            if (checkPower(powerConfig.leaderRoutes, to)) {
              next()
            } else {
              next('/noaccess')
            }
          } else {
            if (checkPower(powerConfig.teacherRoutes, to)) {
              next()
            } else {
              next('/noaccess')
            }
          }
          break
        // 学生
        case 3:
          if (checkPower(powerConfig.studentRoutes, to)) {
            next()
          } else {
            next('/noaccess')
          }
          break
        default:
          next('/noaccess')
      }
    }
    next()
    console.log('routerto:', to)
  })
}