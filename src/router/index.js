import Vue from 'vue'
import Router from 'vue-router'
import pages from '@/pages'
import store from '../store'

Vue.use(Router)
const roleRoutes = {
  touristRoutes: [
    '/login',
    '/password'
  ],
  adminRoutes: [
    '/login',
    '/password',
    '/studentinfo',
    '/studentgroup',
    '/teacherinfo',
    '/teachergroup',
    '/projectmange',
    '/gradeinfo',
    '/gradecharts',
    '/markgrade',
    '/clockingin'
  ]
}
const teacherRoutes = [
]
const routes = [
  {
    path: '/',
    name: 'loading...',
    component: pages.Loading
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
  {
    path: '/teachergroup',
    name: '教师分组',
    component: pages.TeacherGroup
  },
  {
    path: '/projectmange',
    name: '项目管理',
    component: pages.ProjectManage
  },
  {
    path: '/gradeinfo',
    name: '成绩管理',
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
    path: '/markgrade',
    name: '成绩评定',
    component: pages.MarkGrade
  }
]
// 根据权限展示路由，下次封装到mutation里

let menus = roleRoutes.adminRoutes.map(val => {
  console.log(routes.filter(v => v.path === val))
  return routes.filter(v => v.path === val)[0]
})

store.commit('setMenu', menus)
export default new Router({
  routes
})

export {routes, roleRoutes}
