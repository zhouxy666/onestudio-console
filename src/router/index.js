import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/Index'
import User from '@/components/user/User'
import Grade from '@/components/user/Grade'

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
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/grade',
          name: 'grade',
          component: Grade
        }
      ]
    }
  ]
})
