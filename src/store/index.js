import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {
      islogin: true,
      username: '蒙娜丽莎法师'
    },
    hideMenu: true,
    backgroundColor: '#fff',
    menus: []
  },
  mutations,
  actions
})