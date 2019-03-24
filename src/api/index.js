import axios from 'axios'
let baseDomain = process.env.NODE_ENV === 'production' ? '' : 'http://45.40.192.128'
// let baseDomain = 'http://45.40.192.128'
// let baseDomain = 'http://localhost:8090' 给他们用这个把上面两句删掉
export default {
  /**
   * 修改密码
   * @params {{id, password, oldPassword, role, userName}} params
   */
  updatePassword (params) {
    return axios.post(baseDomain + '/platform/api/user/updatePwd', {
      ...params
    })
  },
  /**
   * 用户注销
   */
  logout () {
    return axios.post(baseDomain + '/platform/api/user/signOut')
  },
  /**
   * 获取用户登录状态
   */
  // getUserInfo () {
  //   return axios.get(baseDomain + '/platform/api/user/checkLoginStatus')
  // },
  /**
   * 用户登录
   * @param {string} userName 
   * @param {string} password 
   * @param {string} role 
   */
  userLogin (userName, password, role) {
    return axios.post(baseDomain + '/platform/api/user/login', {
      userName, password, role
    })
  },
  /**
   * 查询全部教师信息
   * @param {string} teacherId 
   * @param {number} page 
   */
  getTeacherInfos (teacherId, page, role) {
    return axios.get(baseDomain + '/platform/api/teacher/infos', {
      params: {
        teacherId, page, role
      }
    })
  },
  /**
   * 查询某教师考勤记录
   * @param {string} teacherId 
   * @param {number} page 
   */
  getTeacherSelfAttendance(teacherId, page) {
    return axios.get(baseDomain + '/platform/api/attendance/history', {
      params: {
        teacherId, page
      }
    })
  },
  /**
   * 查询组内教师
   */
  getTeacherInfoByLeaderId (leaderId) {
    return axios.get(baseDomain + '/platform/api/teacher/groupTeachers', {
      params: {
        leaderId
      }
    })
  },
  /**
   * 查询组长列表
   */
  getLeaderInfos () {
    return axios.get(baseDomain + '/platform/api/teacher/leaders')
  },
  /**
   * 注册教师
   * @param {{id, name, password, isLeader, leaderId, role}} params 
   */
  teacherRegister (params) {
    return axios.post(baseDomain + '/platform/api/teacher/registered', {
      ...params
    })
  },
  /**
   * 删除教师
   * @param {string} id 
   */
  deleteTeacherById (id) {
    return axios.post(baseDomain + '/platform/api/admin/deleteTeacher', {
      id
    })
  },
  /**
   * 更新教师信息
   * @param {{id,name,password,isLeader,leaderId,role}} params 
   */
  updateTeacherInfo (params) {
    return axios.post(`http://45.40.192.128/platform/api/teacher/update`,{
      ...params
    })
  },
  /**
   * 添加答辩科目
   * @param {string} subjectName 
   * @param {number} subjectScore 
   */
  addSubject (subjectName, subjectScore) {
    return axios.post(baseDomain + '/platform/api/subject/add', {
      subjectName, subjectScore
    })
  },
  /**
   * 查询全部答辩科目
   */
  getAllSubject () {
    return axios.get(baseDomain + '/platform/api/subject/query')
  },
  /**
   * 更新答辩科目分值
   * @param {number} id
   * @param {number} subjectScore
   */
  updateSubjectScore (id, subjectScore) {
    return axios.post(baseDomain + '/platform/api/subject/update', {}, {
      params: {
        id, subjectScore
      }
    })
  },
  /**
   * 删除科目
   * @param {number} id
   * @param {number} subjectScore
   */
  deleteSubject (id) {
    return axios.post(baseDomain + '/platform/api/subject/delete', {}, {
      params: {
        id
      }
    })
  },
  /**
   * 查询自己信息（学生)
   * @param {string} studentId
   */
  getSelfInfo (studentId) {
    return axios.get(baseDomain + '/platform/api/studentUser/query', {
      params: {
        studentId
      }
    })
  },
   /**
   * 删除学生
   * @param {string} id 
   */
  deleteStudentById (id) {
    return axios.post(baseDomain + '/platform/api/admin/deleteTeacher', {
      id
    })
  },
  /**
   * 修改学生信息
   * @param {{id:string, name:string, password:string, totalScore:number, remark:string}} params
   */
  updateStudentInfo (params) {
    return axios.post(baseDomain + '/platform/api/studentUser/update', {
      ...params
    })
  },
  /**
   * 修改学生备注
   * @param {string} id 
   * @param {string} remark 
   */
  updateStudentRemark (id, remark) {
    return axios.post(baseDomain + '/platform/api/studentUser/updateRemark', {
      id, remark
    })
  },
  /**
   * 注册学生
   * @param {{id:string, name:string, password:string, totalScore:number, remark:string}} params 
   */
  studentRegister (params) {
    return axios.post(baseDomain + '/platform/api/studentUser/registered', {
      ...params
    })
  },
  /**
   * 查询所有学生信息
   * @param {{page, orderType, start, end}} params 
   */
  getAllStudentInfo (params) {
    return axios.get(baseDomain + '/platform/api/studentUser/infos', {
      params
    })
  },
  /**
   * 更新学生答辩成绩
   * @param {number} id 
   * @param {number} score 
   * @param {string} userId 
   */
  updateGrade (id, score, userId) {
    return axios.post(baseDomain + '/platform/api/studentScore/update', {
      id, score, userId
    })
  },
  /**
   * 组长提交学生成绩
   * @param {string} ids 
   */
  commitStudentGrades (ids) {
    return axios.post(baseDomain + '/platform/api/studentScore/updateStatus', {}, {
      params: {
        ids
      }
    })
  },
  /**
   * 查询组内学生成绩
   * @param {string} leaderId 
   * @param {number} page 
   */
  getSelfGroupGrades (leaderId, page) {
    return axios.get(baseDomain + '/platform/api/studentScore/teacher', {
      params: {
        leaderId, page
      }
    })
  },
  /**
   * 管理员查看组长提交的成绩
   * @param {string} userId 
   * @param {number} page 
   */
  getCommitedGrades (userId, page) {
    return axios.get(baseDomain + '/platform/api/studentScore/selectConfirmMsg', {
      params: {
        userId, page
      }
    })
  },
  /**
   * 添加学生答辩成绩
   * @param {{
   *  studentId: string,
   *  studentName: string,
   *  totalScore: number,
   *  createBy: string
   * }} params 
   * 
   */
  addNewGrade (params) {
    return axios.post(baseDomain + '/platform/api/studentScore/add', {
      ...params
    })
  },
  /**
   * 成绩导出
   * @param {string} ids 
   */
  outputScore (ids) {
    return axios.post(baseDomain + '/platform/api/studentScore', {}, {
      params: {
        ids: ids || null
      },
      responseType: 'blob'
    })
  },
  /**
   * 获取成绩图表信息
   */
  getScoreChartInfo () {
    return axios.get(baseDomain + '/platform/api/admin/showScore')
  },
  /**
   * 导出分组信息
   * @param {string} teacherId 
   */
  outputGroupDataByTeacherId (teacherId) {
    return axios.post(baseDomain + '/platform/api/studentGroup/dataOutput', {}, {
      params: {
        teacherId
      },
      responseType: 'blob'
    })
  },
  /**
   * 删除分组中某个学生
   * @param {string} id  groupId
   */
  removeStudentFromGroup (id) {
    return axios.get(baseDomain + '/platform/api/studentGroup/delete', {
      params: {
        id
      }
    })
  },
  /**
   * 添加新的学生分组
   * @param {string} teacherId 
   * @param {string} studentIds 
   */
  addNewGroup (teacherId, studentIds) {
    return axios.post(baseDomain + '/platform/api/studentGroup/group', {}, {
      params: {
        teacherId, studentIds
      }
    })
  },
  /**
   * 查询自己分组信息(教师)
   * @param {string} teacherId 
   * @param {number} page 
   */
  getSelfGroupInfo (teacherId, page) {
    return axios.get(baseDomain + '/platform/api/studentGroup/teacher', {
      params: {
        teacherId, page
      }
    })
  },
  /**
   * 查询未分组学生
   */
  getUnGroupedStudents () {
    return axios.get(baseDomain + '/platform/api/studentGroup/unGrouped')
  },
  /**
   * 添加考勤及记录
   * @param {{dateTime:string, id:number, leaderId:string, teacherId:string}} params 
   */
  addAttendance (params) {
    return axios.post(baseDomain + '/platform/api/attendance/addAttendance', {
      ...params
    })
  },
  /**
   * 查询自己的考勤记录(教师)
   * @param {string} teacherId 
   * @param {number} page 
   */
  getSelfAttendanceHistory (teacherId, page) {
    return axios.get(baseDomain + '/platform/api/attendance/history', {
      params: {
        teacherId, page
      }
    })
  }
}