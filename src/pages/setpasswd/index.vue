<template>
  <div class="wrapper">
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <section class="passwd-card">
          <h2 class="header">
            <span>修改密码</span>
          </h2>
          <div class="main">
            <div class="main_form-item">
              旧密码：
              <el-input
                type="password"
                :clearable="true"
                autocomplete="off"
                placeholder="请输入旧用户密码"
                v-model="oldPassword">
              </el-input>
            </div>
            <div class="main_form-item">
              新密码：
              <el-input
                :clearable="true"
                type="password"
                autocomplete="off"
                placeholder="请输入新密码"
                v-model="newPassword">
              </el-input>
            </div>
            <div class="main_form-item">
              再次输入新密码：
              <el-input
                :clearable="true"
                type="password"
                autocomplete="off"
                placeholder="请再次输入新密码"
                v-model="secondNewPassword">
              </el-input>
            </div>
            <!-- <div class="main_form-item">
              <div>选择身份：</div>
              <el-select 
                v-model="selectedRole"
                placeholder="选择身份"
                size="mini">
                <el-option 
                  v-for="(val, i) in roles"
                  :key="val"
                  :value="val"
                  :label="i"></el-option>
              </el-select>
            </div> -->
            <div class="main_form-item">
              <el-button
                size="mini"
                type="success"
                @click="submit">确认修改</el-button>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api'
import store from '@/store'
import commonTemplate from '@/commonTemplate'
export default {
  mixins: [commonTemplate],
  data () {
    return {
      selectedRole: '2',
      oldPassword: '',
      newPassword: '',
      secondNewPassword: ''
      // roles: {
      //   '学生': '3',
      //   '教师': '2'
      // }
    }
  },
  watch: {
    oldPassword (nv) {
      this.oldPassword = this.$utils.trim(nv)
    },
    newPassword (nv) {
      this.newPassword = this.$utils.trim(nv)
    },
    secondNewPassword (nv) {
      this.secondNewPassword = this.$utils.trim(nv)
    }
  },
  methods: {
    async submit () {
      if (!this.oldPassword) {
        this.$message({
          showClose: true,
          message: '请输入旧密码',
          type: 'error'
        })
      } else if (!this.newPassword) {
        this.$message({
          showClose: true,
          message: '请输入新密码',
          type: 'error'
        })
      } else if (!this.secondNewPassword) {
        this.$message({
          showClose: true,
          message: '请再次新旧密码',
          type: 'error'
        })
      } else if (this.newPassword !== this.secondNewPassword) {
        this.$message({
          showClose: true,
          message: '两次密码输入不一致',
          type: 'error'
        })
      } else if (this.oldPassword === this.newPassword) {
        this.$message({
          showClose: true,
          message: '新老密码不能相同',
          type: 'error'
        })
      } else {
        let userInfo = store.state.userInfo.data
        let res = await api.updatePassword({
          id: userInfo.id || userInfo.uid,
          userName: userInfo.userName,
          role: userInfo.role,
          password: this.newPassword,
          oldPassword: this.oldPassword
        })
        this.resMsg(res, '修改成功，请重新登录', '修改失败')
        if (res && res.data && res.data.status) {
          this.toLogin()
        }
      }
    },
    toLogin () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

.wrapper {
  .passwd-card {
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
