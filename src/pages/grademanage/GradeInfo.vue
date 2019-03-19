<template>
  <section>
    <el-card>
      <header slot="header">
        {{$route.name}}
      </header>
      <p class="condition">
        <span class="condition-item">审核人:</span>
        <el-tag class="condition-item" type="success">{{userInfo.data.userName}}</el-tag>
      </p>
      <el-button 
        size="mini"
        type="warning"
        @click="submit">
        批准选中项
      </el-button>
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="groupGradeDatas[currentPage]"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="studentName"
          label="学生姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="学生总分">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="评分人">
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态">
          <template slot-scope="scope">
            {{+scope.row.status === 0 ? '未审核' : '已审核' }}
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
  </section>
</template>

<script>
import template from '../ManageTemplate'
import commonTemplate from '@/commonTemplate'
import api from '@/api'
export default {
  mixins: [template, commonTemplate],
  watch: {
    currentPage () {
      this.getSelfGroupGrade()
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      groupGradeDatas: [],
      currentPage: 1,
      pages: 0,
      selectedStudentInfos: []
    }
  },
  methods: {
    submit () {
      if (this.selectedStudentInfos.length === 0) {
        this.$message({
          message: '请至少选中一条信息',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认批准选中项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let ids = this.selectedStudentInfos.map(val => val.id).join(',')
        let res = await api.commitStudentGrades(ids)
        this.resMsg(res, '审核成功', '审核失败')
        if (res && res.data && res.data.status) {
          this.getSelfGroupGrade()
          this.selectedStudentInfos = []
        }
      })
    },
    async getSelfGroupGrade () {
      let userInfo = this.userInfo
      let uid = userInfo && userInfo.data && userInfo.data.uid
      if (!uid) return
      let res = await api.getSelfGroupGrades(uid, this.currentPage)
      if (res && res.data && res.data.status) {
        this.$set(this.groupGradeDatas, this.currentPage, res.data.data.list)
        this.pages = res.data.data.pages
      }
    },
    handleSelectionChange(val) {
      this.selectedStudentInfos = val
      console.log(val)
    }
  },
  created () {
    this.getSelfGroupGrade()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

</style>

