import axios from 'axios'
axios.post(`http://45.40.192.128/platform/api/teacher/${1}`, {}, {
  params: {
    id: 1,
    name: '途虎测试',
    password: '124',
    isLeader: '是',
    role: 2
  }
}).then(data => {
  console.log('data', data)
}).catch (err => console.log(err))
export default {
  /**
   * 用户登录
   * @param {string} userName 
   * @param {string} password 
   * @param {string} role 
   */
  userLogin (userName, password, role) {
    return axios.get('http://45.40.192.128/platform/api/user/login', {
      params: {
        userName, password, role
      }
    })
  },
  /**
   * 查询全部教师信息
   * @param {string} teacherId 
   * @param {number} page 
   */
  getTeacherInfos (teacherId, page) {
    return axios.get('http://45.40.192.128/platform/api/teacher/infos', {
      params: {
        teacherId, page
      }
    })
  },
  /**
   * 注册教师
   * @param {{id, name, password, isLeader, leaderId, role}} params 
   */
  teacherRegister (params) {
    return axios.post('http://45.40.192.128/platform/api/teacher/registered', {
      ...params
    })
  },
  /**
   * 更新教师信息
   * @param {{id,name,password,isLeader,leaderId,role}} params 
   */
  updateTeacherInfo (params) {
    return axios.post(`http://45.40.192.128/platform/api/teacher`, {}, {
      params: {
        ...params
      }
    })
  },
  /**
   * 添加答辩科目
   * @param {string} subjectName 
   * @param {number} subjectScore 
   */
  addSubject (subjectName, subjectScore) {
    return axios.post('http://45.40.192.128/platform/api/subject/add', {}, {
      params: {
        subjectName, subjectScore
      }
    })
  },
  /**
   * 查询全部答辩科目
   */
  getAllSubject () {
    return axios.get('http://45.40.192.128/platform/api/subject/query')
  },
  /**
   * 更新答辩科目分值
   * @param {number} id
   * @param {number} subjectScore
   */
  updateSubjectScore (id, subjectScore) {
    return axios.post('http://45.40.192.128/platform/api/subject', {
      id, subjectScore
    })
  },
  /**
   * 查询自己信息（学生)
   * @param {string} studentId
   */
  getSelfInfo (studentId) {
    return axios.get('http://45.40.192.128/platform/api/studentUser', {
      params: {
        studentId
      }
    })
  },
  /**
   * 修改学生信息
   * @param {{id:string, name:string, password:string, totalScore:number, remark:string}} params
   */
  updateStudentInfo (params) {
    return axios.post('http://45.40.192.128/platform/api/studentUser', {
      ...params
    })
  },
  /**
   * 修改学生备注
   * @param {string} id 
   * @param {string} remark 
   */
  updateStudentRemark (id, remark) {
    return axios.post('http://45.40.192.128/platform/api/studentUser/updateRemark', {
      id, remark
    })
  },
  /**
   * 注册学生
   * @param {{id:string, name:string, password:string, totalScore:number, remark:string}} params 
   */
  studentRegister (params) {
    return axios.post('http://45.40.192.128/platform/api/studentUser/registered', {
      ...params
    })
  },
  /**
   * excel导入学生信息
   * @param {} file 
   * post  /studentUser/dataImport 
   * TODO:
   */
  importStudentDatas (file) {
  },
  /**
   * 更新学生答辩成绩
   * @param {number} id 
   * @param {number} score 
   * @param {string} userId 
   */
  updateGrade (id, score, userId) {
    return axios.post('http://45.40.192.128/platform/api/studentScore/update', {
      id, score, userId
    })
  },
  /**
   * 组长提交学生成绩
   * @param {string} ids 
   * @param {string} userId 
   */
  commitStudentGrades (ids, userId) {
    return axios.post('http://45.40.192.128/platform/api/studentScore/updateStatus', {
      ids, userId
    })
  },
  /**
   * 查询组内学生成绩
   * @param {string} teacherId 
   * @param {number} page 
   */
  getSelfGroupGrades (teacherId, page) {
    return axios.get('http://45.40.192.128/platform/api/studentScore/teacher', {
      params: {
        teacherId, page
      }
    })
  },
  /**
   * 管理员查看组长提交的成绩
   * @param {string} userId 
   * @param {number} page 
   */
  getCommitedGrades (userId, page) {
    return axios.get('http://45.40.192.128/platform/api/studentScore/selectConfirmMsg', {
      params: {
        userId, page
      }
    })
  },
  /**
   * 添加学生答辩成绩
   * @param {{
   *  id: number,
   *  status: number,
   *  studentId: string,
   *  studentName: string,
   *  totalScore: number,
   *  updateBy: string
   * }} params 
   * 
   */
  addNewGrade (params) {
    return axios.post('http://45.40.192.128/platform/api/studentScore/add', {
      ...params
    })
  },
  /**
   * 导出分组信息
   * @param {string} teacherId 
   */
  outPutGroupDataByTeacherId (teacherId) {
    return axios.post('http://45.40.192.128/platform/api/studentGroup/dataOutput', {
      teacherId
    })
  },
  /**
   * 删除分组
   * @param {string} id 
   */
  deleteGroup (id) {
    return axios.get('http://45.40.192.128/platform/api/studentGroup/delete', {
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
    return axios.post('http://45.40.192.128/platform/api/studentGroup/group', {
      teacherId, studentIds
    })
  },
  /**
   * 查询自己分组信息(教师)
   * @param {string} teacherId 
   * @param {number} page 
   */
  getSelfGroupInfo (teacherId, page) {
    return axios.get('http://45.40.192.128/platform/api/studentGroup/teacher', {
      params: {
        teacherId, page
      }
    })
  },
  /**
   * 查询未分组学生
   * @param {number} page 
   */
  getUnGroupedStudents (page) {
    return axios.get('http://45.40.192.128/platform/api/studentGroup/unGrouped', {
      params: {
        page
      }
    })
  },
  /**
   * 添加考勤及记录
   * @param {{dateTime:string, id:number, leaderId:string, teacherId:string}} params 
   */
  addAttendance (params) {
    return axios.post('http://45.40.192.128/platform/api/attendance/addAttendance', {
      ...params
    })
  },
  /**
   * 查询自己的考勤记录(教师)
   * @param {string} teacherId 
   * @param {number} page 
   */
  getSelfAttendanceHistory (teacherId, page) {
    return axios.get('http://45.40.192.128/platform/api/attendance/history', {
      params: {
        teacherId, page
      }
    })
  }
}