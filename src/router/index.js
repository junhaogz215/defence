import Vue from 'vue'
import Router from 'vue-router'
import pages from '@/pages'
import store from '../store'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'loading...',
    component: pages.Loading
  },
  {
    path: '/noaccess',
    name: '无权访问',
    component: pages.NoAccess,
    hidden: true
  },
  {
    path: '/login',
    name: '登录',
    component: pages.Login
  },
  {
    path: '/password',
    name: '修改密码',
    component: pages.SetPassword
  },
  {
    path: '/studentinfo',
    name: '学生信息管理',
    component: pages.StudentInfo
  },
  {
    path: '/teacherinfo',
    name: '教师信息管理',
    component: pages.TeacherInfo
  },
  {
    path: '/studentgroup',
    name: '学生分组',
    component: pages.StudentGroup
  },
  // {
  //   path: '/teachergroup',
  //   name: '教师分组',
  //   component: pages.TeacherGroup
  // },
  {
    path: '/projectmange',
    name: '得分项管理',
    component: pages.ProjectManage
  },
  {
    path: '/gradeinfo',
    name: '成绩审核',
    component: pages.GradeInfo
  },
  {
    path: '/gradecharts',
    name: '答辩情况展示',
    component: pages.GradeCharts
  },
  {
    path: '/clockingin',
    name: '考勤管理',
    component: pages.TeacherClockIn
  },
  {
    path: '/myClockin',
    name: '考勤记录查询',
    component: pages.MyClockin
  },
  {
    path: '/markgrade',
    name: '教师评分',
    component: pages.MarkGrade
  },
  {
    path: '/mygrade',
    name: '成绩查询',
    component: pages.MyGrade
  }
]

export default new Router({
  routes
})

export { routes }
