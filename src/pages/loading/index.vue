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
import {routes} from '@/router'
import api from '@/api'
import commonTemplate from '@/commonTemplate'

export default {
  mixins: [commonTemplate],
  data () {
    return {}
  },
  created () {
    let userInfo = this.$store.state && this.$store.state.userInfo || {}
    if (userInfo.isLogin) {
      this.jumpByRole(this.$router, +userInfo.data.role)
    } else {
      this.$router.push({path: '/login'})
    }
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