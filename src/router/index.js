import Vue from 'vue'
import VueRouter from 'vue-router'
import teamApp from '../views/team-app.vue'
import teamList from '../views/team-list.vue'
import loginPage from '../views/login-page.vue'

import store from '@/store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'team-app',
    component: teamApp
  },
  {
    path: '/teams',
    name: 'team-list',
    component: teamList,
    beforeEnter: (to, from, next) => {
      if (store.getters.loggedinUser && store.getters.loggedinUser.isAdmin) next()
      else {
        store.commit('sendMsg', {txt:'You are unauthorized to enter!', type: 'warning'})
        next({name: 'team-app'})
      }
    }
  },
  {
    path: '/login',
    name: 'login-page',
    component: loginPage
  },
  {
    path: '/*',
    redirect: '/' 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
