class Utils {
  constructor () {

  }
  trim (str) {
    return str.replace(/\s*/g, '')
  }
  install (Vue) {
    Vue.prototype.$utils = this
  }
}

export default new Utils()