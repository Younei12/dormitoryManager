import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
// 重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  // 路由重定向，指向Login页面
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect:'/index',
    children:[
      //学生信息
      {
        path: '/student',
        name: 'Student',
        component: () => import('../views/Student.vue')
      },
      // 分配宿舍
      {
        path: '/distribution',
        name: 'Distribution',
        component: () => import('../views/Distribution.vue')
      },
      // 更换宿舍
      {
        path: '/change',
        name: 'Change',
        component: () => import('../views/Change.vue')
      },
      // 办理退宿
      {
        path:'/andle',
        name:'Andle',
        component: () => import('../views/Andle.vue')
      },
      // 退宿审批
      {
        path:'/approval',
        name:'Approval',
        component: () => import('../views/Approval.vue')
      },
      // 楼栋管理
      {
        path:'/building',
        name:'Building',
        component: () => import('../views/Building.vue')
      },
      // 宿舍管理
      {
        path:'/dormitory',
        name:'Dormitory',
        component: () => import('../views/Dormitory.vue')
      },
      // 设备报修单
      {
        path:'/repair',
        name:'Repair',
        component: () => import('../views/Repair.vue')
      },
      // 管理员管理
      {
        path:'/administrators',
        name:'Administrators',
        // meta 做权限控制,只有角色权限为2的管理员才能访问该路由
        meta:{
          role:[2]  
        },
        component: () => import('../views/Administrators.vue')
      },
      // 首页
      {
        path:'/index',
        name:'Index',        
        component: () => import('../views/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
