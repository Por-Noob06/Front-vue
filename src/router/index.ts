import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/authentification/LoginView.vue'
import Contact from '@/views/ProfileView.vue'
import RegisterView from '@/views/authentification/RegisterView.vue'
import Home from '@/views/Home.vue'
import ProfileView from '@/views/ProfileView.vue'
import SendCode from "@/views/SendCode.vue";
import ResetPassword from '@/views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },{
      path:'/Register.user',
      name: 'register',
      component: RegisterView
    },{
      path:'/Home',
      name: 'home',
      component: Home,

      beforeEnter: (to, from, next) => {

        if (localStorage.getItem('userToken')) {
          next();
        } else {
          next('/');
        }
      }
    },
    { path: '/user.profile', name: 'profile', component: ProfileView },
    {
      path:'/verify-code',
      name: 'SendCode',
      component: SendCode
    },
    {
      path:'/change-password',
      name: 'reset',
      component: ResetPassword
    },

  ],
})

export default router
