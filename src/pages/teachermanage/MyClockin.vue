
<template>
  <div>
    <el-card>
      <div slot="header">
        {{$route.name}}
      </div>
      <el-table
        :data="tableData[currentPage]"
        style="width: 100%">
        <el-table-column
          prop="dateTime"
          label="考勤日期"
          width="150">
          <template slot-scope="scope">
            {{scope.row.dateTime.slice(0, 10)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="150">
          <template slot-scope="scope">
            {{scope.row.createTime.slice(0, 10)}}
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
      this.getAttendance(val)
    },
  },
  computed: {
    userInfo () {
       return this.$store.state.userInfo
    }
  },
  data () {
    return {
      currentPage: 1,
      pages: 0 // 信息总页数
    }
  },
  methods: {
    async getAttendance(page) {
      let id = this.userInfo.data.uid
      let res = await api.getSelfAttendanceHistory(id, page)
      if (res && res.data && res.data.status) {
        this.pages = res.data.data.pages
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
    this.getAttendance(this.currentPage)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>

