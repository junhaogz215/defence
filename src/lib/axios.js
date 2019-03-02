import axios from 'axios'

export default function (Vue) {
  Vue.prototype.$axios = axios
}