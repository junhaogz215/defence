<template>
  <section>
    <el-card>
      <header slot="header">
        {{$route.name}}
      </header>
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
              size="mini"
              @click="handleEdit(scope.$index, scope.row, setForm)">修改</el-button>
            <el-button
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
  </section>
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
  },
  computed: {

  },
  data () {
    return {
      pages: 0, // 信息总页数
      currentPage: 1,
      subjectDatas: [],
      studentDatas: [{
        name: '刘浩军'
      }, {
        name: '崔跃威'
      }, {
        name: '刘乃杰'
      }],
      tableData: []
    }
  },
  methods: {
    async getAllsubject () {
      let res = await api.getAllSubject()
      if (res && res.data && res.data.status) {
        this.subjectDatas = res.data.data
      }
      console.log('all subject', res.data.data)
    },
    async getStudentInfo (page) {
      let res = await api.getAllStudentInfo(page, this.orderType, this.onlyShowPass ? '60' : null)
      if (res && res.data && res.data.status) {
        console.log('getAllStudentInfo', res.data.data.list)
        this.pages = res.data.data.pages
        res.data.data.list.map(val => {
          if (val.totalScore === null)  {
            val.totalScore  = '-'
          }
        })
        this.$set(this.tableData, page, res.data.data.list)
      } else {
        this.$message({
          message: '查询失败',
          showClose: true,
          type: 'error'
        })
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created () {
    this.getAllsubject()
    this.getStudentInfo(this.currentPage)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

</style>

