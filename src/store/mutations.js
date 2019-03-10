export default {
  seUserInfo (state, payLoad) {
    Object.assign(state.userInfo, payLoad) 
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