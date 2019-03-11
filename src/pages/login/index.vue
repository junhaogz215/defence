<template>
  <div class="wrapper">
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <section class="login-card">
          <h2>
            <span>登录</span>
          </h2>
          <div class="main">
            <div class="main_form-item">
              用户名：
              <el-input
                :clearable="true"
                placeholder="请输入用户名"
                v-model="username">
              </el-input>
            </div>
            <div class="main_form-item">
              密码：
              <el-input
                :clearable="true"
                type="password"
                placeholder="请输入密码"
                v-model="password">
              </el-input>
            </div>
            <div class="main_form-item">
              <el-button type="primary" @click="submit">登录</el-button>
              <el-button type="success" @click="toPassword">
                修改密码
            </el-button>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import store from '@/store'
import api from '@/api'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  watch: {
    username (nv) {
      this.username = this.$utils.trim(nv)
    },
    password (nv) {
      this.password = this.$utils.trim(nv)
    }
  },
  methods: {
    toPassword () {
      this.$router.push({
        path: '/password'
      })
    },
    submit () {
      if (!this.username || !this.password) {
        this.$message({
          message: '用户名和密码不能为空',
          showClose: true,
          type: 'error'
        })
        return
      }
      // TODO:发送请求
      let resData = {status: true}
      if (resData.status) {
        this.$message({
          message: '登陆成功！',
          showClose: true,
          type: 'success'
        })
      } else {
        this.$message({
          message: '用户名或密码错误',
          showClose: true,
          type: 'error'
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    store.commit('hideMenu', true)
    next()
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  .login-card {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }
  .main_form-item {
    padding: 10px 0;
  }
  .el-input {
    width: 100%;
  }
}
</style>
