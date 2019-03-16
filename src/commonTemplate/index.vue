<template>
  
</template>

<script>
export default {
  methods: {
    resMsg (res, successMsg, failMsg) {
      if (res.data && res.data.status) {
        this.$message({
          message: successMsg || '操作成功！',
          showClose: true,
          type: 'success'
        })
      } else {
        this.$message({
          message: res.data.msg || failMsg || '操作失败',
          showClose: true,
          type: 'error'
        })
      }
    },
    handleError (tooltip, callback, type) {
      this.$message({
        type: 'error',
        message: tooltip || '操作失败'
      })
    }
  }
}
</script>

<style>

</style>
