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
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="subjectName"
          label="科目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="subjectScore"
          label="科目分值"
          width="180">
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
              @click="handleDelete(scope.$index, scope.row, deleteItem)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row style="padding: 20px 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="10">
        </el-pagination>
      </el-row> -->
    </el-card>
    <el-dialog 
      :title="isHandelAdd ? '新增科目' : '修改科目信息'" 
      :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left" label-width="80px">
       <el-form-item label="科目名称:">
          <el-select
            v-if="!isHandelAdd"
            v-model="form.selectedSubjectName"
            filterable
            default-first-option>
            <el-option 
              v-for="(val, i) in tableData" 
              :key="i"
              :label="val.subjectName" 
              :value="val.subjectName"></el-option>
          </el-select>
          <el-input 
            v-else 
            v-model="form.selectedSubjectName"
            placeholder="请输入科目名称"></el-input>
        </el-form-item>
        <el-form-item label="科目分值:">
          <el-input 
            v-model="form.selectedSubjectScore" 
            placeholder="请输入科目分值"
            style="width: 222px"></el-input>
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
import apis from '@/api'
export default {
  mixins: [template, commonTemplate],
  watch: {
  },
  computed: {
  },
  data () {
    return {
      form: {
        selectedSubjectName: '',
        selectedSubjectScore: '',
        id: undefined
      },
    }
  },
  methods: {
    async deleteItem (index, row) {
      let { id } = row
      if (!id) this.handleError()
      let res = await apis.deleteSubject(+id)
      this.resMsg(res, '科目删除成功', '科目删除失败')
      this.initProjectInfo()
    },
    async submit () {
      let { id, selectedSubjectName, selectedSubjectScore } = this.form
      if (!this.formValidate()) return
      if (this.isHandelAdd) {
        let res = await apis.addSubject(selectedSubjectName, +selectedSubjectScore)
        this.resMsg(res, '添加成功', '添加失败')
      } else {
        let res = await apis.updateSubjectScore(+id, +selectedSubjectScore)
        this.resMsg(res, '修改成功', '修改失败')
      }
      this.dialogFormVisible = false
      this.initProjectInfo()
    },
    async initProjectInfo () {
      let res = await apis.getAllSubject()
      if (res && res.data && res.data.status) {
        this.tableData = res.data.data
      }
      console.log('projectDatas', this.tableData)
    },
    async setForm (index, row) {
      this.form.selectedSubjectName = row && row.subjectName
      this.form.selectedSubjectScore = row && row.subjectScore
      this.form.id = row && row.id
    },
    clearForm () {
      let keys = Object.keys(this.form)
      keys.map(val => {
        this.form[val] = undefined
      })
    },
    formValidate () {
      let { id, selectedSubjectName, selectedSubjectScore } = this.form
      if (!selectedSubjectName || !selectedSubjectScore) {
        this.$message({
          message: '科目名称和科目分值不能为空！',
          showClose: true,
          type: 'error'
        })
        return false
      }
      return true
    }
  },
  created () {
    this.initProjectInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

