import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/authentification/LoginView.vue'
import Contact from '@/views/ProfileView.vue'
import RegisterView from '@/views/authentification/RegisterView.vue'
import Home from '@/views/Home.vue'
import ProfileView from '@/views/ProfileView.vue'

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
  ],
})

export default router
