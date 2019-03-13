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
        :data="tableData"
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
          :total="10">
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
        <el-form-item label="备注:">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入学生备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import template from '../ManageTemplate'
export default {
  extends: template,
  watch: {
  },
  computed: {
  },
  data () {
    return {
      excelFile: undefined
    }
  },
  methods: {
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
    }
  },
  created () {
    this.tableData = [
      {
      name: '王小虎',
      remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        remark: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        remark: '上海市普陀区金沙江路 1519 弄'
      }, {
        name: '王小虎',
        remark: '上海市普陀区金沙江路 1516 弄'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

