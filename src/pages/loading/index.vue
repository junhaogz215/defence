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
        }
      }, 3000)
    }
  };
</script>
<style lang="scss">
  .el-loading-spinner {
    transform: translateY(-50%) !important;
  }
</style>
<style lang="scss" scoped>
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>