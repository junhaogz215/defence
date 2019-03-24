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
    '/studentinfo',
    '/gradecharts',
    '/studentgroup',
    '/teacherinfo',
    '/projectmange',
    // '/gradeinfo',
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
    '/gradecharts',
    '/myClockin',
    '/password'
  ],
  // 组长可访问路由
  leaderRoutes: [
    '/studentinfo',
    '/markgrade',
    '/gradeinfo',
    '/clockingin',
    '/gradecharts',
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