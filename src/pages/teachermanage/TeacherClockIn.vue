<template>
  <div>
    <el-card>
      <div slot="header">
        {{$route.name}}
      </div>
      <el-table
        :data="teacherList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="教师姓名">
        </el-table-column>
        <el-table-column
          prop="leaderName"
          label="组长姓名">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="addRecord(scope.$index, scope.row)">添加考勤记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog 
      :title="'添加考勤记录'" 
      :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="组长姓名:">
          <el-input
            v-model="selectedTeacherInfo.leaderName"
            readonly
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名:">
          <el-input
            v-model="selectedTeacherInfo.name"
            readonly
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考勤日期:">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonTemplate from '@/commonTemplate'
import template from '../ManageTemplate'
import api from '@/api'
export default {
  mixins: [template, commonTemplate],
  watch: {
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      teacherList: [],
      date: '',
      selectedTeacherInfo: {}
    }
  },
  methods: {
    addRecord(index, row) {
      this.dialogFormVisible = true
      let keys = Object.keys(row)
      keys.map(val => {
        this.$set(this.selectedTeacherInfo, val, row[val])
      })
      this.date = ''
    },
    submit () {
       this.$confirm('确定添加该考勤记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let info = this.selectedTeacherInfo
          let date = this.date
          let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          let res = await api.addAttendance({
            leaderId: info.leaderId,
            teacherId: info.id,
            dateTime
          })
          this.resMsg(res, '添加考勤记录成功', '添加考勤记录失败')
          if (res && res.data && res.data.status) {
            this.dialogFormVisible = false
          }
        })
    },
    async initTeacherList () {
      let userInfo =  this.userInfo || {}
      if (!userInfo.isLogin) return
      let res = await api.getTeacherInfoByLeaderId(userInfo.data && userInfo.data.uid)
      if (!res || !res.data) return
      if (res.data.status) {
        this.teacherList = res.data.data
      } else {
        this.$message({
          message: res.data.msg || '教师信息获取失败',
          type: 'error'
        })
      }
    }
  },
  created () {
    this.initTeacherList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

