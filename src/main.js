// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mountEcharts from './lib/echarts'
import mountAxios from './lib/axios'
import utils from './lib/utils'
import router from './router'
import guardFactory from './router/guardFactory'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import installComponent from '@/components'


Vue.use(ElementUI)
Vue.use(installComponent)
Vue.use(utils)
Vue.config.productionTip = false

mountEcharts(Vue)
mountAxios(Vue)
guardFactory(router)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
