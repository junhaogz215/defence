import { powerConfig } from '@/config'
import { routes } from '@/router'
let clearUserInfo = function (state) {
  if (!state) return
  state.userInfo.isLogin = false
  let dataKeys = Object.keys(state.userInfo.data)
  dataKeys.map(key => {
    state.userInfo.data[key] = ''
  })
}

let getRoleMenus = function (routes, powerConfig, userInfo) {
  let menus = []
  if (userInfo && (!userInfo.isLogin)) {
    menus = powerConfig.touristRoutes.map(val => {
      return routes.find(v => v.path === val)
    })
  } else if (+userInfo.data.role === 1) { // 管理员
    menus = powerConfig.adminRoutes.map(val => {
      return routes.find(v => v.path === val)
    })
  } else if (+userInfo.data.role === 2) { // 教师
    menus = powerConfig.teacherRoutes.map(val => {
      return routes.find(v => v.path === val)
    })
    if (+userInfo.data.isLeader === 1) { // 教师且组长
      menus = powerConfig.leaderRoutes.map(val => {
        return routes.find(v => v.path === val)
      })
    }
  } else if (+userInfo.data.role === 3) { // 学生
    menus = powerConfig.studentRoutes.map(val => {
      return routes.find(v => v.path === val)
    })
  }
  return menus
}

export default {
  setUserInfo (state, payLoad) {
    if (payLoad.status) {
      state.userInfo.isLogin = true
      localStorage.setItem('userInfo', JSON.stringify(payLoad))
      Object.assign(state.userInfo.data, payLoad.data) 
    } else {
      localStorage.setItem('userInfo', '{}')
      clearUserInfo()
    }
    // 更新菜单
    state.menus = getRoleMenus(routes, powerConfig, state.userInfo)
    console.log('setUserInfo:', state.userInfo)
  },
  logout (state) {
    localStorage.setItem('userInfo', '{}')
    clearUserInfo(state)
    // 更新菜单
    state.menus = getRoleMenus(routes, powerConfig, state.userInfo)
  },
  hideMenu (state, payLoad) {
    if (typeof payLoad === 'boolean') {
      state.hideMenu = payLoad
    } else {
      state.hideMenu = !state.hideMenu
    }
  },
  changeBgColor (state, payLoad) {
    if(typeof payLoad === 'string') {
      state.backgroundColor = payLoad
    }
  },
  setMenu (state, payLoad) {
    if (Array.isArray(payLoad)) {
      state.menus = payLoad
    }
  }
}