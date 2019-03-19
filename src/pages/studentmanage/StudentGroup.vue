<template>
  <div>
    <el-card>
      <div slot="header">
        {{$route.name}}
      </div>
      <section class="condition">
        <label for="">
          选择答辩小组：
          <el-select
            class="condition-item"
            v-model="selectedTeacherId"
            filterable
            size="mini"
            placeholder="请选择教师分组">
            <el-option
              v-for="item in teacherDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </label>
        <el-button
          size="mini"
          type="warning"
          @click="isAddStudent = !isAddStudent">
          {{isAddStudent ? '取消' : '为分组添加学生'}}</el-button>
        <el-button  
          size="mini"
          type="success"
          @click="outputGroupInfo">
          导出小组信息</el-button>
      </section>
      <section class="margintop" v-if="isAddStudent">
        <el-select
          size="mini"
          class="select-student"
          v-model="selectedStudentIds"
          multiple
          filterable 
          placeholder="请选择要加入分组的学生">
          <el-option
            v-for="item in studentDatas"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div>
          <el-button
            @click="addStudentsToGroup"
            class="margintop"
            size="mini"
            type="primary">
            添加已选中学生
          </el-button>
        </div>
      </section>
      <hr>
      <section>
        <p class="condition">
          <span class="label">答辩教师:</span>
          <el-tag 
            class="label-value"
            :type="groupDatas.info.teacherName ? 'success' : 'info'">{{groupTeacherName}}</el-tag>
        </p>
        <p class="condition">
          <span class="label">答辩教师组长:</span>
          <el-tag 
            class="label-value"
            :type="groupDatas.info.leaderName ? 'success' : 'info'">{{groupLeaderName}}</el-tag>
          <!-- <span class="label-value">{{}}</span> -->
        </p>
        <el-table
          size="mini"
          :data="groupDatas.list"
          style="width: 100%">
          <el-table-column
            prop="studentName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row, removeStudent)">从分组中移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
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
    selectedTeacherId (val) {
      this.getGroupDataByTeacherId(val)
      console.log('selectedTeacherId', val)
    },
    selectedStudentIds (val) {
    }
  },
  computed: {
    groupTeacherName () {
      return this.groupDatas.info.teacherName || '未指定教师'
    },
    groupLeaderName () {
      return this.groupDatas.info.leaderName || '未指定组长'
    }
  },
  data () {
    return {
      excelFile: undefined,
      teacherDatas: [],
      studentDatas: [],
      selectedTeacherId: '',
      selectedStudentIds: [],
      isAddStudent: false,
      // currentPage: 1,
      // pages: 1,
      groupDatas: {
        info: {
          teacherName: '',
          teacherId: '',
          leaderName: '',
          leaderId: ''
        },
        list: []
      }
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
      })
    },
    async getAllTeacher () {
      let res = await api.getTeacherInfos(null, null, 1)
      if (res && res.data && res.data.status) {
        this.teacherDatas = res.data.data.list
      } else {
        this.handleError('教师列表获取失败')
      }
    },
    async getAllUnGroupStudent () {
      let res = await api.getUnGroupedStudents()
      if (res && res.data && res.data.status) {
        this.studentDatas = res.data.data.list
      } else {
        this.handleError('学生列表获取失败')
      }
    },
    async getGroupDataByTeacherId (id) {
      let res = await api.getSelfGroupInfo(id, 1)
      if (res && res.data && res.data.status) {
        // this.pages = res.data.data.pages
        if (res.data.data && res.data.data.list.length > 0) {
          this.$set(this.groupDatas, 'list', res.data.data.list)
          this.$set(this.groupDatas, 'info', res.data.data.list[0])
        } else {
          this.$set(this.groupDatas, 'list', [])
          this.$set(this.groupDatas, 'info', {})
        }
        console.log('groupDatas', this.groupDatas)
      } else {
        this.handleError('分组信息获取失败')
      }
    },
    addStudentsToGroup () {
      if (!this.selectedTeacherId) {
        this.$message({
          message: '请选择一名教师',
          type: 'warning'
        })
        return
      }
      if (this.selectedStudentIds.length === 0) {
        this.$message({
          message: '请至少选择一名学生',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认将该学生添加到分组?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(async () => {
          let teacherId = this.selectedTeacherId
          let studentIds = this.selectedStudentIds.join(',')
          let res = await api.addNewGroup(teacherId, studentIds)
          this.resMsg(res, '添加成功', '添加失败')
          if (res && res.data && res.data.status) {
            this.resetUnGroupStudents()
            this.getGroupDataByTeacherId(this.selectedTeacherId)
          }
        })
    },
    removeStudent (index, row) {
       this.$confirm('确认将该学生从分组中移出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await api.removeStudentFromGroup(row.id)
          this.resMsg(res, `成功将${row.studentName}移出分出`, '移出失败')
          if (res && res.data && res.data.status) {
            this.resetUnGroupStudents()
            this.getGroupDataByTeacherId(this.selectedTeacherId)
          }
        })
    },
    resetUnGroupStudents () {
      this.selectedStudentIds = []
      this.getAllUnGroupStudent()
    },
    outputGroupInfo () {
      if (!this.selectedTeacherId) {
        this.$message({
          message: '必须选择一个教师分组',
          type: 'error'
        })
        return
      }
      this.$confirm(`确认导出小组信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          api.outputGroupDataByTeacherId(this.selectedTeacherId)
          .then(response => {
            if (response && response.data && response.data.status === false) {
              this.$message({
                message: response.data.msg || '导出错误',
                type: 'error'
              })
              return
            }
            let blob = new Blob([response.data])
            let downloadElement = document.createElement('a')
            let href = window.URL.createObjectURL(blob); //创建下载的链接
      　　  downloadElement.href = href;
        　　downloadElement.download = '小组成绩.xlsx'; //下载后文件名
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
    }
  },
  created () {
    this.getAllTeacher()
    this.getAllUnGroupStudent()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.select-student {
  width: 80%;
}
.label {
  display: inline-block;
  width: 120px;
}
.label-value {
  font-weight: bold;
}
</style>

