export default function (router) {
  router.beforeEach((to, from, next) => {
    console.log(to)    
    next()
  })
}