import Vue from 'vue'
import VueRouter from 'vue-router'
//import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import Comment from '../views/Comment.vue'
//import store from "../auth/store"
import SignIn from "../views/SignIn"
import Profile from "../views/Profile"
//import createRouter from "vue-router"
//import createWebHistory from "vue-router"
//import { authenticationGuard } from '@/auth/authenticationGuard';

Vue.use(VueRouter)
/*const ifNotAuthenticated = (to, from, next) => {
  console.log(store.getters);
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/dashboard");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};
*/
const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
    //beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
   // beforeEnter: ifAuthenticated,
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    //beforeEnter: ifAuthenticated,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    //beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/Register.vue')
  
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/signup' , '/profile'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router
