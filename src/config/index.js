// 路由权限配置
const powerConfig = {
  // 游客可访问路由
  touristRoutes: [
    '/login',
    '/noaccess'
  ],
  // 管理员可访问路由
  adminRoutes: [
    // '/login',
    '/teacherinfo',
    '/studentinfo',
    '/studentgroup',
    '/projectmange',
    // '/gradeinfo',
    '/gradecharts',
    // '/markgrade',
    // '/clockingin',
    // '/mygrade',
    // '/teachergroup',
    '/noaccess',
    '/password',
  ],
  // 教师可访问路由
  teacherRoutes: [
    '/studentinfo',
    '/markgrade',
    '/noaccess',
    '/password'
  ],
  // 组长可访问路由
  leaderRoutes: [
    '/markgrade',
    '/gradeinfo',
    '/studentinfo',
    '/clockingin',
    '/password',
    '/noaccess',
  ],
  // 学生可访问路由
  studentRoutes: [
    '/mygrade',
    '/password',
    '/noaccess'
  ]
}

export default {
  powerConfig
}
export { powerConfig }