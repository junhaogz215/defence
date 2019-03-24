<template>
  <section>
    <el-card>
      <header slot="header">
        {{$route.name}}
      </header>
      <p class="condition">
        <span>评分教师：</span>
        <el-tag type="warning">{{userInfo.data.userName}}</el-tag>
      </p>
      <el-table
        :data="studentDatas"
        style="width: 100%">
        <el-table-column
          label="学生姓名"
          width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.studentName }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="studentName"
          label="是否已评分"
          width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status === 1 ? '已评分' : '未评分' }}
              </span>
            </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="openMarkGradePanel(scope.$index, scope.row)">评分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :close-on-click-modal="false"
      title="学生评分" 
      :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="100px">
        <el-form-item
          v-for="(val, i) in subjectDatas"
          :key="i"
          :label="val.subjectName + ':'">
          <el-input 
            @change="computeTotalScore(val)"
            v-model="scoreForm[val.subjectName]"
            placeholder="请输入分数"
            autocomplete="off"></el-input>
            <el-tag type="info">最高{{val.subjectScore}}分</el-tag>
        </el-form-item>
        <el-form-item
          :label="'总分'">
          <el-input v-model="totalScore" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import template from '../ManageTemplate'
import commonTemplate from '@/commonTemplate'
import api from '@/api'
export default {
  mixins: [template, commonTemplate],
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      subjectDatas: [],
      studentDatas: [],
      tableData: [],
      scoreForm: {},
      totalScore: 0,
      currentStudentInfo: {}
    }
  },
  methods: {
    openMarkGradePanel (index, row) {
      let scoreForm = this.scoreForm
      let keys = Object.keys(scoreForm)
      keys.map((key) => {
        scoreForm[key] = ''
      })
      if (row.status === 1) {
        this.$message({
          message: '该同学已打分',
          type: 'warn'
        })
        return
      }
      this.dialogFormVisible = true
      this.currentStudentInfo = row
    },
    submit () {
      let subjectDatas = this.subjectDatas
      for (let i = 0; i < subjectDatas.length; i++) {
        let itemScore = this.scoreForm[subjectDatas[i].subjectName]
        if (itemScore === '') {
          this.$message({
            message: `${subjectDatas[i].subjectName}分数不能为空`,
            type: 'error'
          })
          return
        } else if (Number.isNaN(+itemScore)) {
          this.$message({
            message: `${subjectDatas[i].subjectName}的分数格式不正确`,
            type: 'error'
          })
          return
        } else if (itemScore > subjectDatas[i].subjectScore) {
          this.$message({
            message: `${subjectDatas[i].subjectName}的分数超过了分数上限`,
            type: 'error'
          })
          return
        } else if (+this.totalScore > 100) {
          this.$message({
            message: `总分不能超过100分`,
            type: 'error'
          })
          return
        }
      }
      this.$confirm('提交分数后分数将无法修改，确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        let res = await api.addNewGrade({
          studentId: this.currentStudentInfo.studentId,
          studentName: this.currentStudentInfo.studentName,
          totalScore: +this.totalScore,
          createBy: this.userInfo.data.uid || ''
        })
        this.resMsg(res, '评分成功', '评分失败')
        if (res && res.data && res.data.status) {
          this.dialogFormVisible = false
          this.getMyStudents()
        }
      })
    },
    computeTotalScore (subjectInfo) {
      let val = this.scoreForm
      let keys = Object.keys(val)
      let result = 0
      keys.map((key, i, arr) => {
        let score = val[key]
        if (typeof +score === 'number' && !Number.isNaN(score)) {
          result += +score
        }
        if (i === arr.length - 1) {
          result /= arr.length
        }
      })
      this.totalScore = Math.round(result)
    },
    async getAllsubject () {
      let res = await api.getAllSubject()
      if (res && res.data && res.data.status) {
        this.subjectDatas = res.data.data
        res.data.data.map(val => { // 为form动态添加响应属性
          this.$set(this.scoreForm, val.subjectName, '')
        })
      }
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
    },
    async getMyStudents () {
      let userData = this.userInfo && this.userInfo.data
      if (!userData) return
      let res = await api.getSelfGroupInfo(userData.uid, 1)
      if (res && res.data && res.data.status === false) {
        this.$message({
          message: res.data.msg || '查询学生信息失败',
          type: 'error'
        })
        return
      } else {
        this.studentDatas = res.data.data.list
      }
    }
  },
  created () {
    this.getAllsubject()
    this.getMyStudents()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

</style>

