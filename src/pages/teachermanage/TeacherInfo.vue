
<template>
  <div>
    <el-card>
      <div slot="header">
        {{$route.name}}
      </div>
      <section class="condition">
        <el-button
          class="condition-item"
          type="success" 
          size="mini"
          @click="handleAdd(clearForm)">新增教师</el-button>
        <el-upload
          class="condition-item"
          ref="upload"
          action="http://45.40.192.128/platform/api/teacher/dataImport"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :file-list="excelFile"
          :limit="1">
          <el-button size="mini" type="primary">通过excel批量导入</el-button>
        </el-upload>
      </section>
       <el-table
        :data="tableData[currentPage]"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="isLeader"
          label="是否组长"
          width="150">
        </el-table-column>
        <el-table-column
          prop="leaderName"
          label="组长名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="role"
          label="是否辅导员"
          width="150">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row, setForm)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, deleteTeacher)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="padding: 20px 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="pages * 10"
          :current-page.sync="currentPage">
        </el-pagination>
      </el-row>
    </el-card>
    <el-dialog 
      :title="isHandelAdd ? '新增教师' : '修改教师信息'" 
      :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left" label-width="100px">
        <el-form-item label="姓名:">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" v-show="isHandelAdd">
          <el-input v-model="form.password" show-password autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="是否辅导员:">
          <el-select v-model="form.role">
            <el-option :value="'是'">是</el-option>
            <el-option :value="'否'">否</el-option>
          </el-select>
        </el-form-item>
        <div v-show="form.role === '否'">
          <el-form-item label="是否组长：">
            <el-select v-model="form.isLeader" :disabled="!isHandelAdd && form.isLeader === '是' && alreadyIsLeader === '是'">
              <el-option :value="'是'">是</el-option>
              <el-option :value="'否'">否</el-option>
            </el-select>
            <!-- <el-input v-model="form.remark" autocomplete="off" placeholder="请输入学生备注"></el-input> -->
          </el-form-item>
          <el-form-item v-show="form.isLeader === '否'" label="选择组长:">
            <el-select 
              v-model="leaderIndex"
              filterable>
              <el-option 
                v-for="(val, i) in leadersData"
                :value="i"
                :label="val.name"
                :key="i">{{val.name}}</el-option>
            </el-select>        
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import template from '../ManageTemplate'
import commonTemplate from '@/commonTemplate'
// import md5 from 'js-md5'
import api from '@/api'
export default {
  mixins: [template, commonTemplate],
  watch: {
    currentPage (val) {
      this.getTeacherInfoByPage(val)
    },
    leaderIndex (val) {
      // console.log('leaderIndex', val)
      if (!this.leadersData[val]) return
      this.form.leaderName = this.leadersData[val].name
      this.form.leaderId = this.leadersData[val].id
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        password: '',
        isLeader: '',
        leaderId: '',
        leaderName: '',
        role: '' // 0：辅导员 1：非辅导员普通教师
      },
      leaderIndex: undefined,
      excelFile: undefined,
      currentPage: 1,
      rawDatas: null,
      leadersData: [],
      alreadyIsLeader: false, // 当前修改教师是否是leader 
      pages: 0 // 信息总页数
    }
  },
  methods: {
    async deleteTeacher (index, row) {
      let res = await api.deleteTeacherById(row.id)
      this.resMsg(res, '删除成功', '删除失败')
      if (res && res.data && res.data.status) {
        this.getTeacherInfoByPage(this.currentPage)
      }
    },
    async getLeaderData () {
      let res = await api.getLeaderInfos()
      // console.log('getLeaderData:', res)
      if (res && res.data && res.data.data) {
        this.leadersData = res.data.data
      }
    },
    async submit () {
      let {id, name, password, role, isLeader, leaderName, leaderId} = this.form
      if (this.isHandelAdd) { // 注册教师
        if (!name || !password) {
          this.$message({
            message: '姓名、密码不能为空',
            showClose: true,
            type: 'error'
          })
          return
        } else if (role === '否' && isLeader === '否' && !leaderName) {
          this.$message({
            message: '请选择一名组长',
            showClose: true,
            type: 'error'
          })
          return
        } else {
          let res = await api.teacherRegister({
            name, password,
            role: role === '是' ? 0 : 1,
            isLeader: isLeader === '是' ? 1 : 0,
            leaderName,
            leaderId
          })
          // console.log('注册信息', {
          //   name, password,
          //   role: role === '是' ? 0 : 1,
          //   isLeader: isLeader === '是' ? 1 : 0,
          //   leaderName
          // })
          this.resMsg(res, '注册成功', '注册失败')
          if (res && res.data && res.data.status) {
            this.getLeaderData()
            this.getTeacherInfoByPage(this.currentPage)
            this.dialogFormVisible = false
          }
        }
      } else {  // 修改教师信息
        if (!name) {
          this.$message({
            message: '姓名不能为空',
            showClose: true,
            type: 'error'
          })
          return
        } else if (isLeader === '否' && leaderName === '-') {
          this.$message({
            message: '请选择一名组长',
            showClose: true,
            type: 'error'
          })
          return
        } else {
          this.form.password = undefined
          let res = await api.updateTeacherInfo({
            id,
            name,
            role: role === '是' ? 0 : 1,
            isLeader: isLeader === '是' ? 1 : 0,
            leaderName: leaderName === '-' ? undefined : leaderName
          })
          this.resMsg(res, '修改成功', '修改失败')
          if (res && res.data && res.data.status) {
            this.getTeacherInfoByPage(this.currentPage)
            this.dialogFormVisible = false
          }
        }
      }
    },
    setForm (index, row) {
      this.form.id = row && row.id
      this.form.name = row && row.name
      this.form.isLeader = row && row.isLeader
      this.alreadyIsLeader = row && row.isLeader
      this.form.leaderName = row && row.leaderName
      this.form.role = row && row.role
      this.leadersData.map((val, i) => {
        if (val.name === row.leaderName) this.leaderIndex = i 
      })
    },
    clearForm () {
      let keys = Object.keys(this.form)
      keys.map(val => {
        this.form[val] = undefined
      })
      this.form.role = '否'
      this.form.isLeader = '否'
      this.leaderIndex = undefined
    },
    uploadSuccess (res, file, fileList) {
      if (!res) return
      // console.log('fileList,', fileList)
      this.$refs.upload.clearFiles()
      if (res.status) {
        this.$message({
          message: res.msg || '文件上传成功',
          showClose: true,
          type: 'success'
        })
        this.getTeacherInfoByPage(this.currentPage)
      } else {
        this.$message({
          message: res.msg || '文件上传失败',
          showClose: true,
          type: 'error'
        })
      }
    },
    async getTeacherInfoByPage (page) {
      let res = await api.getTeacherInfos(null, page)
      this.pages = res.data.data.pages
      let list = res.data.data.list
      console.log('getTeacherInfoByPage', list)
      list.map(val => {
        val.role = val.role === 1 ? '否' : '是'
        val.isLeader = val.isLeader === 1 ? '是' : '否'
        val.leaderName = val.leaderName || '-'
      })
      if (res && res.data && res.data.status) {
        // this.rawDatas = res.data.data.list
        // this.$set(this.rawDatas, page, res.data.data.list)
        this.$set(this.tableData, page, res.data.data.list)
      } else {
        this.$message({
          message: '查询失败',
          showClose: true,
          type: 'error'
        })
      }
    }
  },
  created () {
    // this.tableData = [[],
    //   [{
    //     "id": "0",
    //     "name": "李白",
    //     "password": null,
    //     "isLeader": 1,
    //     "leaderId": "0311",
    //     "leaderName": null,
    //     "role": 1
    //   }]
    // ]
    this.getTeacherInfoByPage(this.currentPage)
    this.getLeaderData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

