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
              旧密码
              <el-input
                type="password"
                :clearable="true"
                placeholder="请输入旧用户密码"
                v-model="oldPassword">
              </el-input>
            </div>
            <div class="main_form-item">
              新密码：
              <el-input
                :clearable="true"
                type="password"
                placeholder="请输入新密码"
                v-model="newPassword">
              </el-input>
            </div>
            <div class="main_form-item">
              再次输入新密码：
              <el-input
                :clearable="true"
                type="password"
                placeholder="请再次输入新密码"
                v-model="secondNewPassword">
              </el-input>
            </div>
            <div class="main_form-item">
              <el-button type="warning" @click="submit">确认修改</el-button>
              <el-button type="danger" @click="resetInput">重置</el-button>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      secondNewPassword: ''
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
    submit () {
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
        // TODO:
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
      }
    },
    resetInput () {
      this.oldPassword = ''
      this.newPassword = ''
      this.secondNewPassword = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .passwd-card {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }
  .main_form-item {
    padding: 10px 0;
  }
}
</style>
