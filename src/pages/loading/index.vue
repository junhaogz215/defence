<template>
  <div
    class="wrapper"
    v-loading="true"
    element-loading-background="rgba(255, 255, 255, 0.8)">
  </div>
</template>

<style>
  body {
    margin: 0;
  }
</style>

<script>
import {routes, roleRoutes} from '@/router'
export default {
  data () {
    return {}
  },
  created () {
    let isLogin = false
    setTimeout(() => {
      if (isLogin) {
        // TODO: 跳有权限页面
      } else {
        // TODO: 登录页面
        this.$router.push({path: '/login'})
        // 根据权限展示路由，下次封装到mutation里
        let menus = roleRoutes.adminRoutes.map(val => {
          console.log(routes.filter(v => v.path === val))
          return routes.filter(v => v.path === val)[0]
        })
        this.$store.commit('setMenu', menus)
      }
    }, 1000)
  }
};
</script>
<style lang="scss">
  .el-loading-spinner {
    transform: translateY(-50%) !important;
  }
</style>
<style lang="scss" scoped>
@import '@/assets/style/base.scss';
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>