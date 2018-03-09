import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

Vue.use(Router)
//component:  resolve => require(['@/components/detail.vue'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login.vue'], resolve)
    }, 
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/register.vue'], resolve)
    },        
  ]
})
