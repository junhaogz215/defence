<template>
  
</template>

<script>
export default {
  watch: {
  },
  computed: {

  },
  data () {
    return {
      isHandelAdd: true,
      dialogFormVisible: false,
      tableData: [
      ],
      form: {
      }
    }
  },
  methods: {
    handleEdit(index, row, callback) {
      this.dialogFormVisible = true
      this.isHandelAdd = false
      callback && callback(index, row)
    },
    handleDelete(index, row, successCallback, failCallback) {
      this.$confirm(`确认删除该条数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          successCallback && successCallback(index, row)
        }).catch(() => {
          failCallback && failCallback(index, row)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleAdd (callback) {
      this.dialogFormVisible = true
      this.isHandelAdd = true
      callback && callback()
    },
    setForm (index, row) {
      this.form.name = row && row.name
      this.form.remark = row && row.remark
    },
    clearForm () {
      this.form = {}
    }
  },
  created () {
  
  }
}
</script>

<style>

</style>
