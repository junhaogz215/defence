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
          prop="score"
          label="学生成绩"
          width="180">
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
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          name: 'ceshi',
          score: '100'
        }
      ]
    }
  },
  async created () {
    // let res = await api.
  }
}
</script>

<style lang="scss" scope>

</style>
