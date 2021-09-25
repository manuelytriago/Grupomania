import Vue from 'vue'
import VueRouter from 'vue-router'
//import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'

import { authenticationGuard } from '@/auth/authenticationGuard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    beforeEnter: authenticationGuard,
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
