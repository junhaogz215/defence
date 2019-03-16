<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  margin: 0;
  // font-size: 1
  color: #303133;
  a {
    text-decoration: none;
    color: #303133;
  }
}
@media screen and (max-width: 900px) {
  .el-dialog {
    width: 70%;
  }
}
@media screen and (max-width: 500px) {
  .el-dialog {
    width: 100%;
  }
}
</style>
