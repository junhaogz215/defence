import Layout from './layout'

const coms = {
  Layout
}

export default function (Vue) {
  let keys = Object.keys(coms)
  keys.map(val => {
    Vue.component(val, coms[val])
  })
}
