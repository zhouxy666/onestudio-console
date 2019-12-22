import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/Index'
import User from '@/components/userManage/user/UserPage'
import Grade from '@/components/userManage/Grade'
import Course from '@/components/userManage/Course'
import Class from '@/components/userManage/Class'
import Overview from '@/components/overview/Overview'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/overview',
          name: 'overview',
          component: Overview
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/grade',
          name: 'grade',
          component: Grade
        },
        {
          path: '/course',
          name: 'course',
          component: Course
        },
        {
          path: '/class',
          name: 'class',
          component: Class
        }
      ]
    }
  ]
})
