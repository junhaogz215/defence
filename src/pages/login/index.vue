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
              <div>选择身份：</div>
              <el-select
                size="mini"
                v-model="selectedRole" 
                placeholder="选择身份">
                <el-option 
                  v-for="(val, i) in roles"
                  :key="val"
                  :value="val"
                  :label="i"></el-option>
              </el-select>
            </div>
            <div class="main_form-item">
              <el-button
                size="mini"
                type="primary"
                @click="submit">登录</el-button>
              <el-button
                size="mini"
                type="success"
                @click="toPassword">
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
// import md5 from 'js-md5'
import commonTemplate from '@/commonTemplate'
export default {
  mixins: [commonTemplate],
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  data () {
    return {
      username: '',
      password: '',
      selectedRole: '3',
      roles: {
        '学生': '3',
        '教师': '2',
        '管理员': '1'
      }
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
    async submit () {
      if (!this.username || !this.password) {
        this.$message({
          message: '用户名和密码不能为空',
          showClose: true,
          type: 'error'
        })
        return
      }
      let res = await api.userLogin(this.username, this.password, this.selectedRole)

      this.resMsg(res, '登陆成功', '登陆失败')
      if (res.data.status) {
        this.$store.commit('setUserInfo', res.data)
        this.jumpByRole(this.$router, +this.userInfo.data.role)
      } else {
        this.$store.commit('logout')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

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
