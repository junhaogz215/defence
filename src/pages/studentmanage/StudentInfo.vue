<template>
  <div>
    <el-card>
      <header slot="header">
        {{$route.name}}
      </header>
      <div class="condition">
        <el-button
          v-show="userInfo.data && +userInfo.data.role === 1"
          class="condition-item"
          type="success" 
          size="mini"
          @click="handleAdd(clearForm)">新增学生</el-button>
        <el-upload
          v-show="userInfo.data && +userInfo.data.role === 1"
          class="condition-item"
          ref="upload"
          action="http://45.40.192.128/platform/api/studentUser/dataImport"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :file-list="excelFile"
          :limit="1">
          <el-button size="mini" type="primary">excel批量导入</el-button>
        </el-upload>
          <el-button size="mini" type="primary" @click="outputScore">导出成绩</el-button>
      </div>
      <div class="condition margintop" :style="{margin: '20px 0'}">
        <el-radio class="condition-item" v-model="orderType" :label="1">升序</el-radio>
        <el-radio v-model="orderType" :label="2">降序</el-radio>
        <el-radio class="condition-item" :label="1" v-model="displayRule">所有</el-radio>
        <el-radio class="condition-item" :label="2" v-model="displayRule">通过答辩</el-radio>
        <el-radio :label="3" v-model="displayRule">未通过答辩</el-radio>
      </div>
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
          sortable
          prop="totalScore"
          label="答辩总分">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button
              v-show="userInfo.data && (+userInfo.data.role === 1 || +userInfo.data.teacherRole === 0)"
              size="mini"
              @click="handleEdit(scope.$index, scope.row, setForm)">修改</el-button>
            <el-button
              v-show="userInfo.data && +userInfo.data.role === 1"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, deleteStudent)">删除</el-button>
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
          <el-input 
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入学生姓名"
            :readonly="userInfo.data && userInfo.data.teacherRole === 0"></el-input>
        </el-form-item>
        <el-form-item label="密码:" v-show="isHandelAdd">
          <el-input v-model="form.password" show-password autocomplete="off" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入学生备注"></el-input>
        </el-form-item>
        <!--TODO:-->
        <el-form-item v-show="!isHandelAdd && form.totalScore && false" label="分数:">
          <el-input v-model="form.totalScore" autocomplete="off" placeholder="学生成绩"></el-input>
        </el-form-item>
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
import api from '@/api'
export default {
  mixins: [template, commonTemplate],
  watch: {
    currentPage (val) {
      this.getStudentInfo(val)
    },
    orderType (val) {
      this.currentPage = 1
      this.getStudentInfo(this.currentPage)
    },
    displayRule (val) {
      console.log(val)
      this.currentPage = 1
      this.getStudentInfo(this.currentPage)
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        password: '',
        totalScore: '',
        remark: ''
      },
      excelFile: undefined,
      currentPage: 1,
      displayRule: 1, // 1:展示所有 2：只展示及格成绩 3： 只展示不及格
      orderType: 2, // 2 降序 其他升序
      pages: 0 // 信息总页数
    }
  },
  methods: {
    async deleteStudent (index, row) {
     let res = await api.deleteStudentById(row.id)
      this.resMsg(res, '删除成功', '删除失败')
      if (res && res.data && res.data.status) {
        this.getStudentInfo(this.currentPage)
      }
    },
    outputScore () {
        this.$confirm(`确认导出学生成绩, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          api.outputScore()
          .then(response => {
            if (response && response.data && response.data.status === false) {
              this.$message({
                message: response.data.msg || '导出错误',
                type: 'error'
              })
              return
            }
            let blob = new Blob([response.data])
            var downloadElement = document.createElement('a')
        　　var href = window.URL.createObjectURL(blob); //创建下载的链接
        　　downloadElement.href = href;
        　　downloadElement.download = '学生成绩.xlsx'; //下载后文件名
        　　document.body.appendChild(downloadElement);
        　　downloadElement.click(); //点击下载
        　　document.body.removeChild(downloadElement); //下载完成移除元素
        　　window.URL.revokeObjectURL(href); //释放掉blob对象 
            console.log('response', response);
          })
          .catch(function(error) {
            console.log(error);
          })
        })
    },
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
          // this.form.password = md5(this.form.password)
          let res = await api.studentRegister(this.form)
          console.log('注册信息', this.form)
          this.resMsg(res, '注册成功', '注册失败')
          if (res && res.data && res.data.status) {
            this.getStudentInfo(this.currentPage)
          }
        }
      } else {
        if (!name) {
          this.$message({
            message: '姓名不能为空',
            showClose: true,
            type: 'error'
          })
          return
        } else {
          this.form.password = undefined
          let res = await api.updateStudentInfo(this.form)
          this.resMsg(res, '修改成功', '修改失败')
          if (res && res.data && res.data.status) {
            this.getStudentInfo(this.currentPage)
          }
        }
      }
    },
    setForm (index, row) {
      this.form.id = row && row.id
      this.form.name = row && row.name
      this.form.remark = row && row.remark
      this.form.totalScore = row && row.totalScore
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
        this.getStudentInfo(this.currentPage)
      } else {
        this.$message({
          message: res.msg || '文件上传失败',
          showClose: true,
          type: 'error'
        })
      }
    },
    async getStudentInfo (page) {
      let params = {
        page,
        orderType: this.orderType
      }
      switch (this.displayRule) {
        case 1:
          break
        case 2:
          params.start = 60
          break
        case 3:
          params.end = 59
          break
      }
      let res = await api.getAllStudentInfo(params)
      if (res && res.data && res.data.status) {
        console.log('getAllStudentInfo', res.data.data.list)
        this.pages = res.data.data.pages
        this.$set(this.tableData, page, res.data.data.list)
      } else {
        this.$message({
          message: '查询失败',
          showClose: true,
          type: 'error'
        })
      }
    },
    handleOrder () {
      if (this.orderType === 2) {
        this.orderType = 1
      } else {
        this.orderType = 2
      }
    }
  },
  created () {
    this.getStudentInfo(this.currentPage)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

