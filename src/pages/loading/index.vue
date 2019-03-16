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
import api from '@/api'
export default {
  data () {
    return {}
  },
  async created () {
    let res = await api.getUserInfo()
    if (res && res.data && res.data.status) {
      console.log('已登录', res.data)
    } else {
      console.log('未登录', res.data)
    }
    let isLogin = false
    setTimeout(() => {
      if (isLogin) {
        // TODO: 跳有权限页面
      } else {
        // TODO: 登录页面
        this.$router.push({path: '/login'})
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