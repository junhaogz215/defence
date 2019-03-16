let clearUserInfo = function(state) {
  if (!state) return
  state.userInfo.isLogin = false
  let dataKeys = Object.keys(state.userInfo.data)
  dataKeys.map(key => {
    state.userInfo.data[key] = ''
  })
  console.log('clearUserInfo:', state.userInfo)
}

export default {
  setUserInfo (state, payLoad) {
    if (payLoad.status) {
      state.userInfo.isLogin = true
      Object.assign(state.userInfo.data, payLoad.data) 
    } else {
      localStorage.setItem('userInfo', '{}')
      clearUserInfo()
    }
    console.log('setUserInfo:', state.userInfo)
  },
  logout (state) {
    localStorage.setItem('userInfo', '{}')
    clearUserInfo(state)
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