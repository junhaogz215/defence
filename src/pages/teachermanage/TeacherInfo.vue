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
        class="margintop"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
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
          prop="isleader"
          label="是否leader"
          width="180">
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传一个文件`);
    },
    setForm (index, row) {
      this.form.name = row && row.name
      this.form.remark = row && row.remark
    },
    clearForm () {
      let keys = Object.keys(this.form)
      keys.map(val => {
        this.form[val] = undefined
      }).form = {}
    }
  },
  created () {
    this.tableData = [
      {
        name: '绝少',
        isleader: 'true',
        leaderName: '-',
        role: '辅导员'
      }, {
        name: '威少',
        isleader: 'true',
        leaderName: '-',
        role: '普通教师'
      },{
        name: '刘浩军',
        isleader: 'true',
        leaderName: '绝少',
        role: '普通教师'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>
