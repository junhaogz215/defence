<template>
  <div>
    <el-card>
      <div slot="header">
        {{$route.name}}
      </div>
      <el-button 
        type="success" 
        size="samll"
        @click="handleAdd(clearForm)">新增</el-button>
      <el-upload
        ref="upload"
        class="margintop"
        action="http://45.40.192.128/platform/api/studentUser/dataImport"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :file-list="excelFile"
        :limit="1">
        <el-button size="samll" type="primary">通过excel批量导入</el-button>
      </el-upload>
      <el-table
        :data="tableData[currentPage]"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row, setForm)">修改信息</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
      :title="isHandelAdd ? '新增学生信息' : '修改学生信息'" 
      :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left" label-width="80px">
        <el-form-item label="学生姓名:">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入学生姓名"></el-input>
        </el-form-item>
        <el-form-item v-show="isHandelAdd" label="密码:">
          <el-input v-model="form.password" show-password autocomplete="off" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入学生备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import template from '../ManageTemplate'
import commonTemplate from '@/commonTemplate'
import api from '@/api'
export default {
  mixins: [template, commonTemplate],
  watch: {
    currentPage (val) {
      this.getStudentInfo(val)
    }
  },
  computed: {
  },
  data () {
    return {
      excelFile: undefined,
      currentPage: 1,
      pages: 0 // 信息总页数
    }
  },
  methods: {
    async submit () {
      this.dialogFormVisible = false
      let {name, password, remark} = this.form
      if (this.isHandelAdd) { // 注册学生信息
        if (!name || !password) {
          this.$message({
            message: '姓名和密码不能为空',
            showClose: true,
            type: 'error'
          })
          return
        } else {
          let res = await api.studentRegister(this.form)
          console.log('注册信息', this.form)
          this.resMsg(res, '注册成功', '注册失败')
          if (res && res.data && res.data.status) {
            this.getStudentInfo(1)
          }
        }
      } else {

      }
    },
    setForm (index, row) {
      this.form.name = row && row.name
      this.form.remark = row && row.remark
    },
    clearForm () {
      let keys = Object.keys(this.form)
      keys.map(val => {
        this.form[val] = undefined
      })
    },
    uploadSuccess (res, file, fileList) {
      if (!res) return
      console.log('fileList,', fileList)
      this.$refs.upload.clearFiles()
      if (res.status) {
        this.$message({
          message: res.msg || '文件上传成功',
          showClose: true,
          type: 'success'
        })
      } else {
        this.$message({
          message: res.msg || '文件上传失败',
          showClose: true,
          type: 'error'
        })
      }
    },
    async getStudentInfo (page) {
      let res = await api.getAllStudentInfo(page)
      this.pages = res.data.data.pages
      console.log('getAllStudentInfo', res.data.data.list)
      if (res && res.data && res.data.status) {
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
    this.getStudentInfo(1)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

