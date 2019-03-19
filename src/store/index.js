import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import { powerConfig } from '@/config'
import { routes } from '@/router/index'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {
      isLogin: false,
      data: {
        userName: '',
        role: '',
        uid: ''
      }
    },
    hideMenu: true,
    backgroundColor: '#0084FF',
    menus: []
  },
  mutations,
  actions
})