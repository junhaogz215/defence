<template>
  <el-card>
      <div slot="header">
        {{$route.name}}
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="学生姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="答辩总分"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="180">
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      tableData: [
        {
          name: '',
          totalScore: '',
          remark: ''
        }
      ]
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      let userInfo = this.$store.state.userInfo
      if (!userInfo.isLogin) return
      let res = await api.getSelfInfo(userInfo.data.id || userInfo.data.uid)
      console.log(res)
      if (res && res.data && res.data.status) {
        this.tableData[0] = res.data.data
      } else {
        this.$message('查询信息失败')
      }
    }
  }
}
</script>

<style lang="scss" scope>

</style>
